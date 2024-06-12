import { BiPlusMedical } from "react-icons/bi"; 
import { GoMention } from 'react-icons/go';
import { ImPriceTags } from "react-icons/im"; 
import { AiFillCaretDown } from 'react-icons/ai';
import { FaFilter } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { GiArchiveResearch } from 'react-icons/gi';
import { json } from '@remix-run/node';
import { useLoaderData, useFetcher } from '@remix-run/react';
import { requireUserSession } from '../utils/session';
import type { LoaderFunction } from '@remix-run/node';
import { getUserByUsername, getArchivesByUserId } from '~/utils/db';
import placeholderPerfil from '/placeholderPerfil.png';
import { Link } from '@remix-run/react';
import WikiCard from '../components/wikis/wikicard';
import { useState } from 'react';

export const loader: LoaderFunction = async ({ request }) => {
  const sessionUser = await requireUserSession(request);

  if (typeof sessionUser === 'object' && sessionUser.username) {
    const user = await getUserByUsername(sessionUser.username);

    if (!user) {
      throw json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const archives = await getArchivesByUserId(user.id);

    return json({
      user: {
        id: user._id,
        username: user.username,
        stars: user.stars,
        mentions: user.mentions,
        description: user.description, // Adicionando a descrição do usuário
        archives: archives,
      },
    });
  } else {
    throw json({ error: 'Sessão de usuário inválida' }, { status: 401 });
  }
};

export function Filter() {
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
      <Link to='/app/createarchive' className="flex h-full flex-row items-center justify-center gap-1 rounded-sm bg-gd-white px-2 text-gd-header-1">
        <BiPlusMedical />
      </Link>
    </div>
  );
}

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

export default function UserProfile() {
  const { user } = useLoaderData<{
    user: {
      id: string;
      username: string;
      stars: number;
      mentions: number;
      description: string; // Adicionando a descrição do usuário
      archives: {
        _id: string;
        title: string;
        description: string;
        user: { username: string };
        createdAt: Date;
        updatedAt: Date;
      }[];
    };
  }>();

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [description, setDescription] = useState(user.description); // Adicionando estado para a descrição
  const [profileImage] = useState(placeholderPerfil); 
  const fetcher = useFetcher();

  const handleSave = () => {
    fetcher.submit(
      { username, description, profileImage }, // Incluindo a descrição no envio
      { method: 'post', action: '/app/profile/update' }
    );
    setIsEditing(false);
  };

  return (
    <div id="Perfil" className="flex h-full w-full flex-col gap-1 rounded-sm">
      <div id="Perfil_data" className="flex flex-row gap-1">
        <div className="flex-[0] flex aspect-square items-center gap-1 rounded-sm bg-gd-content">
          <div
            id="Perfil_Image"
            className="aspect-square h-full rounded-sm bg-gd-content"
          >
            <img
              src={profileImage}
              alt="Perfil"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div
          id="Perfil_Name"
          className="flex flex-1 flex-col items-center gap-1 rounded-sm bg-gd-content p-1"
        >
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-sm bg-gd-header-1 text-center text-gd-white"
            />
          ) : (
            <h1 className="w-full rounded-sm bg-gd-header-1 text-center text-gd-white">
              {user.username}
            </h1>
          )}
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
          className="flex flex-[2] flex-col rounded-sm bg-gd-content p-1 gap-1"
        >
          <h1 className="w-full rounded-sm bg-gd-header-1 text-center text-gd-white">
            Info
          </h1>
          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none overflow-x-hidden rounded-sm bg-gd-header-1 p-1 text-gd-white h-full"
              rows={2}
            />
          ) : (
            <p className="w-full rounded-sm text-gd-white">
              {user.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-sm bg-gd-content p-1 gap-1">
        <div className="flex flex-row gap-1">
          <button
          onClick={() => setIsEditing(!isEditing)}
          className="rounded-sm bg-gd-white px-2 ont-semibold text-gd-container-nav"
        >
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
        {isEditing && (
          <button
            onClick={handleSave}
            className="rounded-sm bg-gd-white px-2 font-semibold text-gd-container-nav"
          >
            Salvar
          </button>
        )}
        </div>
        <Filter />
        <div className="flex flex-col gap-1 bg-gd-container p-1 w-full h-full overflow-y-auto overflow-x-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {user.archives.map((archive) => (
              <WikiCard
                id={archive._id}
                key={archive._id}
                title={archive.title}
                description={archive.description}
                author={archive.user.username}
                createdAt={new Date(archive.createdAt)}
                updatedAt={new Date(archive.updatedAt)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
