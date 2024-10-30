'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import ProjectModal from './ProjectModal';
import {
   deletePackage,
   deleteProject,
   updatePackage,
   updateProject,
} from '@/actions/actions';
import ProjectModal from '../modals/projectModal';

import {
   PackageType,
   ProjectData,
   ProjectsPackagesProps,
   ProjectType,
} from '@/app/types/types';
import PackageModal from '../modals/packageModal';
import { packageSchema } from '@/app/lib/zodValidation';
import { z } from 'zod';

const Projects = ({ projects, packages }: ProjectsPackagesProps) => {
   const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
   const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
   const [projectList, setProjectList] = useState<ProjectType[]>(projects);
   const [packageList, setPackageList] = useState<PackageType[]>(packages);

   const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
      null
   );

   const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(
      null
   );

   // console.log(packages, 'packages');

   const handleProjectDelete = async (id: string) => {
      const confirmed = confirm(
         'Are you sure you want to delete this project?'
      );
      if (confirmed) {
         try {
            await deleteProject(id);
            // Optionally, refresh the project list here

            // Update the project list without the deleted project
            const updatedProjects = projectList.filter(
               (project) => project.id !== id
            );
            setProjectList(updatedProjects);
         } catch (error) {
            console.error('Failed to delete project:', error);
            alert('Failed to delete project.');
         }
      }
   };

   const handleProjectEditClick = async (project: ProjectType) => {
      setSelectedProject(project);
      setIsProjectModalOpen(true);
   };

   const handleUpdateProject = async (data: ProjectData) => {
      if (!selectedProject) {
         throw new Error('No project selected for update');
      }

      try {
         const projectData = {
            name: data.name,
            link: data.link || '',
            imageUrl: data.imageUrl || '',
            description: data.description || '',
            stacks: data.stacks || '',
         };

         const updatedProject = await updateProject(
            selectedProject.id,
            projectData
         );

         // Immediately update the project list
         setProjectList((prev) =>
            prev.map((project) =>
               project.id === selectedProject.id ? updatedProject : project
            )
         );
         // Optionally close the modal after successful update
         setIsProjectModalOpen(false);
      } catch (error) {
         console.error('Failed to update project:', error);
      }
   };

   //////////////////////////////////////////////////////////////////////////////

   const handlePackageEditClick = async (npmPackage: PackageType) => {
      setSelectedPackage(npmPackage);
      setIsPackageModalOpen(true);
   };

   const handlePackageDelete = async (id: string) => {
      const confirmed = confirm(
         'Are you sure you want to delete this project?'
      );
      if (confirmed) {
         try {
            await deletePackage(id);
            // Optionally, refresh the project list here

            // Update the npmPackage list without the deleted npmPackage
            const updatedPackages = packageList.filter(
               (npmPackage) => npmPackage.id !== id
            );
            setPackageList(updatedPackages);
         } catch (error) {
            console.error('Failed to delete package:', error);
            alert('Failed to delete package.');
         }
      }
   };

   const handleUpdatePackge = async (data: z.infer<typeof packageSchema>) => {
      if (!selectedPackage) {
         throw new Error('No package selected for update');
      }

      try {
         // Prepare a plain object instead of FormData
         const packageData = {
            name: data.name,
            link: data.link || '',
            description: data.description || '',
            stacks: data.stacks || '',
         };

         const updatedPackage = await updatePackage(
            selectedPackage.id,
            packageData
         );

         // Immediately update the package list
         setPackageList((prev) =>
            prev.map((npmPackage) =>
               npmPackage.id === selectedPackage.id
                  ? updatedPackage
                  : npmPackage
            )
         );
         // Optionally close the modal after successful update
         setIsPackageModalOpen(false);
      } catch (error) {
         console.error('Failed to update npm - package:', error);
      }
   };

   return (
      <div>
         <div className="md:w-[80%] w-full">
            <h1 className="text-2xl md:text-5xl text-[#27272a] dark:text-[#d6d6d9] font-bold pb-8">
               {
                  "These are some of the things I've created to challenge myself and have fun."
               }
            </h1>
         </div>

         <div>
            <h2 className="text-2xl md:text-4xl text-[#046af8] font-bold py-8">
               My Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {projectList.map((p) => (
                  <div key={p.id} className="mb-6 group">
                     <Link href={p.link || '#'} className="block">
                        <div className="rounded-lg space-y-6 transition-transform duration-300 group-hover:scale-[1.02]">
                           <Image
                              src={p.imageUrl}
                              alt={p.name}
                              width={800}
                              height={100}
                              className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-101"
                           />
                           <p className="text-[#27272a] dark:text-[#d6d6d9] text-2xl font-bold mt-3 transition-colors duration-300 group-hover:text-[#046af8]">
                              {p.name}
                           </p>
                           <p className="text-[#9898a0] transition-colors duration-300 group-hover:text-[#555] dark:group-hover:text-[#bbbbbb]">
                              {p.description && p.description.length > 100
                                 ? `${p.description.slice(0, 150)}...`
                                 : p.description || 'No description available'}
                           </p>
                        </div>
                     </Link>
                     <div className="mt-4 flex justify-between">
                        <button
                           onClick={() => handleProjectEditClick(p)}
                           className="text-blue-600 hover:underline border border-blue-600 p-1 px-8 rounded-md"
                        >
                           Edit
                        </button>
                        <button
                           onClick={() => handleProjectDelete(p.id)}
                           className="text-red-600 hover:underline border border-red-600 p-1 px-8 rounded-md"
                        >
                           Delete
                        </button>
                     </div>
                  </div>
               ))}
            </div>

            <div className="w-full border border-b-[#27272a] my-8" />
            {/* <p className='w-full'>{ `//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////`}</p> */}

            <div className="mt-4">
               <h2 className="text-2xl md:text-4xl text-[#046af8] font-bold py-8">
                  NPM Packages
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packageList.map((p) => (
                     <div key={p.id} className="mb-6 group">
                        <Link href={p.link || '#'} className="block">
                           <div className="rounded-lg space-y-6 transition-transform duration-300 group-hover:scale-[1.02]">
                              <p className="text-[#27272a] dark:text-[#d6d6d9] text-2xl font-bold mt-3 transition-colors duration-300 group-hover:text-[#046af8]">
                                 {p.name}
                              </p>
                              <p className="text-[#9898a0] transition-colors duration-300 group-hover:text-[#555] dark:group-hover:text-[#bbbbbb]">
                                 {p.description && p.description.length > 100
                                    ? `${p.description.slice(0, 100)}...`
                                    : p.description ||
                                      'No description available'}
                              </p>
                           </div>
                        </Link>
                        {/* display the stacks */}
                        <div className="my-4">
                           {p.stacks.length > 0 ? (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                 Stacks:{' '}
                                 {p.stacks.map((s, index) => (
                                    <span
                                       key={index}
                                       className="bg-blue-100 text-blue-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded"
                                    >
                                       {s}
                                    </span>
                                 ))}
                              </p>
                           ) : (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                 No stacks available
                              </p>
                           )}
                        </div>

                        <div className="mt-4 flex justify-between">
                           <button
                              onClick={() => handlePackageEditClick(p)}
                              className="text-blue-600 hover:underline border border-blue-600 p-1 px-8 rounded-md"
                           >
                              Edit
                           </button>
                           <button
                              onClick={() => handlePackageDelete(p.id)}
                              className="text-red-600 hover:underline border border-red-600 p-1 px-8 rounded-md"
                           >
                              Delete
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* ProjectModal for editing a project */}
         {selectedProject && (
            <ProjectModal
               isOpen={isProjectModalOpen}
               onClose={() => setIsProjectModalOpen(false)}
               onSubmit={handleUpdateProject}
               project={selectedProject}
            />
         )}

         {selectedPackage && (
            <PackageModal
               isOpen={isPackageModalOpen}
               onClose={() => setIsPackageModalOpen(false)}
               onSubmit={handleUpdatePackge}
               npmPackage={selectedPackage}
            />
         )}
      </div>
   );
};

export default Projects;
