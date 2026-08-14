---
title: Getting Started with Meshtastic
---

# Getting Started with Meshtastic

:::info Source note
Migrated from the legacy SA:MUG Wiki.js Meshtastic page. Meshtastic is included for historical/community completeness; SA Mesh's current primary documentation path remains MeshCore. Validate firmware/app behaviour against current Meshtastic docs before treating settings as universal defaults.
:::

Meshtastic remains useful for small groups, portable experiments, event meshes, GPS/location-sharing workflows and users who specifically want the Meshtastic app ecosystem.

For the current SA Mesh wiki, MeshCore is still the recommended first path for most community infrastructure and new users. Use these Meshtastic pages as migrated legacy/reference material unless your group is deliberately using Meshtastic.

## What you need

To get started with Meshtastic you generally need:

- a Meshtastic-compatible LoRa device, such as a T-Echo, T-Beam, T-Energy or LILYGO TTGO-style board;
- a USB cable for flashing and charging;
- the [Meshtastic app](https://meshtastic.org/downloads) for Android, iOS or desktop;
- a computer with the [Meshtastic web flasher](https://flasher.meshtastic.org) or CLI tools;
- optional GPS, battery and external antenna hardware depending on the device/build.

## Legacy SA:MUG Meshtastic radio baseline

| Setting | Value |
| --- | --- |
| Region | Australia / New Zealand, AU915 |
| Channel preset | ShortFast |
| Frequency slot | Slot 16 / 918.875 MHz |
| Typical personal-node role | Client-style role; avoid infrastructure roles unless deliberately deploying shared coverage |

:::warning Current-focus note
These settings came from the legacy Meshtastic wiki. Confirm the current app labels and firmware behaviour before publishing them as a hard default for new public guidance.
:::

## Quick setup path

1. Flash firmware with the Meshtastic web flasher for your exact device model.
2. Select AU915 / Australia-New Zealand where prompted.
3. Connect with the Meshtastic app over Bluetooth or USB.
4. Set the LoRa preset and frequency slot to match the group you are joining.
5. Set a clear node name.
6. Fit the correct antenna before transmitting.
7. Test with a nearby known-good node before assuming map or MQTT visibility means RF coverage is working.

## Advanced options

- USB or Wi-Fi MQTT gateways can bridge telemetry and map data.
- Antenna upgrades can improve link quality, but need to respect legal EIRP and local installation constraints.
- Public map visibility requires position/reporting settings and community coordination.

## Need help?

- [SA:MUG Discord](https://discord.gg/sauMmjJpTB)
- [Official Meshtastic docs](https://meshtastic.org/docs)
- [Meshtastic node settings](./node-settings.md)
