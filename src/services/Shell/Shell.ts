import type { KeyboardEvent } from 'react';

type TState = {
  prompt: string;
  terminalOutput: string[];
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
  terminalOutput: TState['terminalOutput'] = [];

  get state() {
    return {
      prompt: this.prompt,
      terminalOutput: this.terminalOutput,
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

  setTerminalOutput(input: string) {
    this.terminalOutput.push(input);
    this.notifySubscribers();
  }

  getTerminalOutput() {
    return this.terminalOutput;
  }

  handleKeyboard(e: KeyboardEvent<HTMLInputElement>) {
    switch (e.code) {
      case 'Enter':
        this.setTerminalOutput(this.prompt);
        this.setPrompt('');
        break;
      case 'KeyC':
        this.setPrompt('');
        break;
      case 'KeyL':
        this.setTerminalOutput('');
        this.setPrompt('');
        break;
      default:
        break;
    }
  }
}
