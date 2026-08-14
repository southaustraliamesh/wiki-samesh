---
title: Getting started with a MeshCore repeater
---

{/* migrated */}

:::info Source note
Migrated from the SA:MUG Wiki.js page. Content has been lightly cleaned for Docusaurus and public readability; advanced operational settings should still be field-tested before being treated as hard defaults.
:::

# Getting started with a MeshCore repeater

This page is for setting up a MeshCore repeater: a fixed LoRa node that helps forward MeshCore traffic and improve coverage.

A repeater should be deployed to solve a real coverage problem. If this is your first MeshCore device, start with a companion node first: [Getting started with a MeshCore companion node](/meshcore/companion-node).

Useful links:

- MeshCore firmware flasher: [https://flasher.meshcore.io](https://flasher.meshcore.io)
- MeshCore docs: [https://docs.meshcore.io](https://docs.meshcore.io)
- MeshCore source: [https://github.com/meshcore-dev/MeshCore](https://github.com/meshcore-dev/MeshCore)
- SA:MUG start page: [Start Here](/meshcore/start-here)
- Repeater settings profiles: [Repeater settings profiles](/meshcore/repeater-settings)
- Delay details: [rxdelay and txdelay calculations](/meshcore/rxdelay-txdelay)

## What is a repeater?

A MeshCore repeater forwards MeshCore packets to help traffic reach nodes that cannot hear each other directly.

It is not a normal user node, and it is not just a companion node left on a hill. It runs repeater firmware and should be configured for the role it plays in the network.

A repeater can improve a mesh when it is well placed and well configured. A poor repeater can make the mesh noisier without improving useful coverage.

## Should I deploy one?

Deploy a repeater when most of these are true:

- There is a known coverage gap or useful coverage goal.
- The site is higher, clearer, or better located than normal user nodes.
- The antenna and feedline are suitable for the band.
- The device has reliable power.
- The operator can update firmware and change settings later.
- Someone can test before and after performance.
- The repeater will not just duplicate coverage from an existing nearby repeater.

If you are unsure, ask in the local group first. In many cases, a companion node or a better antenna position is a better first step.

## Repeater roles

Use the role that best describes the site:

| Role | Use for | Typical name part |
| --- | --- | --- |
| Core | High, wide-area, backbone-style sites | `CORE` |
| Distribution | Coverage shaping, valley fill, secondary ridge, reflector-style sites | `DIST` |
| Edge / infill | House roof, small local fill, suburb edge, local shadow pocket | `EDGE` |
| Generic repeater | When the role is not clear yet | `RPT` |

For detailed settings profiles, see [Repeater settings profiles](/meshcore/repeater-settings).

## Local SA, WA, and QLD radio settings

Current South Australian MeshCore radio settings are:

| Setting | Value |
| --- | --- |
| Frequency | `923.125 MHz` |
| Bandwidth | `62.5 kHz` |
| Spreading factor | `8` |
| Coding rate | `8` |

Western Australia and Queensland use the same settings.

## Legal and RF cautions

Before putting a repeater on air, consider:

- local regulations for your band and location
- legal EIRP limits
- transmitter power
- antenna gain
- feedline loss
- duty cycle and airtime impact
- safe, weatherproof installation
- whether the site may overload or desense nearby receivers

EIRP depends on transmitter power, feedline loss, and antenna gain. Do not assume that a higher gain antenna is always legal or helpful.

## Hardware checklist

Before flashing or installing:

- supported LoRa device
- correct regional frequency band hardware
- suitable antenna for the band
- good coax/feedline if the antenna is remote from the radio
- weatherproof enclosure for outdoor installs
- reliable power source
- data-capable USB cable for flashing/configuration
- mounting plan that keeps water out and cables strain-relieved

For first testing, keep the setup simple and accessible. Do not install it somewhere difficult to reach until firmware, settings, and RF behaviour have been checked.

## nRF52 bootloader recommendation

For repeaters using nRF52-based devices, it is a good idea to flash the Oltaco DFU Bootloader before final deployment:

[https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX](https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX)

This is useful future-proofing for over-the-air firmware updates. A repeater may be easy to reach while it is on the bench, but much harder to access once it is installed on a roof, mast, hill, or remote site.

Recommended order:

1. Confirm the device is nRF52-based.
2. Flash the Oltaco DFU Bootloader while the device is still on the bench.
3. Format/erase the device if that is part of your normal clean-flash process.
4. Flash the MeshCore repeater firmware.
5. Confirm the bootloader and normal MeshCore repeater firmware both work.
6. Only then continue with repeater configuration and site installation.

Do this before formatting/flashing the repeater firmware and before installing the repeater somewhere difficult to access.

## Basic setup flow

1. Confirm the site role: core, distribution, edge/infill, or generic.
2. Confirm the device and antenna are suitable.
3. For nRF52-based devices, flash the Oltaco DFU Bootloader before any format/erase step.
4. Format/erase the device if required for a clean flash.
5. Flash MeshCore repeater firmware using [https://flasher.meshcore.io](https://flasher.meshcore.io).
6. Connect by USB serial or the configuration tool.
7. Set the local radio settings.
8. Set a clear repeater name.
9. Apply the closest repeater settings profile.
10. Reboot and verify settings.
11. Test locally before installing permanently.
12. Install at the site.
13. Perform an on-air test with known users or repeaters.
14. Record what was changed and what behaviour was observed.

## Suggested naming

Recommended SA:MUG-style repeater name format:

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

Keep names short, stable, ASCII, and easy to recognise.

## Minimal initial commands

The detailed profile page has full copy-paste blocks. For a first setup, the important idea is:

1. enable repeater forwarding
2. set the local radio settings
3. set a sensible name
4. apply the closest profile
5. verify with `get` commands

Use the full command block from [Repeater settings profiles](/meshcore/repeater-settings), not a half-remembered snippet.

At minimum, verify these afterwards:

```
get freq
get bw
get sf
get cr
get repeat
get advert.interval
get flood.advert.interval
get flood.max
get flood.max.unscoped
get flood.max.advert
get path.hash.mode
get loop.detect
get txdelay
get direct.txdelay
get rxdelay
get multi.acks
```

## Choosing a starting profile

| Site type | Suggested starting profile |
| --- | --- |
| High wide-area site | Core |
| Valley-facing or coverage-shaping site | Distribution |
| House roof or local fill | Edge / infill |
| Unsure | Generic or conservative distribution/edge settings |

Start conservative. It is easier to increase forwarding later than to debug a noisy repeater that was too aggressive from day one.

## rxdelay and txdelay warning

Do not tune `rxdelay`, `txdelay`, or `direct.txdelay` blindly.

Short version:

- `txdelay` spreads retransmit timing to reduce collisions.
- `direct.txdelay` does the same for direct/routed retransmits and is usually lower.
- `rxdelay` delays weak received flood packets so stronger copies can be processed first.
- Use `rxdelay 0` to disable it.
- Use `rxdelay` values greater than `1` for the intended behaviour.
- Avoid `rxdelay` values between `0` and `1`; they invert the behaviour.

For the detailed explanation, see [rxdelay and txdelay calculations](/meshcore/rxdelay-txdelay).

## Interference and noisy sites

If a site is noisy or high enough to hear a lot of RF activity, be careful with interference threshold settings.

`stats-radio` can report values such as:

- `noise_floor`
- `last_rssi`
- `last_snr`

If `int.thresh` is non-zero, the radio treats the channel as active/interfered when current RSSI is greater than the measured noise floor plus `int.thresh`.

For example, `int.thresh 10` means the channel may be treated as active if current RSSI is more than about 10 dB above the measured noise floor.

Do not set `int.thresh` too low on a noisy/high site. The repeater may keep seeing the channel as active and delay or fail transmissions.

## Before installing permanently

Bench test first:

- device boots reliably
- nRF52-based repeaters have the Oltaco DFU Bootloader flashed if OTA future-proofing is desired
- repeater firmware is correct
- serial/config access works
- name is correct
- radio settings are correct
- profile commands were applied
- settings read back correctly
- antenna is attached before transmitting

Then short-range RF test:

- companion node can hear the repeater or its advert
- another known MeshCore node can interact through it if possible
- signal reports look plausible
- device does not reset under load
- power supply remains stable

## After installation

After the repeater is installed:

1. Confirm it still boots and stays powered.
2. Confirm it can be heard from expected locations.
3. Confirm it is not flooding adverts too aggressively.
4. Check whether it improves the intended coverage gap.
5. Watch for unexpected duplicate traffic or loops.
6. Record observed coverage and any changes made.

Useful checks:

```
stats-core
stats-radio
```

If available, compare before/after reports from nearby users rather than relying on a single test packet.

## What not to do first

Avoid these early mistakes:

- Do not deploy a repeater just because spare hardware exists.
- Do not install it somewhere hard to reach before testing.
- Do not copy a core/mountaintop profile onto a house-roof edge node.
- Do not use `rxdelay` values between `0` and `1`.
- Do not set interference threshold values without watching site behaviour.
- Do not skip bootloader/OTA planning for nRF52 repeaters that may become hard to access.
- Do not change many settings at once.
- Do not ignore legal EIRP, antenna gain, or feedline loss.
- Do not assume a high site is always better for the mesh.

## What to record

For each repeater, record:

- device model
- firmware version if known
- site name and approximate role
- antenna type and gain
- feedline type/loss if known
- transmit power setting
- radio settings
- repeater profile used
- any changes from the standard profile
- power source
- installation height and general coverage aim
- test results and known issues

This makes future tuning and troubleshooting much easier.

## Where to go next

- Repeater profiles and command blocks: [Repeater settings profiles](/meshcore/repeater-settings)
- Timing details: [rxdelay and txdelay calculations](/meshcore/rxdelay-txdelay)
- General questions: [FAQ](/meshcore/glossary)
- New user landing page: [Start Here](/meshcore/start-here)

If the repeater is working and field-tested, share what role it serves and what coverage changed so the community can tune the wider mesh around real behaviour.
