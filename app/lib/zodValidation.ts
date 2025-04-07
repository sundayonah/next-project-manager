// app/lib/zodValidation.ts
import { z } from 'zod';

export const projectSchema = z.object({
   id: z.string().optional(),
   name: z.string().min(1, 'Name is required'),
   imageUrl: z.string().optional(),
   link: z.string().url('Invalid URL').optional(),
   description: z.string()
      .max(1000, 'Description must be less than 500 characters')
      .optional(),
   stacks: z.array(z.string().min(1, { message: "Stack name cannot be empty" })).min(1, { message: "At least one stack is required" }),
});

export const packageSchema = z.object({
   id: z.string().optional(),
   name: z.string().min(1, 'Name is required'),
   link: z.string().url('Invalid URL').optional(),
   description: z.string()
      .max(1000, 'Description must be less than 500 characters')
      .optional(),
   stacks: z.array(z.string().min(1, { message: "Stack name cannot be empty" })).min(1, { message: "At least one stack is required" }),
});

