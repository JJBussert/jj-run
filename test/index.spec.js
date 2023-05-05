import { expect, test } from 'vitest';
import { run } from '../src';
import fs from 'fs';

test('run function with echo command', async ({ is }) => {
  const result = run('echo "Hello, World!"', '.env', true);
  expect(result).eq('Hello, World!');
});

test('run function with echo command for environment variable', async ({ is }) => {
  // arrange
  const envFile = '.env.test';
  fs.writeFileSync(envFile, 'UNIT_TEST="Hello World"\n');

  // act
  const result = run('echo "$UNIT_TEST"', envFile, true);
  
  // assert
  expect(result).eq('Hello World');

  // cleanup
  fs.unlinkSync(envFile);
});

test('run function with non-existent command', async ({ is }) => {
  try {
    run('nonexistent-command', '.env', true);
  } catch (error) {
    expect(error.code).eq('ENOENT');
  }
});