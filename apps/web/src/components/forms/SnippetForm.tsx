'use client';

import {
  Button,
  Input, Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  toast,
} from '@repo/ui';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import onAddSnippet from '@/server/actions/onAddSnippet';

export default function SnippetForm() {
  const [selectValue, setSelectValue] = useState('');
  const [formResult, onSubmit] = useFormState(onAddSnippet, { success: false, message: '' });

  useEffect(() => {
    if (formResult.message) {
      toast({ title: formResult.message });
    }
  }, [formResult]);

  return (
    <form action={onSubmit}>
      <fieldset className="grid gap-6 rounded-lg min-w-[500px] border bg-zinc-50 shadow-md p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Snippet Data</legend>
        <div className="grid gap-3">
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input id="title" required name="title" type="text" placeholder="Awesome snippet" />
          </div>
          <Label htmlFor="language">Language</Label>
          <Input id="lang-in" name="lang" required value={selectValue} className="hidden" />
          <Select required onValueChange={setSelectValue}>
            <SelectTrigger
              id="lang"
              className="items-start [&_[data-description]]:hidden"
            >
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="js">
                <div className="flex items-start gap-3 text-muted-foreground">
                  Javascript
                </div>
              </SelectItem>
              <SelectItem value="ts">
                <div className="flex items-start gap-3 text-muted-foreground">
                  TypeScript
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="content">Description</Label>
          <Textarea
            id="desc"
            name="desc"
            required
            placeholder="To do awesome things ..."
            className="min-h-[9.5rem]"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            required
            placeholder="console.log('Hello, World!');"
            className="min-h-[9.5rem]"
          />
        </div>
        <Button type="submit">Save Snippet</Button>
      </fieldset>
    </form>
  );
}
