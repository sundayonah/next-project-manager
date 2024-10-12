// src/components/CreateProject.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '@/app/lib/zodValidation'; // You'll need to create this file
import { createProject } from '@/actions/action'; // Assuming you have this action
import { z } from 'zod';

// interface ProjectType {
//    id: string;
//    name: string;
//    imageUrl?: string;
//    link?: string;
// }

const CreateProject: React.FC = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<z.infer<typeof projectSchema>>({
      resolver: zodResolver(projectSchema),
   });

   const onSubmit = async (data: z.infer<typeof projectSchema>) => {
      try {
         const newProject = await createProject(data);
         console.log(newProject);
         // Handle successful creation (e.g., close modal, refresh list)
         setIsModalOpen(false);
      } catch (error) {
         console.error('Error submitting form:', error);
      } finally {
      }
   };

   const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
   };

   return (
      <>
         <div className="text-end">
            <button
               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
               onClick={toggleModal}
            >
               Add Project
            </button>
         </div>

         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-10">
            <div className="bg-white shadow-lg p-6 rounded-md w-full max-w-lg">
               {/* Modal header */}
               <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Add New Project</h2>
                  <button
                     className="text-gray-500 hover:text-gray-700"
                     onClick={toggleModal}
                  >
                     &#x2715;
                  </button>
               </div>

               {/* Form */}
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                     <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Name:
                     </label>
                     <input
                        {...register('name')}
                        id="name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                     {errors.name && (
                        <span className="text-red-500 mt-1">
                           {errors.name.message}
                        </span>
                     )}
                  </div>

                  <div>
                     <label
                        htmlFor="imageUrl"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Image URL:
                     </label>
                     <input
                        {...register('imageUrl')}
                        id="imageUrl"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                     {errors.imageUrl && (
                        <span className="text-red-500 mt-1">
                           {errors.imageUrl.message}
                        </span>
                     )}
                  </div>

                  <div>
                     <label
                        htmlFor="link"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Link:
                     </label>
                     <input
                        {...register('link')}
                        id="link"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                     {errors.link && (
                        <span className="text-red-500 mt-1">
                           {errors.link.message}
                        </span>
                     )}
                  </div>

                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                     {isSubmitting ? <span>Loading...</span> : 'Submit'}
                  </button>
               </form>
            </div>
         </div>
      </>
   );
};

export default CreateProject;
