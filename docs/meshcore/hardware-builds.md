---
title: MeshCore Hardware Builds
description: What to include when sharing a MeshCore companion, repeater or field hardware build with the SA Mesh community.
---

# MeshCore Hardware Builds

Use this page as the starting checklist when documenting a MeshCore hardware build for SA Mesh: companion nodes, repeaters, field test kits, outdoor enclosures, power systems and antenna setups.

:::info Current focus
SA Mesh is currently MeshCore-first. Meshtastic build examples remain available under the Meshtastic section for historical/community reference, but new current-day fixed infrastructure and companion hardware notes should normally be documented here or under the relevant MeshCore companion/repeater pages.
:::

## What is worth sharing

A useful MeshCore build page should help another person understand **why** the build exists, **what parts were used**, **how it was configured**, and **what limitations or safety notes apply**.

Good candidates include:

- a first-device companion build that worked well locally;
- a portable field-testing kit;
- a repeater enclosure or power build;
- antenna/feedline/mounting examples;
- solar, battery or backup-power setups;
- lessons learned from a build that did not work as expected.

## What's needed to share a build

A useful build page should include:

- purpose and expected environment;
- device/board model;
- firmware and role;
- power source and charging details;
- enclosure and waterproofing notes;
- antenna/feedline details;
- mounting notes;
- photos or diagrams;
- known limitations and maintenance requirements.

## MeshCore-specific details to include

For MeshCore builds, also record:

- whether the device runs companion or repeater firmware;
- if companion: BLE companion or USB serial companion;
- if repeater: intended role such as core, distribution, edge/infill or generic;
- firmware version if known;
- local radio settings used during testing;
- whether the build was bench-tested before outdoor or elevated installation;
- whether the build has been tested against known local nodes, repeaters, dashboard/map observations or other users.

## Safety and public notes

:::warning Build and install safety
Outdoor nodes can involve batteries, waterproofing, heat, rooftops/elevated installs and lightning exposure. Do not transmit without a suitable antenna attached, and do not install elevated equipment without appropriate mounting, weatherproofing and electrical-safety planning.
:::

Keep public build pages practical and conservative:

- do not present one person's field result as a universal hard default;
- avoid publishing patch-only or local-test-only commands as general public guidance;
- mention legal EIRP considerations where antenna gain, transmit power or feedline loss matter;
- describe unresolved issues honestly so others do not copy a fragile build.

## Where to put the build

| Build type | Suggested page location |
| --- | --- |
| MeshCore companion build | MeshCore → Hardware → Hardware Builds, or link from [Companion overview](/meshcore/companion-node) |
| MeshCore repeater build | MeshCore → Hardware → Hardware Builds, or link from [Repeater overview](/meshcore/repeater-node) |
| Repeater deployment process | [Repeater deployment checklist](/meshcore/repeater-deployment-checklist) |
| Repeater settings/profile notes | [Repeater settings profiles](/meshcore/repeater-settings) |
| Meshtastic-specific build | Meshtastic → Meshtastic Builds |

## Simple build-page template

```md
# Build name

## Purpose

What this build is for and where it is expected to be used.

## Parts

- Device/board:
- Firmware/role:
- Antenna:
- Enclosure:
- Power:
- Mounting:

## Setup notes

Important flashing, wiring, configuration or mounting details.

## Test results

How it was tested and what worked or failed.

## Limitations

Known compromises, maintenance needs, weather/power/RF caveats.
```
