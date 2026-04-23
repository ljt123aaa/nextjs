import EditorForm from '../../components/EditorForm';

export default function NewPostPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">写新文章</h1>
        <p className="text-gray-500 mt-2">使用 Markdown 语法撰写您的文章</p>
      </div>
      <EditorForm />
    </div>
  );
}