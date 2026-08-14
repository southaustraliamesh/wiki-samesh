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

  it('uses human-friendly NSW-style sidebar labels instead of raw page titles', async () => {
    const sidebar = await readFile(new URL('../sidebars.js', import.meta.url), 'utf8');
    for (const label of ['Getting Started', 'Overview', 'Frequency & Settings', 'Hardware', 'Companions', 'Repeaters', 'Deployment Checklist', 'Settings Profiles', 'Reference', 'CLI Commands', 'Delay Calculations']) {
      assert.match(sidebar, new RegExp(`label: '${label.replace('&', '\\&')}'`));
    }
    assert.doesNotMatch(sidebar, /label: 'MeshCore start here'/);
    assert.doesNotMatch(sidebar, /label: 'MeshCore CLI quick reference'/);
    assert.doesNotMatch(sidebar, /label: 'MeshCore rxdelay and txdelay explanation and calculations'/);
  });

  it('keeps migrated docs source-noted and public-safe', async () => {
    const files = await listMarkdown(new URL('../docs/meshcore', import.meta.url));
    assert.ok(files.length >= 12);
    const combined = (await Promise.all(files.map((file) => readFile(fileURLToPath(file), 'utf8')))).join('\n');
    assert.match(combined, /Source note|Credits and inspiration/);
    assert.doesNotMatch(combined, /patch-only commands as public guidance/i);
  });
});
