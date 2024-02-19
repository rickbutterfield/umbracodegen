import { PlopGeneratorConfig, Prompts } from 'node-plop';
import path from 'path';

const allGenerators: Record<string, PlopGeneratorConfig> = {
  section: {
    description: 'Generate a new section',
    prompts: [
      {
        type: 'input',
        name: 'alias',
        message: 'Enter section alias:',
        default: 'userManagement'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter section name:',
        default: 'User Management'
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
        default: 'User Management'
      },
      {
        type: 'input',
        name: 'pathname',
        message: 'Enter section pathname:',
        default: 'user-management'
      }
    ],
    actions: [
      {
        type: 'add',
        path: path.join(process.cwd(), 'src/sections/{{alias}}/manifest.ts'),
        templateFile: 'templates/sections/alias/manifest.hbs'
      },
      {
        type: 'add',
        path: path.join(process.cwd(), 'src/sections/manifest.ts'),
        templateFile: 'templates/sections/manifest.hbs',
        skipIfExists: true
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
        default: 'userManagement'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter dashboard name:',
        default: 'User Management'
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
        default: 'User Management'
      },
      {
        type: 'input',
        name: 'pathname',
        message: 'Enter dashboard pathname:',
        default: 'user-management'
      }
    ],
    actions: [
      {
        type: 'add',
        path: path.join(process.cwd(), 'src/dashboards/{{alias}}/{{alias}}-dashboard.element.ts'),
        templateFile: 'templates/dashboards/alias/element.hbs'
      },
      {
        type: 'add',
        path: path.join(process.cwd(), 'src/dashboards/{{alias}}/manifest.ts'),
        templateFile: 'templates/dashboards/alias/manifest.hbs'
      },
      {
        type: 'add',
        path: path.join(process.cwd(), 'src/dashboards/manifest.ts'),
        templateFile: 'templates/dashboards/manifest.hbs',
        skipIfExists: true
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
        default: 'userManagement'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter sidebar name:',
        default: 'User Management'
      },
      {
        type: 'input',
        name: 'label',
        message: 'Enter sidebar label:',
        default: 'User Management'
      },
      {
        type: 'number',
        name: 'items',
        message: 'Number of menu items:',
        default: 1
      }
    ],
    actions: [
      {
        type: 'add',
        path: path.join(process.cwd(), 'src/sidebars/{{alias}}/manifest.ts'),
        templateFile: 'templates/sidebars/alias/manifest.hbs'
      },
      {
        type: 'add',
        path: path.join(process.cwd(), 'src/sidebars/manifest.ts'),
        templateFile: 'templates/sidebars/manifest.hbs',
        skipIfExists: true
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