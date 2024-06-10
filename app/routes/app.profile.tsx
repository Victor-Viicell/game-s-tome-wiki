import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireUserSession } from '../utils/session';
import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUserSession(request);

  // Retorne os dados do usuário ou qualquer outra informação necessária
  return json({ user });
};

export default function UserProfile() {
  const { user } = useLoaderData<{ user: { id: string, username: string } }>();

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      <p>ID: {user.id}</p>
      <p>Nome de Usuário: {user.username}</p>
    </div>
  );
}
