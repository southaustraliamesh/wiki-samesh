---
title: MeshCore troubleshooting
---

{/* migrated */}

:::info Source note
Migrated from the SA:MUG Wiki.js page. Content has been lightly cleaned for Docusaurus and public readability; advanced operational settings should still be field-tested before being treated as hard defaults.
:::

# MeshCore troubleshooting

This page gives first-line troubleshooting checks for SA:MUG MeshCore users and repeater operators.

Start with simple physical and settings checks before changing advanced options.

Useful links:

- [Start Here](/meshcore/start-here)
- [FAQ](/meshcore/glossary)
- [Getting started with a companion node](/meshcore/companion-node)
- [Getting started with a repeater](/meshcore/repeater-node)
- [Glossary](/meshcore/glossary)

## Quick first checks

1. Confirm the device is running MeshCore, not Meshtastic.
2. Confirm the firmware role is correct: companion, repeater, room server, or standalone.
3. Confirm the local radio settings.
4. Check the antenna is connected and suitable for the band.
5. Test outdoors or near a window.
6. Reboot the radio and app.
7. Send an advert or ask a nearby user to send one.
8. Record what changed before asking for help.

## Local radio settings

For South Australia, Western Australia, and Queensland:

| Setting | Value |
| --- | --- |
| Frequency | `923.125 MHz` |
| Bandwidth | `62.5 kHz` |
| Spreading factor | `8` |
| Coding rate | `8` |

If these do not match the local mesh, the app may still connect to the device but the radio may hear nothing useful.

## The app connects, but I cannot hear anyone

Likely causes:

- wrong radio settings
- wrong firmware role
- no MeshCore nodes in range
- antenna missing, damaged, or wrong band
- indoor testing location
- noisy USB power or nearby electronics
- no recent adverts or stale contacts

Try:

1. Move outdoors or near a window.
2. Check antenna and connector.
3. Confirm frequency, bandwidth, spreading factor, and coding rate.
4. Ask a nearby known-good node to send an advert.
5. Test with another known-good device if available.

## I can hear others, but they cannot hear me

Likely causes:

- poor antenna or feedline
- low transmit power or board-specific RF issue
- poor location or obstruction
- you can hear a repeater but cannot reach it
- wrong regional settings
- power supply sag while transmitting

Try a short-range line-of-sight test with another node before changing advanced settings.

## Others can hear me, but I cannot hear them

Likely causes:

- local receive noise near your device
- poor antenna receive performance
- nearby electronics desensing the receiver
- you are lower or more obstructed than the other station
- stale route/contact information

Try moving the device away from chargers, computers, solar controllers, and other RF-noisy equipment.

## Bluetooth or BLE companion does not appear

Check:

- firmware is BLE companion, not USB serial companion or repeater
- Bluetooth is enabled on the phone/tablet
- another phone is not already connected
- old pairings are forgotten if needed
- device is close during setup
- device is powered reliably

If still stuck, reboot both the radio and phone before reflashing.

## Web flasher or serial access fails

Check:

- use Chrome or another browser with WebSerial support
- use a data-capable USB cable
- close serial monitors and other flasher tabs
- try another USB port
- check OS serial permissions
- put the device into the correct bootloader/DFU mode if required

Charge-only cables are a common cause.

## Repeater does not appear to help coverage

Check:

- repeater firmware is installed
- `repeat` is on
- radio settings match the local mesh
- antenna is suitable and placed well
- the site actually has a useful path to users or other repeaters
- settings profile matches the site role
- flood/adverts are not disabled unexpectedly

Useful commands:

```
get repeat
get flood.max
get flood.max.unscoped
get flood.max.advert
get advert.interval
get flood.advert.interval
stats-core
stats-radio
```

## Repeater seems noisy or harmful

Symptoms may include excessive duplicate traffic, poor message reliability, or many users hearing confusing repeated adverts.

Check:

- wrong profile for the site role
- flood limits too high
- flood adverts too frequent
- loop detection too loose
- too many nearby repeaters hearing the same traffic
- high site hearing too many marginal paths

Start by comparing the configuration against [Repeater settings profiles](/meshcore/repeater-settings).

## rxdelay or txdelay problems

Do not use `rxdelay` values between `0` and `1`.

Reminder:

- `rxdelay 0` disables rxdelay.
- `rxdelay 1` is a no-op.
- `rxdelay > 1` is the intended weak-packet delay behaviour.
- `0 < rxdelay < 1` inverts the behaviour.

See [rxdelay and txdelay calculations](/meshcore/rxdelay-txdelay) before tuning.

## Noisy site or interference suspicion

Use:

```
stats-radio
```

Look for values such as:

- `noise_floor`
- `last_rssi`
- `last_snr`

A strong RSSI with poor SNR can still be a bad link. Nearby electronics, chargers, solar gear, computers, and other transmitters can raise the noise floor.

Be careful with `int.thresh`. If it is too low on a noisy site, the repeater may keep treating the channel as busy.

## Stale contacts or routes

If messages behave strangely after nodes move or repeaters change:

1. Send a fresh advert.
2. Ask the other node to send a fresh advert.
3. Test with a known nearby node.
4. Check whether the old path depended on a repeater that changed or disappeared.

See [How MeshCore routing works](/meshcore/routing).

## What to include when asking for help

Include:

- device model
- firmware role and version if known
- companion app or web app used
- radio settings
- antenna type and location
- indoor/outdoor test location
- whether another known-good node was used
- exact symptom
- what changed recently
- relevant `get`, `stats-core`, or `stats-radio` output

This avoids guesswork and makes support much faster.

## Safe recovery approach

If changes made things worse:

1. Stop changing settings.
2. Write down what changed.
3. Return to known-good local settings.
4. Test one device at short range.
5. Add repeaters or advanced settings back one at a time.

## Where to go next

- [SA:MUG recommended settings](/meshcore/recommended-settings)
- [Glossary](/meshcore/glossary)
- [Repeater deployment checklist](/meshcore/repeater-deployment-checklist)
