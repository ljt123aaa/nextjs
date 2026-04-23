'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: '请先登录后再发布文章' };
  }

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const content = formData.get('content') as string;
  const date = new Date().toISOString().split('T')[0];

  if (!title || !slug || !content) {
    return { error: '标题、Slug 和内容是必填项' };
  }

  const { error } = await supabase.from('posts').insert({
    title,
    slug,
    description,
    content,
    date,
    user_id: user.id // 将文章关联到当前用户
  });

  if (error) {
    console.error('发布失败:', error);
    return { error: '发布文章失败: ' + error.message };
  }

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updatePost(originalSlug: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: '请先登录后再更新文章' };
  }

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const content = formData.get('content') as string;

  if (!title || !slug || !content) {
    return { error: '标题、Slug 和内容是必填项' };
  }

  const { error } = await supabase
    .from('posts')
    .update({
      title,
      slug,
      description,
      content,
    })
    .eq('slug', originalSlug)
    .eq('user_id', user.id); // 确保只能更新自己的文章

  if (error) {
    console.error('更新失败:', error);
    return { error: '更新文章失败: ' + error.message };
  }

  revalidatePath('/');
  revalidatePath(`/${slug}`);
  revalidatePath('/admin');
  redirect('/admin');
}

export async function deletePost(slug: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: '请先登录后再删除文章' };
  }

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('slug', slug)
    .eq('user_id', user.id); // 确保只能删除自己的文章

  if (error) {
    console.error('删除失败:', error);
    return { error: '删除文章失败: ' + error.message };
  }

  revalidatePath('/');
  revalidatePath('/admin');
}
