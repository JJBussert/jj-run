#!/usr/bin/env node

import { spawn } from 'child_process';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { npmRunPathEnv } from 'npm-run-path';

const argv = yargs(hideBin(process.argv))
  .option('e', {
    alias: 'env',
    type: 'string',
    default: '.env',
    describe: 'Path to the .env file'
  })
  .demandCommand(1, 'You must provide a command to run')
  .argv;

const cmd = argv._.join(' ');

const dotenvCliCommand = `dotenv -e ${argv.env} --`;
const crossVarCommand = `cross-var ${cmd}`;
const combinedCommand = `${dotenvCliCommand} ${crossVarCommand}`;

const envWithPath = npmRunPathEnv(); // Include local node_modules in PATH

const subprocess = spawn(combinedCommand, {
  env: { ...process.env, ...envWithPath },
  stdio: 'inherit',
  shell: true,
});

subprocess.on('error', (err) => {
  console.error('Error:', err.message);
  process.exit(1);
});

subprocess.on('exit', (code) => {
  process.exit(code);
});
