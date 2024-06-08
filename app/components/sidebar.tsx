import { MdOutlineOndemandVideo } from "react-icons/md"; 
import { AiFillHome } from "react-icons/ai"; 
import { NavLink } from '@remix-run/react';
import { FaFolderOpen } from 'react-icons/fa';

export function MenuOption({ to, icon, bg_color, title }: any) {
  return (
    <NavLink
      to={to}
      className={`flex w-full flex-row items-center gap-1 rounded-sm text-gd-white hover:bg-gd-container-nav focus:bg-gd-container-nav`}
    >
      <div
        className={`flex items-center justify-center rounded-sm ${bg_color} aspect-square p-1 text-gd-white`}
      >
        {icon}
      </div>
      <p>{title}</p>
    </NavLink>
  );
}

export function OpenWiki() {
  return (
    <div className="flex h-full w-full flex-col rounded-sm rounded-br-2xl bg-gd-content p-1">
      <p className="h-fit w-full rounded-sm bg-gd-header-1 text-center text-gd-white">
        Paginas Abertas
      </p>
    </div>
  );
}

export function Container() {
  return (
    <div className="flex h-fit w-full flex-1 flex-col gap-1 rounded-sm bg-gd-content p-1">
      <p className="h-fit w-full rounded-sm bg-gd-header-1 text-center text-gd-white">
        Menu
      </p>
      <MenuOption
        to={'/app/lobby'}
        icon={<AiFillHome />}
        title="Lobby"
        bg_color="bg-gd-header-1"
      />
      <MenuOption 
      to={'/app/wikis/files'}
      icon={<FaFolderOpen />}
      title="Arquivos"
      bg_color="bg-gd-header-1"
      />
      <MenuOption 
      to={'/app/wikis/videos'}
      icon={<MdOutlineOndemandVideo />}
      title="Videos"
      bg_color="bg-gd-header-1"
      />
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="flex h-full w-full flex-col gap-1 overflow-hidden">
      <Container />
      <OpenWiki />
    </div>
  );
}
