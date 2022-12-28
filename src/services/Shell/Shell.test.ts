import { describe, vi, it, expect } from 'vitest';
import { ShellService } from './Shell';

import type { KeyboardEvent } from 'react';

describe('MainService.ts', () => {
  it('main service should be defined', () => {
    const shell = new ShellService();
    expect(shell).toBeDefined();
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

    shell.setTerminalInput(mockedInput);
    const result = shell.getTerminalInput();

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
    const mockedEnterEvent = { key: 'Enter' } as KeyboardEvent<HTMLInputElement>;

    shell.setTerminalInput(mockedInput);
    shell.handleEnter(mockedEnterEvent);
    const terminalOutput = shell.getTerminalOutput();
    const terminalInput = shell.getTerminalInput();

    expect(terminalOutput).toStrictEqual([mockedInput]);
    expect(terminalInput).toStrictEqual('');
  });
});
