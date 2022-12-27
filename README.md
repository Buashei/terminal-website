# Terminal Website

Welcome to my personal website!

This website is built using `Vite`, `React`, and `TypeScript` and is run in a `Docker` container for easy deployment and development.  
It features:

- a system for `generating sub-pages` based on Markdown files,
- a `programmatically generated routing` system that works like the `cd` command in the Linux terminal,
- an `ASCII graphic` generator,
- `Linux terminal` theme.

The website includes a `portfolio` page with graphics served in `ASCII`, and a contact form with a `map` showing the location of my city in `ASCII`.  
It serves as an online `portfolio`, showcasing my `skills` and `experiences` as a `programmer` and `front-end developer`.  
Visitors can use the `contact form` to easily get in touch with me for inquiries or to request a quote for a project.

Thank you for visiting!

## Prerequisites

- Docker

## Setup

- ### First run

  - First, you need to build a container.
    You can do this by running the below command in the root of the project catalog

    ```
    docker-compose up --build
    ```

  - Install the Visual Studio Code extensions if you haven't already:

    - ms-azuretools.vscode-docker
    - dbaeumer.vscode-eslint
    - esbenp.prettier-vscode

  - Run the `Dev Containers: Attach to Running Container...` command from the Command Palette (F1), and select the `terminal-fe` project.

- ### Normal startup

  Simply, run the below command in the root of the project catalog

  ```
    docker-compose up
  ```

  run the `Dev Containers: Attach to Running Container...` command from the Command Palette (F1),  
  and select the `terminal-fe` project.

## Development

Describe any useful development scripts, such as a script to lint the code or run tests.

- `dev` - a command that is run at container startup. It is used to start a live server in the development environment
- `build` - to build the production version of the application
- `preview` - to locally preview production build
- `test` - to run the `vitest` test environment
- `test:coverage` - to generate test coverage of the project
- `lint` - to log lint errors in files using ESLint
- `lint:fix` - to lint and fix (possibly fixable) files with ESLint
- `prettier` - to log format errors in files using Prettier
- `lint:fix` - to format and fix (possibly fixable) files with Prettier
- `format` - to log lint and format errors in files using ESLint and Prettier. Started automatically by `husky` every time you run `git commit -m " "`
- `prepare` - to automatically have Git hooks enabled after install
- `plop` - A little tool that saves you time and helps your team build new files with consistency. Generate code when you want, how you want.

## Deployment

`#TODO`  
Explain how to build and deploy the project, including any necessary configuration steps. If the project is deployed to a specific platform, such as Heroku or AWS, provide instructions for doing so.

## License

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Acknowledgments

[![Vite](https://img.shields.io/badge/Vite-646CFF.svg?style=for-the-badge&logo=Vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white)](https://www.docker.com/)
[![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC.svg?style=for-the-badge&logo=Visual-Studio-Code&logoColor=white)](https://code.visualstudio.com/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3.svg?style=for-the-badge&logo=ESLint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E.svg?style=for-the-badge&logo=Prettier&logoColor=black)](https://prettier.io/)
[![Lodash](https://img.shields.io/badge/Lodash-3492FF.svg?style=for-the-badge&logo=Lodash&logoColor=white)](https://lodash.com/)
