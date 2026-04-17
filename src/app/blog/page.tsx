import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline">
            &larr; 返回首页
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-8">我的博客</h1>
        
        <div className="space-y-6">
          {allPostsData.length === 0 ? (
            <p className="text-gray-500">暂无文章。</p>
          ) : (
            allPostsData.map(({ id, date, title, description }) => (
              <div key={id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <Link href={`/blog/${id}`} className="block group">
                  <h2 className="text-2xl font-semibold text-blue-600 group-hover:text-blue-800 mb-2">
                    {title}
                  </h2>
                </Link>
                <p className="text-gray-500 text-sm mb-3">{date}</p>
                {description && <p className="text-gray-700">{description}</p>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
