import type { KeyboardEvent } from 'react';

type TState = {
  terminalInput: string;
  terminalOutput: string[];
};

type ISubscriber = React.Dispatch<React.SetStateAction<TState>>;

interface ISendStateToComponent {
  subscribers: ISubscriber[];
  subscribe: (callback: ISubscriber) => void;
  unsubscribe: (callback: ISubscriber) => void;
  notifySubcribers: () => void;
}

export class MainService {
  subscribers: ISendStateToComponent['subscribers'] = [];
  terminalInput: TState['terminalInput'] = '';
  terminalOutput: TState['terminalOutput'] = [];

  get state() {
    return {
      terminalInput: this.terminalInput,
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

  setTerminalInput(input: string) {
    this.terminalInput = input;
    this.notifySubscribers();
  }

  getTerminalInput() {
    return this.terminalInput;
  }

  setTerminalOutput(input: string) {
    this.terminalOutput.push(input);
    this.notifySubscribers();
  }

  getTerminalOutput() {
    return this.terminalOutput;
  }

  handleEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      this.setTerminalOutput(this.terminalInput);
      this.setTerminalInput('');
    }
  }
}
