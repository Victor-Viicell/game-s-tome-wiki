import { redirect } from '@remix-run/node';
import { sessionCookie } from '../utils/session';
import type { ActionFunction } from '@remix-run/node';

export const action: ActionFunction = async () => {
  return redirect('/app/account/login', {
    headers: {
      'Set-Cookie': await sessionCookie.serialize('', { maxAge: 0 }),
    },
  });
};
