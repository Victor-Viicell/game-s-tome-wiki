import { BsSearch } from "react-icons/bs"; 
import { Link } from "@remix-run/react";

export function Logo() {
  return (
    <Link to={"/"} className="flex h-full items-center flex-0">
      <div className="flex h-full items-center justify-center">
        <img src="/game-s-tome-logo.svg" alt="" className="h-[80%]"/>
      </div>
      <h1 className="text-xl font-bold font-press-start-2p text-gd-white px-2">GAME'S TOME</h1>
    </Link>
  );
}

export function Search() {
  return (
    <div className="flex h-full items-center justify-center flex-1">
      <div className=" relative flex w-[80%] h-full items-center justify-center">
        <BsSearch className="absolute left-[0.3rem] text-xl text-gray-400" />
        <input 
        type="text"
        className="w-full py-0.5 text-gray-400 focus:text-gd-white rounded-md pl-8 bg-gd-container-nav focus:outline-none font-victor-mono" 
        placeholder="Search"/>
      </div>
    </div>
  );
}

export function User() {
  return (
    <div className="flex h-full items-center flex-0 border-l border-gd-red">

    </div>
  );
}

export function LoginSignin() {
  return (
    <div className="flex h-full items-center flex-0">
      <div>
        <Link to="login" className="text-gd-white font-victor-mono px-2 py-1 rounded-md mx-1 bg-gd-container hover:bg-gd-container-selected transition-colors">Login</Link>
        <Link to="signin" className="text-gd-white font-victor-mono px-2 py-1 rounded-md mx-1 bg-gd-prop-blue hover:bg-gd-selected-blue transition-colors">Signin</Link>
      </div>
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className="flex h-12 items-center justify-between w-full">
      <Logo />
      <Search />
      <LoginSignin />
    </nav>
  );
}