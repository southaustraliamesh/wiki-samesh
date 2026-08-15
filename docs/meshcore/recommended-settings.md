---
title: SA:MUG recommended MeshCore settings
description: South Australian MeshCore radio settings and SA Mesh setup guidance, including frequency, bandwidth, spreading factor and coding rate.
---

{/* migrated */}

:::info Source note
Migrated from the SA:MUG Wiki.js page. Content has been lightly cleaned for Docusaurus and public readability; advanced operational settings should still be field-tested before being treated as hard defaults.
:::

# SA:MUG recommended MeshCore settings

This page collects the current SA:MUG MeshCore starting settings in one place.

Use these as local starting points, not as permanent universal rules. Field testing still matters.

Useful links:

- [Start Here](/meshcore/start-here)
- [Getting started with a companion node](/meshcore/companion-node)
- [Getting started with a repeater](/meshcore/repeater-node)
- [Repeater settings profiles](/meshcore/repeater-settings)
- [Troubleshooting](/meshcore/troubleshooting)

## Radio settings for SA, WA, and QLD

Current South Australian MeshCore radio settings are:

| Setting | Value |
| --- | --- |
| Frequency | `923.125 MHz` |
| Bandwidth | `62.5 kHz` |
| Spreading factor | `8` |
| Coding rate | `4` to `8`, `8` is preferred |

Western Australia and Queensland use the same settings, Queensland uses a slightly different Coding Rate, however that is still compatible as coding rate doesn't affect compatibility with other settings.

All nodes in the same local mesh need compatible radio settings. If one of these is wrong (Frequency, Bandwidth, Spreading Factor) the device may appear to work in the app but hear no local MeshCore traffic.

## Recommended first setup

For most users:

1. Flash companion firmware.
2. Connect with the phone app or web companion.
3. Confirm the local radio settings.
4. Set a recognisable name.
5. Send an advert.
6. Test with a nearby known MeshCore user or repeater.

Do not start with repeater firmware unless the device is being deployed for a known coverage role.

## Companion node defaults

For a normal user/client node:

- Use companion firmware.
- Use BLE companion for phone/tablet use.
- Use USB serial companion for computer/web app use.
- Set a short, recognisable display name.
- Send an advert after setup.
- Test outdoors or near a window before assuming there is a coverage problem.

Examples of good names:

```
VK5ABC
Alice
Alice-VK5ABC
```

Avoid names that look like repeaters unless the device is actually a repeater.

## Repeater role naming

Recommended repeater name format:

```
SA-<Location>-<Role>##
```

Common roles:

| Role | Use for |
| --- | --- |
| `CORE` | high-value wide-area or backbone site |
| `DIST` | distribution, valley fill, coverage shaping, secondary ridge |
| `EDGE` | local infill, house roof, suburb edge, local shadow pocket |
| `RPT` | generic repeater when the role is not clear |

Examples:

```
SA-MtBonython-CORE01
SA-Lobethal-DIST01
SA-Blackwood-EDGE01
SA-Example-RPT01
```

## Repeater settings

Use the detailed profile page for copy-paste command blocks:

[Repeater settings profiles](/meshcore/repeater-settings)

Short guidance:

| Site type | Starting profile |
| --- | --- |
| high, wide-area, backbone-style | Core |
| valley-facing or coverage-shaping | Distribution |
| house roof, low site, local fill | Edge / infill |
| unknown | conservative generic settings |

Repeaters should be deployed for a real coverage need. A poor repeater can add duplicate traffic or noise without improving coverage.

## nRF52 repeater bootloader recommendation

For nRF52-based repeaters, flash the Oltaco DFU Bootloader before any format/erase step, then format/erase if needed, then flash MeshCore repeater firmware:

[https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX](https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX)

This is useful future-proofing for over-the-air updates, especially before installing a repeater somewhere hard to access.

## rxdelay and txdelay recommendations

Use the profile page first. Do not tune delay settings blindly.

Important `rxdelay` warning:

- `rxdelay 0` disables rxdelay.
- `rxdelay 1` is a no-op.
- `rxdelay > 1` gives the intended weak-packet delay behaviour.
- `0 < rxdelay < 1` inverts behaviour and should be avoided.

For technical details, see [rxdelay and txdelay calculations](/meshcore/rxdelay-txdelay).

## Interference threshold caution

On noisy or high sites, be careful with `int.thresh`.

`stats-radio` can show values such as:

- `noise_floor`
- `last_rssi`
- `last_snr`

If `int.thresh` is non-zero, the radio may treat the channel as active when current RSSI rises above the measured noise floor by that threshold. If set too low, the repeater may keep seeing the channel as busy.

## What to record

For any field recommendation, record:

- device model
- firmware type and version if known
- antenna and feedline
- power source
- radio settings
- repeater profile if relevant
- location/coverage aim
- test result
- what changed

Recommendations should come from observed behaviour, not just guesses.

## Where to go next

- [Getting started with a companion node](/meshcore/companion-node)
- [Getting started with a repeater](/meshcore/repeater-node)
- [Repeater deployment checklist](/meshcore/repeater-deployment-checklist)
- [Troubleshooting](/meshcore/troubleshooting)
