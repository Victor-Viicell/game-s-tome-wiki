import { Outlet, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { requireUserSession } from '../utils/session';
import Navbar from '../components/navbar';
import type { LoaderFunction } from '@remix-run/node';
import { Xresize } from '~/components/generalcomponents';
import Sidebar from '~/components/sidebar';
import { Container } from '~/components/generalcomponents';
export const loader: LoaderFunction = async ({ request }) => {
  let user = null;
  try {
    user = await requireUserSession(request);
  } catch (error) {
    // Usuário não está logado
  }

  return json({ user });
};

export default function App() {
  const { user } = useLoaderData<{
    user: { id: string; username: string } | null;
  }>();

  // Adicionei o seguinte comentário para usar a variável 'user' e evitar o aviso do TypeScript
  console.log('Usuário logado:', user);

  return (

      <div className="flex h-full w-full flex-col">
        <Navbar />
        <div className="flex h-full w-full flex-row">
          <Xresize>
            <Sidebar />
          </Xresize>
          <Container>
            <Outlet />
          </Container>
        </div>
      </div>
  );
}
