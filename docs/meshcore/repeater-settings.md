---
title: MeshCore repeater settings profiles
---

{/* migrated */}

:::info Source note
Migrated from the SA:MUG Wiki.js page. Content has been lightly cleaned for Docusaurus and public readability; advanced operational settings should still be field-tested before being treated as hard defaults.
:::

# MeshCore repeater settings profiles

This page provides recommended MeshCore repeater settings for South Australian community deployments using MeshCore repeater firmware v1.16.0 or newer.

The aim is to keep the network useful and discoverable while reducing unnecessary flood advert traffic. These profiles are starting points. Adjust them for real site behaviour, terrain, RF congestion, and operator experience.

Source note: these settings were checked against MeshCore `origin/main` at `e8d3c53b` and tag `repeater-v1.16.0`.

## Local SA, WA, and QLD radio settings

Current South Australian MeshCore radio settings are:

| Setting | Value |
| --- | --- |
| Frequency | `923.125 MHz` |
| Bandwidth | `62.5 kHz` |
| Spreading factor | `8` |
| Coding rate | `4` to `8`, `8` is preferred |

Western Australia and Queensland use the same settings, Queensland uses a slightly different Coding Rate, however that is still compatible as coding rate doesn't affect compatibility with other settings.

## Quick profile selection

| Profile | Use for | Advert style | Typical role |
| --- | --- | --- | --- |
| Mountaintop / Core | High sites, major backbone, wide-area coverage | Flood advert, no zero-hop timer | `CORE` |
| Coverage / Distribution | Valley-facing, shadow fill, reflector, secondary ridge | Slow flood advert, optional zero-hop | `DIST` |
| Small infill / Edge | House roof, low height, local coverage hole | Prefer zero-hop, avoid flood adverts | `EDGE` |
| Generic repeater | Does not clearly fit the above roles | Choose closest safe profile | `RPT` |

## Naming convention

Recommended repeater name format:

```
SA-<Location>-<Role>##
```

Examples:

```
SA-MtBonython-CORE01
SA-Lobethal-DIST01
SA-Blackwood-EDGE01
SA-Example-RPT01
```

Rules:

- `SA` is the state or region prefix for South Australia.
- `<Location>` should be short, stable, human-recognisable, and preferably match the site or area name used on maps and Wiki.js pages.
- `<Role>` should describe the repeater's intended network role: `CORE`: mountaintop, backbone, or high-value wide-area repeater. `DIST`: distribution or coverage-shaping repeater, such as valley-facing, shadow fill, reflector, or secondary ridge sites. `EDGE`: small infill or local edge repeater, such as house roof, low-height, or local hole-fill sites. `RPT`: generic fallback when `CORE`, `DIST`, or `EDGE` does not clearly apply.
- `##` is a two-digit sequence number per location and role, starting at `01`.
- Keep names ASCII, with no spaces. Use hyphens only as separators.

## Important command notes

| Command | Meaning | Recommended use |
| --- | --- | --- |
| `set repeat on` | Enables repeater forwarding | Should be on for all repeater profiles |
| `set advert.interval <minutes>` | Zero-hop/local advert interval | Use for local discovery, especially edge sites |
| `set flood.advert.interval <hours>` | Flood advert interval | Use sparingly; recommended minimum is 47 hours |
| `set flood.max <n>` | Maximum flood forwarding hop count | Higher for deliberate backbone paths |
| `set flood.max.unscoped <n>` | Maximum hop count for unscoped flood packets | Use to limit noisy non-region traffic |
| `set flood.max.advert <n>` | Maximum hop count for advert flood packets | Key setting for reducing advert noise |
| `set path.hash.mode <0-2>` | Path hash size used by this repeater's own adverts | `1` means 2-byte path hashes |
| `set loop.detect <mode>` | Drops flood packets that appear to be looping | Use `minimal` or `moderate` by default |
| `set txdelay <value>` | Random retransmit delay for flood traffic | Increase where many repeaters hear the same packet |
| `set direct.txdelay <value>` | Random retransmit delay for direct traffic | Usually lower than `txdelay` |
| `set rxdelay <value>` | Experimental weak-signal receive processing delay | Use carefully; see rxdelay section below |
| `set multi.acks <0/1>` | Extra ACK transmissions | Keep off by default |

Firmware limits and defaults:

