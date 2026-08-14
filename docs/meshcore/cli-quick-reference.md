---
title: MeshCore CLI quick reference
---

{/* migrated */}

:::info Source note
Migrated from the SA:MUG Wiki.js page. Content has been lightly cleaned for Docusaurus and public readability; advanced operational settings should still be field-tested before being treated as hard defaults.
:::

# MeshCore CLI quick reference

This page is a practical quick reference for common MeshCore CLI commands used by SA:MUG companion, repeater, and room-server operators.

It is not a complete upstream command reference. For full command details, use the upstream MeshCore documentation/source.

Useful links:

- [Start Here](/meshcore/start-here)
- [SA:MUG recommended settings](/meshcore/recommended-settings)
- [Getting started with a repeater](/meshcore/repeater-node)
- [Repeater settings profiles](/meshcore/repeater-settings)
- [Troubleshooting](/meshcore/troubleshooting)

## Safety notes

- Some commands are serial-only.
- Some settings require a reboot to apply.
- `erase` is destructive and should not be used casually.
- Change one setting at a time and record what changed.
- Do not paste repeater profile commands onto the wrong role/device.
- Do not expose private keys, passwords, or full device secrets in public support channels.

## Local SA, WA, and QLD radio settings

South Australia, Western Australia, and Queensland use:

| Setting | Value |
| --- | --- |
| Frequency | `923.125 MHz` |
| Bandwidth | `62.5 kHz` |
| Spreading factor | `8` |
| Coding rate | `8` |

Set all radio parameters together:

```
set radio 923.125,62.5,8,8
reboot
```

Verify with:

```
get radio
get freq
```

Radio parameter changes require a reboot to apply.

## First commands to run

These are useful when you connect to an unknown device:

```
ver
board
get role
get name
get radio
get public.key
get bootloader.ver
clock
stats-core
stats-radio
```

Use these before changing anything. They help identify firmware, board, role, radio settings, and current radio conditions.

## Operational commands

| Command | Purpose | Notes |
| --- | --- | --- |
| `reboot` | Reboot the node | Use after settings that require reboot |
| `poweroff` | Power off / shut down the node | Board support dependent; no return |
| `shutdown` | Alias for `poweroff` | Board support dependent; no return |
| `clkreboot` | Reset clock and reboot | Useful if clock state is bad |
| `clock` | Show current UTC time | Check time state |
| `clock sync` | Sync clock with remote device | Use from a connected client/tool |
| `time <epoch_seconds>` | Set time | Uses Unix epoch seconds |
| `advert` | Send a flood advert | Can travel via repeaters |
| `advert.zerohop` | Send a zero-hop advert | Direct/local radio range only |
| `start ota` | Start OTA firmware update | Device/support dependent |
| `erase` | Factory reset / erase | Serial only; destructive |

## Radio commands

| Command | Purpose |
| --- | --- |
| `get radio` | Show radio parameters |
| `set radio <freq>,<bw>,<sf>,<cr>` | Set frequency, bandwidth, spreading factor, and coding rate |
| `get freq` | Show frequency |
| `set freq <frequency>` | Set frequency only; serial only in upstream docs |
| `get tx` | Show transmit power setting |
| `set tx <dbm>` | Set LoRa chip transmit power |
| `tempradio <freq>,<bw>,<sf>,<cr>,<timeout_mins>` | Temporarily change radio settings until reboot/timeout |
| `get radio.rxgain` | Show RX boosted gain mode where supported |
| `set radio.rxgain on` | Enable boosted RX gain where supported |
| `set radio.rxgain off` | Disable boosted RX gain where supported |

Transmit power is not the same as legal EIRP. EIRP depends on transmitter power, board RF path, feedline loss, and antenna gain.

## Identity and basic node settings

| Command | Purpose |
| --- | --- |
| `get name` | Show node name |
| `set name <name>` | Set node name |
| `get lat` | Show configured latitude |
| `set lat <degrees>` | Set latitude |
| `get lon` | Show configured longitude |
| `set lon <degrees>` | Set longitude |
| `get public.key` | Show public key |
| `get prv.key` | Show private key; serial only |
| `set prv.key <private_key>` | Set private key; requires reboot |
| `password <new_password>` | Change admin password |
| `get guest.password` | Show guest password |
| `set guest.password <password>` | Set guest password |
| `get owner.info` | Show owner information |
| `set owner.info <text>` | Set owner information |
| `get role` | Show configured role |

Do not post private keys or passwords publicly.

