import { supabase } from './supabase';
import { remark } from 'remark';
import html from 'remark-html';

// 提取的 Metadata 类型，对应数据库表结构
export interface PostMetadata {
  id: string; // 我们在路由中使用 slug 作为 id
  title: string;
  date: string;
  description?: string;
  contentHtml?: string;
  content?: string; // 原始 Markdown 内容，用于编辑
}

// 获取并排序所有文章列表
export async function getSortedPostsData(): Promise<PostMetadata[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('slug, title, date, description')
    .order('date', { ascending: false });

  if (error) {
    console.error('获取文章列表失败:', error);
    return [];
  }

  return data.map((post) => ({
    id: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
  }));
}

// 根据 slug 获取单篇文章的详细数据和解析后的 HTML
export async function getPostData(slug: string): Promise<PostMetadata> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    throw new Error(`找不到文章: ${slug}`);
  }

  // 将 Markdown 正文转换为 HTML 字符串
  const processedContent = await remark()
    .use(html)
    .process(data.content || '');
    
  const contentHtml = processedContent.toString();

  return {
    id: data.slug,
    title: data.title,
    date: data.date,
    description: data.description,
    contentHtml,
    content: data.content,
  };
}
