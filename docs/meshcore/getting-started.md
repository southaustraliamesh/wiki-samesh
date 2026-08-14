---
title: Getting started
---

# Getting started with SA Mesh

SA Mesh uses LoRa-based mesh networking for low-power, long-range text communication without relying on mobile coverage or normal internet access.

The first decision is which firmware and network style you want to use. SA Mesh currently focuses this new wiki on **MeshCore**, while the historical SA:MUG knowledge base still includes Meshtastic material.

:::tip Recommended first path
If you are new to the SA Mesh community, start with a **MeshCore companion node**. It is the simplest way to get a normal user device online before you experiment with repeaters or fixed infrastructure.
:::

## Choose your path

| I want to... | Start here |
| --- | --- |
| Send and receive MeshCore messages from a phone or computer | [Companion node setup](/meshcore/companion-node) |
| Understand the local SA Mesh radio baseline | [Recommended settings](/meshcore/recommended-settings) |
| Place a fixed repeater or improve coverage | [Repeater node setup](/meshcore/repeater-node) |
| Check a site before deployment | [Repeater deployment checklist](/meshcore/repeater-deployment-checklist) |
| Troubleshoot an existing node | [Troubleshooting](/meshcore/troubleshooting) |
| Learn MeshCore terms | [Glossary](/meshcore/glossary) |

## Why MeshCore is the default path here

MeshCore is usually the better fit for planned community infrastructure because it is designed around deliberate routing, fixed repeaters and efficient use of shared airtime.

For SA Mesh, that means:

- normal users can start with companion firmware;
- fixed sites can be planned as repeaters instead of accidental always-on rebroadcasters;
- radio settings can be kept consistent across SA, WA and compatible nearby networks;
- troubleshooting can focus on firmware type, radio settings, antenna position and known-good test nodes.

## When Meshtastic still makes sense

Meshtastic remains useful for small groups, temporary events, portable experiments, GPS/location-sharing workflows and users who specifically want the Meshtastic app ecosystem.

This Docusaurus migration starts with the MeshCore content because it is the current SA Mesh priority. Meshtastic pages can be migrated later into a separate section if the community wants the new wiki to carry both stacks.

## First-device checklist

Before flashing or changing settings:

- confirm the exact board model;
- confirm the device is for the Australian LoRa band;
- use a data-capable USB cable;
- fit the correct antenna before transmitting;
- choose **companion** firmware unless you are deliberately building a repeater;
- record your starting settings before changing them;
- test with a nearby known-good user, repeater or dashboard/map observation.

## Live SA Mesh tools

- Main site: [samesh.au](https://samesh.au/)
- Wiki: [wiki.samesh.au](https://wiki.samesh.au/)
- Dashboard: [sa.themesh.au](https://sa.themesh.au/)
- Map: [sa.themesh.au/map](https://sa.themesh.au/map)

## Credits and inspiration

This page adapts the decision-first onboarding pattern from the NSW Mesh getting-started page while using SA Mesh wording, links and local MeshCore priorities.
