import EditorForm from '../../components/EditorForm';
import { getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let postData;
  try {
    postData = await getPostData(slug);
  } catch (error) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">编辑文章</h1>
        <p className="text-gray-500 mt-2">正在编辑: {postData.title}</p>
      </div>
      <EditorForm post={postData} />
    </div>
  );
}