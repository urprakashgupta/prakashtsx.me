import { z } from 'zod';

export const diarySchema = z.object({
  date: z.string(),
  title: z.string().optional(),
  mood: z.string().optional(),
});
