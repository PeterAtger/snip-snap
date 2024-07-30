import {
  Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext,
} from '@repo/ui';
import { Snippet } from '@/components/snippet';
import { SnipProvider } from '@/server/providers/SnipProvider';

export default async function HomePage() {
  const provider = new SnipProvider();
  const snippets = await provider.getSnips();

  const renderSnippets = () => {
    if (!snippets || !snippets.length) {
      return <h3>Could not find any snippets</h3>;
    }

    return snippets.map((snippet) => <Snippet key={snippet.id} snippet={snippet} />);
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Latest Snippets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {renderSnippets()}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="/">Previous</PaginationPrevious>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="/">Next</PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
