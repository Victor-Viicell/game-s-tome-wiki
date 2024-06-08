import { ImPriceTags } from "react-icons/im"; 
import { AiFillCaretDown } from 'react-icons/ai';
import { FaFilter } from 'react-icons/fa';

export default function Filter() {
  return (
    <div className="flex- flex h-8 w-full items-center gap-2 text-nowrap rounded-sm bg-gd-container p-1 text-[12px]">
      <div className="flex h-full flex-row items-center justify-center gap-1 rounded-sm bg-gd-collapsable px-2 text-gd-white">
        <FaFilter />
        <p>Filtro</p>
      </div>
      <p className="text-gd-white">Ordenar por</p>
      <div className="flex h-full flex-row items-center justify-center gap-1 rounded-sm px-2 font-semibold text-gd-white hover:cursor-pointer hover:bg-gd-collapsable">
        <p>Mais populares</p>
        <AiFillCaretDown />
      </div>
      <p className="text-gd-white">Por período de tempo</p>
      <div className="flex h-full flex-row items-center justify-center gap-1 rounded-sm px-2 font-semibold text-gd-white hover:cursor-pointer hover:bg-gd-collapsable">
        <p>Semana</p>
        <AiFillCaretDown />
      </div>
      <div className="flex h-full w-full flex-row items-center">
        <div className="flex h-full flex-row items-center justify-center gap-1 rounded-l-sm bg-gd-collapsable px-2 text-gd-white">
          <ImPriceTags />
          <p>Tags</p>
        </div>
        <input
          type="text"
          placeholder="Pesquisar tags"
          className="h-full w-full rounded-r-sm bg-gd-container-nav py-1 px-2 placeholder-gd-white placeholder:opacity-50 focus:bg-gd-container-selected focus:outline-none"
        />
      </div>
    </div>
  );
}
