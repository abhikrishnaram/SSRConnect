import { TextField } from '@mui/material';
import { toast } from 'react-toastify';

import Button from '@/components/button';
import { addUser } from '@/lib/actions/admin/quickActions';

const AddStudentForm = ({ handleClose }: { handleClose: () => void }) => {

  const formAddStudent = (data: FormData) => {
      
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const email = data.get('email');
    const password = data.get('password');

    addUser(JSON.stringify({ firstName, lastName, email, password }), 'STUDENT')
      .then((res) => {
        if(res?.error) {
          toast.error(res?.error);
          return;
        }
        toast.success('Student add successfully');
        handleClose();
      }).catch((err: any) => {
        toast.error('Something went wrong');
        console.error(err);
      });
  };
    
  return (
      <div>
          <form action={formAddStudent}>
              <div className="text-2xl font-bold text-gray-900">Add Student</div>
              <div className="text-xs text-gray-500 mt-2">
                  Add the student preferably the lead of a team. The student lead will be able to fill the details of the team and create project.
              </div>
              <div className="mt-8 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-2">
                      <TextField
                          variant="outlined"
                          name="firstName"
                          label="First Name"
                      />
                      <TextField
                          variant="outlined"
                          label="Last Name"
                          name="lastName"
                      />
                  </div>
                  <TextField
                      variant="outlined"
                      label="Email"
                      name="email"
                      type="email"
                  />
                  <TextField
                      variant="outlined"
                      label="Password"
                      type="password"
                      name="password"
                  />
                  <Button variant="primary" type="submit" className="mt-2">
                      Add Student
                  </Button>
              </div>
          </form>
      </div>
  );
};

export default AddStudentForm;