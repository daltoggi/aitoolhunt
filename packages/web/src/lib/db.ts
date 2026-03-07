import { getDb, ToolService, CategoryService } from '@aitoolhunt/api';

let db: ReturnType<typeof getDb> | null = null;

function getDatabase() {
  if (!db) {
    db = getDb();
  }
  return db;
}

export function getToolService() {
  return new ToolService(getDatabase());
}

export function getCategoryService() {
  return new CategoryService(getDatabase());
}
