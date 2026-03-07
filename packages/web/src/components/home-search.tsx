'use client';

import { useRouter } from 'next/navigation';
import { SearchBar } from '@aitoolhunt/ui';

export function HomeSearch() {
  const router = useRouter();

  return (
    <SearchBar
      size="lg"
      placeholder="Search 50+ AI tools..."
      onSearch={(query) => {
        if (query) {
          router.push(`/search?q=${encodeURIComponent(query)}`);
        }
      }}
    />
  );
}
