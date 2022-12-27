import { describe, vi, it, expect } from 'vitest';
import { MainService } from './Main.service';

import type { KeyboardEvent } from 'react';

describe('MainService.ts', () => {
  it('main service should be defined', () => {
    const mainService = new MainService();
    expect(mainService).toBeDefined();
  });

  it('should subscribe callback', () => {
    const mainService = new MainService();
    const mock = vi.fn();
    mainService.subscribe(mock);
    mainService.notifySubscribers();
    expect(mock).toHaveBeenCalled();
  });

  it('should unsubscribe callback', () => {
    const mainService = new MainService();
    const mock = vi.fn();
    mainService.subscribe(mock);
    mainService.unsubscribe(mock);
    mainService.notifySubscribers();
    expect(mock).not.toHaveBeenCalled();
  });

  it('should set terminalInput', () => {
    const mainService = new MainService();
    const mockedInput = 'lorem ipsum dolor sit amet';

    mainService.setTerminalInput(mockedInput);
    const result = mainService.getTerminalInput();

    expect(result).toStrictEqual(mockedInput);
  });

  it('should set terminalOutput', () => {
    const mainService = new MainService();
    const mockedInput = 'lorem ipsum dolor sit amet';
    const mockedOutput = [mockedInput, mockedInput];

    mainService.setTerminalOutput(mockedInput);
    mainService.setTerminalOutput(mockedInput);
    const result = mainService.getTerminalOutput();

    expect(result).toStrictEqual(mockedOutput);
  });

  it('shoud set proper terminalOutput and terminalInput after keyDownEnter event triggered on input', () => {
    const mainService = new MainService();
    const mockedInput = 'lorem ipsum dolor sit amet';
    const mockedEnterEvent = { key: 'Enter' } as KeyboardEvent<HTMLInputElement>;

    mainService.setTerminalInput(mockedInput);
    mainService.handleEnter(mockedEnterEvent);
    const terminalOutput = mainService.getTerminalOutput();
    const terminalInput = mainService.getTerminalInput();

    expect(terminalOutput).toStrictEqual([mockedInput]);
    expect(terminalInput).toStrictEqual('');
  });
});
