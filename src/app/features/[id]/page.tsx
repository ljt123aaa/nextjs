import { notFound } from "next/navigation";
import Link from "next/link";

interface Params {
  id: string;
}

export default function FeatureDetailPage({ params }: { params: Params }) {
  const { id } = params;
  
  // 模拟数据
  const projects = [
    { id: '1', title: '项目 1', description: '这是第一个项目' },
    { id: '2', title: '项目 2', description: '这是第二个项目' },
    { id: '3', title: '项目 3', description: '这是第三个项目' },
  ];
  
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">项目详情</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <p className="text-sm text-gray-500">项目 ID: {project.id}</p>
          <Link
            href="/features"
            className="mt-4 inline-block px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            返回列表
          </Link>
        </div>
      </div>
    </div>
  );
}
