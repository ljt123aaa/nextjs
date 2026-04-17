---
title: "准备连接 Supabase：数据库表结构指南"
date: "2026-04-18"
description: "这是一篇由你的 AI 助手自动生成的文章，详细说明了如何在你刚刚创建的 Supabase 项目中配置博客文章表（posts）。"
---

# Supabase 数据库建表指南

太棒了！既然你已经创建了 Supabase 账号和数据库，我们需要在数据库中创建一张表来存储博客文章。

## 1. 我们需要哪些字段？

为了完全替代我们现在的本地 Markdown 文件（标题、日期、简介、内容），你的 Supabase 数据库需要一张名为 **`posts`** 的表，包含以下字段：

| 字段名 (Column Name) | 数据类型 (Type) | 描述 (Description) | 额外设置 (Settings) |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` 或 `int8` | 文章的唯一标识符 | 必须是主键 (Primary Key) |
| `slug` | `text` | 网址路径（如 `my-first-post`） | 必须是唯一的 (Unique) |
| `title` | `text` | 文章标题 | - |
| `date` | `date` 或 `text` | 发布日期 | - |
| `description` | `text` | 文章简介 | 可以为空 (Nullable) |
| `content` | `text` | Markdown 格式的正文 | - |
| `created_at` | `timestamp` | 创建时间 | 默认值为 `now()` |

## 2. 快捷建表方法（SQL 脚本）

你可以直接在 Supabase 后台左侧菜单找到 **"SQL Editor"**，新建一个查询（New Query），然后把下面的代码复制进去点击 **"Run"** 运行，一秒钟建好表：

```sql
-- 创建 posts 表
CREATE TABLE posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  date date NOT NULL,
  description text,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 开启 RLS (行级安全) 并允许所有人读取文章（这一步很重要，否则前端获取不到数据）
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "允许所有人读取文章" 
ON posts FOR SELECT 
USING (true);
```

## 3. 插入一条测试数据

建好表后，你可以顺便在 SQL Editor 里执行这段代码，往数据库里塞一篇测试文章：

```sql
INSERT INTO posts (slug, title, date, description, content)
VALUES (
  'hello-supabase', 
  '这是来自 Supabase 数据库的第一篇文章', 
  '2026-04-18', 
  '成功连接数据库！这意味着你的全栈博客系统正式运转起来了。', 
  '## 成功啦！

如果能在页面上看到这篇文章，说明我们的 Next.js 已经完美连上了 Supabase PostgreSQL 数据库。

从现在开始，你可以直接在 Supabase 后台通过类似 Excel 的表格界面（Table Editor）来新增和修改文章，前端页面会自动更新！'
);
```

## 4. 下一步：告诉我配置信息

为了让 Next.js 连上你的数据库，请在对话框里告诉我你的 Supabase 配置信息。你需要去 Supabase 后台的 **Project Settings (项目设置)** -> **API** 里找到以下两个值：

1. **Project URL**
2. **Project API keys (anon / public)**
