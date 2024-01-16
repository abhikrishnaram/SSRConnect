import { auth } from '@auth';

import AdminDashboard from './_admin';
import MentorDashboard from './_mentor';
import StudentDashboard from './_student';

const Dashboard = async () => {

  const session = await auth();
  const user = session?.user;
  
  if(user?.isAdmin) return <AdminDashboard />;
  else if(user?.isStaff) return <MentorDashboard />;
  else return <StudentDashboard />;
};

export default Dashboard;