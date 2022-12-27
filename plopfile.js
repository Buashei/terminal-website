import _ from 'lodash';

export default function (plop) {
  // plop helpers
  plop.setHelper('camelCase', (txt) => _.camelCase(txt));
  plop.setHelper('lowerCase', (txt) => txt.toLowerCase());
  plop.setHelper('createPath', (txt) => txt.replace(/-/, '/'));
  plop.setHelper('capitalize', (txt) => _.capitalize(txt));

  // plop generator code
  plop.setGenerator('components', {
    description: 'generate some new components',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What type of component would you like?',
        choices: ['atom', 'molecule', 'organism', 'template', 'page'],
        default: 'atom',
      },
      {
        type: 'input',
        name: 'componentsName',
        message: "What is the component's name?",
      },
      {
        type: 'confirm',
        name: 'shouldCreateService',
        message: 'Should a service file be created?',
      },
      {
        type: 'confirm',
        name: 'shouldCreateStory',
        message: 'Should a stories file be created?',
      },
    ],
    actions(data) {
      const actions = [];
      const destPath = './src/components/{{type}}s';
      const templatePath = '.plop_templates/components';

      if (!data) return actions;

      actions.push({
        type: 'add',
        path: `${destPath}/{{capitalize componentsName}}/{{capitalize componentsName}}.tsx`,
        templateFile: `${templatePath}/componentTemplate.tsx.hbs`,
      });

      actions.push({
        type: 'add',
        path: `${destPath}/{{capitalize componentsName}}/{{capitalize componentsName}}.types.ts`,
        templateFile: `${templatePath}/typesTemplate.ts.hbs`,
      });

      actions.push({
        type: 'add',
        path: `${destPath}/{{capitalize componentsName}}/{{capitalize componentsName}}.test.ts`,
        templateFile: `${templatePath}/testTemplate.ts.hbs`,
      });

      actions.push({
        type: 'add',
        path: `${destPath}/{{capitalize componentsName}}/index.ts`,
        templateFile: `${templatePath}/indexTemplate.ts.hbs`,
      });

      actions.push({
        type: 'modify',
        pattern: /(\/\/ addExportHere)/g,
        path: `${destPath}/index.ts`,
        template: "export * from './{{capitalize componentsName}}';\n$1",
        templateFile: '',
      });

      if (data.shouldCreateService) {
        actions.push({
          type: 'add',
          path: `${destPath}/{{capitalize componentsName}}/{{capitalize componentsName}}.service.ts`,
          templateFile: `${templatePath}/serviceTemplate.ts.hbs`,
        });
      }

      if (data.shouldCreateStory) {
        actions.push({
          type: 'add',
          path: `${destPath}/{{capitalize componentsName}}/{{capitalize componentsName}}.stories.ts`,
          templateFile: `${templatePath}/storiesTemplate.stories.tsx.hbs`,
        });
      }
      return actions;
    },
  });
}
