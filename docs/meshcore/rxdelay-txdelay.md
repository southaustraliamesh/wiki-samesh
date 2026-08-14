---
title: MeshCore rxdelay and txdelay explanation and calculations
---

{/* migrated */}

:::info Source note
Migrated from the SA:MUG Wiki.js page. Content has been lightly cleaned for Docusaurus and public readability; advanced operational settings should still be field-tested before being treated as hard defaults.
:::

# MeshCore rxdelay and txdelay explanation and calculations

This page explains how MeshCore repeater `rxdelay`, `txdelay`, and `direct.txdelay` work, what the numbers mean, and why some values should be avoided.

These settings are useful on repeater networks where several nodes may hear and forward the same packet. They are not magic range boosters. They trade timing and latency against collision reduction and duplicate suppression.

Source note: this page is based on MeshCore repeater firmware v1.16.0 behaviour, checked against `examples/simple_repeater/MyMesh.cpp`, `src/Dispatcher.cpp`, `src/helpers/radiolib/RadioLibWrappers.cpp`, and the MeshCore CLI docs.

## Quick summary

| Setting | Applies to | What it does | Normal range to try |
| --- | --- | --- | --- |
| `rxdelay` | Received flood packets | Delays processing of weak flood packets so stronger copies can be handled first | `0`, or values greater than `1` |
| `txdelay` | Flood retransmits | Adds a random delay before forwarding flood traffic | `0.4` to `0.8` typical starting range |
| `direct.txdelay` | Direct routed retransmits | Adds a random delay before direct/routed retransmits | Usually lower than `txdelay` |

Practical defaults from the repeater firmware:

```
rxdelay        0.0   disabled
txdelay        0.5
direct.txdelay 0.3
```

## The important warning for rxdelay

Use:

```
set rxdelay 0
```

to disable the feature, or use values greater than `1` to enable the intended behaviour.

Avoid values between `0` and `1`.

Values between `0` and `1` invert the rxdelay curve. Instead of weak packets being delayed and strong packets being processed first, weak packets can process immediately while very strong packets can be delayed. That changes the intended priority from strong-before-weak to weak-before-strong.

Also note:

```
set rxdelay 1
```

is effectively a no-op. The formula always produces zero delay when the base is `1`.

## rxdelay: what it is trying to do

`rxdelay` is only applied to received flood packets.

When a repeater receives a flood packet, MeshCore calculates a packet score. Stronger, cleaner, shorter packets get a higher score. Weaker packets get a lower score.

The idea is:

1. A strong copy of a flood packet should be processed quickly.
2. A weak copy of the same packet can wait briefly.
3. If the strong copy has already propagated, the weak copy may later be recognised as a duplicate and suppressed.
4. This can reduce unnecessary retransmits from weak or marginal paths.

This is most useful where high or overlapping repeaters hear many copies of the same flood packet.

Small local infill repeaters should usually keep `rxdelay` disabled, because they may be the only local copy of a packet.

## rxdelay formula

In the repeater firmware, the rxdelay calculation is:

```
delay_ms = (rxdelay ^ (0.85 - packet_score) - 1) * packet_airtime_ms
```

Implementation details:

- `rxdelay 0` disables the feature.
- `rxdelay 1` produces zero delay.
- Delays under 50 ms are processed immediately.
- Very large delays are capped at 32000 ms.
- The delay is calculated before the flood packet is processed.
- Direct packets are not delayed by `rxdelay`.

For values greater than `1`:

- packet score below `0.85` gives a positive delay
- packet score near `0.85` gives little or no delay
- packet score above `0.85` gives a negative calculated delay, which is processed immediately because it is under the 50 ms threshold

For values between `0` and `1`, that behaviour reverses.

## What packet_score means

MeshCore derives `packet_score` from SNR margin, spreading factor, and packet length.

The source uses approximate SNR thresholds by spreading factor:

| Spreading factor | Approx SNR threshold |
| --- | --- |
| SF7 | -7.5 dB |
| SF8 | -10 dB |
| SF9 | -12.5 dB |
| SF10 | -15 dB |
| SF11 | -17.5 dB |
| SF12 | -20 dB |

Simplified:

```
snr_margin = packet_snr - sf_threshold
score ~= clamp((snr_margin / 10) * length_factor, 0, 1)
```

where `length_factor` is approximately:

```
1 - (packet_length / 256)
```

So a short packet with plenty of SNR margin scores high. A long or marginal packet scores lower.

## rxdelay examples

Approximate calculated delay multiplier compared with packet airtime:

