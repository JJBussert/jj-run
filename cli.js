#!/usr/bin/env node

// cli.mjs

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { run } from './src/jj-run.js';

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

run(cmd, argv.env);
