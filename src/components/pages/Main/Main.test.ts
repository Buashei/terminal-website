import { describe, it, expect } from 'vitest';
import { MainService } from './Main.service';

describe('MainService.ts', () => {
  it('main service should be defined', () => {
    const mainService = new MainService();
    expect(mainService).toBeDefined();
  });
});
