# Screen Specifications

## Pages Overview

### 1. Homepage (`/`)

- **Hero**: Gradient heading, subtitle with tool/category count, search bar
- **Featured Tools**: 3-column grid (6 cards), amber featured badges
- **Categories**: 4-column grid with icon, name, description, tool count
- **Recently Added**: 3-column grid (6 cards)
- **AdSlot**: Header banner (horizontal)

### 2. Tool Detail (`/tools/{slug}`)

- **Breadcrumb**: Home > Category > Tool Name
- **Header Card**: Logo initial, name, pricing badge, tags, description
- **CTA**: "Visit Website" (primary), "More Category Tools" (secondary)
- **Features**: 2-column checklist grid
- **Use Cases**: Tag-style badges
- **Sidebar**: Quick Info (category, pricing, website), Related Tools
- **AdSlots**: 3 slots (top, middle, sidebar rectangle)

### 3. Categories (`/categories`)

- **Header**: Title, subtitle with category count
- **Grid**: 3-column cards (name, description, tool count, icon)

### 4. Category Detail (`/categories/{slug}`)

- **Breadcrumb**: Home > Categories > Category Name
- **Header**: Category name, description, tool count
- **Grid**: 3-column tool cards
- **AdSlot**: Category list (horizontal)

### 5. Search (`/search`)

- **Search Bar**: Full-width with placeholder text
- **Filters**: Pricing pills (All/Free/Freemium/Paid)
- **Results**: 3-column tool cards, result count
- **Empty State**: "No tools found" with suggestion
- **AdSlot**: Search results (horizontal)

### 6. About (`/about`)

- **Static content**: Mission, features, stats

## Responsive Breakpoints

- **Mobile** (<640px): 1 column
- **Tablet** (640-1024px): 2 columns
- **Desktop** (>1024px): 3-4 columns

## Design Tokens

- **Primary**: Indigo-600 (#4F46E5)
- **Accent**: Purple-600 (#9333EA)
- **Featured**: Amber-400 (#FBBF24)
- **Font**: System UI stack
- **Radius**: xl (12px) for cards, full for badges
