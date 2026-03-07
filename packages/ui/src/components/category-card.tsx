import { cn } from '../lib/utils';

interface CategoryCardProps {
  name: string;
  slug: string;
  description: string;
  toolCount: number;
  iconName: string;
}

const iconColors: Record<string, string> = {
  'pen-tool': 'from-blue-500 to-blue-600',
  image: 'from-pink-500 to-rose-600',
  video: 'from-red-500 to-red-600',
  code: 'from-green-500 to-emerald-600',
  zap: 'from-yellow-500 to-amber-600',
  megaphone: 'from-orange-500 to-orange-600',
  mic: 'from-purple-500 to-purple-600',
  search: 'from-cyan-500 to-cyan-600',
  palette: 'from-indigo-500 to-indigo-600',
  'message-circle': 'from-teal-500 to-teal-600',
};

export function CategoryCard({ name, slug, description, toolCount, iconName }: CategoryCardProps) {
  const gradient = iconColors[iconName] || 'from-gray-500 to-gray-600';

  return (
    <a
      href={`/categories/${slug}`}
      className="group flex items-start gap-4 rounded-xl border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm',
          gradient,
        )}
      >
        <span className="text-lg font-bold">{name.charAt(0)}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600">{name}</h3>
        <p className="mt-0.5 line-clamp-1 text-sm text-gray-500">{description}</p>
        <p className="mt-1 text-xs font-medium text-indigo-600">{toolCount} tools</p>
      </div>
    </a>
  );
}
