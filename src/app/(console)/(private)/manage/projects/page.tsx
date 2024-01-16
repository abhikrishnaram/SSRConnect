import ManageWrapper from '@/components/manage-page';
import ManageProjectsTable from '@/app/(console)/(private)/manage/projects/table';

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

const ManageUserPage = async () => {

  return (
      <ManageWrapper breadcrumbs={BREADCRUMBS} title="Manage Project" className="flex">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 my-5 p-4 bg-white rounded-lg shadow-xl shadow-gray-200 min-h-[36rem] w-full">
              <div className="col-span-2 md:col-span-3 flex overflow-hidden">
                  <ManageProjectsTable />
              </div>
              <div>
                  <div className="border border-dashed border-gray-400 h-full rounded-lg"></div>
              </div>
          </div>
      </ManageWrapper>
  );
};

export default ManageUserPage;