import { SnipsModel } from '@repo/database';
import {
  Card, CardHeader, CardContent, CardFooter,
  Badge,
  CardDescription,
} from '@repo/ui';
import CodeBlock from './codeBlock';

type SnippetProps = {
  snippet: SnipsModel;
};

export default function Snippet({ snippet }: SnippetProps) {
  const {
    id, snip, lang, created,
  } = snippet;

  return (
    <Card className="bg-zinc-50 rounded-lg shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{id}</h2>
          <Badge>
            {lang}
          </Badge>
        </div>
        <CardDescription>
          {snippet.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CodeBlock snippet={snip} />
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
