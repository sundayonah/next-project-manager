'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import Modal from './Modal';
import { deleteProject, updateProject } from '@/actions/action'; // Adjust the import according to your structure
import Modal from '../modal';

import { ProjectData, ProjectType } from '@/app/types/types';

const Projects = ({ projects }: { projects: ProjectType[] }) => {
   const [isModalOpen, setModalOpen] = useState(false);
   const [projectList, setProjectList] = useState<ProjectType[]>(projects); // Store the projects in state

   const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
      null
   );

   const handleDelete = async (id: string) => {
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

   const handleEditClick = (project: ProjectType) => {
      setSelectedProject(project);
      setModalOpen(true);
   };

   const handleUpdateProject = async (data: ProjectData) => {
      if (!selectedProject) {
         throw new Error('No project selected for update');
      }

      try {
         const formData = new FormData();
         // Append updated fields
         if (data.name && data.name !== selectedProject.name) {
            formData.append('name', data.name);
         }
         if (data.imageUrl && data.imageUrl !== selectedProject.imageUrl) {
            formData.append('imageUrl', data.imageUrl);
         }
         if (data.link && data.link !== selectedProject.link) {
            formData.append('link', data.link);
         }
         if (
            data.description &&
            data.description !== selectedProject.description
         ) {
            formData.append('description', data.description);
         }

         if (
            formData.has('name') ||
            formData.has('imageUrl') ||
            formData.has('link') ||
            formData.has('description')
         ) {
            const updatedProject = await updateProject(
               selectedProject.id,
               formData
            );

            // Immediately update the project list
            setProjectList((prev) =>
               prev.map((project) =>
                  project.id === selectedProject.id ? updatedProject : project
               )
            );
            // Optionally close the modal after successful update
            setModalOpen(false);
         } else {
            console.log('No fields were changed.');
         }
      } catch (error) {
         console.error('Failed to update project:', error);
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
                           onClick={() => handleEditClick(p)}
                           className="text-blue-600 hover:underline border border-blue-600 p-1 px-8 rounded-md"
                        >
                           Edit
                        </button>
                        <button
                           onClick={() => handleDelete(p.id)}
                           className="text-red-600 hover:underline border border-red-600 p-1 px-8 rounded-md"
                        >
                           Delete
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Modal for editing a project */}
         {selectedProject && (
            <Modal
               isOpen={isModalOpen}
               onClose={() => setModalOpen(false)}
               onSubmit={handleUpdateProject}
               project={selectedProject}
            />
         )}
      </div>
   );
};

export default Projects;
