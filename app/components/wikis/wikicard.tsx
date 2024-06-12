import { Link } from "@remix-run/react";

interface WikiCardProps {
  title: string;
  description: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export default function WikiCard({
  title,
  description,
  author,
  createdAt,
  updatedAt,
  id,
}: WikiCardProps) {
  console.log('WikiCard Props:', {
    title,
    description,
    author,
    createdAt,
    updatedAt,
    id,
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <Link to={`/app/${id}`} className="flex flex-col rounded-sm shadow-lg bg-gd-content p-1 text-gd-white">
      <h2 className="text-xl font-bold mb-1 text-gd-white bg-gd-header-1 rounded-sm justify-center text-center first-letter:uppercase">{title}</h2>
      <textarea
        className="mb-1 resize-none overflow-x-hidden rounded-sm bg-gd-header-1 p-1 text-sm text-gd-white focus:outline-none"
        rows={4}
        readOnly
        value={description}
      />
      <p className="flex text-sm mb-1 bg-gd-collapsable rounded-sm pl-2 w-full">Autor: <span className="font-semibold w-full text-center rounded-sm ml-2 bg-gd-header-1">{author}</span></p>
      <div className="flex flex-col gap-1">
        <p className="bg-gd-header-2 px-2 rounded text-gd-collapsable text-sm">
          Criado em: {formatDate(new Date(createdAt))}
        </p>
        <p className="bg-gd-header-2 px-2 rounded-sm text-gd-collapsable text-sm">
          Atualizado em: {formatDate(new Date(updatedAt))}
        </p>
      </div>
    </Link>
  );
}
