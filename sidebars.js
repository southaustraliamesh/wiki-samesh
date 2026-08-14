const sidebars = {
  wikiSidebar: [
    'intro',
    {
      type: 'category',
      label: 'MeshCore',
      collapsed: false,
      items: ['meshcore/start-here', 'meshcore/local-settings', 'meshcore/repeaters']
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
