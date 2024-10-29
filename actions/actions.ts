import { packageSchema, projectSchema } from '@/app/lib/zodValidation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
// import { z } from 'zod';

// const PROJECT_BASE_URL = 'http://localhost:8080/api/projects';
// const PROJECT_BASE_URL = 'https://279d-98-97-79-15.ngrok-free.app/api/projects';

const PROJECT_BASE_URL = "https://project-manager-server-side-production.up.railway.app/api/projects"
const PACKAGES_BASE_URL = "https://project-manager-server-side-production.up.railway.app/api/packages"

export async function createProject(data: z.infer<typeof projectSchema>) {
   console.log(data, "data in action")
   try {
      const response = await fetch(`${PROJECT_BASE_URL}/new`, {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json', // Set the correct content type
         },
         body: JSON.stringify(data), // Send the data as a JSON string
      });

      const responseText = await response.text();
      // console.log(responseText, 'Full response text');

      if (!response.ok) {
         try {
            const jsonError = JSON.parse(responseText);
            throw new Error(jsonError.error || 'Failed to create project');
         } catch (error) {
            console.error('Invalid JSON response:', error);
            throw new Error(responseText);
         }
      }

      return JSON.parse(responseText);
   } catch (error) {
      console.error('Error creating project:', error);
      throw error;
   }
}


export async function getProjects() {
   const response = await fetch(`${PROJECT_BASE_URL}`);

   if (!response.ok) {
      throw new Error('Failed to fetch projects');
   }
   revalidatePath('/');

   return await response.json();
}
// Get Project by ID
export async function getProjectById(id: string) {
   const response = await fetch(`${PROJECT_BASE_URL}/${id}`);

   if (!response.ok) {
      throw new Error('Failed to fetch project');
   }

   return await response.json();
}
// Update Project by ID
export async function updateProject(id: string, data: z.infer<typeof projectSchema>) {
   try {
      const response = await fetch(`${PROJECT_BASE_URL}/${id}`, {
         method: 'PUT',
         body: JSON.stringify(data),
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
   const response = await fetch(`${PROJECT_BASE_URL}/${id}`, {
      method: 'DELETE',
   });

   if (!response.ok) {
      throw new Error('Failed to delete project');
   }

   return await response.json();
}

//////////////////////////////PACKAGES///////////////////////////////////////

export async function createPackage(data: z.infer<typeof projectSchema>) {
   console.log(data)
   try {
      const response = await fetch(`${PACKAGES_BASE_URL}/new`, {
         method: 'POST',
         // credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
      });

      const responseText = await response.text();
      console.log(responseText, 'Full response text');

      if (!response.ok) {
         try {
            const jsonError = JSON.parse(responseText);
            throw new Error(jsonError.error || 'Failed to create package');
         } catch (error) {
            console.error('Invalid JSON response:', error);

            // If parsing fails, handle it as plain text
            throw new Error(responseText);
         }
      }
      return JSON.parse(responseText);
   } catch (error) {
      console.error('Error creating package:', error);
      throw error;
   }
}


// Get All Projects
export async function getPackages() {
   const response = await fetch(PACKAGES_BASE_URL);

   if (!response.ok) {
      throw new Error('Failed to fetch projects');
   }
   revalidatePath('/');

   return await response.json();
}

// Get Project by ID
export async function getPackageById(id: string) {
   const response = await fetch(`${PACKAGES_BASE_URL}/${id}`);

   if (!response.ok) {
      throw new Error('Failed to fetch package');
   }

   return await response.json();
}

// Update Project by ID
export async function updatePackage(id: string, data: z.infer<typeof packageSchema>) {
   try {
      const response = await fetch(`${PACKAGES_BASE_URL}/${id}`, {
         method: 'PUT',
         body: JSON.stringify(data),
      });

      if (!response.ok) {
         throw new Error('Failed to update package');
      }

      return await response.json();
   } catch (error) {
      console.error('Error updating package:', error);
      throw error;
   }
}

// Delete Project by ID
export async function deletePackage(id: string) {
   const response = await fetch(`${PACKAGES_BASE_URL}/${id}`, {
      method: 'DELETE',
   });

   if (!response.ok) {
      throw new Error('Failed to delete package');
   }

   return await response.json();
}