import { useState, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link, useLoaderData } from '@remix-run/react';

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
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ _id: string; title: string; user: { username: string } }[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.length > 2) {
      const response = await fetch(`/search?q=${searchQuery}`);
      const data = await response.json();
      setResults(data.archives || []);
    } else {
      setResults([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Verifica se o foco ainda está dentro do componente de pesquisa
    if (searchRef.current && !searchRef.current.contains(e.relatedTarget)) {
      setResults([]);
    }
  };

  const handleFocus = () => {
    if (query.length > 2) {
      handleSearch(query);
    }
  };

  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <div ref={searchRef} className="relative flex h-full w-[80%] items-center justify-center">
        <BsSearch className="absolute left-[0.3rem] text-xl text-gray-400" />
        <input
          type="search"
          className="w-full rounded-sm bg-gd-container-nav py-0.5 pl-8 font-victor-mono text-gray-400 focus:text-gd-white focus:outline-none"
          placeholder="Pesquisar"
          value={query}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {results.length > 0 && (
          <div className="absolute top-full w-full rounded-sm bg-gd-container-nav shadow-lg z-10">
            {results.map((result) => (
              <div key={result._id} className="p-2 border-b last:border-b-0">
                <Link to={`/app/${result._id}`} className="block text-gd-white">
                  <strong>{result.title}</strong> by {result.user.username}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function AuthButtons() {
  const { user } = useLoaderData<{ user: { id: string, username: string, description: string } | null }>();

  return (
    <div className="flex h-full flex-0 items-center justify-center gap-2">
      {user ? (
        <>
          <Link
            to="/app/profile"
            className="flex rounded-sm bg-gd-white px-4 py-1 font-semibold text-gd-container-nav"
          >
            {user.username}
          </Link>
          <form action="/app/account/logout" method="post">
            <button
              type="submit"
              className="flex rounded-sm bg-gd-white px-4 py-1 font-semibold text-gd-container-nav"
            >
              Sair
            </button>
          </form>
        </>
      ) : (
        <Link
          to="/app/account/login"
          className="flex rounded-sm bg-gd-white px-4 py-1 font-semibold text-gd-container-nav"
        >
          Entrar
        </Link>
      )}
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
