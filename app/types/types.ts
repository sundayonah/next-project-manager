import { z } from 'zod';
import { packageSchema, projectSchema } from '../lib/zodValidation';

export interface ProjectType {
   id: string;
   name: string;
   imageUrl: string;
   link: string;
   description: string;
   stacks: string[];
};

export type ProjectData = z.infer<typeof projectSchema>;


export interface PackageType {
   id: string;
   name: string;
   link: string;
   description: string;
   stacks: string[];
}

export type PackageData = z.infer<typeof packageSchema>;


export interface ProjectsPackagesProps {
   projects: ProjectType[];
   packages: PackageType[];
}

export interface ProjectModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (data: ProjectData) => Promise<void>;
   project: ProjectType;
}


export interface PackageModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (data: PackageData) => Promise<void>;
   npmPackage: PackageType;
}

