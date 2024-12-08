'use client';
import { useState } from 'react';

import { columns } from './columns';
import ManageProjectsTable from './data-table';

import ManageWrapper from '@/components/manage-page';
import ProjectDetails from '@/app/(console)/(private)/manage/projects/details';
import { TProject } from '@/types/project';

const BREADCRUMBS = [
  {
    title: 'Dashboard',
    route: '/dashboard',
  },
  {
    title: 'Manage',
    route: '/manage',
  },
  {
    title: 'Projects',
    route: '/manage/projects',
  },
];

const ManageUserPage = () => {
    
  const [selectedProject, setSelectedProject] = useState<TProject | null>(null);
    
  return (
      <ManageWrapper breadcrumbs={BREADCRUMBS} title="Manage Project" className="flex">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-5 p-4 bg-white rounded-lg shadow-xl shadow-gray-200 min-h-[36rem] w-full">
              <div className="col-span-2 md:col-span-2 flex overflow-hidden">
                  <ManageProjectsTable<TProject, TProject | null>
                      columns={columns}
                      onSelect={(o) => setSelectedProject(o)}
                  />
              </div>
              <div>
                  <div className="border border-dashed border-gray-400 h-full rounded-lg">
                      <ProjectDetails project={selectedProject} />
                  </div>
              </div>
          </div>
      </ManageWrapper>
  );
};

export default ManageUserPage;