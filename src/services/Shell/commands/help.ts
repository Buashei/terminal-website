import * as allCommands from './index';

export const help = (): string => {
  const commands = Object.keys(allCommands).sort().join(', ');

  return `Available commands:\n${commands}\n\n[tab]\t trigger completion.\n[ctrl+l] clear terminal.\n[ctrl+c] cancel command.`;
};
