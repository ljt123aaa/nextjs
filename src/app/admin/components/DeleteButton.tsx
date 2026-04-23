'use client';

import { useTransition } from 'react';
import { deletePost } from '@/app/actions/posts';

export default function DeleteButton({ slug }: { slug: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('确定要删除这篇文章吗？删除后不可恢复。')) {
      startTransition(async () => {
        const result = await deletePost(slug);
        if (result?.error) {
          alert(result.error);
        }
      });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className={`text-red-600 hover:text-red-900 font-medium ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isPending ? '删除中...' : '删除'}
    </button>
  );
}