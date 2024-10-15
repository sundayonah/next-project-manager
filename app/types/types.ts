import { z } from 'zod';
import { projectSchema } from '../lib/zodValidation';

export type ProjectType = {
   id: string;
   name: string;
   imageUrl: string;
   link: string;
   description: string;
};

export type ProjectData = z.infer<typeof projectSchema>;
