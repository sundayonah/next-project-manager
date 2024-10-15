'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '@/app/lib/zodValidation'; // Update the path if needed
import { createProject } from '@/actions/action'; // Assuming you have this action
import { z } from 'zod';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebaseConfig';
import Image from 'next/image';

const CreateProject: React.FC = () => {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<z.infer<typeof projectSchema>>({
      resolver: zodResolver(projectSchema),
   });

   // State to hold the selected file and its preview
   const [file, setFile] = useState<File | null>(null);
   const [imagePreview, setImagePreview] = useState<string | null>(null);

   const onSubmit = async (data: z.infer<typeof projectSchema>) => {
      console.log(data);
      try {
         // Upload the image to Firebase Storage if a file is selected
         let imageUrl = '';
         if (file) {
            const storageRef = ref(storage, `projects-manager/${file.name}`); // Save image under 'projects' folder
            await uploadBytes(storageRef, file); // Upload the image
            imageUrl = await getDownloadURL(storageRef); // Get the image URL after upload
         }

         console.log(imageUrl);

         // Now you have the imageUrl; create formData and submit
         const formData = new FormData();
         formData.append('name', data.name);
         formData.append('imageUrl', imageUrl); // Append the image URL instead of the file
         formData.append('link', data.link || '');
         formData.append('description', data.description || '');

         // Log formData contents
         for (const [key, value] of formData.entries()) {
            console.log(key, value);
         }

         // console.log(formData, 'form data');
         await createProject(formData);
         console.log('Project created successfully!'); // Log success
      } catch (error) {
         console.error('Error submitting form:', error);
      }
   };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const selectedFile = e.target.files[0];
         console.log(selectedFile);
         setFile(selectedFile);
         setImagePreview(URL.createObjectURL(selectedFile));
      }
   };
   console.log(imagePreview);

   return (
      <>
         <div className="max-w-xl mx-auto mt-44 pb-12">
            <div className="">
               <h2 className="text-xl font-bold text-center mb-8">
                  Add New Project
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
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Project Image:
                     </label>
                     <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange} // Update this line
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                     {errors.imageUrl && (
                        <span className="text-red-500 mt-1">
                           {errors.imageUrl.message}
                        </span>
                     )}
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                     <div className="mt-4">
                        <Image
                           src={imagePreview}
                           alt="Image Preview"
                           className="w-full h-auto rounded-md"
                           width={100}
                           height={100}
                        />
                     </div>
                  )}

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

export default CreateProject;
