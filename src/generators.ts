import Choice from 'inquirer/lib/objects/choice';
import path from 'path';

const allGenerators: Record<string, object> = {
  // section: {
  //   description: 'Generate a new section',
  //   prompts: [
  //     {
  //       type: 'input',
  //       name: 'alias',
  //       message: 'Enter section alias:',
  //       default: 'userManagement'
  //     },
  //     {
  //       type: 'input',
  //       name: 'name',
  //       message: 'Enter section name:',
  //       default: 'User Management'
  //     },
  //     {
  //       type: 'number',
  //       name: 'weight',
  //       message: 'Enter section weight:',
  //       default: 10
  //     },
  //     {
  //       type: 'input',
  //       name: 'label',
  //       message: 'Enter section label:',
  //       default: 'User Management'
  //     },
  //     {
  //       type: 'input',
  //       name: 'pathname',
  //       message: 'Enter section pathname:',
  //       default: 'user-management'
  //     }
  //   ],
  //   actions: [
  //     {
  //       type: 'add',
  //       path: path.join(process.cwd(), 'src/sections/{{alias}}/manifest.ts'),
  //       templateFile: 'templates/sections/alias/manifest.hbs'
  //     },
  //     {
  //       type: 'add',
  //       path: path.join(process.cwd(), 'src/sections/manifest.ts'),
  //       templateFile: 'templates/sections/manifest.hbs',
  //       skipIfExists: true
  //     }
  //   ]
  // },
  // dashboard: {
  //   description: 'Generate a new dashboard',
  //   prompts: [
  //     {
  //       type: 'input',
  //       name: 'alias',
  //       message: 'Enter dashboard alias:',
  //       default: 'userManagement'
  //     },
  //     {
  //       type: 'input',
  //       name: 'name',
  //       message: 'Enter dashboard name:',
  //       default: 'User Management'
  //     },
  //     {
  //       type: 'number',
  //       name: 'weight',
  //       message: 'Enter dashboard weight:',
  //       default: 10
  //     },
  //     {
  //       type: 'input',
  //       name: 'label',
  //       message: 'Enter dashboard label:',
  //       default: 'User Management'
  //     },
  //     {
  //       type: 'input',
  //       name: 'pathname',
  //       message: 'Enter dashboard pathname:',
  //       default: 'user-management'
  //     }
  //   ],
  //   actions: [
  //     {
  //       type: 'add',
  //       path: path.join(process.cwd(), 'src/dashboards/{{alias}}/{{alias}}-dashboard.element.ts'),
  //       templateFile: 'templates/dashboards/alias/element.hbs'
  //     },
  //     {
  //       type: 'add',
  //       path: path.join(process.cwd(), 'src/dashboards/{{alias}}/manifest.ts'),
  //       templateFile: 'templates/dashboards/alias/manifest.hbs'
  //     },
  //     {
  //       type: 'add',
  //       path: path.join(process.cwd(), 'src/dashboards/manifest.ts'),
  //       templateFile: 'templates/dashboards/manifest.hbs',
  //       skipIfExists: true
  //     }
  //   ]
  // },
  // sidebar: {
  //   description: 'Generate a new sidebar',
  //   prompts: [
  //     {
  //       type: 'input',
  //       name: 'alias',
  //       message: 'Enter sidebar alias:',
  //       default: 'userManagement'
  //     },
  //     {
  //       type: 'input',
  //       name: 'name',
  //       message: 'Enter sidebar name:',
  //       default: 'User Management'
  //     },
  //     {
  //       type: 'input',
  //       name: 'label',
  //       message: 'Enter sidebar label:',
  //       default: 'User Management'
  //     },
  //     {
  //       type: 'number',
  //       name: 'items',
  //       message: 'Number of menu items:',
  //       default: 1
  //     }
  //   ],
  //   actions: [
  //     {
  //       type: 'add',
  //       path: path.join(process.cwd(), 'src/sidebars/{{alias}}/manifest.ts'),
  //       templateFile: 'templates/sidebars/alias/manifest.hbs'
  //     },
  //     {
  //       type: 'add',
  //       path: path.join(process.cwd(), 'src/sidebars/manifest.ts'),
  //       templateFile: 'templates/sidebars/manifest.hbs',
  //       skipIfExists: true
  //     }
  //   ]
  // }
};

// const generatorNames = [...Object.keys(allGenerators)];

// allGenerators['builder'] = {
//   description: 'Run an interactive builder',
//   prompts: [
//     {
//       type: 'list',
//       name: 'component',
//       message: 'Which component do you want to create?',
//       choices: generatorNames
//     }
//   ],
//   actions: []
// };

allGenerators['new'] = {
  description: 'Scaffold a project from scratch',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Project name:',
      default: 'Your Package'
    },
    {
      type: 'input',
      name: 'alias',
      message: 'Project alias (will output as Umbraco.Community.*)',
      default: 'YourPackage'
    },
    {
      type: 'input',
      name: 'folder',
      message: 'Folder name:',
      default: 'assets'
    },
    {
      type: 'checkbox',
      name: 'components',
      message: 'Which components would you like to generate?',
      choices: [ 'context', 'section' ]
    }
  ],
  actions: [
    {
      type: 'add',
      path: path.join(process.cwd(), '{{folder}}/vite.config.ts'),
      templateFile: 'templates/vite.config.ts.hbs'
    },
    {
      type: 'add',
      path: path.join(process.cwd(), '{{folder}}/src/index.ts'),
      templateFile: 'templates/index.ts.hbs'
    },
    {
      type: 'add',
      path: path.join(process.cwd(), '{{folder}}/public/umbraco-package.json'),
      templateFile: 'templates/umbraco-package.json.hbs'
    },
    {
      type: 'modify',
      path: path.join(process.cwd(), '{{folder}}/package.json'),
      pattern: /"scripts":\s*{/,
      template: `"scripts": {\r\n    "watch": "vite build --watch",`
    },
    {
      type: 'remove',
      path: path.join(process.cwd(), '{{folder}}/public/vite.svg'),
      force: true
    },
    {
      type: 'remove',
      path: path.join(process.cwd(), '{{folder}}/src/assets'),
      force: true
    },
    {
      type: 'remove',
      path: path.join(process.cwd(), '{{folder}}/index.html'),
      force: true
    },
    {
      type: 'remove',
      path: path.join(process.cwd(), '{{folder}}/src/my-element.ts'),
      force: true
    }
  ]
}

export const generators = allGenerators;