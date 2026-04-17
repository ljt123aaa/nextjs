'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

// 示例：调用成功场景
async function callApi() {
  try {
    const response = await fetch('/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('成功:', data);
    } else {
      const errorData = await response.json();
      console.error('错误:', errorData);
    }
  } catch (error) {
    console.error('请求失败:', error);
  }
}

export default function Home() {
  // 使用 useEffect 在客户端渲染时调用 API
  useEffect(() => {
    callApi();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="/next.svg"
            alt="Next.js 标志"
            width={120}
            height={24}
            className="mx-auto dark:invert"
          />
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Next.js 15 空白项目
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            基于 Next.js 15 + TypeScript + Tailwind CSS 的现代化前端项目
          </p>
        </div>

        <div className="space-y-4">
          {/* <a
            href="https://nextjs.org/docs/app"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Next.js 文档
          </a> */}
          <Link
            href="/features"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
          >
            Next.js 功能展示
          </Link>
          <Link
            href="/blog"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 mt-4"
          >
            访问我的博客 🚀
          </Link>
          {/* <a
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
          >
            Tailwind CSS 文档
          </a> */}
        </div>

        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          <p>项目已配置：ESLint + Prettier + TypeScript</p>
          <p className="mt-1">使用 App Router 架构</p>
        </div>
      </div>
    </div>
  );
}
