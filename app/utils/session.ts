import { json, createCookie } from '@remix-run/node';
import jwt from 'jsonwebtoken';

const sessionCookie = createCookie('session', {
  maxAge: 60 * 60, // 1 hour
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
});

export async function requireUserSession(request: Request) {
  const cookieHeader = request.headers.get('Cookie');
  const session = await sessionCookie.parse(cookieHeader);

  if (!session) {
    throw json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const payload = jwt.verify(session, 'your_secret_key');
    return payload;
  } catch (error) {
    throw json({ error: 'Sessão inválida' }, { status: 401 });
  }
}
