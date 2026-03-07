import { NextRequest, NextResponse } from 'next/server';
import { getToolService } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const toolService = getToolService();

  const result = await toolService.getTools({
    page: Number(searchParams.get('page')) || 1,
    pageSize: Number(searchParams.get('pageSize')) || 12,
    category: searchParams.get('category') || undefined,
    tag: searchParams.get('tag') || undefined,
    search: searchParams.get('search') || undefined,
    pricing: searchParams.get('pricing') || undefined,
    sort: (searchParams.get('sort') as 'newest' | 'name' | 'featured') || 'newest',
  });

  return NextResponse.json({ success: true, data: result });
}