- `set flood.advert.interval <hours>` accepts `0` to disable, or `3` to `168`. The v1.16.0 repeater source default is `47` hours.
- `set advert.interval <minutes>` accepts `0` to disable, or `60` to `240`, rounded down to an even number of minutes.
- `set flood.max.advert <n>` accepts `0` to `64`. The v1.16.0 default is `8`.
- `set path.hash.mode 1` means this repeater's own adverts use 2-byte path hashes. It does not stop the repeater forwarding other path hash sizes.
- `set rxdelay` accepts `0` to `20`. The v1.16.0 default is `0`, disabled.
- `set multi.acks` accepts `0` or `1`. The v1.16.0 default is `0`.

## Profile 1: Mountaintop / Core repeater

Use this for high-value wide-area repeaters, such as mountaintop, summit, ridge, or major backbone sites.

Typical conditions:

- High site or long RF line-of-sight.
- One of a small number of deliberate core repeaters.
- Power budget is healthy enough for regular forwarding.
- Most nearby repeaters are on MeshCore v1.14 or newer, preferably v1.16 or newer.

Design rules:

- Flood adverts are enabled, but kept slow.
- Zero-hop advert timer is disabled. Send manual zero-hop adverts only during install or testing.
- Use 2-byte path hashes for this repeater's own adverts.
- Use minimal loop detection on backbone sites unless there is a proven storm problem.
- Keep advert flood forwarding at the default `8` hops unless the mesh is very sparse.
- Limit unscoped traffic once regions or scopes are in use.

Recommended commands:

```
set repeat on
set advert.interval 0
set flood.advert.interval 47
set flood.max 64
set flood.max.unscoped 16
set flood.max.advert 8
set path.hash.mode 1
set loop.detect minimal
set txdelay 0.8
set direct.txdelay 0.3
set rxdelay 4
set multi.acks 0
```

Conservative rural variant, for sparse areas with few competing repeaters:

```
set flood.advert.interval 47
set flood.max.unscoped 32
set flood.max.advert 10
set txdelay 0.6
set rxdelay 2
```

## Profile 2: Coverage / Distribution repeater

Use this for deliberate coverage-shaping repeaters. Examples include valley-facing sites, shadow-fill sites, RF reflection points, or secondary ridges.

Typical conditions:

- Fills a known coverage hole.
- Looks into a valley or shadowed area.
- Can hear at least one core repeater reliably.
- Should not become the main long-haul backbone path unless planned.

Design rules:

- Flood adverts are enabled, but slower than core sites.
- Zero-hop adverts are usually off if flood adverts are enabled.
- Enable zero-hop adverts only where local discovery is useful.
- Use 2-byte path hashes if the local network is modern enough.
- Use moderate loop detection.
- Keep advert flood forwarding lower than core sites.

Recommended commands:

```
set repeat on
set advert.interval 0
set flood.advert.interval 96
set flood.max 48
set flood.max.unscoped 12
set flood.max.advert 5
set path.hash.mode 1
set loop.detect moderate
set txdelay 0.6
set direct.txdelay 0.25
set rxdelay 2
set multi.acks 0
```

If direct local discovery is important, add zero-hop adverts and push flood adverts longer:

```
set advert.interval 180
set flood.advert.interval 120
```

## Profile 3: Small infill / Edge repeater

Use this for local access repeaters, such as house roofs, low-height poles, sheds, suburb edge nodes, valley-floor nodes, or single shadow-pocket fills.

Typical conditions:

- Low height or local-only coverage.
- Mostly serves a household, street, suburb edge, small valley, or local coverage hole.
- Can hear a distribution or core repeater, but should not amplify adverts across the region.

Design rules:

- Prefer zero-hop adverts for local discovery.
- Avoid automatic flood adverts where possible.
- Keep advert forwarding shallow.
- Keep unscoped flood forwarding shallow, unless this repeater is the only path out of a pocket.
- Keep `rxdelay` at `0` unless there is a clear reason to delay weak packets.
- Keep multi-acks off by default.

Recommended commands:

```
set repeat on
set advert.interval 240
set flood.advert.interval 0
set flood.max 24
set flood.max.unscoped 8
set flood.max.advert 1
set path.hash.mode 1
set loop.detect moderate
set txdelay 0.4
set direct.txdelay 0.2
set rxdelay 0
set multi.acks 0
```

If the edge site is the only gateway out of a valley or pocket, use this less restrictive variant:

```
set flood.advert.interval 168
set flood.max 32
set flood.max.unscoped 8
set flood.max.advert 3
set rxdelay 2
```

## General decision rules

### Flood advert interval

Recommended values:

| Repeater type | Recommended flood advert interval |
| --- | --- |
| Core | `47` to `72` hours |
| Distribution | `72` to `120` hours |
| Edge | `0` disabled, or `168` hours if needed |

Do not set normal repeaters below `47` hours, even though firmware allows lower values.

### Zero-hop adverts

