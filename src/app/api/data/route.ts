import { NextResponse } from 'next/server';

export async function getServerData() {
  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: Math.floor(Math.random() * 1000),
    message: '从服务器获取的数据',
    timestamp: new Date().toISOString()
  };
}

export async function GET() {
  const data = await getServerData();
  return NextResponse.json(data);
}
