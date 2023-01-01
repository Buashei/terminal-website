import * as commands from './commands';

import type { KeyboardEvent } from 'react';

type TState = {
  prompt: string;
  output: string;
  history: {
    id: number;
    date: number;
    command: TState['prompt'];
    output: TState['output'];
  }[];
};

type ISubscriber = React.Dispatch<React.SetStateAction<TState>>;

interface ISendStateToComponent {
  subscribers: ISubscriber[];
  subscribe: (callback: ISubscriber) => void;
  unsubscribe: (callback: ISubscriber) => void;
  notifySubcribers: () => void;
}

export class ShellService {
  private static instance: ShellService;

  public static getInstance(): ShellService {
    if (!ShellService.instance) {
      ShellService.instance = new ShellService();
    }

    return ShellService.instance;
  }

  subscribers: ISendStateToComponent['subscribers'] = [];
  prompt: TState['prompt'] = '';
  output: TState['output'] = '';
  history: TState['history'] = [];

  get state() {
    return {
      prompt: this.prompt,
      output: this.output,
      history: this.history,
    };
  }

  subscribe(subscriber: ISubscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: ISubscriber) {
    this.subscribers = this.subscribers.filter((el) => el !== subscriber);
  }

  notifySubscribers() {
    this.subscribers.forEach((subscriber) => subscriber({ ...this.state }));
  }

  setPrompt(input: string) {
    this.prompt = input;
    this.notifySubscribers();
  }

  getPrompt() {
    return this.prompt;
  }

  setHistory({ date, command, output }: { date: number; command: string; output: string }) {
    this.history.push({
      id: this.history.length,
      date,
      command,
      output,
    });
    this.notifySubscribers();
  }

  getHistory() {
    return this.history;
  }

  clearPrompt() {
    this.setPrompt('');
  }

  clearAll() {
    this.clearPrompt();
    this.history = [];
    this.notifySubscribers();
  }

  handleKeyboard(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      this.run();
      this.clearPrompt();
      return;
    }
    if (e.key === 'c' && e.ctrlKey) {
      this.clearPrompt();
      return;
    }
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      this.clearAll();
      return;
    }
  }

  run() {
    switch (this.prompt) {
      case 'clear':
        this.clearAll();
        break;

      default:
        if (Object.keys(commands).indexOf(this.prompt) === -1) {
          this.setHistory({
            date: Date.now(),
            command: this.prompt,
            output: `Command not found: ${this.prompt}. Try 'help' to get started.`,
          });
        } else {
          try {
            const output = commands[this.prompt as 'version' | 'help']();
            this.setHistory({
              date: Date.now(),
              command: this.prompt,
              output: output,
            });
          } catch (error) {
            this.setHistory({
              date: Date.now(),
              command: this.prompt,
              output: 'error',
            });
          }
        }
    }
  }
}
