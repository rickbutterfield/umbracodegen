#!/usr/bin/env node
import nodePlop from 'node-plop';
import path from 'path';
import figlet from 'figlet';
import ora from 'ora';

import { program } from 'commander';
import { fileURLToPath } from 'url';

// import { generators } from './generators.js';
import { createViteProject, runNpmInstall, runBackofficeInstall } from './functions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const generatorNames: string[] = Object.keys(generators).filter(x => x !== "builder" && x !== "new");
// const commaSeparatedList: string = generatorNames.join(', ');

const plopfilePath = path.resolve(__dirname, 'plopfile.js');
const plop = await nodePlop(plopfilePath);
plop.load('plop-pack-remove');

figlet('umbracodegen', (err, data) => {
  if (err) {
    console.error('Figlet error:', err);
    return;
  }
  console.log(data);

  program
    .option('-v, --verbose', 'Enable verbose logging')
    .parse(process.argv);

  program
    .name("umbracodegen")
    .version("1.0.0-alpha.7")
    .description("Generate boilerplate code for building v14+ Umbraco packages")
    .alias("umb");

  const options = program.opts();

  program
    .command('new')
    .description('Scaffold a new blank Vite/Lit/TypeScript project from scratch')
    .action(async () => {
      console.log("Let's get a new project generated!");

      const generator = plop.getGenerator('new');
      generator
        .runPrompts()
        .then(async (answers) => {
          const spinner = ora('Generating your new Vite lit-ts project...').start();

          const alias = answers['alias'];
          const folderName = answers['folder'];

          await createViteProject(folderName, spinner);
          const { changes, failures } = await generator.runActions(answers);

          if (options.verbose) {
            console.log("changes", changes);
            console.log("failures", failures);
          }

          spinner.text = 'Project generated! Running `npm install`...';

          await runNpmInstall(folderName, spinner);
          await runBackofficeInstall(folderName, spinner);

          spinner.succeed(`Project ${alias} has been generated successfully!`);
        });
    });

  // program
  //   .command('generate')
  //   .description('Generate a new component')
  //   .argument('[component]', `specify the type of component to create (${commaSeparatedList})`)
  //   .action(async (component) => {
  //     if (component) {
  //       const generator = plop.getGenerator(component);
  //       const answers = await generator.runPrompts();
  //       await generator.runActions(answers);
  //       console.log(`${component} component generated successfully!`);
  //     }
  //     else {
  //       const generator = plop.getGenerator('builder');
  //       const answers = await generator.runPrompts();

  //       const selectedComponent = answers["component"];
  //       const componentGenerator = plop.getGenerator(selectedComponent);

  //       const componentAnswers = await componentGenerator.runPrompts();
  //       await componentGenerator.runActions(componentAnswers);

  //       console.log(`${selectedComponent} component generated successfully!`);
  //     }
  //   });

  program.parse(process.argv);
});