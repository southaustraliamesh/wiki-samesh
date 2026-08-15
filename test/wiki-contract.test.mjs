import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

async function listMarkdown(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) files.push(...await listMarkdown(path));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(path);
  }
  return files;
}

describe('SA Mesh wiki contract', () => {
  it('configures public domains and key links', async () => {
    const config = await readFile(new URL('../docusaurus.config.js', import.meta.url), 'utf8');
    assert.match(config, /https:\/\/wiki\.samesh\.au/);
    assert.match(config, /https:\/\/samesh\.au\//);
    assert.match(config, /https:\/\/sa\.themesh\.au\/map/);
    assert.match(config, /https:\/\/discord\.gg\/w9b7EBNC8X/);
    assert.match(config, /favicon: 'img\/favicon\.ico'/);
    assert.match(config, /alt: 'SA Mesh South Australia community logo'/);
  });

  it('ships explicit robots rules and sitemap pointers', async () => {
    const robots = await readFile(new URL('../static/robots.txt', import.meta.url), 'utf8');
    assert.match(robots, /User-agent: \*/);
    assert.match(robots, /Allow: \//);
    assert.match(robots, /Sitemap: https:\/\/wiki\.samesh\.au\/sitemap\.xml/);
    assert.match(robots, /Sitemap: https:\/\/samesh\.au\/sitemap\.xml/);
    assert.doesNotMatch(robots, /<!doctype html>/i);
  });

  it('uses the current SA Mesh Discord invite across public docs', async () => {
    const files = await listMarkdown(fileURLToPath(new URL('../docs', import.meta.url)));
    const combined = (await Promise.all(files.map((file) => readFile(file, 'utf8')))).join('\n');
    assert.match(combined, /https:\/\/discord\.gg\/w9b7EBNC8X/);
    assert.doesNotMatch(combined, /https:\/\/discord\.gg\/sauMmjJpTB/);
  });

  it('keeps SA radio baseline visible in migrated docs', async () => {
    const settings = await readFile(new URL('../docs/meshcore/recommended-settings.md', import.meta.url), 'utf8');
    assert.match(settings, /923\.125 MHz/);
    assert.match(settings, /62\.5 kHz/);
    assert.match(settings, /8/);
  });

  it('adds the migrated MeshCore page set and getting-started path', async () => {
    const sidebar = await readFile(new URL('../sidebars.js', import.meta.url), 'utf8');
    for (const doc of ['getting-started', 'meshcore/south-australia', 'meshcore/getting-started', 'meshcore/hardware-builds', 'meshcore/companion-node', 'meshcore/repeater-node', 'meshcore/cli-quick-reference', 'meshcore/rxdelay-txdelay']) {
      assert.match(sidebar, new RegExp(doc.replace('/', '\\/')));
    }
  });

  it('adds MeshCore hardware build guidance from the build-sharing checklist', async () => {
    const page = await readFile(new URL('../docs/meshcore/hardware-builds.md', import.meta.url), 'utf8');
    assert.match(page, /title: MeshCore Hardware Builds/);
    assert.match(page, /What's needed to share a build/);
    for (const item of ['purpose and expected environment', 'device\/board model', 'firmware and role', 'power source and charging details', 'enclosure and waterproofing notes', 'antenna\/feedline details', 'photos or diagrams', 'known limitations and maintenance requirements']) {
      assert.match(page, new RegExp(item));
    }
    assert.match(page, /MeshCore-first/);
    assert.match(page, /companion or repeater firmware/);
  });

  it('adds a MeshCore South Australia search-intent page', async () => {
    const page = await readFile(new URL('../docs/meshcore/south-australia.md', import.meta.url), 'utf8');
    assert.match(page, /title: MeshCore South Australia/);
    assert.match(page, /description: "Start here for the South Australian MeshCore community/);
    assert.match(page, /# MeshCore South Australia/);
    assert.match(page, /https:\/\/samesh\.au\//);
    assert.match(page, /https:\/\/discord\.gg\/w9b7EBNC8X/);
    assert.match(page, /923\.125 MHz/);
  });

  it('sets useful page descriptions and descriptive logo alt text', async () => {
    const intro = await readFile(new URL('../docs/intro.md', import.meta.url), 'utf8');
    const gettingStarted = await readFile(new URL('../docs/getting-started.md', import.meta.url), 'utf8');
    const meshCoreGettingStarted = await readFile(new URL('../docs/meshcore/getting-started.md', import.meta.url), 'utf8');
    const settings = await readFile(new URL('../docs/meshcore/recommended-settings.md', import.meta.url), 'utf8');
    const resources = await readFile(new URL('../docs/community/resources.md', import.meta.url), 'utf8');
    const css = await readFile(new URL('../src/css/custom.css', import.meta.url), 'utf8');

    assert.match(intro, /description: SA Mesh is the South Australian MeshCore community knowledge base/);
    assert.match(intro, /!\[SA Mesh South Australia community banner\]/);
    assert.match(gettingStarted, /description: Choose a South Australian mesh path/);
    assert.match(meshCoreGettingStarted, /description: MeshCore South Australia getting-started guide/);
    assert.match(settings, /description: South Australian MeshCore radio settings/);
    assert.match(resources, /description: SA Mesh community resource links/);
    assert.doesNotMatch(settings, /description: \{\/ migrated \/\}/);
    assert.match(css, /SA Mesh South Australia community banner/);
  });

  it('keeps top-level getting started separate from MeshCore setup', async () => {
    const topLevel = await readFile(new URL('../docs/getting-started.md', import.meta.url), 'utf8');
    const meshCore = await readFile(new URL('../docs/meshcore/getting-started.md', import.meta.url), 'utf8');
    assert.match(topLevel, /title: Getting Started/);
    assert.match(topLevel, /MeshCore or Meshtastic/);
    assert.match(meshCore, /title: Getting started with MeshCore/);
    assert.match(meshCore, /# Getting started with MeshCore/);
  });

  it('adds remaining migrated Meshtastic pages with human-friendly nav', async () => {
    const sidebar = await readFile(new URL('../sidebars.js', import.meta.url), 'utf8');
    for (const doc of ['meshtastic/getting-started', 'meshtastic/node-settings', 'meshtastic/mqtt-gateways', 'meshtastic/maps', 'hardware/meshtastic-node-builds', 'hardware/antennas']) {
      assert.match(sidebar, new RegExp(doc.replace('/', '\\/')));
    }
    for (const label of ['Meshtastic', 'Getting Started', 'Node Settings', 'MQTT & Gateways', 'Maps', 'Meshtastic Builds', 'Node Builds', 'Antennas']) {
      assert.match(sidebar, new RegExp(`label: '${label.replace('&', '\\&')}'`));
    }
  });

  it('moves hardware navigation into MeshCore and Meshtastic sections', async () => {
    const sidebar = await readFile(new URL('../sidebars.js', import.meta.url), 'utf8');
    const meshCoreStart = sidebar.indexOf("label: 'MeshCore'");
    const meshtasticStart = sidebar.indexOf("label: 'Meshtastic'");
    const glossaryStart = sidebar.indexOf("label: 'Glossary'");
    const communityStart = sidebar.indexOf("label: 'Community'");
    const hardwareStart = sidebar.indexOf("label: 'Hardware'");
    const companionStart = sidebar.indexOf("label: 'Companions'");
    const repeaterStart = sidebar.indexOf("label: 'Repeaters'");
    const meshtasticBuildsStart = sidebar.indexOf("label: 'Meshtastic Builds'");
    const meshtasticNodeBuildsStart = sidebar.indexOf("id: 'hardware/meshtastic-node-builds'");
    const antennasStart = sidebar.indexOf("id: 'hardware/antennas'");

    assert.ok(hardwareStart > meshCoreStart && hardwareStart < meshtasticStart, 'Hardware should be nested under MeshCore');
    assert.ok(companionStart > hardwareStart && companionStart < meshtasticStart, 'Companions should be nested under MeshCore Hardware');
    assert.ok(repeaterStart > hardwareStart && repeaterStart < meshtasticStart, 'Repeaters should be nested under MeshCore Hardware');
    assert.ok(meshtasticBuildsStart > meshtasticStart && meshtasticBuildsStart < glossaryStart, 'Meshtastic Builds should be nested under Meshtastic');
    assert.ok(meshtasticNodeBuildsStart > meshtasticBuildsStart && meshtasticNodeBuildsStart < glossaryStart, 'Meshtastic node builds should sit under Meshtastic Builds');
    assert.ok(antennasStart > meshtasticBuildsStart && antennasStart < glossaryStart, 'Antennas should sit under Meshtastic Builds');
    assert.ok(glossaryStart > meshtasticStart && glossaryStart < communityStart, 'Glossary should remain global before Community');
  });

  it('keeps the mobile navbar sidebar above page content', async () => {
    const css = await readFile(new URL('../src/css/custom.css', import.meta.url), 'utf8');
    assert.match(css, /@media \(max-width: 996px\)/);
    assert.match(css, /-webkit-backdrop-filter:\s*none/);
    assert.match(css, /backdrop-filter:\s*none/);
    assert.match(css, /\.navbar-sidebar,\s*\n\s*\.navbar-sidebar__backdrop/);
    assert.match(css, /height:\s*100dvh\s*!important/);
    assert.match(css, /left:\s*var\(--ifm-navbar-sidebar-width\)/);
    assert.match(css, /isolation:\s*isolate/);
    assert.match(css, /\.navbar-sidebar__item/);
    assert.match(css, /color:\s*#f8fafc\s*!important/);
    assert.match(css, /\.navbar-sidebar__items/);
    assert.match(css, /max-height:\s*calc\(100dvh - var\(--ifm-navbar-height\)\)/);
    assert.match(css, /overscroll-behavior:\s*contain/);
  });

  it('uses the supplied wide SAMUG logo artwork in the navbar', async () => {
    const logo = await readFile(new URL('../static/img/samug-logo.png', import.meta.url));
    assert.equal(logo.readUInt32BE(16), 900);
    assert.equal(logo.readUInt32BE(20), 300);
    const css = await readFile(new URL('../src/css/custom.css', import.meta.url), 'utf8');
    assert.match(css, /\.navbar__logo \{ width:138px/);
    assert.match(css, /\.navbar__logo img \{ width:138px/);
  });

  it('keeps Meshtastic migration conservative and source-noted', async () => {
    const files = await listMarkdown(new URL('../docs/meshtastic', import.meta.url));
    assert.ok(files.length >= 4);
    const hardwareFiles = await listMarkdown(new URL('../docs/hardware', import.meta.url));
    const combined = (await Promise.all([...files, ...hardwareFiles].map((file) => readFile(fileURLToPath(file), 'utf8')))).join('\n');
    assert.match(combined, /Migrated from the legacy SA:MUG Wiki.js Meshtastic page/);
    assert.match(combined, /current primary documentation path remains MeshCore/);
    assert.match(combined, /legal EIRP/);
    assert.match(combined, /location/i);
    assert.match(combined, /battery|waterproofing|lightning/i);
  });

  it('uses human-friendly NSW-style sidebar labels instead of raw page titles', async () => {
    const sidebar = await readFile(new URL('../sidebars.js', import.meta.url), 'utf8');
    for (const label of ['South Australia', 'Getting Started', 'Overview', 'Frequency & Settings', 'Hardware', 'Hardware Builds', 'Companions', 'Repeaters', 'Deployment Checklist', 'Settings Profiles', 'Reference', 'CLI Commands', 'Delay Calculations']) {
      assert.match(sidebar, new RegExp(`label: '${label.replace('&', '\\&')}'`));
    }
    assert.doesNotMatch(sidebar, /label: 'MeshCore start here'/);
    assert.doesNotMatch(sidebar, /label: 'MeshCore CLI quick reference'/);
    assert.doesNotMatch(sidebar, /label: 'MeshCore rxdelay and txdelay explanation and calculations'/);
  });

  it('nests MeshCore-only reference pages under MeshCore and keeps Glossary global', async () => {
    const sidebar = await readFile(new URL('../sidebars.js', import.meta.url), 'utf8');
    const meshCoreStart = sidebar.indexOf("label: 'MeshCore'");
    const meshtasticStart = sidebar.indexOf("label: 'Meshtastic'");
    const glossaryStart = sidebar.indexOf("label: 'Glossary'");
    const communityStart = sidebar.indexOf("label: 'Community'");
    for (const needle of ["id: 'meshcore/hardware-builds'", "id: 'meshcore/companion-node'", "id: 'meshcore/repeater-node'", "id: 'meshcore/cli-quick-reference'", "id: 'meshcore/rxdelay-txdelay'", "label: 'Reference'"]) {
      const index = sidebar.indexOf(needle);
      assert.ok(index > meshCoreStart && index < meshtasticStart, `${needle} should be inside MeshCore before Meshtastic`);
    }
    assert.ok(glossaryStart > meshtasticStart && glossaryStart < communityStart, 'Glossary should remain global before Community');
  });

  it('keeps migrated docs source-noted and public-safe', async () => {
    const files = await listMarkdown(new URL('../docs/meshcore', import.meta.url));
    assert.ok(files.length >= 12);
    const combined = (await Promise.all(files.map((file) => readFile(fileURLToPath(file), 'utf8')))).join('\n');
    assert.match(combined, /Source note|Credits and inspiration/);
    assert.doesNotMatch(combined, /patch-only commands as public guidance/i);
  });
});
