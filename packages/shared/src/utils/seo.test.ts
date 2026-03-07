import { describe, it, expect } from 'vitest';
import {
  generateToolTitle,
  generateCategoryTitle,
  generateToolDescription,
  generateCanonicalUrl,
  generateToolStructuredData,
  SITE_NAME,
  SITE_URL,
} from './seo';

describe('SEO Utils', () => {
  describe('generateToolTitle', () => {
    it('generates tool page title', () => {
      const title = generateToolTitle('ChatGPT');
      expect(title).toContain('ChatGPT');
      expect(title).toContain(SITE_NAME);
    });
  });

  describe('generateCategoryTitle', () => {
    it('generates category page title', () => {
      const title = generateCategoryTitle('AI Writing');
      expect(title).toContain('AI Writing');
      expect(title).toContain(SITE_NAME);
    });
  });

  describe('generateToolDescription', () => {
    it('generates meta description', () => {
      const desc = generateToolDescription('ChatGPT', 'AI assistant by OpenAI');
      expect(desc).toContain('ChatGPT');
      expect(desc).toContain('AI assistant by OpenAI');
    });
  });

  describe('generateCanonicalUrl', () => {
    it('generates full URL', () => {
      expect(generateCanonicalUrl('/tools/chatgpt')).toBe(`${SITE_URL}/tools/chatgpt`);
    });
  });

  describe('generateToolStructuredData', () => {
    it('generates valid JSON-LD structure', () => {
      const data = generateToolStructuredData({
        name: 'ChatGPT',
        description: 'AI assistant',
        url: 'https://chat.openai.com',
        category: 'AI Writing',
        pricingType: 'freemium',
      });

      expect(data).toHaveProperty('@context', 'https://schema.org');
      expect(data).toHaveProperty('@type', 'SoftwareApplication');
      expect(data).toHaveProperty('name', 'ChatGPT');
    });

    it('sets price 0 for free tools', () => {
      const data = generateToolStructuredData({
        name: 'Test',
        description: 'Test',
        url: 'https://test.com',
        category: 'Test',
        pricingType: 'free',
      }) as Record<string, unknown>;

      const offers = data['offers'] as Record<string, unknown>;
      expect(offers['price']).toBe('0');
    });
  });
});
