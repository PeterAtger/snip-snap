'use client';

import { Button } from '@repo/ui';
import { ClipboardCheck, ClipboardCopy } from 'lucide-react';
import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type CodeBlockProps = {
  snippet: string;
};

export default function CodeBlock({ snippet }: CodeBlockProps) {
  const [active, setIsActive] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(snippet);
    setIsActive(true);
    setTimeout(() => setIsActive(false), 1500);
  };

  return (
    <div className="relative">
      <Button variant="link" size="icon" className="absolute top-2 right-2">
        {active
          ? <ClipboardCheck className="stroke-green-500 w-4" />
          : <ClipboardCopy onClick={copy} className="stroke-white w-4" />}
      </Button>
      <SyntaxHighlighter
        customStyle={{ borderRadius: '0.5rem', padding: '1rem' }}
        language="javascript"
        style={atomOneDark}
      >
        {snippet.replaceAll('\\n', '\n')}
      </SyntaxHighlighter>
    </div>
  );
}
