'use server';

import { Project } from '@prisma/client';
import { notFound } from 'next/navigation';

import prisma from '@/lib/db/prisma';

type TError = {
  error: any;
  statusCode: number;
    
};



export async function getProject(code: string) : Promise<Project | TError> {
  try {
    const project = await prisma.project.findUnique({
      where: { code },
      include: {
        Team: true,
      },
    });
    if(!project) notFound();
    return project;
  } catch (e) {
    console.error(e);
    notFound();
  }
}

export async function getProjectByID(id: string) : Promise<Project | TError> {
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id), isAccepted: true },
      include: {
        Team: {
          include: {
            mentor: true,
          },
        },
      },
    });
    if(!project) notFound();
    return project;
  } catch (e) {
    console.error(e);
    notFound();
  }
}