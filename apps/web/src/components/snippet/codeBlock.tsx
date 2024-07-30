'use client';

import { ClipboardCopy } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type CodeBlockProps = {
  snippet: string;
};

export default function CodeBlock({ snippet }: CodeBlockProps) {
  return (
    <div className="relative">
      <ClipboardCopy className="absolute top-2 right-4 stroke-white w-4" />
      <SyntaxHighlighter
        customStyle={{ borderRadius: '0.5rem', padding: '1rem' }}
        language="javascript"
        wrapLongLines
        style={atomOneDark}
      >
        {snippet}
      </SyntaxHighlighter>
    </div>
  );
}
