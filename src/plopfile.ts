import { kebabCase, startCase } from 'lodash-es';
import { ActionConfig, ActionType, Actions, AddActionConfig, NodePlopAPI } from 'node-plop';
import { generators } from './generators.js';
import { Answers } from 'inquirer';
const generatorNames: string[] = Object.keys(generators);

const pascalCase = (str: string) => startCase(str).replace(/ /g, '');

export default function (plop: NodePlopAPI) {
  plop.setHelper('elementName', (name) => pascalCase(name));
  plop.setHelper('tagName', (name) => kebabCase(name));

  Object.entries(generators).forEach(([name, config]) => {
    plop.setGenerator(name, config);
  });

  plop.setGenerator('builder', {
    description: 'Generate a component using the builder',
    prompts: [
      {
        type: 'list',
        name: 'generator',
        message: 'Which component do you want to create?',
        choices: generatorNames
      }
    ],
    actions: (data: Answers | undefined) => getActions(data)
  });
}

function getActions(data: Answers | undefined): ActionType[] {
  if (data?.["generators"] != null) {
    return data?.["generators"]?.["actions"] as ActionType[];
  }
  
  return [];
}