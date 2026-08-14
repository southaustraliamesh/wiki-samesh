---
title: Node Settings
---

# Meshtastic Node Settings

:::info Source note
Migrated from the legacy SA:MUG Wiki.js Meshtastic page. Meshtastic is included for historical/community completeness; SA Mesh's current primary documentation path remains MeshCore. Validate firmware/app behaviour against current Meshtastic docs before treating settings as universal defaults.
:::

This page summarises configurable Meshtastic node settings from the legacy SA:MUG wiki. App names and firmware behaviour can change, so treat this as a map of settings to review rather than a current upstream command reference.

## LoRa configuration

| Setting | Description |
| --- | --- |
| Region | Use Australia / New Zealand, AU915, when operating locally in Australia |
| Modem preset | Legacy SA:MUG page used `ShortFast` |
| Frequency slot | Legacy SA:MUG page used Slot 16 / 918.875 MHz |
| Max hops | Maximum packet rebroadcast count |
| Transmit power | RF output power; legal EIRP also depends on antenna/feedline |
| Bandwidth / SF / CR | Advanced radio tuning derived from preset unless manually changed |
| Transmit enabled | Enables or disables packet transmission |
| Ignore incoming | Node IDs to ignore |
| OK to MQTT | Allows selected traffic to be forwarded toward MQTT brokers |

## Position configuration

| Setting | Description |
| --- | --- |
| GPS mode | Enabled, disabled or not present depending on hardware |
| GPS update interval | How often the device checks position |
| Fixed position | Static position for non-GPS devices |
| Smart broadcast | Reduces updates when not moving |
| Broadcast interval | Periodic location report interval |
| Packet flags | Optional altitude, heading, speed, battery and related fields |

## Device configuration

| Setting | Description |
| --- | --- |
| Role | Client, router, repeater, tracker, sensor and other firmware-supported roles |
| Rebroadcast mode | Controls packet handling/rebroadcast behaviour |
| User button GPIO | Physical button mapping |
| PWM buzzer GPIO | Sound output mapping |
| Node info interval | How often node information is broadcast |
| Timezone | Local time display/features |
| LED heartbeat | Status LED behaviour |

## Security configuration

| Setting | Description |
| --- | --- |
| Public/private keys | Automatically managed encryption identity |
| Admin key | Keys allowed to issue admin commands |
| Managed mode | Locks configuration to authorised keys |
| Serial console | Enables USB serial access |
| Debug logging | Verbose logs for troubleshooting only |
| Admin channel | Legacy admin-control channel feature |

:::warning Privacy and safety
Do not post private keys, admin keys, passwords, full Wi-Fi credentials or precise private-location details in public support channels.
:::

## Network configuration

| Setting | Description |
| --- | --- |
| Wi-Fi enabled | ESP32 network support where available |
| SSID / PSK | Local Wi-Fi credentials |
| Ethernet enabled | LAN support on compatible hardware |
| NTP server | Time sync source |
| Static IP settings | IP, gateway, subnet and DNS when not using DHCP |
| Rsyslog server | Remote log target |

## Modules

### MQTT module

| Setting | Description |
| --- | --- |
| Enabled | Enables MQTT support |
| Broker address | MQTT or TLS MQTT host/port |
| Username / password | Broker authentication if required |
| TLS enabled | Secure broker connection |
| JSON enabled | JSON message format |
| Root topic | MQTT topic prefix |
| Client proxy | Use phone internet for MQTT |
| Map reporting enabled | Include node in a public map feed |
| Map reporting precision | Location precision for reports |
| Map report interval | Time between reports |

### Telemetry module

| Setting | Description |
| --- | --- |
| Environmental telemetry | Temperature, humidity and pressure where hardware supports it |
| Power metrics | Battery, solar and voltage reporting |
| Air quality | PM2.5 / PM10 reporting where hardware supports it |
| Update interval | Reporting frequency |

### Serial module

| Setting | Description |
| --- | --- |
| Mode | Text, simple, protobuf and other supported modes |
| Baud rate | Serial communication speed |
| RX/TX GPIO | Serial pin mapping |
| Override console | Uses this serial port instead of USB serial where supported |
| Echo | Repeats serial input |

## Good habits

- Backup configuration before changing multiple settings.
- Test coverage with low-risk portable nodes before installing fixed infrastructure.
- Secure admin access for gateways or shared nodes.
- Change one setting at a time when troubleshooting.
