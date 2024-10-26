import { getPackages, getProjects } from '@/actions/actions';
import Projects from '@/components/projects/page';

export default async function Home() {
   const projects = await getProjects();
   const packages = await getPackages();

   return (
      <div className="">
         <Projects projects={projects} packages={packages} />
      </div>
   );
}
