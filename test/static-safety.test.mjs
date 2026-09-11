import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = new URL('..', import.meta.url).pathname;

function filesUnder(directory) {
  return readdirSync(directory).flatMap(name => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesUnder(path) : [path];
  });
}

test('sample data follows the generic public contract', () => {
  const sample = JSON.parse(readFileSync(join(root, 'demo/data/sample.json'), 'utf8'));
  assert.equal(typeof sample.generatedAt, 'string');
  assert.ok(Array.isArray(sample.nodes));
  assert.ok(sample.nodes.length > 10);

  const ids = new Set(sample.nodes.map(node => node.id));
  assert.equal(ids.size, sample.nodes.length);
  for (const node of sample.nodes) {
    assert.equal(typeof node.id, 'string');
    assert.equal(typeof node.submittedAt, 'string');
    assert.equal(typeof node.label, 'string');
    assert.ok(node.parent === null || ids.has(node.parent));
  }
});

test('archive does not contain production-specific terms', () => {
  const text = filesUnder(root)
    .filter(path => !path.includes('/.git/') && !path.includes('/test/'))
    .map(path => readFileSync(path, 'utf8'))
    .join('\n')
    .toLowerCase();

  for (const forbidden of [
    'mysql',
    'customer_code',
    'recruitment_application',
    'vpn',
    'sftp',
    'turbotang.top',
    'echo.turbotang',
    '完整手机号'
  ]) {
    assert.equal(text.includes(forbidden), false, `found forbidden term: ${forbidden}`);
  }
});

test('demo keeps backend integration as a static json fetch', () => {
  const script = readFileSync(join(root, 'demo/assets/app.js'), 'utf8');
  assert.equal(script.includes("const DATA_URL = './data/sample.json'"), true);
  assert.equal(script.includes("fetch(DATA_URL, { cache: 'no-store' })"), true);
});

test('README shows a public-safe demo screenshot', () => {
  const readme = readFileSync(join(root, 'README.md'), 'utf8');
  assert.equal(readme.includes('![时间分层关系图示例](docs/assets/demo-screenshot.png)'), true);
  assert.equal(statSync(join(root, 'docs/assets/demo-screenshot.png')).isFile(), true);
});
