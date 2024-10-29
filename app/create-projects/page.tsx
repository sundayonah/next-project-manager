'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '@/app/lib/zodValidation'; // Update the path if needed
import { createProject } from '@/actions/actions'; // Assuming you have this action
import { z } from 'zod';
import Image from 'next/image';

const CreateProject: React.FC = () => {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
   } = useForm<z.infer<typeof projectSchema>>({
      resolver: zodResolver(projectSchema),
      defaultValues: { stacks: [] },
   });

   // State to hold the selected file and its preview
   // const [file, setFile] = useState<File | null>(null);
   const [imagePreview, setImagePreview] = useState<string | null>(null);
   const [stacks, setStacks] = useState<string[]>([]);
   const [stackInput, setStackInput] = useState<string>('');
   // const [values, setValues] = useState()

   const handleAddStack = () => {
      if (stackInput.trim() && !stacks.includes(stackInput)) {
         const newStacks = [...stacks, stackInput];
         setStacks(newStacks);
         setValue('stacks', newStacks); // Update the hidden input value
         setStackInput('');
      }
   };

   const handleRemoveStack = (stackToRemove: string) => {
      setStacks(stacks.filter((stack) => stack !== stackToRemove));
   };

   const onSubmit = async (data: z.infer<typeof projectSchema>) => {
      console.log(data);
      try {
         const imageUrl = imagePreview || '';

         // Prepare a plain object instead of FormData
         const projectData = {
            name: data.name,
            imageUrl: imageUrl,
            link: data.link || '',
            description: data.description || '',
            stacks: data.stacks,
         };

         console.log('Project data to send:', projectData);

         await createProject(projectData);
         console.log('Project created successfully!');
      } catch (error) {
         console.error('Error submitting form:', error);
      }
   };

   // console.log(stacks, 'stacks');

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const selectedFile = e.target.files[0];
         console.log(selectedFile);

         // Use FileReader to convert the file to a data URL
         const reader = new FileReader();
         reader.onloadend = () => {
            setImagePreview(reader.result as string);
         };
         console.log(reader, 'reader');
         reader.readAsDataURL(selectedFile);
      }
   };
   // console.log(imagePreview, 'image preview');

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
                        onChange={handleFileChange}
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
                  <div>
                     <label
                        htmlFor="stacks"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Tech Stacks:
                     </label>
                     <div className="flex space-x-2">
                        <input
                           type="text"
                           id="stacks"
                           value={stackInput}
                           onChange={(e) => setStackInput(e.target.value)}
                           placeholder="Add a stack"
                           className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                           type="button"
                           onClick={handleAddStack}
                           className="bg-blue-500 text-white px-3 py-2 rounded-r-md"
                        >
                           Add
                        </button>
                     </div>
                     {/* <input type="hidden" {...register('stacks')} /> */}

                     <div className="mt-2 flex flex-wrap">
                        {stacks.map((stack) => (
                           <span
                              key={stack}
                              className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full m-1 cursor-pointer"
                              onClick={() => handleRemoveStack(stack)}
                           >
                              {stack} &times;
                           </span>
                        ))}
                     </div>
                     {errors.stacks && (
                        <span className="text-red-500 mt-1">
                           {errors.stacks.message}
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
