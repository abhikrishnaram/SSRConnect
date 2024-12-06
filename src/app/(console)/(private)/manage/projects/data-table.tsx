'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Button from '@/components/button';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export default function ManageProjectsTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const [tableData, setTableData] = useState<TData[]>([]);

  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.toString() ?? '';

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'projects',
    async ({ pageParam = '' }) => {
      await new Promise((res) => setTimeout(res, 1000));
      const res = await fetch(
        '/api/get/projects?cursor=' + (pageParam || '') + '&query=' + query,
      );
      const data = await res.json();
      return data;
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextId ?? false,
    },
  );

  // Update table data when new pages are fetched
  useEffect(() => {
    if(data?.pages) {
      const aggregatedData = data.pages.flatMap((page) => page.projects);
      setTableData(aggregatedData);
    }
  }, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
      <div className="rounded-md border w-full max-h-[]">
          <Table>
              <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                              <TableHead key={header.id}>
                                  {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext(),
                                    )}
                              </TableHead>
                          ))}
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
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext(),
                                    )}
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
                  <TableRow>
                      <TableCell colSpan={columns.length}>
                          {isFetchingNextPage ? (
                              <div className="flex gap-2 justify-end items-center p-4">
                                  <div
                                      className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                      role="status"
                                  />
                                  <div className="uppercase font-light ml-4 text-primary text-xl">
                                      Loading
                                  </div>
                              </div>
                          ) : (
                              <div className="flex justify-end">
                                  {hasNextPage && (
                                      <Button
                                          variant="primary"
                                          className="w-max"
                                          onClick={() => fetchNextPage()}
                                      >
                                          Load More
                                      </Button>
                                  )}
                              </div>
                          )}
                      </TableCell>
                  </TableRow>
              </TableBody>
          </Table>
      </div>
  );
}
