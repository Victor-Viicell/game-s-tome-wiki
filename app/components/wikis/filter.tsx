import { FaFilter } from 'react-icons/fa';

export default function Filter() {
  return (
    <div className="flex h-10 w-full p-1">
      <div className="flex h-full aspect-square rounded-sm bg-gd-header-1 p-2 text-gd-white">
        <FaFilter />
      </div>
      filter
    </div>
  );
}
