import SnippetForm from '@/components/forms/SnippetForm';

export default async function AddSnippet() {
  return (
    <div className="flex flex-col w-full justify-center items-center h-auto">
      <SnippetForm />
    </div>
  );
}
