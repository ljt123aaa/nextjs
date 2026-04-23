'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '@/app/actions/posts';

export default function EditorForm({ post }: { post?: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState('');

  const isEditing = !!post;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      let result;
      if (isEditing) {
        result = await updatePost(post.id, formData);
      } else {
        result = await createPost(formData);
      }
      
      if (result?.error) {
        setErrorMsg(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {errorMsg}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">标题</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          defaultValue={post?.title || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="文章标题"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug (URL 路径)</label>
        <input
          type="text"
          name="slug"
          id="slug"
          required
          defaultValue={post?.id || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-gray-50"
          placeholder="例如: my-first-post"
          readOnly={isEditing}
        />
        {isEditing && <p className="text-xs text-gray-500 mt-1">编辑模式下无法修改 Slug</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">简介 (可选)</label>
        <textarea
          name="description"
          id="description"
          rows={3}
          defaultValue={post?.description || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="文章简短描述..."
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Markdown 正文</label>
        <textarea
          name="content"
          id="content"
          required
          rows={15}
          defaultValue={post?.content || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors font-mono text-sm"
          placeholder="支持 Markdown 语法..."
        />
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          disabled={isPending}
        >
          取消
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? '保存中...' : (isEditing ? '保存修改' : '发布文章')}
        </button>
      </div>
    </form>
  );
}