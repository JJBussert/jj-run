import { expect, test } from 'vitest';
import { run } from '../src';

test('run function with echo command', async ({ is }) => {
  const result = run('echo "Hello, World!"', '.env', true);
  expect(result, 'Hello, World!');
});

test('run function with non-existent command', async ({ is }) => {
  try {
    run('nonexistent-command', '.env', true);
  } catch (error) {
    expect(error.code, 'ENOENT');
  }
});