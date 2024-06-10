import { json, createCookie } from '@remix-run/node';
import { Signin } from '../components/account/signin';
import { createUser, getUserByUsername, generateToken } from '../utils/db';
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
  const email = form.get('email');
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');

  // Verificação de tipo para garantir que os valores não sejam null
  if (
    typeof username !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof confirmPassword !== 'string'
  ) {
    return json({ error: 'Dados inválidos.' }, { status: 400 });
  }

  // Validação dos dados do formulário
  if (password !== confirmPassword) {
    return json({ error: 'As senhas não coincidem.' }, { status: 400 });
  }

  if (password.length < 8) {
    return json({ error: 'A senha deve ter pelo menos 8 caracteres.' }, { status: 400 });
  }

  try {
    // Crie o novo usuário no banco de dados
    await createUser(username, email, password);

    const user = await getUserByUsername(username);
    if (!user) {
      return json({ error: 'Erro ao buscar o usuário após a criação.' }, { status: 500 });
    }

    const token = generateToken(user);
    const cookie = await sessionCookie.serialize(token);

    return json({ success: 'Conta criada com sucesso!' }, {
      headers: {
        'Set-Cookie': cookie,
      },
    });
  } catch (error) {
    return json({ error: 'Ocorreu um erro ao criar a conta.' }, { status: 500 });
  }
};

export default function AppAccountSignin() {
  return (
    <div>
      <Signin />
    </div>
  );
}
