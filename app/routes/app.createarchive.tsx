import { RiFileUploadFill } from "react-icons/ri"; 
import { FaUserAlt } from 'react-icons/fa';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { Form } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { requireUserSession } from '../utils/session';
import { getUserByUsername } from '~/utils/db';
import { json } from '@remix-run/node';
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

export function ArchiveData({
  icon,
  bg_color,
  type,
  data_name,
  data_type,
}: any) {
  return (
    <div className="flex w-full flex-row items-center gap-1 rounded-sm text-gd-white">
      <div
        className={`flex items-center justify-center rounded-sm ${bg_color} aspect-square p-1 text-gd-white`}
      >
        {icon}
      </div>
      <div className="w flex w-full flex-row items-center gap-1 rounded-sm bg-gd-header-2 pl-1">
        <Form className="flex-[2] flex flex-row gap-1">
          <input
            required
            placeholder={data_type}
            type={type}
            name={data_name}
            className="w-full rounded-sm bg-gd-container-nav px-2 text-gd-white"
          />
          <button
          type="submit"
          className="flex items-center justify-center rounded-sm px-2 text-gd-content font-semibold bg-gd-white gap-1"
          >
            <p>Enviar</p><RiFileUploadFill />
          </button>
        </Form>
      </div>
    </div>
  );
}
export function NoInputField({ icon, bg_color, data, data_type }: any) {
  return (
    <div className="flex w-full flex-row items-center gap-1 rounded-sm text-gd-white">
      <div
        className={`flex items-center justify-center rounded-sm ${bg_color} aspect-square p-1 text-gd-white`}
      >
        {icon}
      </div>
      <div className="w flex w-full flex-row items-center gap-1 rounded-sm bg-gd-header-2 pl-1 text-center">
        <p className="flex-[2]">{data}</p>
        <p className="flex-1 rounded-sm bg-gd-header-1 px-1 text-center text-gd-white">
          {data_type}
        </p>
      </div>
    </div>
  );
}

export default function CreateArchive() {
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
            Editar Arquivo
          </h1>
          <NoInputField
            icon={<FaUserAlt />}
            bg_color="bg-gd-header-1"
            data={`${user.username}`}
            data_type="Autor"
          />
          <ArchiveData
            icon={<MdOutlineDriveFileRenameOutline />}
            bg_color="bg-gd-header-1"
            data_type="Título"
            data_name="title"
          />
        </div>
        <div
          id="Perfil_Datas"
          className="flex flex-[2] flex-col rounded-sm bg-gd-content p-1"
        >
          <h1 className="w-full rounded-sm bg-gd-header-1 text-center text-gd-white">
            Descrição
          </h1>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center rounded-sm bg-gd-content p-1">
        <div>
          <h1>Arquivos</h1>
          <p>Conteúdo do perfil do usuário</p>
        </div>
      </div>
    </div>
  );
}
