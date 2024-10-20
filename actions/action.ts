import { revalidatePath } from 'next/cache';
// import { z } from 'zod';

// const BASE_URL = 'http://localhost:8080/api/projects';
const BASE_URL = 'https://279d-98-97-79-15.ngrok-free.app/api/projects';

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


/////////////////////////////////////////////////////////////////////

export async function createPackage(data: FormData) {
   console.log(data)
   try {
      const response = await fetch('http://localhost:8080/api/packages/new', {
         method: 'POST',
         body: data, // FormData is passed directly
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
   const response = await fetch("http://localhost:8080/api/packages");

   if (!response.ok) {
      throw new Error('Failed to fetch projects');
   }
   revalidatePath('/');

   return await response.json();
}

// Get Project by ID
export async function getPackageById(id: string) {
   const response = await fetch(`${BASE_URL}/${id}`);

   if (!response.ok) {
      throw new Error('Failed to fetch package');
   }

   return await response.json();
}

// Update Project by ID
export async function updatePackage(id: string, data: FormData) {
   try {
      const response = await fetch(`${BASE_URL}/${id}`, {
         method: 'PUT',
         body: data, // Send FormData directly without JSON.stringify
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
   const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
   });

   if (!response.ok) {
      throw new Error('Failed to delete package');
   }

   return await response.json();
}
