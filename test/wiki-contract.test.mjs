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
    assert.match(config, /favicon: 'img\/favicon\.ico'/);
  });

  it('keeps SA radio baseline visible in migrated docs', async () => {
    const settings = await readFile(new URL('../docs/meshcore/recommended-settings.md', import.meta.url), 'utf8');
    assert.match(settings, /923\.125 MHz/);
    assert.match(settings, /62\.5 kHz/);
    assert.match(settings, /8/);
  });

  it('adds the migrated MeshCore page set and getting-started path', async () => {
    const sidebar = await readFile(new URL('../sidebars.js', import.meta.url), 'utf8');
    for (const doc of ['getting-started', 'meshcore/getting-started', 'meshcore/companion-node', 'meshcore/repeater-node', 'meshcore/cli-quick-reference', 'meshcore/rxdelay-txdelay']) {
      assert.match(sidebar, new RegExp(doc.replace('/', '\\/')));
    }
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
    for (const label of ['Getting Started', 'Overview', 'Frequency & Settings', 'Hardware', 'Companions', 'Repeaters', 'Deployment Checklist', 'Settings Profiles', 'Reference', 'CLI Commands', 'Delay Calculations']) {
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
    for (const needle of ["id: 'meshcore/cli-quick-reference'", "id: 'meshcore/rxdelay-txdelay'", "label: 'Reference'"]) {
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