- Core: off (`set advert.interval 0`). Use manual `advert.zerohop` during site work only.
- Distribution: off by default. Use `120` to `240` minutes only where local discovery is useful.
- Edge: prefer zero-hop adverts over flood adverts. Use `120` to `240` minutes.

### Advert flood forwarding

`flood.max.advert` is one of the most important settings for reducing unnecessary advert traffic.

Recommended values:

| Repeater type | Recommended `flood.max.advert` |
| --- | --- |
| Core | `8` |
| Core, sparse rural mesh | `10` to `12` |
| Distribution | `4` to `6` |
| Edge | `1` to `2` |

A value of `0` stops the repeater forwarding flood adverts it receives. Reserve that for special cases where a site should not carry adverts at all.

### Overall flood max and unscoped flood max

- Use `flood.max` for the overall flood forwarding limit.
- Use `flood.max.unscoped` to control noisy unscoped traffic once regions or scopes are deployed.
- Suggested `flood.max.unscoped` values: Core: `16` Distribution: `12` Edge: `4`

### Path hash mode

Recommended default for v1.16 networks:

```
set path.hash.mode 1
```

This makes the repeater's own adverts use 2-byte path hashes.

Path hash options:

| Value | Hash size | Notes |
| --- | --- | --- |
| `0` | 1 byte | Best compatibility with older repeaters |
| `1` | 2 bytes | Recommended default for modern networks |
| `2` | 3 bytes | Use only for specific scale or collision issues |

Use `0` temporarily if old pre-v1.14 repeaters are still common. Avoid `2` unless there is a specific need, because larger hashes reduce the available maximum flood depth.

### Loop detection

Recommended values:

| Repeater type | Recommended loop detection |
| --- | --- |
| Core | `minimal` |
| Distribution | `moderate` |
| Edge | `moderate` |

`strict` should be used only as a targeted fix for a known loop or packet storm problem.

### rxdelay and txdelay

`txdelay` and `rxdelay` solve different timing problems.

- `txdelay` is a random retransmit window for flood traffic. It helps avoid several nearby repeaters retransmitting the same flood packet at the same time.
- `rxdelay` delays processing of weak received flood packets so better copies can be handled first. Weak copies may then be recognised as duplicates and suppressed before they consume airtime.
- `direct.txdelay` is similar to `txdelay`, but for direct/routed retransmits, and is usually kept lower.

Important `rxdelay` warning:

- Use `rxdelay 0` to disable it.
- Use values greater than `1` for the intended weak-packet delay behaviour, where `1` is no-change to timings, `1.1` add's delay.

Avoid values between `0` and `1`, because they invert the curve and can make weak packets process before strong packets.

Recommended starting values:

| Repeater type | `rxdelay` | `txdelay` | `direct.txdelay` |
| --- | --- | --- | --- |
| Core | `2` to `4` | `0.6` to `0.8` | `0.25` to `0.3` |
| Distribution | `1` to `2` | `0.5` to `0.6` | `0.2` to `0.3` |
| Edge / infill | `0` | `0.3` to `0.5` | `0.2` |

Edge and local infill repeaters should usually keep `rxdelay` at `0`, because they may be the only local copy of a packet. Only try `rxdelay 8` after observing duplicate weak-path forwarding on a high site.

For the detailed formulas, packet-score explanation, and delay examples, see [MeshCore rxdelay and txdelay calculations](/meshcore/rxdelay-txdelay).

### Debug flags / core error flags

`stats-core` reports an `errors` value. This is a bitmask, so values can be added together. For example, `errors:3` means flags `1` and `2` are both set.

These flags are sticky until stats are cleared or the device is rebooted. If a flag appears once, then the repeater later recovers, the flag can still remain visible in `stats-core`.

| Decimal | Hex | Source flag | Meaning |
| --- | --- | --- | --- |
| `1` | `0x01` | `ERR_EVENT_FULL` | Packet/event pool was full. The repeater could not allocate a packet/event slot at least once. |
| `2` | `0x02` | `ERR_EVENT_CAD_TIMEOUT` | Channel activity detection stayed busy too long while a packet was queued to transmit. MeshCore forced the pending transmit. |
| `4` | `0x04` | `ERR_EVENT_STARTRX_TIMEOUT` | The radio was not back in receive mode for more than about 8 seconds. |

Suggested checks:

```
clear stats
stats-core
stats-radio
stats-packets
```

Then watch whether the same flag returns during normal traffic.

#### Flag 1 / packet-event pool full

Flag `1` means the internal packet/event pool was full at least once. This can happen during bursts, loops, excessive flooding, or if the node is overloaded.

If it appears repeatedly:

