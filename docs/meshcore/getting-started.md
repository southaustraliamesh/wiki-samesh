---
title: Getting started with MeshCore
description: MeshCore South Australia getting-started guide for SA Mesh users, companion nodes, local settings, dashboard and map checks.
---

# Getting started with MeshCore

MeshCore is the recommended first path for most SA Mesh users. Start with a **companion node** unless you are deliberately building fixed infrastructure with the community.

A companion node is a normal user device that talks to your phone or computer. It lets you learn the network, confirm local coverage and test settings without adding another always-on repeater to shared airtime.

:::tip First device recommendation
If this is your first SA Mesh device, build or buy one device that can run **MeshCore companion firmware**, then test it against known-good local coverage before planning repeaters or permanent installs.
:::

## First-device checklist

Before flashing or changing settings:

- confirm the exact board model;
- confirm the device is for the Australian LoRa band;
- use a data-capable USB cable;
- fit the correct antenna before transmitting;
- choose **companion** firmware unless you are deliberately building a repeater;
- record your starting settings before changing them;
- test with a nearby known-good user, repeater or dashboard/map observation.

## Basic path

1. Choose a supported LoRa board for the Australian band.
2. Flash MeshCore companion firmware for that exact board.
3. Apply the local SA Mesh radio baseline from [Frequency & Settings](/meshcore/recommended-settings).
4. Set a clear node name that identifies you without pretending to be infrastructure.
5. Reboot after radio setting changes.
6. Confirm the node can send/receive with a known-good nearby user or repeater.
7. Use the dashboard/map as supporting evidence, not as the only proof that your node works.

## Local SA Mesh radio baseline

South Australia, Western Australia and Queensland use:

| Setting | Value |
| --- | --- |
| Frequency | 923.125 MHz |
| Bandwidth | 62.5 kHz |
| Spreading factor | 8 |
| Coding rate | 8 |

See [Frequency & Settings](/meshcore/recommended-settings) for the fuller local settings guidance.

## What to read next

| I want to... | Start here |
| --- | --- |
| Set up a normal user device | [Companion overview](/meshcore/companion-node) |
| Understand local radio settings | [Frequency & Settings](/meshcore/recommended-settings) |
| Place a fixed repeater or improve coverage | [Repeater overview](/meshcore/repeater-node) |
| Check a site before deployment | [Deployment checklist](/meshcore/repeater-deployment-checklist) |
| Troubleshoot an existing node | [Troubleshooting](/meshcore/troubleshooting) |
| Learn MeshCore terms | [Glossary](/meshcore/glossary) |

## Before building a repeater

Do not make your first MeshCore device a repeater unless there is a clear coverage reason and the community has agreed it helps. Poorly placed repeaters can duplicate traffic, add noise and make the network harder to troubleshoot.

For repeaters, start with [Repeater overview](/meshcore/repeater-node), then use the [Deployment checklist](/meshcore/repeater-deployment-checklist).
