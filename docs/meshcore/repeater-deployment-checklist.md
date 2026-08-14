---
title: MeshCore repeater deployment checklist
---

{/* migrated */}

:::info Source note
Migrated from the SA:MUG Wiki.js page. Content has been lightly cleaned for Docusaurus and public readability; advanced operational settings should still be field-tested before being treated as hard defaults.
:::

# MeshCore repeater deployment checklist

This checklist is for preparing, installing, and validating a MeshCore repeater for SA:MUG-style community use.

Use it with:

- [Getting started with a MeshCore repeater](/meshcore/repeater-node)
- [Repeater settings profiles](/meshcore/repeater-settings)
- [SA:MUG recommended settings](/meshcore/recommended-settings)
- [Troubleshooting](/meshcore/troubleshooting)

## 1. Confirm the purpose

Before building anything, confirm the repeater has a job.

- Coverage gap or coverage goal is known.
- Site role is chosen: `CORE`, `DIST`, `EDGE`, or `RPT`.
- Site is likely to improve useful coverage, not just duplicate existing repeaters.
- Operator can access, update, and maintain the device later.
- There is a plan for before/after testing.

If the purpose is unclear, do not deploy yet. Test with a companion node first.

## 2. Bench hardware checklist

- Supported LoRa device.
- Correct regional band hardware.
- Suitable antenna for the band.
- Coax/feedline and connectors checked if using an external antenna.
- Reliable power source.
- Weatherproof enclosure if outdoors.
- Data-capable USB cable.
- Mounting hardware, cable strain relief, and water ingress plan.

Do not transmit without a suitable antenna connected.

## 3. nRF52 bootloader order

For nRF52-based repeaters, flash the Oltaco DFU Bootloader before formatting or flashing MeshCore repeater firmware:

[https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX](https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX)

Recommended order:

1. Confirm the device is nRF52-based.
2. Flash the Oltaco DFU Bootloader.
3. Format/erase the device if needed.
4. Flash MeshCore repeater firmware.
5. Confirm the device boots and can still be configured.
6. Run `get bootloader.ver` and record the reported bootloader version if the command is supported.

This is future-proofing for over-the-air updates. Do it while the device is still easy to reach.

## 4. Flash and configure firmware

- Flash MeshCore repeater firmware.
- Reboot the device.
- Connect over serial/config tool.
- Confirm the firmware is repeater firmware, not companion firmware.
- Confirm settings can be read back.

## 5. Local radio settings

For South Australia, Western Australia, and Queensland:

| Setting | Value |
| --- | --- |
| Frequency | `923.125 MHz` |
| Bandwidth | `62.5 kHz` |
| Spreading factor | `8` |
| Coding rate | `8` |

Verify with:

```
get freq
get bw
get sf
get cr
```

## 6. Naming and identity

Use the local naming style:

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

- Name is short and stable.
- Role matches the intended site function.
- Sequence number is not already in use.
- Name uses ASCII and no spaces.

## 7. Apply starting profile

Choose the closest profile from [Repeater settings profiles](/meshcore/repeater-settings):

| Site type | Starting profile |
| --- | --- |
| High wide-area site | Core |
| Valley-facing or coverage-shaping site | Distribution |
| House roof or small local fill | Edge / infill |
| Unsure | Generic or conservative edge/distribution settings |

Start conservative. Increase forwarding only after testing.

## 8. Verify important settings

Read back at least:

```
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

Important warning:

- `rxdelay 0` disables rxdelay.
- `rxdelay 1` is a no-op.
- `rxdelay > 1` gives the intended weak-packet delay behaviour.
- `0 < rxdelay < 1` inverts behaviour and should be avoided.

## 9. RF and legal check

Before installing:

- Transmit power is appropriate.
- Antenna gain is known or estimated.
- Feedline loss is known or estimated.
- EIRP is legal for the site and band.
- Antenna is mounted safely.
- Site does not obviously overload or desense nearby equipment.

A higher gain antenna is not automatically better. It changes coverage shape and EIRP.

## 10. Bench test

- Device boots repeatedly.
- Power supply remains stable.
- Repeater firmware is correct.
- Settings read back correctly after reboot.
- Antenna is connected before transmit tests.
- A nearby companion node can hear the repeater or its adverts.
- `stats-core` and `stats-radio` work.
- `get bootloader.ver` has been checked and recorded for nRF52 repeaters where supported.

Useful commands:

```
stats-core
stats-radio
```

## 11. Site installation

- Device is mounted securely.
- Enclosure is weatherproofed.
- Cables have strain relief and drip loops.
- Antenna is vertical unless deliberately installed otherwise.
- Power is stable at the site.
- Device can be accessed for maintenance or OTA update path is planned.

## 12. Post-install testing

After installation:

- Confirm the repeater boots and stays powered.
- Confirm it can be heard from expected locations.
- Ask known users to send/receive test messages.
- Check whether it improves the intended coverage gap.
- Watch for excessive duplicate traffic or loops.
- Record signal reports and problem locations.

Do not judge success from one packet. Compare several positions and reports.

## 13. Record keeping

Record:

- device model
- firmware version if known
- bootloader used if nRF52
- site name and role
- approximate location/coverage aim
- antenna type and gain
- feedline type/loss if known
- transmit power setting
- radio settings
- repeater profile used
- changes from the standard profile
- power source
- test results
- known issues

Good records make future tuning much easier.

## 14. Change control

When changing settings later:

1. Change one thing at a time.
2. Record the old value and new value.
3. Reboot if needed.
4. Test with known users.
5. Wait long enough to observe behaviour.
6. Revert if the change makes coverage or traffic worse.

## Where to go next

- [Getting started with a MeshCore repeater](/meshcore/repeater-node)
- [Repeater settings profiles](/meshcore/repeater-settings)
- [Troubleshooting](/meshcore/troubleshooting)
- [How MeshCore routing works](/meshcore/routing)
