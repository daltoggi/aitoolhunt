export const CATEGORIES = [
  { name: 'AI Writing', slug: 'ai-writing', iconName: 'pen-tool', description: 'AI-powered writing assistants, content generators, and copywriting tools' },
  { name: 'AI Image', slug: 'ai-image', iconName: 'image', description: 'AI image generators, editors, and enhancement tools' },
  { name: 'AI Video', slug: 'ai-video', iconName: 'video', description: 'AI video creation, editing, and generation tools' },
  { name: 'AI Coding', slug: 'ai-coding', iconName: 'code', description: 'AI coding assistants, code generators, and developer tools' },
  { name: 'AI Productivity', slug: 'ai-productivity', iconName: 'zap', description: 'AI tools for productivity, automation, and workflow optimization' },
  { name: 'AI Marketing', slug: 'ai-marketing', iconName: 'megaphone', description: 'AI marketing tools for SEO, social media, and campaigns' },
  { name: 'AI Voice', slug: 'ai-voice', iconName: 'mic', description: 'AI voice generation, text-to-speech, and audio tools' },
  { name: 'AI Research', slug: 'ai-research', iconName: 'search', description: 'AI research assistants, data analysis, and knowledge tools' },
  { name: 'AI Design', slug: 'ai-design', iconName: 'palette', description: 'AI design tools for UI/UX, graphics, and creative work' },
  { name: 'AI Chatbot', slug: 'ai-chatbot', iconName: 'message-circle', description: 'AI chatbots, conversational AI, and customer service tools' },
] as const;

export const PRICING_TYPES = ['free', 'freemium', 'paid', 'contact'] as const;

export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;

export const AD_SLOTS = {
  HEADER_BANNER: 'header-banner',
  TOOL_DETAIL_TOP: 'tool-detail-top',
  TOOL_DETAIL_MIDDLE: 'tool-detail-middle',
  SIDEBAR: 'sidebar',
  CATEGORY_LIST: 'category-list',
  SEARCH_RESULTS: 'search-results',
} as const;
