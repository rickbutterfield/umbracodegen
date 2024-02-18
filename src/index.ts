#!/usr/bin/env node

import { program } from 'commander';
import nodePlop from 'node-plop';
import path from 'path';
import figlet from 'figlet';
import { generators } from './generators.js';
import { fileURLToPath } from 'url';
import { Answers } from 'inquirer';
import Handlebars from 'handlebars';

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
    .version('1.0.0-alpha.1')
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
        const generator = plop.getGenerator(component);
        generator
          .runPrompts()
          .then((answers: Answers) => {
            
            return generator
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
            const generator = plop.getGenerator(selectedComponent);
            
            generator
              .runPrompts()
              .then((answers) => {

                return generator
                  .runActions(answers)
                  .then(() => {
                    console.log(`${component} component generated successfully!`);
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

Handlebars.registerHelper('times', (n: number, context: any, options: Handlebars.HelperOptions) => {
  let accum = '';
  for (let i = 0; i < n; i++) {
    accum += options.fn({...context, index: i});
  }
  return accum;
});