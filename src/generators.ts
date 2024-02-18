import { PlopGeneratorConfig, Prompts } from 'node-plop';

const defaultPrompts: Prompts = [
  {
    type: 'input',
    name: 'path',
    message: 'Path to create files:',
    default: 'src/{{component}}/{{alias}}'
  }
];

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
      },
      ...defaultPrompts
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
      },
      ...defaultPrompts
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
  },
  sidebar: {
    description: 'Generate a new sidebar',
    prompts: [
      {
        type: 'input',
        name: 'alias',
        message: 'Enter sidebar alias:',
        default: 'time'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter sidebar name:',
        default: 'Time'
      },
      {
        type: 'input',
        name: 'label',
        message: 'Enter sidebar label:',
        default: 'Time'
      },
      {
        type: 'number',
        name: 'items',
        message: 'Number of menu items:',
        default: 1
      },
      ...defaultPrompts
    ],
    actions: [
      {
        type: 'add',
        path: 'src/sidebar/{{alias}}/manifest.ts',
        templateFile: 'templates/sidebar/manifest.hbs'
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