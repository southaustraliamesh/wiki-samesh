---
title: MQTT & Gateways
---

# Meshtastic MQTT & Gateways

:::info Source note
Migrated from the legacy SA:MUG Wiki.js Meshtastic page. Meshtastic is included for historical/community completeness; SA Mesh's current primary documentation path remains MeshCore. Validate firmware/app behaviour against current Meshtastic docs before treating settings as universal defaults.
:::

Meshtastic nodes can use MQTT to bridge map/telemetry data and, depending on configuration, selected messaging between local RF meshes and internet-connected services.

:::warning Coordinate before enabling gateways
Gateways can affect shared community visibility and traffic patterns. MQTT uplinks can expose traffic metadata, map reports and location information beyond local RF range. Coordinate in the SA:MUG community before running public or always-on gateway infrastructure.
:::

## Why use an MQTT uplink?

- Share location/telemetry data with community maps.
- Connect isolated node clusters for monitoring and dashboards.
- Integrate with tools such as Node-RED, Grafana or custom dashboards.
- Support RF measurement/visibility workflows.

## Legacy SA:MUG broker details

The legacy Wiki.js page listed these public MQTT details:

| Setting | Value |
| --- | --- |
| Broker | `mqtt.peeringsa.net` |
| Port | `1883` |
| Username | `uplink` |
| Password | `uplink` |
| Root topic | `msh/ANZ/SA` |
| Protocol | MQTT v3.1.1 |

The old page also noted that standard Meshtastic default credentials were accepted.

## App configuration outline

1. Open Settings → MQTT in the Meshtastic app.
2. Enable MQTT.
3. Enter the broker, username, password and root topic for the mesh you are joining.
4. Enable map reporting if you deliberately want public map visibility.
5. Enable client proxy only when using a phone/internet-backed client for the uplink.
6. Save and reboot the node if the app/firmware requires it.

## CLI example from the legacy page

```bash
meshtastic --set mqtt.enabled true
meshtastic --set mqtt.address mqtt.peeringsa.net
meshtastic --set mqtt.username uplink
meshtastic --set mqtt.password uplink
meshtastic --set mqtt.rootTopic msh/ANZ/SA
meshtastic --set mqtt.mapReportingEnabled true
meshtastic --set mqtt.clientProxyEnabled true
```

:::note Firmware/app drift
The legacy page referenced Meshtastic firmware v2.2.0 or newer for full MQTT functionality. Check current upstream docs for present-day option names and requirements.
:::

## Position reporting for maps

Example legacy settings for public map reporting:

```bash
meshtastic --set position.fixed_position true
meshtastic --set mqtt.mapReportingEnabled true
meshtastic --set mqtt.mapReportPositionPrecision 5
meshtastic --set mqtt.mapReportPublishInterval 300
```

A five-minute report interval was used as the example. Choose precision carefully so you do not publish sensitive private locations.

## Gateway practices

For more reliable gateway nodes:

- use stable power;
- place the antenna where it has useful RF visibility;
- use a dedicated Wi-Fi/LTE-capable node when appropriate;
- avoid creating unnecessary rebroadcast or downlink traffic;
- document the role and purpose of always-on infrastructure.

The legacy page suggested router-style roles for 24/7 gateways. Confirm current Meshtastic role guidance before copying that into production community defaults.