| Packet score | `rxdelay 0.5` | `rxdelay 2` | `rxdelay 4` | `rxdelay 8` |
| --- | --- | --- | --- | --- |
| `1.00` | `+0.11x` | `-0.10x` | `-0.19x` | `-0.27x` |
| `0.90` | `+0.04x` | `-0.03x` | `-0.07x` | `-0.10x` |
| `0.85` | `0.00x` | `0.00x` | `0.00x` | `0.00x` |
| `0.80` | `-0.03x` | `+0.04x` | `+0.07x` | `+0.11x` |
| `0.70` | `-0.10x` | `+0.11x` | `+0.23x` | `+0.37x` |
| `0.60` | `-0.16x` | `+0.19x` | `+0.41x` | `+0.68x` |
| `0.50` | `-0.22x` | `+0.27x` | `+0.62x` | `+1.07x` |
| `0.30` | `-0.32x` | `+0.46x` | `+1.14x` | `+2.14x` |

Negative values and delays under 50 ms are processed immediately. The `rxdelay 0.5` column shows the inverted behaviour: stronger packets can receive a positive calculated delay, while weaker packets calculate negative delay and process immediately.

Example with 1000 ms packet airtime and packet score `0.50`:

| rxdelay | Approx result |
| --- | --- |
| `0` | disabled, immediate |
| `0.5` | inverted curve, immediate |
| `1` | no-op, immediate |
| `2` | about 275 ms delay |
| `4` | about 625 ms delay |
| `8` | about 1070 ms delay |

## txdelay: what it is trying to do

`txdelay` is different from `rxdelay`.

`txdelay` is applied when a repeater is going to retransmit a flood packet. It adds a random transmit delay so that several nearby repeaters do not all retransmit at exactly the same time.

The repeater firmware calculates approximately:

```
base_time_ms = packet_airtime_ms * txdelay
random_delay_ms = random value from 0 to 5 * base_time_ms
```

So:

```
random_delay_ms ~= random(0, 5 * packet_airtime_ms * txdelay)
```

This is a random collision-avoidance window, not a fixed delay.

Higher `txdelay` means:

- less chance of simultaneous retransmits
- more added latency
- a wider spread of forwarding times

Lower `txdelay` means:

- less latency
- more chance that nearby repeaters transmit at the same time

`txdelay 0` disables this random window.

## direct.txdelay

`direct.txdelay` uses the same calculation as `txdelay`, but for direct/routed retransmits instead of flood retransmits.

Direct traffic is usually aimed at a specific next hop, so fewer repeaters should be competing to retransmit it. That is why `direct.txdelay` is usually lower than `txdelay`.

## txdelay examples

Approximate random window for a packet with 1000 ms airtime:

| Setting | Random transmit delay window | Approx average delay |
| --- | --- | --- |
| `txdelay 0` | 0 ms | 0 ms |
| `txdelay 0.2` | 0 to 1000 ms | 500 ms |
| `txdelay 0.3` | 0 to 1500 ms | 750 ms |
| `txdelay 0.5` | 0 to 2500 ms | 1250 ms |
| `txdelay 0.8` | 0 to 4000 ms | 2000 ms |
| `txdelay 1.0` | 0 to 5000 ms | 2500 ms |

The real airtime depends on spreading factor, bandwidth, coding rate, path length, and payload length.

## How rxdelay and txdelay interact

They happen at different points:

```
packet received
  -> rxdelay may delay processing of weak flood packets
  -> repeater decides whether to forward
  -> txdelay may add a random delay before retransmit
  -> packet is transmitted
```

Use `rxdelay` to bias processing order between strong and weak received copies.

Use `txdelay` to spread retransmit timing between repeaters that are going to forward.

A node can use both, but increasing both also increases end-to-end latency.

## Suggested starting points

These are starting points, not hard rules.

| Repeater type | rxdelay | txdelay | direct.txdelay | Notes |
| --- | --- | --- | --- | --- |
| Mountaintop / Core | `2` to `4` | `0.6` to `0.8` | `0.25` to `0.3` | Use only if duplicate weak-path forwarding is observed |
| Coverage / Distribution | `0` to `2` | `0.5` to `0.6` | `0.2` to `0.3` | Conservative values are usually enough |
| Small infill / Edge | `0` | `0.3` to `0.5` | `0.2` | Often the only local copy; avoid delaying receive processing |

Only try `rxdelay 8` after observing a real duplicate-forwarding problem on a high site where stronger alternate paths are available.

## Verification commands

Use the CLI to check the configured values:

```
get rxdelay
get txdelay
get direct.txdelay
```

Useful operational checks:

```
stats-core
stats-radio
```

If changing values for field testing, record before and after behaviour:

- packet delivery reliability
- duplicate forwarding symptoms
- added latency
- CAD busy or transmit delay symptoms
- whether the site is core, distribution, or edge/infill

## Practical cautions

- Do not use `rxdelay` values between `0` and `1`.
- Do not assume a bigger `rxdelay` is better.
- Avoid high `rxdelay` on edge/infill repeaters unless there is a specific reason.
- Increase `txdelay` gradually if many nearby repeaters collide while forwarding the same flood packet.
- Keep direct traffic delay lower unless direct routed traffic is also colliding.
- Field testing matters: terrain, site height, antenna pattern, and local repeater density all change the best values.
