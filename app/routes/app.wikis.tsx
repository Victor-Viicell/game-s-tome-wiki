import { Outlet } from '@remix-run/react';
import Filter from '../components/wikis/filter';

export default function AppWikis() {
  return (
    <div className="flex h-full w-full flex-col gap-1 bg-gd-content p-1"> 
      <Filter />
      <div className="flex flex-col gap-1 bg-gd-container p-1">
        <Outlet />
      </div>
    </div>
  );
}
