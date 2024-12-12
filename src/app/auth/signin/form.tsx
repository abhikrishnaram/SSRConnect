'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { z } from 'zod';
import { useState } from 'react';

import Button from '@/components/button';

interface Props {
  callback?: string;
  error?: string;
}

const FormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string({
    required_error: 'Please enter your password',
  }),
});

type InputType = z.infer<typeof FormSchema>;

const LoginForm = (props: Props) => {

  const [data, setData] = useState({} as InputType);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<InputType> = async () => {
    const result = await signIn('credentials', {
      redirect: true,
      callbackUrl: `${props.callback ? props.callback : '/dashboard'}`,
      username: data.email,
      password: data.password,
    });
    if(!result?.ok) {
      toast.error(result?.error);
      return;
    }
    toast.success('Welcome To SSR Portal');
  };

  return (
      <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md min-w-[330px] md:min-w-[400px] xl:p-0 shadow-lg border">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight text-left tracking-tight text-gray-900 md:text-2xl">
                  Login to your account
              </h1>
              <form
                  className="space-y-4 md:space-y-8 mt-4"
                  onSubmit={handleSubmit(onSubmit)}
              >
                  <div className="p-2 flex flex-col gap-4">
                      <div className="flex flex-col items-start">
                          <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                          <input
                              id="email"
                              type="email"
                              {...register('email')}
                              aria-errormessage={errors.email?.message}
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="name@xxx.amrita.edu"
                              onChange={(e) => setData({ ...data, email: e.target.value })}
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
                      <div className="flex flex-col items-start">
                          <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                          <input
                              id="password"
                              placeholder="••••••••"
                              {...register('password')}
                              onChange={(e) => setData({ ...data, password: e.target.value })}
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              type="password"
                              required
                          />

                          <div className="flex items-center justify-end mt-1 w-full">
                              <a
                                  href="/auth/forgot-password"
                                  className="text-sm font-medium text-primary hover:underline"
                              >
                                  Forgot
                                  password?
                              </a>
                          </div>
                      </div>
                      {props.error && (<div className="text-sm text-red-500">{props.error}</div>)}
                      <Button
                          type="submit"
                          isLoading={isSubmitting}
                          variant="primary"
                          className="w-full"
                      >
                          Login
                      </Button>
                      <p className="text-sm hidden font-light text-gray-500">
                          Don’t have an account yet?
                          {' '}
                          <Link
                              href="/auth/signup"
                              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          >
                              Sign up
                          </Link>
                      </p>
                  </div>
              </form>
          </div>
      </div>
  );
};

export default LoginForm;
