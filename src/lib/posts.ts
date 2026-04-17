import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/posts');

// 提取的 Markdown Frontmatter 元数据类型
export interface PostMetadata {
  id: string;
  title: string;
  date: string;
  description?: string;
}

// 获取并排序所有文章列表
export function getSortedPostsData(): PostMetadata[] {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  // 获取 src/posts 下的文件名
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // 移除扩展名，将文件名作为 id
      const id = fileName.replace(/\.md$/, '');

      // 读取文件内容
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // 使用 gray-matter 解析 frontmatter
      const matterResult = matter(fileContents);

      // 组合数据并加上 id
      return {
        id,
        ...(matterResult.data as Omit<PostMetadata, 'id'>),
      };
    });

  // 按日期降序排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 根据 id 获取单篇文章的详细数据和解析后的 HTML
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // 解析 frontmatter
  const matterResult = matter(fileContents);

  // 使用 remark 将 markdown 转换为 HTML 字符串
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
    
  const contentHtml = processedContent.toString();

  // 返回数据合并
  return {
    id,
    contentHtml,
    ...(matterResult.data as Omit<PostMetadata, 'id'>),
  };
}
