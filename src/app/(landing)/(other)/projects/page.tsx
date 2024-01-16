// @ts-nocheck
import { toast } from 'react-toastify';
import { notFound } from 'next/navigation';

import ProjectsMain from '@/app/(landing)/(other)/projects/main';


const ProjectsPage = async ({ searchParams }: any) => {

  const projects = await fetch(`${process.env.NEXTAUTH_URL}/api/get/projects?query=${searchParams?.query ?? ''}`).then((res) => res.json());

  if(projects?.error) {
    toast.error(projects.error);
    setTimeout(() => {
      notFound();
    }, 5000);
  }
      
  
  // const handleSearch = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(e.target);
  // };
    
  return (
      <div className="flex max-h-screen">
          <ProjectsMain initialData={projects} />
      </div>
  );
};

export default ProjectsPage;