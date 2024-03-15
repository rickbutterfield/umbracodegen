import { spawn } from 'child_process';
import { Ora } from 'ora';

function runProcess(command: string, cwd: string | undefined = undefined): Promise<number> {
  return new Promise((resolve, reject) => {
    const npmProcess = spawn(command, { cwd, shell: true });

    npmProcess.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });

    npmProcess.on('error', (error) => {
      reject(error);
    });
  });
}

export async function createViteProject(projectAlias: string, spinner: Ora): Promise<void> {
  const command = `npm create vite@5.2.2 ${projectAlias} -- --template lit-ts`;

  try {
    spinner.text = `Creating new project in ${projectAlias}`;
    await runProcess(command);
    spinner.text = 'Project creation successful!';
  } catch (error) {
    console.error('Project creation failed with exit code:', error);
    throw new Error(`Project creation failed with exit code: ${error}`);
  }
}

export async function runNpmInstall(projectAlias: string, spinner: Ora): Promise<void> {
  const command = 'npm install';

  try {
    spinner.text = `Running npm install in ${projectAlias}`;
    await runProcess(command, projectAlias);
    spinner.text = `npm install in ${projectAlias} directory successful!`;
  } catch (error) {
    console.error(`npm install in ${projectAlias} directory failed with exit code:`, error);
    throw new Error(`npm install in ${projectAlias} directory failed with exit code: ${error}`);
  }
}

export async function runBackofficeInstall(projectAlias: string, spinner: Ora): Promise<void> {
  const command = 'npm install --registry https://www.myget.org/F/umbracoprereleases/npm/ -D @umbraco-cms/backoffice@14.0.0-beta001';
  
  try {
    spinner.text = `Running backoffice install in ${projectAlias}`;
    await runProcess(command, projectAlias);
    spinner.text = `Backoffice install in ${projectAlias} successful!`;
  } catch (error) {
    console.error('Backoffice install failed with exit code:', error);
    throw new Error(`Packoffice install failed with exit code: ${error}`);
  }
}