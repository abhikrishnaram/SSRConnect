// 'use client';
//
// import React, { useEffect } from 'react';
// import { useInfiniteQuery } from 'react-query';
// import { useInView } from 'react-intersection-observer';
// import { Skeleton } from '@mui/material';
// import { useSearchParams } from 'next/navigation';
//
// import ProjectCard from '@/components/ProjectCard';
//
//
// const ManageProjectsTable = () => {
//
//   const { ref, inView } = useInView();
//   const searchParams = useSearchParams();
//
//   const query = searchParams.get('query')?.toString() ?? '';
//
//   const { isLoading, isError, data, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
//       useInfiniteQuery(
//         'projects',
//         async ({ pageParam = '' }) => {
//           await new Promise((res) => setTimeout(res, 1000));
//           const res = await fetch('/api/get/projects?cursor=' + (pageParam || '') + '&query=' + query);
//           const data = await res.json();
//           return data;
//         },
//         {
//           getNextPageParam: (lastPage) => lastPage ? lastPage?.nextId : false,
//         },
//       );
//
//   useEffect(() => {
//     if(inView && hasNextPage) {
//       fetchNextPage();
//     }
//   }, [inView]);
//
//   if(isLoading) return (
//       <div>
//           <Skeleton className="w-[400px] h-[150px]" />
//           <Skeleton className="w-[400px] h-[150px]" />
//           <Skeleton className="w-[400px] h-[150px]" />
//       </div>
//   );
//   if(isError) return (
//       <div className="text-red-500">
//           Something went wrong!
//           {JSON.stringify(error)}
//       </div>
//   );
//  
//   return (
//
//       <div className="container overflow-auto">
//           <div className="flex flex-wrap justify-start items-center gap-4">
//               {data && data?.pages?.map((page) => {
//                 return (
//                     <React.Fragment key={page.nextId ?? 'lastPage'}>
//                         {page.projects.map((p: any) => (
//                             <ProjectCard key={p.id} height="160px" project={p} isEdit />
//                         ))}
//                     </React.Fragment>
//                 );
//               })}
//
//               {isFetchingNextPage ? (
//                   <div className="bg-white group rounded-lg h-[170px] w-auto aspect-[16/6] border flex items-center justify-center">
//                       <div className="flex gap-4">
//                           <div
//                               className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
//                               role="status"
//                           />
//                           <div className="uppercase font-light ml-4 text-primary text-xl">
//                               Loading
//                           </div>
//                       </div>
//                   </div>
//               ) : null}
//
//               <span style={{ visibility: 'hidden' }} ref={ref}>
//                   intersection observer marker
//               </span>
//           </div>
//       </div>
//   );
// };
//
// export default ManageProjectsTable;
'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export default function ManageProjectsTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
      <div className="rounded-md border">
          <Table>
              <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                      ? null
                                      : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                      )}
                                </TableHead>
                            );
                          })}
                      </TableRow>
                  ))}
              </TableHeader>
              <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && 'selected'}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                  ) : (
                      <TableRow>
                          <TableCell colSpan={columns.length} className="h-24 text-center">
                              No results.
                          </TableCell>
                      </TableRow>
                  )}
              </TableBody>
          </Table>
      </div>
  );
}
