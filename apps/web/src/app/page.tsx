import {
  Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext,
} from '@repo/ui';
import { Snippet } from '@/components/snippet';
import { SnipProvider } from '@/server/providers/SnipProvider';

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const currPage = Array.isArray(searchParams?.page)
    ? parseInt(searchParams.page[0], 10)
    : parseInt(searchParams?.page || '1', 10);

  const provider = new SnipProvider();
  const snippets = await provider.getSnips(currPage);
  const count = await provider.getCount();

  const renderSnippets = () => {
    if (!snippets || !snippets.length) {
      return <h3>Could not find any snippets</h3>;
    }

    return snippets.map((snippet) => <Snippet key={snippet.id} snippet={snippet} />);
  };

  const renderPagination = () => {
    if (count < 10) {
      return null;
    }

    const totalpages = Math.ceil(count / 10);
    const prevPage = Math.max(currPage - 1, 1);
    const nextPage = Math.min(currPage + 1, totalpages);

    return (
      <Pagination>
        <PaginationContent>
          {currPage > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious href={`/?page=${prevPage}`}>Previous</PaginationPrevious>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`/?page=${prevPage}`}>{prevPage}</PaginationLink>
            </PaginationItem>
          </>
          )}
          <PaginationItem>
            <PaginationLink href={`/?page=${currPage}`} isActive>
              {currPage}
            </PaginationLink>
          </PaginationItem>
          {currPage < nextPage && (
            <>
              <PaginationItem>
                <PaginationLink href={`/?page=${nextPage}`}>{nextPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href={`/?page=${nextPage}`}>Next</PaginationNext>
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="container flex flex-col mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Latest Snippets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {renderSnippets()}
      </div>
      <div className="h-full flex items-end">
        {renderPagination()}
      </div>
    </div>
  );
}
