'use client';

import { ExpanderComponentProps, TableColumn } from 'react-data-table-component';
import { useState } from 'react';
import { CheckIcon, MoreVerticalIcon } from 'lucide-react';

import DataTable from '@/components/data-table';

type DataRow = {
  id: string 
  email: string,
  name: 'test',
  type: 'MENTOR' | 'STUDENT' | 'ADMIN',
  team: null,
  is_active: boolean
  is_staff: boolean
};

const columns: TableColumn<DataRow>[] = [
  {
    name: 'ID',
    selector: row => row.id,
  },
  {
    name: 'Name',
    selector: row => row.name || 'N/A',
  },
  {
    name: 'Email',
    selector: row => row.email,
  },
  {
    name: 'Type',
    selector: row => row.type,
  },
  {
    name: 'Active',
    selector: row => row.is_active,
    format: row => <span className="text-gray-500">{row?.is_active && <CheckIcon size={20} />}</span>,
  },
  {
    name: 'Staff',
    selector: row => row.is_staff,
    button: true,
    format: row => <span className="text-gray-500">{row?.is_staff && <CheckIcon size={20} />}</span>,
  },
  {
    name: 'More',
    format: _ => <span className="text-gray-500 bg-primary"><MoreVerticalIcon size={20} /></span>,
  },
];

const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

interface IPaginatedData<Type> {
  results: Type[];
  count: number;
  next: string | null;
  previous: string | null;
}

const ManageUserTable = ({ data: d }: { data: IPaginatedData<DataRow> }) => {

  const [data, setData] = useState(d.results);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(20);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    const response = await fetch(`/api/manage/users/?page=${page}&count=${perPage}`).then(res => res.json());
    setData(response?.data?.data);
    setLoading(false);
  };

  const handlePageChange = (page: number) => {
    fetchUsers(page);
  };

  const handlePerRowsChange = async (count: number, page: number) => {
    setLoading(true);

    const response = await fetch(`/api/manage/users/?page=${page}&count=${count}`).then(res => res.json());

    setData(response?.data?.data);
    setPerPage(count);
    setLoading(false);
  };


  return (
      <DataTable
          id="manage-users-table"
          pagination
          paginationServer
          paginationTotalRows={d.count}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          progressPending={loading}
          data={data}
          columns={columns}
          isExpandable={true}
          expandRenderer={ExpandedComponent}
      />
  );
};

export default ManageUserTable;