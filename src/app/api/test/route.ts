import { NextRequest, NextResponse } from 'next/server';

// 模拟数据
const mockData = {
  success: {
    id: 1,
    message: '操作成功',
    data: {
      userId: 123,
      username: 'testuser',
      email: 'test@example.com'
    },
    timestamp: new Date().toISOString()
  },
  error: {
    code: 400,
    message: '请求参数错误',
    timestamp: new Date().toISOString()
  },
  serverError: {
    code: 500,
    message: '服务器内部错误',
    timestamp: new Date().toISOString()
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 根据请求参数模拟不同的响应场景
    if (body?.scenario === 'error') {
      return NextResponse.json(mockData.error, { status: 400 });
    }
    
    if (body?.scenario === 'serverError') {
      return NextResponse.json(mockData.serverError, { status: 500 });
    }
    
    if (body?.scenario === 'timeout') {
      // 模拟超时场景
      await new Promise(resolve => setTimeout(resolve, 5000));
      return NextResponse.json(mockData.success, { status: 200 });
    }
    
    // 默认成功场景
    return NextResponse.json(mockData.success, { status: 200 });
  } catch {
    return NextResponse.json(mockData.error, { status: 400 });
  }
}
