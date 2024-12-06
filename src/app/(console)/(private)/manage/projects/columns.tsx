'use client';
import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';

export type Project = {
  name: string
  code: string
  description: string
  isAccepted: boolean
  link?: string
  meta: object

  video: string
  report: string
  poster: string
  photos: string[]
  presentation: string

  theme: { name: string }
  team: { members: object, mentor: object }
};

export const columns: ColumnDef<Project, Project>[] = [
  {
    accessorKey: 'name',
    header: 'Project Name',
    size: 250,
    maxSize: 400,
  },
  {
    accessorKey: 'code',
    header: 'Team Code',
  },
  {
    accessorKey: 'isAccepted',
    header: 'Published',
    cell: (data) => {
      // @ts-ignore
      const className = data?.data?.isAccepted ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
      return (
          <div className={clsx('w-max rounded-full px-2 py-0.5 text-sm', className)}>
              {/* @ts-ignore */}
              {data?.data?.isAccepted ? 'Published' : 'Not Published'}
          </div>
      );
    },
  },
];
