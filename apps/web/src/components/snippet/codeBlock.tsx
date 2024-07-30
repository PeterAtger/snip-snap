'use client';

import { CopyBlock, atomOneDark } from 'react-code-blocks';

type CodeBlockProps = {
  snippet: string;
};

export default function CodeBlock({ snippet }: CodeBlockProps) {
  return (
    <CopyBlock
      text={snippet}
      language="ts"
      theme={atomOneDark}
      wrapLongLines
    />
  );
}