## Bootloader, power, and OTA commands

| Command | Purpose | Notes |
| --- | --- | --- |
| `get bootloader.ver` | Show the bootloader version | nRF52 only; returns `unknown` if no bootloader version string is found |
| `get pwrmgt.support` | Show whether power management support is compiled in | Returns supported/unsupported |
| `get pwrmgt.source` | Show current power source | nRF52 power-management builds; external or battery |
| `get pwrmgt.bootreason` | Show reset and shutdown reason strings | Useful for diagnosing watchdog, low voltage, or boot protection events |
| `get pwrmgt.bootmv` | Show boot voltage in millivolts | Useful for battery/power debugging |
| `start ota` | Start an OTA firmware update | Device/support dependent |

For nRF52-based repeaters, use `get bootloader.ver` after flashing the Oltaco DFU Bootloader so you can confirm what the device reports before formatting/flashing MeshCore repeater firmware.

The MeshCore source currently searches nRF52 flash for a `UF2 Bootloader` version string. On non-nRF52 builds, `get bootloader.ver` returns unsupported.

Power-management commands are especially useful for remote/solar repeaters because they can show boot voltage, power source, and reset/shutdown reasons.

## Statistics and diagnostics

| Command | Purpose | Notes |
| --- | --- | --- |
| `stats-core` | Battery, uptime, queue length, debug flags | Serial only |
| `stats-radio` | Noise floor, last RSSI/SNR, airtime, receive errors | Serial only |
| `stats-packets` | Packet counters | Serial only |
| `clear stats` | Clear statistics | Useful before a test window |

Useful troubleshooting pattern:

```
clear stats
stats-core
stats-radio
```

Then perform a test, wait, and check `stats-core` / `stats-radio` again.

## Logging commands

| Command | Purpose | Notes |
| --- | --- | --- |
| `log start` | Begin capture of RX log to node storage | Use before a test |
| `log stop` | End capture | Stop after test |
| `log` | Print captured log | Serial only |
| `log erase` | Erase captured log | Use when done |

Logs can be useful for debugging, but do not publish private details without checking the output.

## Repeater essentials

| Command | Purpose |
| --- | --- |
| `get repeat` | Show repeater forwarding flag |
| `set repeat on` | Enable repeater forwarding |
| `set repeat off` | Disable repeater forwarding |
| `get path.hash.mode` | Show advert path hash size |
| `set path.hash.mode <0-2>` | Set path hash size used by this repeater's own adverts |
| `get loop.detect` | Show loop detection mode |
| `set loop.detect off` | Disable loop detection |
| `set loop.detect minimal` | Minimal loop detection |
| `set loop.detect moderate` | Moderate loop detection |
| `set loop.detect strict` | Strict loop detection |
| `powersaving` | Show repeater power saving state |
| `powersaving on` | Enable repeater power saving |
| `powersaving off` | Disable repeater power saving |

For SA:MUG repeater profile blocks, use [Repeater settings profiles](/meshcore/repeater-settings).

## Flood and advert controls

| Command | Purpose |
| --- | --- |
| `get flood.advert.interval` | Show flood advert interval in hours |
| `set flood.advert.interval <hours>` | Set flood advert interval; typical allowed range is 3-168, or 0 to disable where supported |
| `get advert.interval` | Show zero-hop/local advert interval in minutes |
| `set advert.interval <minutes>` | Set zero-hop advert interval; typically 60-240 minutes, rounded down to even minutes |
| `get flood.max` | Show maximum flood forwarding hop count |
| `set flood.max <value>` | Set maximum flood forwarding hop count |
| `get flood.max.unscoped` | Show maximum hop count for unscoped flood packets |
| `set flood.max.unscoped <value>` | Limit unscoped flood propagation |
| `get flood.max.advert` | Show maximum hop count for advert flood packets |
| `set flood.max.advert <value>` | Limit advert flood propagation |

Use conservative values unless the site role and field testing justify more forwarding.

## Delay and collision controls

| Command | Purpose | Notes |
| --- | --- | --- |
| `get txdelay` | Show flood retransmit delay factor | Default upstream docs: `0.5` |
| `set txdelay <value>` | Set flood retransmit delay factor | Valid range in upstream docs: 0-2 |
| `get direct.txdelay` | Show direct/routed retransmit delay factor | Default upstream docs: `0.2` |
| `set direct.txdelay <value>` | Set direct/routed retransmit delay factor | Valid range in upstream docs: 0-2 |
| `get rxdelay` | Show received flood processing delay base | Experimental |
| `set rxdelay <value>` | Set received flood processing delay base | Upstream docs range: 0-20 |
| `get multi.acks` | Show multi-acks state | Default upstream docs: `0` |
| `set multi.acks <0 or 1>` | Disable/enable multi-acks | Keep off by default unless deliberately testing |

