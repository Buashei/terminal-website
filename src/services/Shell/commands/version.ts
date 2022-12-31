import packageJson from '../../../../package.json';

export const version = (): string => {
  return `
                                                 
  _               _       _             _         
  | |_ _ _ ___ ___| |_ ___|_|  ___ ___ _| |___ ___ 
  | . | | | .'|_ -|   | -_| |_|  _| . | . | -_|_ -|
  |___|___|__,|___|_|_|___|_|_|___|___|___|___|___| v${packageJson.version}

Type 'help' to see list of available commands.
`;
};
