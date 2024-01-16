import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/db/prisma';
import { auth } from '@auth';

export const GET = async (req: NextRequest) => {

  const session = await auth();
  if(!session?.user?.isAdmin || !session?.user?.isStaff) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const isAdmin = session?.user?.isAdmin; 
  
  const limit = 20;
  const cursor = req.nextUrl.searchParams.get('cursor') as string ?? '';
  const cursorObj = cursor === '' ? undefined : { id: parseInt(cursor as string, 10) };

  if(!isAdmin) {
    const teamProjects = await prisma.team.findMany({
      select: {
        project: {
          select: {
            id: true,
            name: true,
            description: true,
            isPublished: true,
          },
        },
      },
      where: {
        mentorId: session?.user?.id,
      },
    });
    return NextResponse.json({ projects: teamProjects.map((team) => team.project), nextId: undefined });
  }
  
  const projects = await prisma.project.findMany({
    skip: cursor !== '' ? 1 : 0,
    cursor: cursorObj,
    take: limit,
  });
  return NextResponse.json({ projects, nextId: projects.length === limit ? projects[limit - 1].id : undefined });
};
