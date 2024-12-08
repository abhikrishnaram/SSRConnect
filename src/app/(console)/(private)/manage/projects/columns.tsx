'use client';
import { ColumnDef } from '@tanstack/react-table';

import { TProject } from '@/types/project';

export const columns: ColumnDef<TProject, TProject>[] = [
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
  // {
  //   accessorKey: 'isAccepted',
  //   header: 'Published',
  //   cell: (data) => {
  //     @ts-ignore
  // const className = data?.data?.isAccepted ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
  // return (
  //     <div className={clsx('w-max rounded-full px-2 py-0.5 text-sm', className)}>
  //          @ts-ignore
  // {data?.data?.isAccepted ? 'Published' : 'Not Published'}
  // </div>
  // );
  // },
  // },
];
