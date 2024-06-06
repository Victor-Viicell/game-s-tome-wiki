import { NavLink } from '@remix-run/react';

export function OpenWiki() {
  return (
    <div className="flex h-full w-full flex-1 flex-col rounded-sm rounded-br-2xl bg-gd-content p-1">
      <p className="h-fit w-full rounded-sm bg-gd-header-1 text-center text-gd-white">
        Paginas Abertas
      </p>
    </div>
  );
}

export function Container() {
  return (
    <div className="flex h-full w-full flex-1 flex-col rounded-sm bg-gd-content p-1">
      <p className="h-fit w-full rounded-sm bg-gd-header-1 text-center text-gd-white">
        Menu
      </p>
      <NavLink to="/app/lobby">Lobby</NavLink>
      <NavLink to="/app/wikis">Games</NavLink>
      <NavLink to="/app/videos">Videos</NavLink>
      <NavLink to="/app/lobby">Lançamentos</NavLink>
      <NavLink to="/app/lobby">Lobby</NavLink>
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
