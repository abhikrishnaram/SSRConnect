import { LogOut, MoreVerticalIcon } from 'lucide-react';

import { DataRow } from './table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/dropdown';

const UserMoreMenu = ({ data:_ } : { data: DataRow }) => {
  return (
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <MoreVerticalIcon size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36 p-2">
              <div>
                  <div className="mt-2 mb-4 border-b w-full" />
                  <div>
                      <button
                          onClick={() => {}}
                          className="w-full hover:bg-gray-100 py-2 px-2 rounded text-left flex items-center gap-4"
                      >
                          <LogOut size={18} className="rotate-180" />
                          Logout
                      </button>
                  </div>
              </div>
          </DropdownMenuContent>
      </DropdownMenu>        
  );
};

export default UserMoreMenu;