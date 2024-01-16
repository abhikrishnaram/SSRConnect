import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/db/prisma';

export const GET = async (req: NextRequest) => {
  const limit = 20;
  const cursor = req.nextUrl.searchParams.get('cursor') as string ?? '';
  const query = req.nextUrl.searchParams.get('query') as string ?? '';
  const cursorObj = cursor === '' ? undefined : { id: parseInt(cursor as string, 10) };

  const projects = await prisma.project.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      link: true,
      slug: true,
      code: true,
    },
    where: {
      name: {
        contains: query as string,
        mode: 'insensitive',
      },
    },
    orderBy: {
      id: 'desc',
    },
    skip: cursor !== '' ? 1 : 0,
    cursor: cursorObj,
    take: limit,
  });

  return NextResponse.json({ projects, nextId: projects.length === limit ? projects[limit - 1].id : undefined });
};
