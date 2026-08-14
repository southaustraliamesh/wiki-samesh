---
title: MeshCore glossary
---

{/* migrated */}

:::info Source note
Migrated from the SA:MUG Wiki.js page. Content has been lightly cleaned for Docusaurus and public readability; advanced operational settings should still be field-tested before being treated as hard defaults.
:::

# MeshCore glossary

This glossary explains common MeshCore terms used on the SA:MUG wiki.

For setup paths, start with [Start Here](/meshcore/start-here).

## Advert

A node announcement. Adverts help other nodes discover your name, identity, and routing/contact information.

## Airtime

How long a LoRa packet occupies the radio channel. Higher airtime means less channel capacity for everyone else.

## Bandwidth / BW

A LoRa modem setting. The SA/WA/QLD MeshCore setting is `62.5 kHz`.

## BLE companion

Companion firmware that connects to a phone or tablet using Bluetooth Low Energy.

## Coding rate / CR

A LoRa modem setting that affects error correction and airtime. The SA/WA/QLD MeshCore setting is `8`.

## Companion node

A normal user/client MeshCore node. It connects to a phone, tablet, or computer app and is usually the right starting point for new users.

## Core repeater / CORE

A high-value wide-area or backbone repeater. Usually a high site with deliberate coverage purpose.

## Direct/routed traffic

Traffic that uses known path/contact information to reach a destination more deliberately than general flood traffic.

## Distribution repeater / DIST

A repeater used for coverage shaping, valley fill, secondary ridge coverage, or reflector-style paths.

## DFU

Device Firmware Update. In this wiki, DFU often refers to bootloader/update behaviour on devices such as nRF52 boards.

## Edge repeater / EDGE

A small local infill repeater, such as a house roof, suburb edge, valley floor, or local shadow-pocket fill.

## EIRP

Effective Isotropic Radiated Power. It depends on transmitter power, feedline loss, and antenna gain. Check legal limits before deploying repeaters.

## Flood advert

An advert that may be forwarded by repeaters and travel beyond direct radio range.

## Flood traffic

Traffic that may be forwarded broadly through repeaters. Flooding is useful but must be limited to avoid excess traffic.

## Frequency

The LoRa operating frequency. The SA/WA/QLD MeshCore setting is `923.125 MHz`.

## int.thresh

Interference threshold setting. If non-zero, the radio may treat the channel as active when current RSSI rises above the measured noise floor by this threshold. Use carefully on noisy sites.

## Loop detection

Repeater behaviour that helps reduce forwarding loops and repeated packets.

## MeshCore

A LoRa-based messaging and routing system. It is separate from Meshtastic and is not over-the-air compatible with Meshtastic.

## Meshtastic

A separate LoRa mesh system. MeshCore and Meshtastic may use similar hardware, but they use different firmware and protocols.

## nRF52

A family of Nordic microcontrollers used in some LoRa devices. For nRF52 repeaters, SA:MUG recommends flashing the Oltaco DFU Bootloader before formatting/flashing MeshCore repeater firmware.

## Noise floor

The background RF noise level seen by the receiver. A high noise floor can make reception worse even when RSSI looks strong.

## Oltaco DFU Bootloader

A bootloader fix/replacement recommended for nRF52-based repeaters as OTA-update future-proofing:

[https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX](https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX)

Recommended order: flash Oltaco first, then format/erase if needed, then flash MeshCore repeater firmware.

## OTA

Over The Air update. Updating firmware without physically connecting a USB cable. OTA capability is especially useful for repeaters installed in hard-to-reach places.

## Path hash

A compact identifier related to routing/path information. Operators may see `path.hash.mode` in repeater settings.

## Repeater

A MeshCore node that forwards eligible packets to improve coverage. Repeaters should be deployed for real coverage needs and configured for their site role.

## Room server

A shared message store/mailbox-style MeshCore role. It is different from a repeater.

## RSSI

Received Signal Strength Indicator. It shows received signal power, but does not tell the whole link-quality story by itself.

## rxdelay

A repeater timing setting that can delay weak received flood packets so stronger copies can be processed first.

Important: `rxdelay 0` disables it, `rxdelay 1` is a no-op, values greater than `1` are intended, and values between `0` and `1` invert behaviour.

## SF / Spreading factor

A LoRa modem setting affecting range, airtime, and reliability. The SA/WA/QLD MeshCore setting is `8`.

## SNR

Signal-to-noise ratio. For LoRa, SNR is often more useful than RSSI alone.

## stats-core

A command that reports MeshCore/core statistics. Useful for troubleshooting repeaters and behaviour.

## stats-radio

A command that reports radio statistics such as noise floor, RSSI, and SNR. Useful for RF troubleshooting.

## txdelay

A repeater timing setting that adds random retransmit delay for flood traffic to reduce collisions.

## direct.txdelay

A timing setting similar to `txdelay`, but for direct/routed retransmits.

## USB serial companion

Companion firmware that connects to a computer or host over USB serial.

## Zero-hop advert

An advert heard only by nodes directly in radio range. Useful for local discovery without flooding across the wider mesh.

## Where to go next

- [FAQ](/meshcore/glossary)
- [Troubleshooting](/meshcore/troubleshooting)
- [How MeshCore routing works](/meshcore/routing)
