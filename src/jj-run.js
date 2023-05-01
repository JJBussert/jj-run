// index.mjs

import { spawnSync } from 'child_process';
import { npmRunPathEnv } from 'npm-run-path';

function run(cmd, envFile, workingDirectory = process.cwd()) {
  const dotenvCliCommand = `dotenv -e ${envFile} --`;
  const crossVarCommand = `cross-var ${cmd}`;
  const combinedCommand = `${dotenvCliCommand} ${crossVarCommand}`;

  const envWithPath = npmRunPathEnv(); // Include local node_modules in PATH

  const subprocess = spawnSync(combinedCommand, {
    cwd: workingDirectory,
    env: { ...process.env, ...envWithPath },
    stdio: 'pipe',
    shell: true,
  });

  if (subprocess.error) {
    console.error('Error:', subprocess.error.message);
    process.exit(1);
  }

  if (subprocess.status !== 0) {
    process.exit(subprocess.status);
  }

  // Return the output as a string
  return subprocess.stdout.toString().trim();
}

export { run };