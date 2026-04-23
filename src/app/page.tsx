import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default async function Home() {
  const allPostsData = await getSortedPostsData();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight sm:text-5xl mb-4 py-2">
            我的全栈博客
          </h1>
          <p className="text-xl text-gray-500">
            使用 Next.js App Router 和 Supabase 强力驱动 🚀
          </p>
        </header>
        
        <main className="space-y-6">
          {allPostsData.length === 0 ? (
            <div className="text-center p-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">暂无文章。</p>
              <Link href="/admin/editor/new" className="text-blue-600 hover:underline mt-2 inline-block">
                点击这里发布您的第一篇文章 &rarr;
              </Link>
            </div>
          ) : (
            allPostsData.map(({ id, date, title, description }) => (
              <article key={id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <Link href={`/${id}`} className="block group">
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {title}
                  </h2>
                </Link>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <time dateTime={date}>{date}</time>
                </div>
                {description && (
                  <p className="text-gray-600 leading-relaxed">
                    {description}
                  </p>
                )}
                <div className="mt-4">
                  <Link href={`/${id}`} className="text-blue-600 font-medium hover:underline inline-flex items-center">
                    阅读全文 <span className="ml-1">&rarr;</span>
                  </Link>
                </div>
              </article>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
