import { json } from '@remix-run/node';
import { searchArchives } from '~/utils/db';

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');

  if (!query) {
    return json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const archives = await searchArchives(query);
    return json({ archives });
  } catch (error) {
    return json({ error: 'Erro ao buscar arquivos' }, { status: 500 });
  }
};
