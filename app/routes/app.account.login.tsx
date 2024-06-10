import { json, createCookie } from '@remix-run/node';
import { Login } from '../components/account/login';
import { getUserByUsername, verifyPassword, generateToken } from '../utils/db';
import type { ActionFunction } from '@remix-run/node';

const sessionCookie = createCookie('session', {
  maxAge: 60 * 60, // 1 hour
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
});

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = form.get('username');
  const password = form.get('password');

  if (typeof username !== 'string' || typeof password !== 'string') {
    return json({ error: 'Dados inválidos.' }, { status: 400 });
  }

  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return json({ error: 'Usuário não encontrado.' }, { status: 400 });
    }

    const isPasswordValid = await verifyPassword(user, password);

    if (!isPasswordValid) {
      return json({ error: 'Senha incorreta.' }, { status: 400 });
    }

    const token = generateToken(user);
    const cookie = await sessionCookie.serialize(token);

    return json({ success: 'Login realizado com sucesso!' }, {
      headers: {
        'Set-Cookie': cookie,
      },
    });
  } catch (error) {
    return json({ error: 'Ocorreu um erro ao realizar o login.' }, { status: 500 });
  }
};

export default function AppAccountLogin() {
  return (
    <div>
      <Login />
    </div>
  );
}
