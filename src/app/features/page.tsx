'use client';

import Image from "next/image";
import Link from "next/link";
import InteractiveFeature from "@/app/components/InteractiveFeature";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import useSWR from "swr";

// 定义数据类型，替代 any
interface ServerData {
  id: number;
  message: string;
}

async function fetchServerData(): Promise<ServerData> {
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

// 定义 Props 类型
interface FeatureSectionProps {
  title: string;
  description: string;
  data: ServerData | null;
  loading: boolean;
  error: string | null;
}

function FeatureSection({ title, description, data, loading, error }: FeatureSectionProps) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center min-h-[150px]">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-sm text-red-500 bg-red-50 p-3 rounded">
          ⚠️ {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="text-sm text-gray-500 font-mono bg-gray-50 p-3 rounded">
        服务器数据: {data?.message} <br />
        <span className="text-xs text-gray-400">ID: {data?.id}</span>
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  const pathname = usePathname();
  const skipFirstPageShowRef = useRef(true);
  
  // 使用 SWR 管理数据获取，将路径作为键的一部分
  const { data, error, isLoading, isValidating, mutate } = useSWR<ServerData>(
    [`/api/data`, pathname], // 将路径作为键的一部分，路径变化时重新获取
    () => fetchServerData(),
    {
      revalidateOnFocus: true, // 页面获得焦点时重新验证
      revalidateOnReconnect: true, // 网络重连时重新验证
      revalidateOnMount: true, // 组件挂载时重新验证
      dedupingInterval: 0, // 禁用缓存，确保每次都请求最新数据
    }
  );
  
  // 监听页面获得焦点事件，手动触发重新验证
  useEffect(() => {
    const handleFocus = () => {
      mutate(); // 手动触发重新验证
    };
    
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [mutate]);

  useEffect(() => {
    const handlePageShow = () => {
      if (skipFirstPageShowRef.current) {
        skipFirstPageShowRef.current = false;
        return;
      }
      mutate();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        mutate();
      }
    };

    const handlePopState = () => {
      mutate();
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [mutate]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">Next.js 核心功能展示</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 服务器组件模拟/数据获取展示 */}
          <FeatureSection
            key={pathname}
            title="客户端数据获取"
            description="使用 SWR 在客户端获取 API 数据"
            data={data || null}
            loading={isLoading || isValidating}
            error={error?.message || null}
          />

          {/* 客户端交互组件 */}
          <InteractiveFeature />

          {/* 图片优化示例 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">图片优化</h2>
            <p className="text-gray-600 mb-4">Next.js Image 组件自动优化图片</p>
            <div className="w-full h-48 relative overflow-hidden rounded">
              <Image
                loading="eager"
                src="https://picsum.photos/id/1/800/450"
                alt="示例图片"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                // priority 仅在首屏关键图片使用，这里为了演示保留，实际建议移除
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* 动态路由示例 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">动态路由</h2>
            <p className="text-gray-600 mb-4">支持参数化路由，如 /features/[id]</p>
            <div className="space-y-2">
              {[1, 2, 3].map((id) => (
                <Link
                  key={id}
                  href={`/features/${id}`}
                  className="block px-4 py-2 bg-gray-100 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  查看项目 {id}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
