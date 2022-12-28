import _ from 'lodash';

const typeOfComponent = {
  type: 'list',
  name: 'type',
  message: 'What type of component would you like?',
  choices: ['atom', 'molecule', 'organism', 'template', 'page'],
  default: 'atom',
};

const componentsName = {
  type: 'input',
  name: 'componentsName',
  message: "What is the component's name?",
};

const htmlElement = {
  type: 'input',
  name: 'htmlElement',
  message: 'Which HTML element would you like to style?',
};

const shouldCreateService = {
  type: 'confirm',
  name: 'shouldCreateService',
  message: 'Should a service file be created?',
};

const shouldCreateStory = {
  type: 'confirm',
  name: 'shouldCreateStory',
  message: 'Should a stories file be created?',
};

export default function (plop) {
  // plop helpers
  plop.setHelper('camelCase', (txt) => _.camelCase(txt));
  plop.setHelper('lowerCase', (txt) => txt.toLowerCase());
  plop.setHelper('createPath', (txt) => txt.replace(/-/, '/'));
  plop.setHelper('capitalize', (txt) => _.capitalize(txt));

  // plop generator code
  plop.setGenerator('components', {
    description: 'generate some new components',
    prompts: [typeOfComponent, componentsName, shouldCreateService, shouldCreateStory],
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
        actions.push({
          type: 'add',
          path: `${destPath}/{{capitalize componentsName}}/{{capitalize componentsName}}.test.ts`,
          templateFile: `${templatePath}/testTemplate.ts.hbs`,
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
  plop.setGenerator('styled-components', {
    description: 'generate some new styled-components',
    prompts: [componentsName, htmlElement, shouldCreateStory],
    actions(data) {
      const actions = [];
      const destPath = './src/components/atoms';
      const templatePath = '.plop_templates/styled-components';

      if (!data) return actions;

      actions.push({
        type: 'add',
        path: `${destPath}/{{capitalize componentsName}}/{{capitalize componentsName}}.tsx`,
        templateFile: `${templatePath}/componentTemplate.tsx.hbs`,
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
