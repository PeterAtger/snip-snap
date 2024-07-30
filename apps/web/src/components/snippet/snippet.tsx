import { SnipsModel } from '@repo/database';
import {
  Card, CardHeader, CardContent, CardFooter,
} from '@repo/ui';

type SnippetProps = {
  snippet: SnipsModel;
};

export default function Snippet({ snippet }: SnippetProps) {
  const {
    id, snip, lang, created,
  } = snippet;

  return (
    <Card className="bg-background rounded-lg shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{id}</h2>
          <div className="bg-zinc-800 text-white px-2 py-1 rounded-md text-xs font-medium">
            {lang}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{snip}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Created:
            {' '}
            {created?.toDateString()}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
