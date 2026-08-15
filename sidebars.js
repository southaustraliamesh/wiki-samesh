const sidebars = {
  wikiSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'SA Mesh Wiki'
    },
    {
      type: 'doc',
      id: 'getting-started',
      label: 'Getting Started'
    },
    {
      type: 'category',
      label: 'MeshCore',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'meshcore/south-australia',
          label: 'South Australia'
        },
        {
          type: 'doc',
          id: 'meshcore/getting-started',
          label: 'Getting Started'
        },
        {
          type: 'doc',
          id: 'meshcore/start-here',
          label: 'Overview'
        },
        {
          type: 'doc',
          id: 'meshcore/recommended-settings',
          label: 'Frequency & Settings'
        },
        {
          type: 'doc',
          id: 'meshcore/routing',
          label: 'Routing'
        },
        {
          type: 'doc',
          id: 'meshcore/troubleshooting',
          label: 'Troubleshooting'
        },
        {
          type: 'category',
          label: 'Hardware',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'meshcore/hardware-builds',
              label: 'Hardware Builds'
            },
            {
              type: 'category',
              label: 'Companions',
              collapsed: false,
              items: [
                {
                  type: 'doc',
                  id: 'meshcore/companion-node',
                  label: 'Overview'
                }
              ]
            },
            {
              type: 'category',
              label: 'Repeaters',
              collapsed: false,
              items: [
                {
                  type: 'doc',
                  id: 'meshcore/repeater-node',
                  label: 'Overview'
                },
                {
                  type: 'doc',
                  id: 'meshcore/repeater-deployment-checklist',
                  label: 'Deployment Checklist'
                },
                {
                  type: 'doc',
                  id: 'meshcore/repeater-settings',
                  label: 'Settings Profiles'
                }
              ]
            }
          ]
        },
        {
          type: 'category',
          label: 'Reference',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'meshcore/cli-quick-reference',
              label: 'CLI Commands'
            },
            {
              type: 'doc',
              id: 'meshcore/rxdelay-txdelay',
              label: 'Delay Calculations'
            }
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Meshtastic',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'meshtastic/getting-started',
          label: 'Getting Started'
        },
        {
          type: 'doc',
          id: 'meshtastic/node-settings',
          label: 'Node Settings'
        },
        {
          type: 'doc',
          id: 'meshtastic/mqtt-gateways',
          label: 'MQTT & Gateways'
        },
        {
          type: 'doc',
          id: 'meshtastic/maps',
          label: 'Maps'
        },
        {
          type: 'category',
          label: 'Meshtastic Builds',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'hardware/meshtastic-node-builds',
              label: 'Node Builds'
            },
            {
              type: 'doc',
              id: 'hardware/antennas',
              label: 'Antennas'
            }
          ]
        }
      ]
    },
    {
      type: 'doc',
      id: 'meshcore/glossary',
      label: 'Glossary'
    },
    {
      type: 'category',
      label: 'Community',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'community/resources',
          label: 'Resources'
        },
        {
          type: 'doc',
          id: 'community/contributing',
          label: 'Contributing'
        }
      ]
    }
  ]
};

module.exports = sidebars;
