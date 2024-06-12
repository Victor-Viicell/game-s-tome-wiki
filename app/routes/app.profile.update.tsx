import { ActionFunction, json } from '@remix-run/node';
import { requireUserSession } from '~/utils/session';
import { updateUserProfile } from '../utils/db';

export const action: ActionFunction = async ({ request }) => {
  const sessionUser = await requireUserSession(request);
  const formData = await request.formData();
  const username = formData.get('username') as string;
  const description = formData.get('description') as string;
  const profileImage = formData.get('profileImage') as string;

  try {
    // Verificar se sessionUser é um objeto antes de acessar sua propriedade id
    const userId =
      typeof sessionUser === 'object' && 'id' in sessionUser
        ? sessionUser.id
        : null;
    if (!userId) {
      return json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const updatedUser = await updateUserProfile(userId, {
      username,
      description,
      profileImage,
    });
    return json({ user: updatedUser });
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error);
    return json(
      { error: 'Erro ao atualizar perfil do usuário' },
      { status: 500 },
    );
  }
};
