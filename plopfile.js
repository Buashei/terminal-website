import _ from 'lodash';

export default function (plop) {
  // plop generator code
  plop.setHelper('camelCase', (txt) => _.camelCase(txt));
  plop.setHelper('lowerCase', (txt) => txt.toLowerCase());
  plop.setHelper('createPath', (txt) => txt.replace(/-/, '/'));
  plop.setHelper('capitalize', (txt) => _.capitalize(txt));

  plop.setGenerator('Components', {
    description: 'Generate some new components',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What type of component would you like to create?',
        choices: ['atoms', 'molecules', 'organisms', 'templates', 'pages'],
        default: 'atoms',
      },
      {
        type: 'input',
        name: 'name',
        message: 'What would you like to name your component?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{type}}/{{name}}/{{name}}.tsx',
        templateFile: '__plop-templates__/componentTemplate.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{type}}/{{name}}/{{name}}Types.ts',
        templateFile: '__plop-templates__/typesTemplate.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{type}}/{{name}}/index.ts',
        templateFile: '__plop-templates__/indexTemplate.ts.hbs',
      },
      {
        type: 'modify',
        pattern: /(\/\/ addExportHere)/g,
        path: 'src/components/{{type}}/index.ts',
        template: "export { {{name}} } from './{{name}}';\n$1",
      },
    ], // end of api actions
  });
}
