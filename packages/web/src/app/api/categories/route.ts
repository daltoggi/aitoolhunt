import { NextResponse } from 'next/server';
import { getCategoryService } from '@/lib/db';

export async function GET() {
  const categoryService = getCategoryService();
  const categories = await categoryService.getCategories();

  return NextResponse.json({ success: true, data: categories });
}
