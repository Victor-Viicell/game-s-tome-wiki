import { BiPlusMedical } from "react-icons/bi"; 
import { GoMention } from 'react-icons/go';
import { ImPriceTags } from "react-icons/im"; 
import { AiFillCaretDown } from 'react-icons/ai';
import { FaFilter } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { GiArchiveResearch } from 'react-icons/gi';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireUserSession } from '../utils/session';
import type { LoaderFunction } from '@remix-run/node';
import { getUserByUsername } from '~/utils/db';
import placeholderPerfil from '/placeholderPerfil.png';
import { Link } from '@remix-run/react';
export const loader: LoaderFunction = async ({ request }) => {
  const sessionUser = await requireUserSession(request);

  if (typeof sessionUser === 'object' && sessionUser.username) {
    const user = await getUserByUsername(sessionUser.username);

    if (!user) {
      throw json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    return json({
      user: {
        id: user._id,
        username: user.username,
        stars: user.stars,
        mentions: user.mentions,
        archives: user.archives,
      },
    });
  } else {
    throw json({ error: 'Sessão de usuário inválida' }, { status: 401 });
  }
};

export function PerfilData({ icon, bg_color, data, data_type }: any) {
  return (
    <div className="flex w-full flex-row items-center gap-1 rounded-sm text-gd-white">
      <div
        className={`flex items-center justify-center rounded-sm ${bg_color} aspect-square p-1 text-gd-white`}
      >
        {icon}
      </div>
      <div className="w flex w-full flex-row items-center gap-1 rounded-sm bg-gd-header-2 pl-1">
        <p className="flex-[2]">{data}</p>
        <p className="flex-1 rounded-sm bg-gd-header-1 px-1 text-center text-gd-white">
          {data_type}
        </p>
      </div>
    </div>
  );
}

export function Filter() {
  return (
    <div className="flex- flex h-8 w-full items-center gap-2 text-nowrap rounded-sm bg-gd-header-1 p-1 text-[12px]">
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
      <Link to='/app/createarchive' className="flex h-full flex-row items-center justify-center gap-1 rounded-sm bg-gd-white px-2 text-gd-header-1">
        <BiPlusMedical />
      </Link>
    </div>
  );
}

export default function UserProfile() {
  const { user } = useLoaderData<{
    user: {
      id: string;
      username: string;
      stars: number;
      mentions: number;
      archives: string[];
    };
  }>();

  return (
    <div id="Perfil" className="flex h-full w-full flex-col gap-1 rounded-sm">
      <div id="Perfil_data" className="flex flex-row gap-1">
        <div className="flex-[0] flex aspect-square items-center gap-1 rounded-sm bg-gd-content">
          <div
            id="Perfil_Image"
            className="aspect-square h-full rounded-sm bg-gd-content"
          >
            <img
              src={placeholderPerfil}
              alt="Perfil"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div
          id="Perfil_Name"
          className="flex flex-1 flex-col items-center gap-1 rounded-sm bg-gd-content p-1"
        >
          <h1 className="w-full rounded-sm bg-gd-header-1 text-center text-gd-white">
            {user.username}
          </h1>
          <PerfilData
            icon={<GiArchiveResearch />}
            bg_color="bg-gd-header-1"
            data={`${user.archives.length}`}
            data_type="Arquivos"
          />
          <PerfilData
            icon={<AiFillStar />}
            bg_color="bg-gd-header-1"
            data={`${user.stars}`}
            data_type="Estrelas"
          />
          <PerfilData
            icon={<GoMention />}
            bg_color="bg-gd-header-1"
            data={`${user.mentions}`}
            data_type="Menções"
          />
        </div>
        <div
          id="Perfil_Datas"
          className="flex flex-[2] flex-col rounded-sm bg-gd-content p-1"
        >
          <h1 className="w-full rounded-sm bg-gd-header-1 text-center text-gd-white">
            Info
          </h1>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center rounded-sm bg-gd-content p-1">
        <Filter />
        <div>
          <h1>Arquivos</h1>
          <p>Conteúdo do perfil do usuário</p>
        </div>
      </div>
    </div>
  );
}
