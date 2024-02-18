import { PlopGeneratorConfig } from 'node-plop';

const allGenerators: Record<string, PlopGeneratorConfig> = {
  section: {
    description: 'Generate a new section',
    prompts: [
      {
        type: 'input',
        name: 'alias',
        message: 'Enter section alias:',
        default: 'time'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter section name:',
        default: 'Time'
      },
      {
        type: 'number',
        name: 'weight',
        message: 'Enter section weight:',
        default: 10
      },
      {
        type: 'input',
        name: 'label',
        message: 'Enter section label:',
        default: 'Time'
      },
      {
        type: 'input',
        name: 'pathname',
        message: 'Enter section pathname:',
        default: 'time'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/sections/{{alias}}/manifests.ts',
        templateFile: 'templates/sections/manifest.hbs'
      }
    ]
  },
  dashboard: {
    description: 'Generate a new dashboard',
    prompts: [
      {
        type: 'input',
        name: 'alias',
        message: 'Enter dashboard alias:',
        default: 'time'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter dashboard name:',
        default: 'Time'
      },
      {
        type: 'number',
        name: 'weight',
        message: 'Enter dashboard weight:',
        default: 10
      },
      {
        type: 'input',
        name: 'label',
        message: 'Enter dashboard label:',
        default: 'Time'
      },
      {
        type: 'input',
        name: 'pathname',
        message: 'Enter dashboard pathname:',
        default: 'time'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/dashboards/{{alias}}/{{alias}}-dashboard.element.ts',
        templateFile: 'templates/dashboards/element.hbs'
      },
      {
        type: 'add',
        path: 'src/dashboards/{{alias}}/manifest.ts',
        templateFile: 'templates/dashboards/manifest.hbs'
      }
    ]
  }
};

const generatorNames = [...Object.keys(allGenerators)];

allGenerators['builder'] = {
  description: 'Run an interactive builder',
  prompts: [
    {
      type: 'list',
      name: 'component',
      message: 'Which component do you want to create?',
      choices: generatorNames
    }
  ],
  actions: []
};

export const generators = allGenerators;