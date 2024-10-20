// app/lib/zodValidation.ts
import { z } from 'zod';

export const projectSchema = z.object({
   id: z.string().optional(),
   name: z.string().min(1, 'Name is required'),
   imageUrl: z.string().optional(),
   link: z.string().url('Invalid URL').optional(),
   description: z.string().optional(),
});

export const packageSchema = z.object({
   id: z.string().optional(),
   name: z.string().min(1, 'Name is required'),
   description: z.string().optional(),
   link: z.string().url('Invalid URL').optional(),
});

