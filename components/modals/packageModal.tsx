import { PackageModalProps } from '@/app/types/types';
import React, { useEffect, useState } from 'react';

const PackageModal: React.FC<PackageModalProps> = ({
   isOpen,
   onClose,
   onSubmit,
   npmPackage,
}) => {
   // Hooks are called unconditionally, regardless of the modal's open state
   const [formData, setFormData] = useState({
      name: npmPackage.name,
      link: npmPackage.link,
      description: npmPackage.description,
   });
   const [errors, setErrors] = useState<{ [key: string]: string }>({});

   // Update formData when the selected npmPackage changes
   useEffect(() => {
      setFormData({
         name: npmPackage.name,
         link: npmPackage.link,
         description: npmPackage.description,
      });
   }, [npmPackage]);

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const validateForm = () => {
      const newErrors: { [key: string]: string } = {};
      if (!formData.name) newErrors.name = 'Package name is required';
      if (!formData.link) newErrors.link = 'Package link is required';
      if (!formData.description)
         newErrors.description = 'Description is required';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validateForm()) {
         const updatedData = {
            ...npmPackage,
            ...formData,
         };
         onSubmit(updatedData);
         onClose();
      }
   };

   return isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-8">
         <div className="max-w-4xl mx-auto w-full bg-white dark:bg-[#1e1e1e] rounded-lg p-5 shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
               Edit Package
            </h2>
            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <label
                     className="block mb-1 text-gray-800 dark:text-gray-200"
                     htmlFor="name"
                  >
                     Package Name
                  </label>
                  <input
                     type="text"
                     id="name"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     className={`border p-2 w-full bg-gray-100 dark:bg-transparent text-gray-900 dark:text-gray-100 ${
                        errors.name
                           ? 'border-red-500'
                           : 'border-gray-300 dark:border-gray-600'
                     }`}
                  />
                  {errors.name && (
                     <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
               </div>

               <div className="mb-4">
                  <label
                     className="block mb-1 text-gray-800 dark:text-gray-200"
                     htmlFor="link"
                  >
                     Link
                  </label>
                  <input
                     type="text"
                     id="link"
                     name="link"
                     value={formData.link}
                     onChange={handleChange}
                     className={`border p-2 w-full bg-gray-100 dark:bg-transparent text-gray-900 dark:text-gray-100 ${
                        errors.link
                           ? 'border-red-500'
                           : 'border-gray-300 dark:border-gray-600'
                     }`}
                  />
                  {errors.link && (
                     <p className="text-red-500 text-sm">{errors.link}</p>
                  )}
               </div>
               <div className="mb-4">
                  <label
                     className="block mb-1 text-gray-800 dark:text-gray-200"
                     htmlFor="description"
                  >
                     Description
                  </label>
                  <textarea
                     id="description"
                     name="description"
                     value={formData.description}
                     onChange={handleChange}
                     className={`border p-2 w-full bg-gray-100 dark:bg-transparent text-gray-900 dark:text-gray-100 ${
                        errors.description
                           ? 'border-red-500'
                           : 'border-gray-300 dark:border-gray-600'
                     }`}
                  />
                  {errors.description && (
                     <p className="text-red-500 text-sm">
                        {errors.description}
                     </p>
                  )}
               </div>
               <div className="flex justify-between mt-4">
                  <button
                     type="button"
                     onClick={onClose}
                     className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 px-8 p-2 rounded"
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="bg-blue-600 text-white p-2 px-8 rounded "
                  >
                     Save
                  </button>
               </div>
            </form>
         </div>
      </div>
   ) : null;
};

export default PackageModal;
