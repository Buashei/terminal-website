import { describe, vi, it, expect } from 'vitest';
import { ShellService } from './Shell';
import * as commands from './commands';

import type { KeyboardEvent } from 'react';

describe('MainService.ts', () => {
  it('checks if service is defined', () => {
    const shell = ShellService.getInstance();
    expect(shell).toBeDefined();
  });

  it('checks if service is a singleton', () => {
    const shell1 = ShellService.getInstance();
    const shell2 = ShellService.getInstance();
    expect(shell1).toStrictEqual(shell2);
  });

  it('should subscribe callback', () => {
    const shell = ShellService.getInstance();
    const mock = vi.fn();
    shell.subscribe(mock);
    shell.notifySubscribers();
    expect(mock).toHaveBeenCalled();
  });

  it('should unsubscribe callback', () => {
    const shell = ShellService.getInstance();
    const mock = vi.fn();
    shell.subscribe(mock);
    shell.unsubscribe(mock);
    shell.notifySubscribers();
    expect(mock).not.toHaveBeenCalled();
  });

  it('should set prompt', () => {
    const shell = new ShellService();
    const mockedInput = 'lorem ipsum dolor sit amet';

    shell.setPrompt(mockedInput);
    const result = shell.getPrompt();

    expect(result).toStrictEqual(mockedInput);
  });

  it('should set history', () => {
    const shell = new ShellService();
    const mockedCommand = 'version';
    const mockedInput = {
      date: Date.now(),
      command: mockedCommand,
      output: commands.version(),
    };
    const mockedOutput = {
      id: 0,
      date: mockedInput.date,
      command: mockedInput.command,
      output: mockedInput.output,
    };

    shell.setHistory(mockedInput);
    const result = shell.getHistory();

    expect(result).toStrictEqual([mockedOutput]);
  });

  it('shoud return proper history after keyDownEnter event triggered', () => {
    const shell = new ShellService();
    const mockedCommand = 'version';
    const mockedEnterEvent = { key: 'Enter' } as KeyboardEvent<HTMLInputElement>;
    const mockedOutput = [
      {
        id: 0,
        command: mockedCommand,
        date: Date.now() + 1 - 1,
        output: commands.version(),
      },
    ];

    shell.setPrompt(mockedCommand);
    shell.handleKeyboard(mockedEnterEvent);

    const prompt = shell.getPrompt();
    const history = shell.getHistory();

    expect(prompt).toStrictEqual('');
    expect(history).toStrictEqual(mockedOutput);
  });

  it('should clear prompt', () => {
    const shell = new ShellService();
    const mockedCommand = 'version';

    shell.setPrompt(mockedCommand);
    shell.clearPrompt();
    const prompt = shell.getPrompt();

    expect(prompt).toStrictEqual('');
  });

  it('should clear prompt and history', () => {
    const shell = new ShellService();
    const mockedCommand = 'version';
    const mockedInput = {
      date: Date.now(),
      command: mockedCommand,
      output: commands.version(),
    };

    shell.setPrompt(mockedCommand);
    shell.setHistory(mockedInput);
    shell.clearAll();

    const prompt = shell.getPrompt();
    const history = shell.getHistory();

    expect(prompt).toStrictEqual('');
    expect(history).toStrictEqual([]);
  });

  it('shoud clear prompt after Ctrl + C triggered on input', () => {
    const shell = ShellService.getInstance();
    const mockedValue = 'lorem ipsum dolor sit amet';
    const mockedCtrlCEvent = { key: 'c', ctrlKey: true } as KeyboardEvent<HTMLInputElement>;

    shell.setPrompt(mockedValue);
    shell.handleKeyboard(mockedCtrlCEvent);

    const prompt = shell.getPrompt();

    expect(prompt).toStrictEqual('');
  });

  it('shoud set proper prompt and history after Ctrl + L triggered on input', () => {
    const shell = ShellService.getInstance();
    const mockedCommand = 'version';
    const mockedInput = {
      date: Date.now(),
      command: mockedCommand,
      output: commands.version(),
    };
    const mockedCtrlLEvent = {
      key: 'l',
      ctrlKey: true,
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent<HTMLInputElement>;

    shell.setPrompt(mockedCommand);
    shell.setHistory(mockedInput);
    shell.handleKeyboard(mockedCtrlLEvent);

    const prompt = shell.getPrompt();
    const history = shell.getHistory();

    expect(prompt).toStrictEqual('');
    expect(history).toStrictEqual([]);
  });

  it('should run version command', () => {
    const shell = new ShellService();
    const mockedEnterEvent = { key: 'Enter' } as KeyboardEvent<HTMLInputElement>;
    const mockedCommand = 'version';
    const mockedHistoryOutput = commands.version();
    shell.setPrompt(mockedCommand);
    shell.handleKeyboard(mockedEnterEvent);

    const history = shell.getHistory();

    expect(history[0].output).toStrictEqual(mockedHistoryOutput);
  });

  it('should run clear command', () => {
    const shell = ShellService.getInstance();
    const mockedEnterEvent = { key: 'Enter' } as KeyboardEvent<HTMLInputElement>;

    shell.setPrompt('version');
    shell.handleKeyboard(mockedEnterEvent);
    shell.setPrompt('clear');
    shell.handleKeyboard(mockedEnterEvent);
    const history = shell.getHistory();
    const prompt = shell.getPrompt();

    expect(history).toStrictEqual([]);
    expect(prompt).toStrictEqual('');
  });
});
