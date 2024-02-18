#!/usr/bin/env node

import { program } from 'commander';
import nodePlop from 'node-plop';
import path from 'path';
import figlet from 'figlet';
import { generators } from './generators.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const plopfilePath = path.resolve(__dirname, 'plopfile.js');

const generatorNames: string[] = Object.keys(generators);
const commaSeparatedList: string = generatorNames.join(', ');

const plop = await nodePlop(plopfilePath);

figlet('umbracodegen', (err, data) => {
  if (err) {
    console.error('Figlet error:', err);
    return;
  }
  console.log(data);

  program
    .name("umbracodegen")
    .version('1.0.0-alpha.0')
    .description("Generate boilerplate code for building v14+ Umbraco packages");

  // Define a CLI command to generate a component using Plop
  program
    .command('new')
    .description('Generate a new blank set of all components');

  program
    .command('generate')
    .description('Generate a new component')
    .argument('[component]', `specify the type of component to create (${commaSeparatedList})`)
    .action((component) => {
      if (component) {
        plop
          .getGenerator(component)
          .runPrompts()
          .then((answers) => {
            plop
              .getGenerator(component)
              .runActions(answers)
              .then(() => {
                console.log(`${component} component generated successfully!`);
              })
              .catch((err) => {
                console.error('Error generating component:', err);
              });
          });
      }
      else {
        plop.getGenerator('builder')
          .runPrompts()
          .then((answers) => {
            const selectedComponent = answers["generator"];
            plop
              .getGenerator(selectedComponent)
              .runPrompts()
              .then((answers) => {
                plop
                  .getGenerator(selectedComponent)
                  .runActions(answers)
                  .then(() => {
                    console.log(`${selectedComponent} component generated successfully!`);
                  })
                  .catch((err) => {
                    console.error('Error generating component:', err);
                  });
              });
        });
      }
    });

  program.parse(process.argv);
});