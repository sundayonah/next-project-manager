import { getProjects } from '@/actions/action';
import Projects from '@/components/projects/page';

export default async function Home() {
   const projects = await getProjects();

   return (
      <div className="">
         <Projects projects={projects} />
      </div>
   );
}
