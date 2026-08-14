---
title: Getting started with a MeshCore companion node
---

{/* migrated */}

:::info Source note
Migrated from the SA:MUG Wiki.js page. Content has been lightly cleaned for Docusaurus and public readability; advanced operational settings should still be field-tested before being treated as hard defaults.
:::

# Getting started with a MeshCore companion node

This page is for setting up a normal MeshCore user node: a LoRa radio running companion firmware and connected to a phone, tablet, or computer.

If this is your first MeshCore device, start here. A companion node is the right firmware for most users who want to send and receive messages.

Useful links:

- MeshCore firmware flasher: [https://flasher.meshcore.io](https://flasher.meshcore.io)
- MeshCore companion web app: [https://app.meshcore.nz](https://app.meshcore.nz)
- MeshCore site: [https://meshcore.io](https://meshcore.io)
- MeshCore FAQ: [FAQ](/meshcore/glossary)
- MeshCore start page: [Start Here](/meshcore/start-here)

## What is a companion node?

A companion node is a supported LoRa device running MeshCore companion firmware. The radio handles LoRa traffic, while an app on your phone or computer provides the user interface.

There are two common companion styles:

| Companion type | Connects by | Use when |
| --- | --- | --- |
| BLE companion | Bluetooth Low Energy | You want to use a phone or tablet app |
| USB serial companion | USB cable / serial | You want to use a computer or web app over USB |

If unsure, most phone users should start with BLE companion firmware.

## What you need

You need:

1. A supported LoRa device.
2. A suitable antenna for your band.
3. A data-capable USB cable for flashing.
4. A phone/tablet app or computer with the web companion app.
5. The local MeshCore radio settings used by your area.
6. Another MeshCore node or repeater in range for testing.

For supported devices, check the MeshCore flasher. The supported device list changes over time.

## Before you flash

Before flashing firmware:

- Confirm the exact board model.
- Confirm the device frequency band matches your region.
- Fit an antenna before transmitting.
- Use a known data-capable USB cable, not a charge-only cable.
- If replacing Meshtastic or other firmware, make sure you are selecting MeshCore firmware.

## Basic setup flow

1. Open the MeshCore flasher: [https://flasher.meshcore.io](https://flasher.meshcore.io)
2. Select your device.
3. Select companion firmware.
4. Choose BLE companion or USB serial companion as appropriate.
5. Flash the device.
6. Reboot the device after flashing.
7. Connect using the app or web companion.
8. Confirm the local radio settings.
9. Set your display name.
10. Send an advert.
11. Test with a nearby known MeshCore user or repeater.

## Choosing BLE or USB serial

### BLE companion

Use BLE companion if you want to connect from a phone or tablet.

Good for:

- normal mobile use
- field testing
- carrying a node with a phone
- simple first setup

If the device does not appear over Bluetooth, check that you flashed BLE companion firmware rather than USB serial companion or repeater firmware.

### USB serial companion

Use USB serial companion if you want to connect from a computer or another host over USB serial.

Good for:

- desktop testing
- browser/web companion use
- development and debugging
- devices that will stay connected to a computer

The web companion app is here: [https://app.meshcore.nz](https://app.meshcore.nz)

## First connection

After flashing:

1. Power-cycle the device.
2. Open the MeshCore app or web companion.
3. Connect to the device.
4. Confirm the app can read device information.
5. Confirm the radio settings are correct for the local mesh.

If the app connects but nothing is heard over radio, treat that as a radio/settings/antenna problem, not just an app problem.

## Radio settings

Your companion must use radio settings compatible with the local mesh. If the frequency, bandwidth, spreading factor are wrong, the node will not hear the local mesh even if the app connection works.

Current South Australian MeshCore radio settings are:

| Setting | Value |
| --- | --- |
| Frequency | `923.125 MHz` |
| Bandwidth | `62.5 kHz` |
| Spreading factor | `8` |
| Coding rate | `4` to `8`, `8` is preferred |

Western Australia and Queensland use the same settings, Queensland uses a slightly different Coding Rate, however that is still compatible as coding rate doesn't affect compatibility with other settings.

Do not change advanced radio settings randomly. Change one thing at a time and test.

## Set your name and identity

Set a short, recognisable display name. Good names make it easier for other users to identify who they are hearing.

Suggested style:

```
Name or callsign
```

Examples:

```
VK5ABC
Alice
Alice-VK5ABC
```

Avoid names that look like repeaters unless the device is actually a repeater.

## Send an advert

After setup, send an advert so nearby nodes can discover you.

An advert is a MeshCore announcement. It lets other users learn your node identity and contact information.

If no one can see you yet:

- make sure you sent an advert
- ask a nearby user to send an advert
- move outdoors or near a window
- check the antenna
- confirm local radio settings

## First message test

For the first test:

1. Use a known-good nearby user or repeater if possible.
2. Start outdoors or near a window.
3. Keep the antenna vertical unless your local test setup says otherwise.
4. Send an advert.
5. Send a short test message.
6. Ask the other user what they saw, including signal reports if available.

Do not judge the setup from one indoor test beside a computer, charger, or other noisy electronics.

## Common problems

### The device does not appear in the app

Check:

- Is it powered on?
- Did you flash BLE companion firmware?
- Is another phone or app already connected?
- Does the device need to be forgotten/re-paired?
- Is Bluetooth enabled on the phone?
- Is the device close enough during setup?

### The web flasher cannot connect

Check:

- Use Chrome or another browser with WebSerial support.
- Use a data-capable USB cable.
- Close other serial monitors or flasher tabs.
- Try another USB port.
- Put the board into bootloader/DFU mode if required by that device.

### The app connects, but I cannot hear anyone

Check:

- wrong frequency or modem settings
- wrong firmware type
- no local MeshCore nodes in range
- bad or missing antenna
- indoor location or poor antenna position
- local RF noise
- stale contacts or routes

Ask a known nearby user to send an advert while you test.

### Others can hear me, but I cannot hear them

Possible causes:

- local receive noise near your node
- poor antenna or antenna connection
- your node is lower or more obstructed
- the other station is reaching a repeater that you cannot hear
- settings mismatch or stale route information

Move to a clearer location and test with a known nearby node.

### I can hear others, but they cannot hear me

Possible causes:

- antenna problem
- transmit power or board-specific RF issue
- poor location
- wrong regional settings
- you are hearing a repeater but cannot reach it reliably

Do a short-range test with another known-good node before changing advanced settings.

## What not to do first

Avoid these early mistakes:

- Do not flash repeater firmware for a normal user device.
- Do not deploy a repeater before you have a working companion node.
- Do not tune repeater settings from a companion setup problem.
- Do not change many settings at once.
- Do not test only indoors beside noisy electronics.
- Do not assume Meshtastic settings apply to MeshCore.

## What to record when asking for help

When asking for help, include:

- device model
- firmware type: BLE companion or USB serial companion
- firmware version if known
- app or web companion used
- frequency/modem preset if known
- antenna used
- indoor/outdoor test location
- what you expected to happen
- what actually happened

This makes it much easier for others to help without guessing.

## Where to go next

- New user overview: [Start Here](/meshcore/start-here)
- Common questions: [FAQ](/meshcore/glossary)
- Repeater settings: [Repeater settings profiles](/meshcore/repeater-settings)
- Technical timing details: [rxdelay and txdelay calculations](/meshcore/rxdelay-txdelay)

If your companion node can send and receive basic messages reliably, then you can start thinking about coverage, repeaters, room servers, or more advanced tuning.
