import { BsSearch } from 'react-icons/bs';
import { Link } from '@remix-run/react';

export function Logo() {
  return (
    <Link to={'/'} className="flex-0 flex h-full items-center justify-center">
      <div className="flex h-full items-center justify-center">
        <img src="/game-s-tome-logo.svg" alt="" className="h-[80%]" />
      </div>
      <h1 className="px-2 font-press-start-2p text-xl font-bold text-gd-white">
        GAME'S TOME
      </h1>
    </Link>
  );
}

export function Search() {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <div className="relative flex h-full w-[80%] items-center justify-center">
        <BsSearch className="absolute left-[0.3rem] text-xl text-gray-400" />
        <input
          type="search"
          className="w-full rounded-sm bg-gd-container-nav py-0.5 pl-8 font-victor-mono text-gray-400 focus:text-gd-white focus:outline-none"
          placeholder="Search"
        />
      </div>
    </div>
  );
}

export function AuthButtons() {
  return (
    <div className="flex h-full flex-0 items-center justify-center">
      <Link to="/app/account/login"
        className="flex rounded-sm bg-gd-white px-4 py-1 font-semibold text-gd-container-nav"
      >
        Entrar
      </Link>
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className="flex h-12 w-full items-center justify-between">
      <Logo />
      <Search />
      <AuthButtons />
    </nav>
  );
}
