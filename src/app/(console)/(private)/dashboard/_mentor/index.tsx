'use client';

import Link from 'next/link';
import { FileTextIcon, PackageIcon, UserIcon, UsersIcon } from 'lucide-react';

import Index from '../_admin/quick-actions';

const STATS = [
  {
    label: 'Teams',
    value: 10,
  },
  {
    label: 'Students',
    value: 994,
  },
  {
    label: 'Mentors',
    value: 30,
  },
  {
    label: 'Projects Completed',
    value: 10,
  },
  {
    label: 'Projects Ongoing',
    value: 10,
  },
  {
    label: 'Proposals Submitted',
    value: 10,
  },
];

const ACTIONS = [
  {
    title: 'Manage Projects',
    icon: <PackageIcon />,
    link: '/manage/projects',
  },
  {
    title: 'Manage Proposals',
    icon: <FileTextIcon />,
    link: '/manage/proposals',
  },
  {
    title: 'Manage Teams',
    icon: <UsersIcon />,
    link: '/manage/teams',
  },
  {
    title: 'Manage Users',
    icon: <UserIcon />,
    link: '/manage/users',
  },
  // create project
  // import students
  // import mentors
  // import teams
  // import proposals
  // import projects
];

const MentorDashboard = () => {
  return (
      <div className="p-5 flex-grow flex flex-col gap-4">
          <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3">
                  <div className="grid grid-cols-3 gap-4">
                      {STATS.map((stat, index) => (
                          <div className="w-full min-h-56 bg-white rounded-lg flex p-4" key={index}>
                              <div>
                                  <div className="mb-2 text-base font-medium text-gray-400">
                                      {stat.label}
                                  </div>
                                  <div className="text-3xl font-semibold text-gray-700">
                                      {stat.value}
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
              <Index />
          </div>
          <div className="mt-4">
              <div className="text-xl text-gray-500 font-semibold mb-2">Portals</div>
              <div className="grid grid-cols-4 gap-4">
                  {ACTIONS.map((action, index) => (
                      <Link href={action.link} className="bg-white border hover:border-primary hover:text-primary transform flex justify-between duration-300 rounded-md p-5" key={index}>
                          <div className="text-xl font-bold">{action.title}</div>
                          <div>{action.icon}</div>
                      </Link>
                  ))}
              </div>
          </div>
          <div className="bg-white p-4 rounded-lg border mt-8">
              <div className="text-3xl text-gray-500 font-bold mb-8">Recent Activities</div>
              <div className="flex flex-col gap-4">
                  <div className="bg-gray-100 border rounded-md p-5">
                      <div className="flex justify-between">
                          <div className="text-xl font-bold">Project 1</div>
                          <div className="text-sm text-gray-500">1 day ago</div>
                      </div>
                      <div className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</div>
                      <div className="flex gap-4 mt-4">
                          <div className="bg-gray-200 rounded-md p-2">Mentor 1</div>
                          <div className="bg-gray-200 rounded-md p-2">Mentor 2</div>
                          <div className="bg-gray-200 rounded-md p-2">Mentor 3</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default MentorDashboard;