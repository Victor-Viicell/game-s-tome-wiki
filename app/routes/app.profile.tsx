import { GoMention } from 'react-icons/go';
import { AiFillStar } from 'react-icons/ai';
import { GiArchiveResearch } from 'react-icons/gi';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireUserSession } from '../utils/session';
import type { LoaderFunction } from '@remix-run/node';
import Filter from '~/components/wikis/filter';
import { getUserByUsername } from '~/utils/db';
import placeholderPerfil from '/placeholderPerfil.png';

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
