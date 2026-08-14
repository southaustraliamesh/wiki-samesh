import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

describe('SA Mesh wiki contract', () => {
  it('configures public domains and key links', async () => {
    const config = await readFile(new URL('../docusaurus.config.js', import.meta.url), 'utf8');
    assert.match(config, /https:\/\/wiki\.samesh\.au/);
    assert.match(config, /https:\/\/samesh\.au\//);
    assert.match(config, /https:\/\/sa\.themesh\.au\/map/);
  });

  it('keeps SA radio baseline visible in docs', async () => {
    const settings = await readFile(new URL('../docs/meshcore/local-settings.md', import.meta.url), 'utf8');
    assert.match(settings, /923\.125 MHz/);
    assert.match(settings, /62\.5 kHz/);
    assert.match(settings, /SF8/);
    assert.match(settings, /CR8/);
  });
});