- check for packet storms or looping traffic
- check whether flood adverts are too frequent
- check `stats-packets` for unusually high duplicate or receive counts
- consider whether the repeater is hearing too much overlapping traffic for its role

#### Flag 2 / CAD busy timeout

Flag `2` is not a `txdelay` error by itself. It means the repeater had a packet queued to transmit, but the radio/channel appeared busy for more than about 4 seconds, so MeshCore forced the pending transmit.

Relevant behaviour:

- `txdelay` controls how long a repeater waits before attempting to retransmit a flood packet.
- `txdelay 0.8` gives a random retransmit window of about `0` to `4x` the packet airtime.
- When the delay expires, MeshCore checks whether the radio is currently receiving or the channel is active.
- If the channel remains busy for more than about 4 seconds, error flag `2` is set.

This can happen on high or busy sites that hear lots of overlapping traffic. It can also happen if an interference threshold is enabled and the RSSI stays above the configured threshold.

Extra checks for flag `2`:

```
get txdelay
get int.thresh
stats-core
stats-radio
stats-packets
```

Suggested tuning approach for high/busy sites:

1. Start with the profile value, such as `set txdelay 0.8` for core sites.
2. If flag `2` appears repeatedly during normal traffic, try `set txdelay 1.0`.
3. If it still appears, try `set txdelay 1.2`.
4. Avoid jumping straight to `2.0` unless the site is extremely congested, because higher values add real forwarding latency.

Treat this as a field-tuning item rather than a hard preset. A high site such as Mt Lofty should be tested under real traffic before setting final core defaults.

#### Flag 4 / radio not back in receive mode

Flag `4` means MeshCore detected that the radio was not back in receive mode for more than about 8 seconds.

This does not necessarily mean the repeater is currently broken. If the repeater is still receiving and forwarding traffic, it may have recovered after a one-off radio/RX state hiccup.

If it returns soon after `clear stats` or the repeater stops receiving:

- power-cycle the repeater
- check firmware version
- check power supply stability
- check antenna/coax installation
- look for very strong nearby RF, interference, or a stuck-transmitting node

### multi.acks

Keep multi-acks disabled by default:

```
set multi.acks 0
```

Consider enabling it only in a small, quiet, known-problem area where duplicated ACKs improve reliability enough to justify the extra airtime.

### Transmit power

MeshCore exposes transmit power with:

```
get tx
set tx <dbm>
```

The CLI documentation describes `<dbm>` as transmit power in dBm. Usable values depend on the board, radio module, antenna, region, and legal EIRP limits.

House roof and other low-height edge nodes often have less natural coverage than high sites. They may need enough transmit power to be heard by nearby users and at least one upstream repeater. However, do not blindly set every low node to maximum power.

Practical rules:

- Obey local legal limits, including antenna gain and feedline loss. Think in EIRP, not just radio output power.
- Higher transmit power does not improve receive performance. A node that can be heard but cannot hear replies creates an unbalanced link.
- For edge and house roof nodes, prefer better antenna placement and a clear upstream path before increasing power.
- Use enough power for reliable local service, but avoid making a low-value infill node dominate a larger area than intended.
- Core sites may not need maximum power if height and antenna gain already provide strong coverage.
- After changing power, check real behaviour with neighbours, packet stats, and field reports.

Suggested starting points, subject to local rules and hardware:

| Site type | TX power approach |
| --- | --- |
| Core / high site | Use only as much power as needed for reliable wide-area links. Avoid unnecessary excess EIRP. |
| Distribution | Moderate power, enough to reach its intended valley/shadow area and upstream core. |
| Edge / house roof | Moderate to higher power may be justified, but only if receive path and legal EIRP are also acceptable. |

This section needs field validation before turning into hard numeric presets.

## Apply and verify

After applying a profile, check the active settings:

```
get repeat
get advert.interval
get flood.advert.interval
get flood.max
get flood.max.unscoped
get flood.max.advert
get path.hash.mode
get loop.detect
get tx
get txdelay
get direct.txdelay
get rxdelay
get multi.acks
```

Useful commands during site work:

```
advert.zerohop
advert
neighbors
stats-packets
stats-radio
```

If a command response says a reboot is required, reboot before assuming the setting is active. The settings listed on this page are persisted by the MeshCore CLI when set.

## Suggested rollout approach

1. Start with the profile that best matches the site role.
2. Confirm the repeater can hear expected neighbours.
3. Confirm the repeater appears in discovery as expected.
4. Watch packet and radio stats during normal traffic.
5. Reduce advert flooding first on edge sites, then distribution sites.
6. Tune `rxdelay` only after there is evidence of duplicate weak-path forwarding.
