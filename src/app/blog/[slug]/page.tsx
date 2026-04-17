import { getPostData, getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 生成静态路由参数
export function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let postData;
  try {
    postData = await getPostData(slug);
  } catch (e) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="mb-8">
          <Link href="/blog" className="text-blue-500 hover:underline">
            &larr; 返回博客列表
          </Link>
        </div>
        
        <article>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{postData.title}</h1>
          <div className="text-gray-500 mb-8 pb-8 border-b border-gray-100">
            发布于 {postData.date}
          </div>
          
          {/* 使用 Tailwind Typography 插件的 prose 类进行排版 */}
          <div 
            className="prose prose-blue max-w-none prose-img:rounded-xl prose-a:text-blue-600"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
          />
        </article>
      </div>
    </div>
  );
}
