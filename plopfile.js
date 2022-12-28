import _ from 'lodash';

const typeOfComponent = {
  type: 'list',
  name: 'type',
  message: 'What type of component would you like?',
  choices: ['atom', 'molecule', 'organism', 'template', 'page'],
  default: 'atom',
};

const provideName = (type) => ({
  type: 'input',
  name: `${type}sName`,
  message: `What is the ${type}'s name?`,
});

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
    prompts: [typeOfComponent, provideName('component'), shouldCreateService, shouldCreateStory],
    actions(data) {
      const actions = [];
      const destPath = './src/components/{{type}}s';
      const templatePath = '.plop_templates/components';

      if (!data) return actions;

      actions.push({
        type: 'add',
        path: `${destPath}/{{pascalCase componentsName}}/{{pascalCase componentsName}}.tsx`,
        templateFile: `${templatePath}/componentTemplate.tsx.hbs`,
      });

      actions.push({
        type: 'add',
        path: `${destPath}/{{pascalCase componentsName}}/{{pascalCase componentsName}}.types.ts`,
        templateFile: `${templatePath}/typesTemplate.ts.hbs`,
      });

      actions.push({
        type: 'add',
        path: `${destPath}/{{pascalCase componentsName}}/index.ts`,
        templateFile: `${templatePath}/indexTemplate.ts.hbs`,
      });

      actions.push({
        type: 'modify',
        pattern: /(\/\/ addExportHere)/g,
        path: `${destPath}/index.ts`,
        template: "export * from './{{pascalCase componentsName}}';\n$1",
        templateFile: '',
      });

      if (data.shouldCreateService) {
        actions.push({
          type: 'add',
          path: `${destPath}/{{pascalCase componentsName}}/{{pascalCase componentsName}}.service.ts`,
          templateFile: `${templatePath}/serviceTemplate.ts.hbs`,
        });
        actions.push({
          type: 'add',
          path: `${destPath}/{{pascalCase componentsName}}/{{pascalCase componentsName}}.test.ts`,
          templateFile: `${templatePath}/testTemplate.ts.hbs`,
        });
      }

      if (data.shouldCreateStory) {
        actions.push({
          type: 'add',
          path: `${destPath}/{{pascalCase componentsName}}/{{pascalCase componentsName}}.stories.ts`,
          templateFile: `${templatePath}/storiesTemplate.stories.tsx.hbs`,
        });
      }
      return actions;
    },
  });
  plop.setGenerator('styled-components', {
    description: 'generate some new styled-components',
    prompts: [provideName('component'), htmlElement, shouldCreateStory],
    actions(data) {
      const actions = [];
      const destPath = './src/components/atoms';
      const templatePath = '.plop_templates/styled-components';

      if (!data) return actions;

      actions.push({
        type: 'add',
        path: `${destPath}/{{pascalCase componentsName}}/{{pascalCase componentsName}}.tsx`,
        templateFile: `${templatePath}/componentTemplate.tsx.hbs`,
      });

      actions.push({
        type: 'add',
        path: `${destPath}/{{pascalCase componentsName}}/index.ts`,
        templateFile: `${templatePath}/indexTemplate.ts.hbs`,
      });

      actions.push({
        type: 'modify',
        pattern: /(\/\/ addExportHere)/g,
        path: `${destPath}/index.ts`,
        template: "export * from './{{pascalCase componentsName}}';\n$1",
        templateFile: '',
      });

      if (data.shouldCreateStory) {
        actions.push({
          type: 'add',
          path: `${destPath}/{{pascalCase componentsName}}/{{pascalCase componentsName}}.stories.ts`,
          templateFile: `${templatePath}/storiesTemplate.stories.tsx.hbs`,
        });
      }
      return actions;
    },
  });
  plop.setGenerator('services', {
    description: 'generate some new services',
    prompts: [provideName('service')],
    actions(data) {
      const actions = [];
      const destPath = './src/services';
      const templatePath = '.plop_templates/services';

      if (!data) return actions;

      actions.push({
        type: 'add',
        path: `${destPath}/{{pascalCase servicesName}}/{{pascalCase servicesName}}.ts`,
        templateFile: `${templatePath}/serviceTemplate.ts.hbs`,
      });

      actions.push({
        type: 'add',
        path: `${destPath}/{{pascalCase servicesName}}/{{pascalCase servicesName}}.test.ts`,
        templateFile: `${templatePath}/testTemplate.ts.hbs`,
      });

      actions.push({
        type: 'add',
        path: `${destPath}/{{pascalCase servicesName}}/index.ts`,
        templateFile: `${templatePath}/indexTemplate.ts.hbs`,
      });

      actions.push({
        type: 'modify',
        pattern: /(\/\/ addExportHere)/g,
        path: `${destPath}/index.ts`,
        template: "export * from './{{pascalCase servicesName}}';\n$1",
        templateFile: '',
      });

      return actions;
    },
  });
}
