import { useLoaderData } from '@remix-run/react';


export default function wikicard() {
  const data = useLoaderData();

  console.log(data);

  return (
    <div>

    </div>
  )
}