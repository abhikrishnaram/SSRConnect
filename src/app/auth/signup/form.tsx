'use client';

import { Button, Link } from '@nextui-org/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import InputField from '@/components/InputField';

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'First name must be atleast 2 characters')
      .max(45, 'First name must be less than 45 characters')
      .regex(new RegExp('^[a-zA-Z]+$'), 'No special character allowed!'),
    lastName: z
      .string()
      .min(2, 'Last name must be atleast 2 characters')
      .max(45, 'Last name must be less than 45 characters')
      .regex(new RegExp('^[a-zA-Z]+$'), 'No special character allowed!'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters ')
      .max(50, 'Password must be less than 50 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters ')
      .max(50, 'Password must be less than 50 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ['confirmPassword'],
  });

type InputType = z.infer<typeof FormSchema>;

const RegisterForm = () => {

  const router = useRouter();
  const [data, setData] = useState({} as InputType);
  const {
    register,
    formState: { errors: _, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  
  
  // const saveUser: SubmitHandler<InputType> = async (e) => {
  const saveUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { confirmPassword: _, ...user } = data;
    try {
      // const res = await registerUser(user.firstName, user.lastName, user.email, user.password);
      const res = {
        error: 'Not implemented yet!',
      };
      if(res?.error) {
        toast.error(res.error);
        return;
      } else {
        console.error(user);
        toast.success('The User Registered Successfully.');
        router.push('/auth/signin');
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.error();
    }
  };

  return (
      <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md min-w-[330px] md:min-w-[400px] xl:p-0 shadow-lg border">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight text-left tracking-tight text-gray-900 md:text-2xl">
                  Create new account
              </h1>
              <form
                  className="space-y-4 md:space-y-6 mt-4"
                  onSubmit={saveUser}
              >
                  <div className="grid grid-cols-2 gap-4">
                      <InputField
                          onChange={(e:any) => setData({ ...data, firstName: e.target.value })}
                          label="First Name"
                          id="firstname"
                          placeholder="John"
                          required
                      />
                      <InputField
                          {...register('lastName')}
                          onChange={(e:any) => setData({ ...data, lastName: e.target.value })}
                          label="Last Name"
                          name="lastname"
                          id="lastname"
                          placeholder="Doe"
                          required
                      />
                  </div>
                  <div className="flex flex-col items-start w-full">
                      <InputField 
                          label="Email"
                          onChange={(e:any) => setData({ ...data, email: e.target.value })}
                          className="w-full"
                          type="email"
                          id="email"
                          placeholder="name@xxx.amrita.edu"
                          required
                      />
                      <div className="text-xs font-semibold text-gray-400 mt-2">
                          use
                          <span className="font-monospace bg-gray-200 py-0.5 px-2 mx-1 text-gray-600 rounded">
                              .amrita.edu
                          </span>
                          mail
                      </div>
                  </div>
                  <InputField 
                      label="Password"
                      onChange={(e:any) => setData({ ...data, password: e.target.value })}
                      type="password"
                      id="password"
                      placeholder="••••••••"
                      required
                  />
                  <InputField 
                      label="Confirm Password"
                      onChange={(e:any) => setData({ ...data, confirmPassword: e.target.value })}
                      type="password"
                      id="cpassword"
                      placeholder="••••••••"
                      required
                  />
                  <Button
                      type="submit"
                      isLoading={isSubmitting}
                      className="bg-primary/90 hover:bg-primary text-white font-semibold rounded-lg px-4 py-2.5 w-full"
                  >
                      Get Started
                  </Button>
                  <p className="text-sm font-light text-gray-500">
                      Already have an account?
                      {' '}
                      <Link
                          href="/login"
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                          Login
                      </Link>
                  </p>
              </form>
          </div>
      </div>
  );
};

export default RegisterForm;
