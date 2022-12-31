import { describe, vi, it, expect } from 'vitest';
import { ShellService } from './Shell';

import type { KeyboardEvent } from 'react';

describe('MainService.ts', () => {
  it('checks if service is defined', () => {
    const shell = new ShellService();
    expect(shell).toBeDefined();
  });

  it('checks if service is a singleton', () => {
    const shell1 = ShellService.getInstance();
    const shell2 = ShellService.getInstance();
    expect(shell1).toStrictEqual(shell2);
  });

  it('should subscribe callback', () => {
    const shell = new ShellService();
    const mock = vi.fn();
    shell.subscribe(mock);
    shell.notifySubscribers();
    expect(mock).toHaveBeenCalled();
  });

  it('should unsubscribe callback', () => {
    const shell = new ShellService();
    const mock = vi.fn();
    shell.subscribe(mock);
    shell.unsubscribe(mock);
    shell.notifySubscribers();
    expect(mock).not.toHaveBeenCalled();
  });

  it('should set terminalInput', () => {
    const shell = new ShellService();
    const mockedInput = 'lorem ipsum dolor sit amet';

    shell.setPrompt(mockedInput);
    const result = shell.getPrompt();

    expect(result).toStrictEqual(mockedInput);
  });

  it('should set terminalOutput', () => {
    const shell = new ShellService();
    const mockedInput = 'lorem ipsum dolor sit amet';
    const mockedOutput = [mockedInput, mockedInput];

    shell.setTerminalOutput(mockedInput);
    shell.setTerminalOutput(mockedInput);
    const result = shell.getTerminalOutput();

    expect(result).toStrictEqual(mockedOutput);
  });

  it('shoud set proper terminalOutput and terminalInput after keyDownEnter event triggered on input', () => {
    const shell = new ShellService();
    const mockedInput = 'lorem ipsum dolor sit amet';
    const mockedEnterEvent = { code: 'Enter' } as KeyboardEvent<HTMLInputElement>;

    shell.setPrompt(mockedInput);
    shell.handleKeyboard(mockedEnterEvent);
    const terminalOutput = shell.getTerminalOutput();
    const terminalInput = shell.getPrompt();

    expect(terminalOutput).toStrictEqual([mockedInput]);
    expect(terminalInput).toStrictEqual('');
  });

  it('shoud set proper terminalOutput and terminalInput after Ctrl + C event triggered on input', () => {
    const shell = new ShellService();
    const mockedInput = 'lorem ipsum dolor sit amet';
    const mockedEnterEvent = { code: 'KeyC' } as KeyboardEvent<HTMLInputElement>;

    shell.setPrompt(mockedInput);
    shell.handleKeyboard(mockedEnterEvent);
    const terminalOutput = shell.getTerminalOutput();
    const terminalInput = shell.getPrompt();

    expect(terminalOutput).toStrictEqual([]);
    expect(terminalInput).toStrictEqual('');
  });

  it('shoud set proper terminalOutput and terminalInput after Ctrl + L event triggered on input', () => {
    const shell = new ShellService();
    const mockedInput = 'lorem ipsum dolor sit amet';
    const mockedEnterEvent = { code: 'KeyL' } as KeyboardEvent<HTMLInputElement>;

    shell.setPrompt(mockedInput);
    shell.handleKeyboard(mockedEnterEvent);
    const terminalOutput = shell.getTerminalOutput();
    const terminalInput = shell.getPrompt();

    expect(terminalOutput).toStrictEqual(['']);
    expect(terminalInput).toStrictEqual('');
  });
});
