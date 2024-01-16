'use server';
import * as bcrypt from 'bcrypt';

import { auth } from '@auth';
import prisma from '@/lib/db/prisma';

type AddUserProps = {
  teamCode: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};


export async function addUser(body: string, type: 'MENTOR' | 'STUDENT') {

  const data = JSON.parse(body) as AddUserProps;

  const session = await auth();
  const user = session?.user;
  if(!user || !user?.isAdmin) return { error: 'Unauthorized', status: 401 };

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password ? hashedPassword : '',
        isStaff: type === 'MENTOR',
      },
    });
    return { id: user?.id };
  } catch (error) {
    console.error(error);
    return { error: 'Something went wrong', status: 500, details: error };
  }
}

type CreateProjectProps = {
  name: string;
  description: string;
};


export async function createProject(data: string) {

  const { name, description } = JSON.parse(data) as CreateProjectProps;

  const session = await auth();
  const user = session?.user;
  if(!user || !user?.isAdmin) return { error: 'Unauthorized', status: 401 };

  const project = await prisma.project.create({
    data: {
      name,
      description,
      slug: name.toLowerCase().replace(' ', '-'),
      authorId: user?.id,
      code: Math.random().toString(36).substring(2, 8).toUpperCase(),
    },
  });
  return { id: project?.id, slug: project?.slug };
}