import { projectSchema } from '@/app/lib/zodValidation';
import { z } from 'zod';
import * as uuid from 'uuid';
import { db } from '@/firebaseConfig';
import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   getDocs,
   updateDoc,
} from 'firebase/firestore';

export async function getProjects() {
   const projectsSnapshot = await getDocs(collection(db, 'projects'));
   return projectsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
   }));
}

export async function createProject(data: z.infer<typeof projectSchema>) {
   try {
      const newProjectRef = await addDoc(collection(db, 'projects'), data);
      return newProjectRef;
   } catch (error) {
      console.error('Error creating project:', error);
      throw error;
   }
}

export async function updateProject(
   id: string,
   data: z.infer<typeof projectSchema>
) {
   try {
      await updateDoc(doc(db, 'projects', id), data);
      return true; // Return success status
   } catch (error) {
      console.error('Error updating project:', error);
      throw error;
   }
}

export async function deleteProject(id: string) {
   try {
      await deleteDoc(doc(db, 'projects', id));
      return true; // Return success status
   } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
   }
}

export function generateUniqueId(): string {
   return uuid.v4().toString();
}
