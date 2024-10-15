// import { projectSchema } from '@/app/lib/zodValidation';
// import { z } from 'zod';
// import * as uuid from 'uuid';
// import { db } from '@/firebaseConfig';
// import {
//    addDoc,
//    collection,
//    deleteDoc,
//    doc,
//    getDocs,
//    updateDoc,
// } from 'firebase/firestore';

// export async function getProjects() {
//    const projectsSnapshot = await getDocs(collection(db, 'projects'));
//    return projectsSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//    }));
// }

// export async function createProject(data: z.infer<typeof projectSchema>) {
//    try {
//       const newProjectRef = await addDoc(collection(db, 'projects'), data);
//       return newProjectRef;
//    } catch (error) {
//       console.error('Error creating project:', error);
//       throw error;
//    }
// }

// export async function updateProject(
//    id: string,
//    data: z.infer<typeof projectSchema>
// ) {
//    try {
//       await updateDoc(doc(db, 'projects', id), data);
//       return true; // Return success status
//    } catch (error) {
//       console.error('Error updating project:', error);
//       throw error;
//    }
// }

// export async function deleteProject(id: string) {
//    try {
//       await deleteDoc(doc(db, 'projects', id));
//       return true; // Return success status
//    } catch (error) {
//       console.error('Error deleting project:', error);
//       throw error;
//    }
// }

// export function generateUniqueId(): string {
//    return uuid.v4().toString();
// }

// import { projectSchema } from '@/app/lib/zodValidation';
import { revalidatePath } from 'next/cache';
// import { z } from 'zod';

const BASE_URL = 'http://localhost:8080/api/projects';

// Create Project
// export async function createProject(data: FormData) {
//    const response = await fetch(`${BASE_URL}/new`, {
//       method: 'POST',
//       // Do NOT set the Content-Type header manually, let the browser handle it
//       body: data, // Send the form data directly
//    });

//    console.log(response.json(), 'response json');

//    if (!response.ok) {
//       throw new Error('Failed to create project');
//    }

//    return await response.json();
// }

export async function createProject(data: FormData) {
   try {
      const response = await fetch(`${BASE_URL}/new`, {
         method: 'POST',
         body: data, // Send the form data directly
      });

      // Try parsing as JSON first
      const responseText = await response.text();
      console.log(responseText, 'Full response text');

      if (!response.ok) {
         // Try to parse the error response as JSON, if applicable
         try {
            const jsonError = JSON.parse(responseText);
            throw new Error(jsonError.error || 'Failed to create project');
         } catch (error) {
            console.error('Invalid JSON response:', error);

            // If parsing fails, handle it as plain text
            throw new Error(responseText);
         }
      }
      // revalidatePath('/');

      // If it's OK, return the parsed JSON
      return JSON.parse(responseText);
   } catch (error) {
      console.error('Error creating project:', error);
      throw error;
   }
}

// Get All Projects
export async function getProjects() {
   const response = await fetch(BASE_URL);

   if (!response.ok) {
      throw new Error('Failed to fetch projects');
   }
   revalidatePath('/');

   return await response.json();
}

// Get Project by ID
export async function getProjectById(id: string) {
   const response = await fetch(`${BASE_URL}/${id}`);

   if (!response.ok) {
      throw new Error('Failed to fetch project');
   }

   return await response.json();
}

// Update Project by ID
export async function updateProject(id: string, data: FormData) {
   try {
      const response = await fetch(`${BASE_URL}/${id}`, {
         method: 'PUT',
         body: data, // Send FormData directly without JSON.stringify
      });

      if (!response.ok) {
         throw new Error('Failed to update project');
      }

      return await response.json();
   } catch (error) {
      console.error('Error updating project:', error);
      throw error;
   }
}

// Delete Project by ID
export async function deleteProject(id: string) {
   const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
   });

   if (!response.ok) {
      throw new Error('Failed to delete project');
   }

   return await response.json();
}
