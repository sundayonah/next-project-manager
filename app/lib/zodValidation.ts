import { z } from 'zod';

export const projectSchema = z.object({
   id: z.string().uuid(),
   name: z.string().min(1, 'Name is required'),
   imageUrl: z.string().optional(),
   link: z.string().url().optional(),
});
