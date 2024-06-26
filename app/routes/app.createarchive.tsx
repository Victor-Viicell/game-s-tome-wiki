import React, { useState } from 'react';
import { RiFileUploadFill } from 'react-icons/ri';
import { FaUserAlt } from 'react-icons/fa';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { Form, useLoaderData, useActionData } from '@remix-run/react';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { requireUserSession } from '../utils/session';
import { getUserByUsername, createArchive } from '~/utils/db';
import { json, redirect } from '@remix-run/node';
import placeholderPerfil from '/s-l400.jpg';

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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const content = formData.getAll('content') as string[];
  const description = formData.get('description') as string;
  const userId = formData.get('userId') as string;

  console.log('Form Data:', { title, content, description, userId });

  if (!title || !content || !description || !userId) {
    return json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
  }

  const success = await createArchive(title, content.join('\n'), userId, description);

  if (success) {
    return redirect('/app/wikis/files');
  } else {
    return json({ error: 'Erro ao criar arquivo' }, { status: 500 });
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
        <input
          placeholder={data_type}
          type={type}
          name={data_name}
          className="w-full rounded-sm bg-gd-container-nav px-2 text-gd-white"
        />
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

export function TextBox() {
  const [textBoxes, setTextBoxes] = useState([
    { id: Date.now(), value: '', rows: 1, isRow: false },
  ]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
    id: number,
  ) => {
    setTextBoxes((prevTextBoxes) =>
      prevTextBoxes.map((textBox) => {
        if (textBox.id === id) {
          if (event.key === 'Enter') {
            return { ...textBox, rows: textBox.rows + 1 };
          } else if (
            event.key === 'Backspace' ||
            (event.ctrlKey && event.key === 'z')
          ) {
            if (textBox.value.endsWith('\n')) {
              return {
                ...textBox,
                rows: textBox.rows > 1 ? textBox.rows - 1 : 1,
              };
            }
          }
        }
        return textBox;
      }),
    );
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    id: number,
  ) => {
    const { value } = event.target;
    setTextBoxes((prevTextBoxes) =>
      prevTextBoxes.map((textBox) =>
        textBox.id === id ? { ...textBox, value } : textBox,
      ),
    );
  };

  const addTextBox = () => {
    setTextBoxes([...textBoxes, { id: Date.now(), value: '', rows: 1, isRow: false }]);
  };

  const removeTextBox = (id: number) => {
    setTextBoxes((prevTextBoxes) =>
      prevTextBoxes.filter((textBox) => textBox.id !== id),
    );
  };

  return (
    <div className="flex w-full flex-col gap-1 rounded-sm">
      {textBoxes.map((textBox) => (
        <div key={textBox.id} className={`flex w-full ${textBox.isRow ? 'flex-row' : 'flex-col'} gap-1 rounded-sm bg-gd-content p-1`}>
          <textarea
            required
            placeholder="Conteúdo"
            name="content"
            className={`w-full ${textBox.isRow ? 'resize-x' : 'resize-none'} overflow-hidden rounded-sm bg-gd-container-nav px-2 text-gd-white`}
            rows={textBox.rows}
            value={textBox.value}
            onKeyDown={(event) => handleKeyDown(event, textBox.id)}
            onChange={(event) => handleChange(event, textBox.id)}
          />
          <button
            type="button"
            onClick={() => removeTextBox(textBox.id)}
            className="text-red-500"
          >
            Remover
          </button>
        </div>
      ))}
      <div className="flex w-full flex-col rounded-sm text-center">
        <button
          type="button"
          onClick={addTextBox}
          className="flex justify-center rounded-sm bg-gd-collapsable p-1 text-gd-white"
        >
          Adicionar Caixa de Texto
        </button>
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
  const actionData = useActionData<{ error?: string }>();
  const [message, setMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (actionData?.error) {
      setMessage(actionData.error);
    } else if (actionData) {
      setMessage('Arquivo criado com sucesso!');
    }
  }, [actionData]);

  return (
    <Form method="post">
      <input type="hidden" name="userId" value={user.id} />
      <div id="Perfil" className="flex h-full w-full flex-col gap-1 rounded-sm">
        {message && (
          <div className="bg-gd-header-1 text-gd-white p-2 rounded-sm">
            {message}
          </div>
        )}
        <div id="Perfil_data" className="flex flex-row gap-1">
          <div className="flex aspect-square flex-[0] items-center gap-1 rounded-sm bg-gd-content">
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
            className="flex flex-[2] flex-col gap-1 rounded-sm bg-gd-content p-1"
          >
            <h1 className="w-full rounded-sm bg-gd-header-1 text-center text-gd-white">
              Descrição
            </h1>
            <textarea
              required
              placeholder="Descrição"
              name="description"
              className="h-full w-full resize-none overflow-x-hidden rounded-sm bg-gd-container-nav px-2 text-gd-white"
              rows={2}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center rounded-sm">
          <TextBox />
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="flex items-center justify-center gap-1 rounded-sm bg-gd-white px-2 font-semibold text-gd-content"
          >
            <p>Enviar</p>
            <RiFileUploadFill />
          </button>
        </div>
      </div>
    </Form>
  );
}
