import { describe, it, expect } from 'vitest';
import { createSlug, isValidSlug } from './slug';

describe('createSlug', () => {
  it('converts text to lowercase slug', () => {
    expect(createSlug('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(createSlug('Hello! @World#')).toBe('hello-world');
  });

  it('collapses multiple spaces and hyphens', () => {
    expect(createSlug('Hello   World---Test')).toBe('hello-world-test');
  });

  it('trims leading and trailing hyphens', () => {
    expect(createSlug('  -Hello World-  ')).toBe('hello-world');
  });

  it('handles empty string', () => {
    expect(createSlug('')).toBe('');
  });

  it('handles AI tool names', () => {
    expect(createSlug('ChatGPT')).toBe('chatgpt');
    expect(createSlug('DALL-E 3')).toBe('dall-e-3');
    expect(createSlug('Copy.ai')).toBe('copyai');
    expect(createSlug('Remove.bg')).toBe('removebg');
  });
});

describe('isValidSlug', () => {
  it('accepts valid slugs', () => {
    expect(isValidSlug('hello-world')).toBe(true);
    expect(isValidSlug('chatgpt')).toBe(true);
    expect(isValidSlug('dall-e-3')).toBe(true);
    expect(isValidSlug('ai-tool-123')).toBe(true);
  });

  it('rejects invalid slugs', () => {
    expect(isValidSlug('Hello World')).toBe(false);
    expect(isValidSlug('hello_world')).toBe(false);
    expect(isValidSlug('-hello')).toBe(false);
    expect(isValidSlug('hello-')).toBe(false);
    expect(isValidSlug('')).toBe(false);
    expect(isValidSlug('hello--world')).toBe(false);
  });
});
