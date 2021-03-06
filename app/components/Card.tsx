import { ReactElement } from 'react';
import { Link } from 'remix';
import Hyperlink from '~/components/Hyperlink';
import type { Metadata } from '~/types';

interface CardProps {
  name: string;
  metadata: Metadata;
}

function Card({ name, metadata }: CardProps): ReactElement {
  const slashIndex = name.indexOf('/');
  const [type, slug] =
    slashIndex > -1
      ? [name.slice(0, slashIndex), name.slice(slashIndex + 1)]
      : [null, name];

  return (
    <article
      className={`flex flex-col rounded overflow-hidden bg-white text-primary shadow-sm ${
        metadata.layout === 'portrait' ? 'lg:row-span-2' : ''
      }`.trim()}
    >
      <Hyperlink
        className="no-underline flex-grow"
        to={metadata.url ?? `/${name}`}
      >
        {!metadata.image ? null : (
          <figure>
            <img src={metadata.image} width="100%" alt="cover" />
          </figure>
        )}
        <section className="p-4">
          {!type ? null : (
            <div className="capitalize text-secondary text-xs font-light my-1">
              {type}
            </div>
          )}
          <h2 className="my-0 text-xl">
            {metadata.title ?? slug ?? 'Untitled'}
          </h2>
          {!metadata.description ? null : (
            <p className="mt-2 text-sm">{metadata.description}</p>
          )}
        </section>
      </Hyperlink>
      {!metadata.tags ? null : (
        <footer className="p-4 text-sm border-t">
          <div className="whitespace-nowrap overflow-hidden overflow-ellipsis divide-x -mx-2">
            {metadata.tags.map(tag => (
              <Link
                key={tag}
                className="px-2 hover:underline"
                to={`/search?tag=${encodeURIComponent(tag)}`}
                prefetch="intent"
              >
                {tag}
              </Link>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}

export default Card;
