import { InferSelectModel } from 'drizzle-orm';
import { snips } from '../connection/pg/schema';

export type SnipType = InferSelectModel<typeof snips>;
