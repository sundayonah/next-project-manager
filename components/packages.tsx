'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { packageSchema } from '@/app/lib/zodValidation'; // Update the path if needed
import { createPackage } from '@/actions/actions'; // Assuming you have this action
import { z } from 'zod';

const CreatePackageForm: React.FC = () => {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<z.infer<typeof packageSchema>>({
      resolver: zodResolver(packageSchema),
   });

   const onSubmit = async (data: z.infer<typeof packageSchema>) => {
      console.log(data);
      try {
         // Prepare a plain object instead of FormData
         const packageData = {
            name: data.name,
            link: data.link || '',
            description: data.description || '',
         };

         console.log('Project data to send:', packageData);

         // console.log(formData, 'form data');
         await createPackage(packageData);
         console.log('Project created successfully!'); // Log success
      } catch (error) {
         console.error('Error submitting form:', error);
      }
   };

   return (
      <>
         <div className="max-w-xl mx-auto mt-44 pb-12">
            <div className="">
               <h2 className="text-xl font-bold text-center mb-8">
                  Add New Package
               </h2>

               {/* Form */}
               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 mb-12"
               >
                  <div>
                     <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Project Name:
                     </label>
                     <input
                        {...register('name')}
                        id="name"
                        placeholder="Project Name"
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
                        htmlFor="link"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Project URL:
                     </label>
                     <input
                        {...register('link')}
                        id="link"
                        placeholder="Project URL"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                     {errors.link && (
                        <span className="text-red-500 mt-1">
                           {errors.link.message}
                        </span>
                     )}
                  </div>

                  <div>
                     <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Project Description:
                     </label>
                     <textarea
                        {...register('description')}
                        id="description"
                        placeholder="Project Description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                     {errors.description && (
                        <span className="text-red-500 mt-1">
                           {errors.description.message}
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

export default CreatePackageForm;
