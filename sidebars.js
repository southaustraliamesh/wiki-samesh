const sidebars = {
  wikiSidebar: [
    'intro',
    {
      type: 'category',
      label: 'MeshCore',
      collapsed: false,
      items: [
        'meshcore/getting-started',
        'meshcore/start-here',
        'meshcore/companion-node',
        'meshcore/repeater-node',
        'meshcore/repeater-deployment-checklist',
        'meshcore/repeater-settings',
        'meshcore/recommended-settings',
        'meshcore/cli-quick-reference',
        'meshcore/troubleshooting',
        'meshcore/rxdelay-txdelay',
        'meshcore/routing',
        'meshcore/glossary'
      ]
    },
    {
      type: 'category',
      label: 'Community',
      collapsed: false,
      items: ['community/resources', 'community/contributing']
    }
  ]
};

module.exports = sidebars;
