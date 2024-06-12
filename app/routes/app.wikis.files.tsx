import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { Archive } from '~/utils/db';
import type { LoaderFunction } from '@remix-run/node';
import WikiCard from '../components/wikis/wikicard';

export const loader: LoaderFunction = async () => {
  try {
    const archives = await Archive.find().populate('user').exec();
    return json({ archives });
  } catch (error) {
    console.error('Erro ao buscar arquivos:', error);
    throw json({ error: 'Erro ao buscar arquivos' }, { status: 500 });
  }
};

export default function AppArchives() {
  const { archives } = useLoaderData<{ archives: any[] }>();
  console.log('Archives Data:', archives);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
      {archives.map((archive) => (
        <WikiCard
          key={archive._id}
          id={archive._id} // Passe o ID aqui
          title={archive.title}
          description={archive.description}
          author={archive.user.username}
          createdAt={archive.createdAt}
          updatedAt={archive.updatedAt}
        />
      ))}
    </div>
  );
}