Important `rxdelay` warning:

- `rxdelay 0` disables rxdelay.
- `rxdelay 1` is a no-op.
- `rxdelay > 1` gives the intended weak-packet delay behaviour.
- `0 < rxdelay < 1` inverts behaviour and should be avoided.

For details, see [rxdelay and txdelay calculations](/meshcore/rxdelay-txdelay).

## Interference and duty-cycle controls

| Command | Purpose |
| --- | --- |
| `get int.thresh` | Show local interference threshold |
| `set int.thresh <value>` | Set local interference threshold |
| `get dutycycle` | Show duty cycle limit |
| `set dutycycle <value>` | Set duty cycle percentage |
| `get af` | Show deprecated airtime factor |
| `set af <value>` | Set deprecated airtime factor; use dutycycle on newer firmware |
| `get agc.reset.interval` | Show AGC reset interval |
| `set agc.reset.interval <value>` | Set AGC reset interval in seconds, rounded down to multiple of 4 |

Be careful with `int.thresh` on noisy or high sites. If set too low, the repeater may keep treating the channel as busy.

## Neighbor commands for repeaters

| Command | Purpose |
| --- | --- |
| `neighbors` | List nearby neighbors; limited to recent adverts |
| `neighbor.remove <pubkey_prefix>` | Remove matching neighbor entries |
| `discover.neighbors` | Discover zero-hop neighbors |

Neighbor output is encoded in the upstream docs as:

```
{pubkey-prefix}:{timestamp}:{snr*4}
```

## Room server / ACL commands

| Command | Purpose |
| --- | --- |
| `get acl` | View current ACL; serial only |
| `setperm <pubkey> <permissions>` | Add, update, or remove companion permissions |
| `get allow.read.only` | Show room server read-only flag |
| `set allow.read.only on` | Enable read-only mode |
| `set allow.read.only off` | Disable read-only mode |

Permission values:

| Value | Meaning |
| --- | --- |
| `0` | Guest |
| `1` | Read-only |
| `2` | Read-write |
| `3` | Admin |

If `permissions` is omitted from `setperm`, the entry is removed.

## Region commands

Region management is more advanced. Do not change region rules casually on community repeaters.

| Command | Purpose |
| --- | --- |
| `region load` | Bulk-load region lists interactively |
| `region load <name> [F]` | Load a region; optional `F` allows flooding |
| `region save` | Save region changes made since reboot |
| `region allowf <name>` | Allow flooding for a region |
| `region denyf <name>` | Block flooding for a region |
| `region get <name>` | Show region information |
| `region list allowed` | List flood-allowed regions |
| `region list denied` | List flood-denied regions |
| `region home` | Show home region |
| `region home <name>` | Set home region |
| `region default` | Show default scope region |
| `region default <name>` | Set default scope region |
| `region default <null>` | Clear default scope region |
| `region put <name> [parent_name]` | Create a region |

Wildcard `*` represents the wildcard region. Be careful: wildcard rules can affect unscoped traffic.

## Common readback block for repeaters

After applying a repeater profile, read back:

```
ver
board
get role
get name
get radio
get repeat
get advert.interval
get flood.advert.interval
get flood.max
get flood.max.unscoped
get flood.max.advert
get path.hash.mode
get loop.detect
get txdelay
get direct.txdelay
get rxdelay
get multi.acks
stats-core
stats-radio
```

## Common setup snippet for local radio settings

```
set radio 923.125,62.5,8,8
reboot
```

After reboot:

```
get radio
stats-radio
```

## When asking for help

Include:

- device model
- firmware role and version if known
- relevant `get` output
- `stats-core` and `stats-radio` output if available
- antenna and power setup
- what you changed
- what you expected
- what happened instead

Do not include private keys, admin passwords, or other secrets.

## Where to go next

- [SA:MUG recommended settings](/meshcore/recommended-settings)
- [Repeater settings profiles](/meshcore/repeater-settings)
- [Repeater deployment checklist](/meshcore/repeater-deployment-checklist)
- [Troubleshooting](/meshcore/troubleshooting)
- [Glossary](/meshcore/glossary)
