---
title: How MeshCore routing works
---

{/* migrated */}

:::info Source note
Migrated from the SA:MUG Wiki.js page. Content has been lightly cleaned for Docusaurus and public readability; advanced operational settings should still be field-tested before being treated as hard defaults.
:::

# How MeshCore routing works

This page explains MeshCore routing concepts at a practical level. It is not a packet-format reference or firmware deep dive.

MeshCore is not Meshtastic with different settings. It has its own firmware, contacts, adverts, routing behaviour, and repeater model.

Useful links:

- [Start Here](/meshcore/start-here)
- [FAQ](/meshcore/glossary)
- [Glossary](/meshcore/glossary)
- [Repeater settings profiles](/meshcore/repeater-settings)

## The short version

MeshCore uses LoRa radios to move messages between nodes. Nodes learn about each other through adverts and routing information. Repeaters help forward packets, but they should not be treated as simple always-repeat-everything devices.

The practical result:

- You need compatible radio settings to hear the mesh.
- You need adverts/contacts for discovery.
- Repeaters can extend coverage, but too many poorly placed repeaters can add noise.
- Routing information can become stale, so testing and fresh adverts matter.

## Node roles

| Role | What it does |
| --- | --- |
| Companion | Normal user/client node connected to a phone or computer |
| Repeater | Fixed node that forwards traffic to improve coverage |
| Room server | Shared message store/mailbox-style service |
| Standalone handheld | Self-contained device such as T-Deck style hardware |

Most users should start with a companion node.

## Adverts and discovery

An advert is a node announcement. It helps other nodes learn who you are and how to reach you.

There are two useful advert ideas:

| Advert type | Meaning |
| --- | --- |
| Zero-hop advert | Heard only by nodes directly in radio range |
| Flood advert | Can be forwarded by repeaters and travel further |

If you cannot see anyone, one common reason is that you have not received recent adverts or route information.

## Contacts and stale routes

MeshCore can remember contacts and path information. That is useful, but it also means old information can become stale.

Routes may become stale when:

- a node moves
- a repeater changes settings
- a repeater is removed
- a user changes firmware or keys
- a site goes offline
- you have not heard fresh adverts for a while

If behaviour looks strange, ask a nearby user or repeater operator to send a fresh advert and test again.

## Flood traffic

Flood traffic is traffic that can be forwarded more broadly through repeaters.

Flooding is useful for discovery and reach, but it must be controlled. If every repeater forwards too much, the network can become noisy and inefficient.

Repeater settings such as these help control flood behaviour:

```
flood.max
flood.max.unscoped
flood.max.advert
flood.advert.interval
```

Use [Repeater settings profiles](/meshcore/repeater-settings) rather than inventing aggressive values.

## Direct or routed traffic

Direct/routed traffic uses known path information to reach another node more deliberately.

This is why route quality and fresh contact information matter. If a node moved or the old repeater path changed, a direct route may not behave as expected until information refreshes.

## What repeaters do

A repeater helps traffic reach further nodes by forwarding eligible packets. It should be placed and configured for a useful coverage role.

Good repeaters usually have:

- better height or position than normal users
- a suitable antenna
- reliable power
- consistent settings
- an operator who can update and tune it

A repeater is not automatically helpful just because it is high or powerful. A high noisy site can hear too much, create duplicate traffic, or miss useful weaker paths.

## Path hashes

Path hashes are compact routing/path identifiers used by MeshCore. Operators usually do not need to understand the internals, but they may see settings such as:

```
path.hash.mode
```

On the SA:MUG repeater profiles, `path.hash.mode 1` means the repeater's own adverts use 2-byte path hashes. It does not stop the repeater forwarding other path hash sizes.

## Duplicate and loop control

Mesh networks need to avoid endlessly forwarding the same traffic. MeshCore repeater settings include loop detection and forwarding limits to reduce repeated or looping packets.

Useful settings include:

```
loop.detect
flood.max
flood.max.unscoped
flood.max.advert
```

If the network appears noisy or unstable, do not simply increase forwarding. Check whether repeaters are duplicating traffic or forwarding too broadly.

## Why rxdelay and txdelay exist

Repeaters can hear multiple copies of the same packet. Timing controls can help reduce collisions and prefer better received copies.

Short version:

- `txdelay` spreads retransmit timing for flood traffic.
- `direct.txdelay` does similar timing for direct/routed traffic.
- `rxdelay` can delay weak received flood packets so stronger copies can be processed first.

Important warning:

- `rxdelay 0` disables rxdelay.
- `rxdelay 1` is a no-op.
- `rxdelay > 1` is the intended weak-packet delay behaviour.
- `0 < rxdelay < 1` inverts the behaviour and should be avoided.

For details, see [rxdelay and txdelay calculations](/meshcore/rxdelay-txdelay).

## Why settings differ by repeater role

A core hilltop repeater and a house-roof edge repeater should not necessarily use the same settings.

| Role | Routing goal |
| --- | --- |
| Core | deliberate wide-area/backbone coverage |
| Distribution | shape coverage into valleys, shadows, or secondary paths |
| Edge | provide local access without amplifying everything |

Use the role that matches the site, then field-test.

## Practical troubleshooting hints

If routing looks wrong:

1. Confirm local radio settings match.
2. Send or request fresh adverts.
3. Test near a known-good node.
4. Check whether a repeater is actually in range.
5. Compare direct hearing versus repeater-assisted hearing.
6. Check for stale contacts/routes.
7. Avoid changing many settings at once.

## Where to go next

- [Troubleshooting](/meshcore/troubleshooting)
- [Glossary](/meshcore/glossary)
- [Repeater settings profiles](/meshcore/repeater-settings)
- [Repeater deployment checklist](/meshcore/repeater-deployment-checklist)
