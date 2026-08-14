---
title: MeshCore start here
---

{/* migrated */}

:::info Source note
Migrated from the SA:MUG Wiki.js page. Content has been lightly cleaned for Docusaurus and public readability; advanced operational settings should still be field-tested before being treated as hard defaults.
:::

# MeshCore start here

This is the SA:MUG starting page for MeshCore. It gives new users the short path through the main concepts, setup choices, and local wiki pages.

MeshCore is a LoRa-based messaging and routing system for off-grid text communication. It is separate from Meshtastic and uses different firmware and protocol behaviour.

Useful upstream links:

- MeshCore site: [https://meshcore.io](https://meshcore.io)
- MeshCore docs: [https://docs.meshcore.io](https://docs.meshcore.io)
- Firmware flasher: [https://flasher.meshcore.io](https://flasher.meshcore.io)
- Companion web app: [https://app.meshcore.nz](https://app.meshcore.nz)
- MeshCore source: [https://github.com/meshcore-dev/MeshCore](https://github.com/meshcore-dev/MeshCore)

## Local SA, WA, and QLD radio settings

Current South Australian MeshCore radio settings are:

| Setting | Value |
| --- | --- |
| Frequency | `923.125 MHz` |
| Bandwidth | `62.5 kHz` |
| Spreading factor | `8` |
| Coding rate | `4` to `8`, `8` is preferred |

Western Australia and Queensland use the same settings, Queensland uses a slightly different Coding Rate, however that is still compatible as coding rate doesn't affect compatibility with other settings.

## Which path should I follow?

| I want to... | Start with |
| --- | --- |
| Send and receive messages with a phone or web app | [Companion firmware](/meshcore/companion-node) |
| Extend coverage from a fixed location | [Repeater firmware](/meshcore/repeater-node) |
| Run a mailbox/BBS-style shared message point | Room server firmware |
| Use a standalone handheld without a phone | T-Deck / Ultra-style firmware |
| Understand common terms and problems | [MeshCore FAQ](/meshcore/glossary), [Troubleshooting](/meshcore/troubleshooting), and [Glossary](/meshcore/glossary) |

If you are new, start with a companion node. Add a repeater only when there is a real coverage need and you can test it properly.

## The common first setup: companion node

A companion node is a LoRa radio that connects to your phone or computer. It handles the radio side while the app handles the user interface.

Basic flow:

1. Choose a supported LoRa device.
2. Flash MeshCore companion firmware.
3. Connect with the phone app or web companion app.
4. Set or confirm the local radio settings.
5. Set your name and basic identity details.
6. Send an advert so other users can discover you.
7. Test with a nearby known MeshCore user or repeater.

Use companion firmware unless you specifically know the device is meant to be a repeater or room server.

## Repeater path

A repeater helps extend coverage. It should usually be a fixed, powered, tested site with a useful antenna position.

Before deploying a repeater, ask:

- Is there a real coverage gap?
- Is the site higher or better placed than nearby user nodes?
- Is the antenna suitable and safely installed?
- Can the operator update firmware and change settings later?
- Will this improve the mesh, or just add duplicate traffic?

For repeater configuration guidance, see:

- [Getting started with a repeater](/meshcore/repeater-node)
- [Repeater deployment checklist](/meshcore/repeater-deployment-checklist)
- [Repeater settings profiles](/meshcore/repeater-settings)
- [SA:MUG recommended settings](/meshcore/recommended-settings)
- [rxdelay and txdelay calculations](/meshcore/rxdelay-txdelay)

## Room server path

A room server is a shared message store. It is useful when users may not all be online or in range at the same time.

A room server is not the same thing as a repeater. For best results, treat repeater and room server as separate roles and usually run them on separate devices.

## Key concepts

### Companion

A normal user/client radio that connects to an app over BLE or USB serial.

### Repeater

A node that forwards MeshCore packets to help traffic reach further nodes.

### Room server

A mailbox/BBS-style server that stores messages for later retrieval.

### Advert

A node announcement. It helps other MeshCore users discover your node, name, position, and public key.

### Flood traffic

Traffic that may be forwarded more broadly through repeaters.

### Direct/routed traffic

Traffic that uses known path information to reach a destination more directly.

### rxdelay and txdelay

Timing controls used by repeaters:

- `rxdelay` affects when weak received flood packets are processed.
- `txdelay` affects when flood packets are retransmitted.
- `direct.txdelay` affects direct/routed retransmits.

See [rxdelay and txdelay calculations](/meshcore/rxdelay-txdelay) before tuning them.

## What should I not do first?

Avoid these common mistakes:

- Do not flash repeater firmware when you only need a normal user node.
- Do not deploy a repeater just because you have spare hardware.
- Do not copy another site's repeater settings without understanding the role of your site.
- Do not use `rxdelay` values between `0` and `1`.
- Do not change many settings at once and then try to debug the result.
- Do not assume old screenshots or another region's settings are correct for SA:MUG.

## Quick troubleshooting checklist

If something does not work:

1. Confirm the firmware type is correct.
2. Confirm the device is on MeshCore, not Meshtastic.
3. Confirm local frequency and modem settings.
4. Test outdoors or with the antenna near a window.
5. Check the antenna is correct for the band and properly connected.
6. Reboot the radio and app.
7. Ask a nearby known-good user to send an advert.
8. Record device model, firmware type, settings, and what changed before asking for help.

## Local wiki pages

Start with these:

- [MeshCore FAQ](/meshcore/glossary)
- [Getting started: companion](/meshcore/companion-node)
- [Getting started: repeater](/meshcore/repeater-node)
- [SA:MUG recommended settings](/meshcore/recommended-settings)
- [Repeater deployment checklist](/meshcore/repeater-deployment-checklist)
- [Repeater settings profiles](/meshcore/repeater-settings)
- [Troubleshooting](/meshcore/troubleshooting)
- [Glossary](/meshcore/glossary)
- [How MeshCore routing works](/meshcore/routing)
- [CLI quick reference](/meshcore/cli-quick-reference)
- [rxdelay and txdelay calculations](/meshcore/rxdelay-txdelay)

Planned pages:

- Room server getting started

## Recommended next step

If you are setting up your first device, flash companion firmware and get a basic message test working before changing advanced settings or planning a repeater.
