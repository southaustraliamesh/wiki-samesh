const config = {
  title: 'SA Mesh Wiki',
  tagline: 'South Australian MeshCore community knowledge base',
  favicon: 'img/favicon.ico',
  url: 'https://wiki.samesh.au',
  baseUrl: '/',
  organizationName: 'southaustraliamesh',
  projectName: 'wiki-samesh',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn'
    }
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          editUrl: 'https://github.com/southaustraliamesh/wiki-samesh/tree/preview/'
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css'
        }
      }
    ]
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false
    },
    image: 'img/samug-logo.png',
    navbar: {
      title: 'SA Mesh Wiki',
      logo: {
        alt: 'SA Mesh South Australia community logo',
        src: 'img/samug-logo.png'
      },
      items: [
        { type: 'docSidebar', sidebarId: 'wikiSidebar', position: 'left', label: 'Docs' },
        { href: 'https://samesh.au/', label: 'SA Mesh', position: 'right' },
        { href: 'https://sa.themesh.au/', label: 'Dashboard', position: 'right' },
        { href: 'https://sa.themesh.au/map', label: 'Map', position: 'right' },
        { href: 'https://discord.gg/w9b7EBNC8X', label: 'Discord', position: 'right' },
        { href: 'https://themesh.au/', label: 'AU MeshCore', position: 'right' }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'SA Mesh',
          items: [
            { label: 'Main site', href: 'https://samesh.au/' },
            { label: 'Dashboard', href: 'https://sa.themesh.au/' },
            { label: 'Map', href: 'https://sa.themesh.au/map' },
            { label: 'Discord', href: 'https://discord.gg/w9b7EBNC8X' }
          ]
        },
        {
          title: 'MeshCore',
          items: [
            { label: 'MeshCore docs', href: 'https://docs.meshcore.io/' },
            { label: 'MeshCore source', href: 'https://github.com/meshcore-dev/MeshCore' }
          ]
        }
      ],
      copyright: `SA Mesh community wiki. Content maintained by volunteers.`
    },
    prism: {
      theme: require('prism-react-renderer').themes.dracula,
      darkTheme: require('prism-react-renderer').themes.dracula
    }
  }
};

module.exports = config;
