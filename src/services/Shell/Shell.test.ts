import { describe, it, expect } from 'vitest';
import { Shell } from './Shell';

describe('Shell.ts', () => {
  it('shell service should be defined', () => {
    const shell = new Shell();
    expect(shell).toBeDefined();
  });
});
