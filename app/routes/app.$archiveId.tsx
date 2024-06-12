import React, { useState, useEffect } from 'react';
import { RiFileUploadFill } from 'react-icons/ri';
import { FaUserAlt } from 'react-icons/fa';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { Form, useLoaderData, useActionData } from '@remix-run/react';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { requireUserSession } from '../utils/session';
import { getUserByUsername, getArchiveById, updateArchive, getAuthorByArchiveId } from '~/utils/db';
import { json, redirect } from '@remix-run/node';
import placeholderPerfil from '/s-l400.jpg';
import { isUserAuthorOfArchive } from '~/utils/db';

export const loader: LoaderFunction = async ({ request, params }) => {
  const archive = await getArchiveById(params.archiveId as string);

  if (!archive) {
    throw json({ error: 'Arquivo não encontrado' }, { status: 404 });
  }

  let user = null;
  let isAuthor = false;
  let author = null;

  try {
    const sessionUser = await requireUserSession(request);
    if (typeof sessionUser === 'object' && sessionUser.username) {
      user = await getUserByUsername(sessionUser.username);
      if (
        typeof user === 'object' &&
        user &&
        user._id &&
        typeof archive === 'object' &&
        archive._id
      ) {
        isAuthor = await isUserAuthorOfArchive(
          user._id.toString(),
          archive._id.toString(),
        );
      }
    }
  } catch (error) {
    // Usuário não autenticado, continuar sem erro
  }

  if (!isAuthor) {
    author = await getAuthorByArchiveId(params.archiveId as string);
  }

  return json({
    user:
      typeof user === 'object' && user && user._id
        ? {
            id: user._id,
            username: user.username,
            stars: user.stars,
            mentions: user.mentions,
            archives: user.archives,
          }
        : null,
    archive,
    isAuthor,
    author: author ? author.username : null,
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  const sessionUser = await requireUserSession(request);
  let user = null;

  if (typeof sessionUser === 'object' && sessionUser.username) {
    user = await getUserByUsername(sessionUser.username);
  }

  if (!user || typeof user !== 'object') {
    return json({ error: 'Usuário não encontrado' }, { status: 404 });
  }

  const isAuthor =
    typeof user === 'object' && user._id
      ? await isUserAuthorOfArchive(
          user._id.toString(),
          params.archiveId as string,
        )
      : false;

  if (!isAuthor) {
    return json({ error: 'Acesso negado' }, { status: 403 });
  }

  const formData = await request.formData();
  const title = formData.get('title') as string;
  const content = formData.getAll('content') as string[];
  const description = formData.get('description') as string;
  const userId = formData.get('userId') as string;

  console.log('Form Data:', { title, content, description, userId });

  if (!title || !content || !description || !userId) {
    return json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
  }

  const success = await updateArchive(
    params.archiveId as string,
    title,
    content.join('\n'),
    description,
  );

  if (success) {
    return redirect('/app/wikis/files');
  } else {
    return json({ error: 'Erro ao atualizar arquivo' }, { status: 500 });
  }
};

export function ArchiveData({
  icon,
  bg_color,
  type,
  data_name,
  data_type,
  defaultValue,
  readOnly,
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
          defaultValue={defaultValue}
          className="w-full rounded-sm bg-gd-container-nav px-2 text-gd-white"
          readOnly={readOnly}
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

export function TextBox({
  defaultValue,
  readOnly,
  isAuthor,
}: {
  defaultValue: string;
  readOnly: boolean;
  isAuthor: boolean;
}) {
  const [textBoxes, setTextBoxes] = useState(
    defaultValue.split('\n').map((line, index) => ({
      id: index,
      value: line,
      rows: 1,
      isRow: false,
    }))
  );

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
    id: number,
  ) => {
    if (readOnly) return;

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
    if (readOnly) return;

    const { value } = event.target;
    setTextBoxes((prevTextBoxes) =>
      prevTextBoxes.map((textBox) =>
        textBox.id === id ? { ...textBox, value } : textBox,
      ),
    );
  };

  const addTextBox = () => {
    if (readOnly) return;

    setTextBoxes([
      ...textBoxes,
      { id: Date.now(), value: '', rows: 1, isRow: false },
    ]);
  };

  return (
    <div className="flex w-full flex-col gap-1 rounded-sm">
      {textBoxes.map((textBox) => (
        <div
          key={textBox.id}
          className={`flex w-full ${textBox.isRow ? 'flex-row' : 'flex-col'} gap-1 rounded-sm bg-gd-content p-1`}
        >
          <textarea
            required
            placeholder="Conteúdo"
            name="content"
            className={`w-full ${textBox.isRow ? 'resize-x' : 'resize-none'} overflow-hidden rounded-sm bg-gd-container-nav px-2 text-gd-white`}
            rows={textBox.rows}
            value={textBox.value}
            onKeyDown={(event) => handleKeyDown(event, textBox.id)}
            onChange={(event) => handleChange(event, textBox.id)}
            readOnly={readOnly}
          />
        </div>
      ))}
      {isAuthor && (
        <div className="flex w-full flex-col rounded-sm text-center">
          <button
            type="button"
            onClick={addTextBox}
            className="flex justify-center rounded-sm bg-gd-collapsable p-1 text-gd-white"
          >
            Adicionar Caixa de Texto
          </button>
        </div>
      )}
    </div>
  );
}

export default function EditArchive() {
  const { user, archive, isAuthor, author } = useLoaderData<{
    user: {
      id: string;
      username: string;
      stars: number;
      mentions: number;
      archives: string[];
    } | null;
    archive: {
      id: string;
      title: string;
      content: string;
      description: string;
    };
    isAuthor: boolean;
    author: string | null;
  }>();
  const actionData = useActionData<{ error?: string }>();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (actionData?.error) {
      setMessage(actionData.error);
    } else if (actionData) {
      setMessage('Arquivo atualizado com sucesso!');
    }
  }, [actionData]);

  return (
    <Form method="post">
      <input type="hidden" name="userId" value={user?.id || ''} />
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
              {isAuthor ? 'Editar Arquivo' : 'Visualizar Arquivo'}
            </h1>
            <NoInputField
              icon={<FaUserAlt />}
              bg_color="bg-gd-header-1"
              data={`${isAuthor ? user?.username : author || 'Desconhecido'}`}
              data_type="Autor"
            />
            <ArchiveData
              icon={<MdOutlineDriveFileRenameOutline />}
              bg_color="bg-gd-header-1"
              data_type="Título"
              data_name="title"
              defaultValue={archive.title}
              readOnly={!isAuthor}
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
              className="h-full w-full resize-none overflow-x-hidden rounded-sm bg-gd-container-nav px-2 text-gd-white focus:outline-none"
              rows={2}
              defaultValue={archive.description}
              readOnly={!isAuthor}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center rounded-sm">
          <TextBox defaultValue={archive.content} readOnly={!isAuthor} isAuthor={isAuthor} />
        </div>

        {isAuthor && (
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="flex items-center justify-center gap-1 rounded-sm bg-gd-white px-2 font-semibold text-gd-content"
            >
              <p>Enviar</p>
              <RiFileUploadFill />
            </button>
          </div>
        )}
      </div>
    </Form>
  );
}
