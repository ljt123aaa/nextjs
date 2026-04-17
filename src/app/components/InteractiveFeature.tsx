'use client';
import { useState } from "react";

function InteractiveFeature() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">客户端组件（交互功能）</h2>
      <p className="text-gray-600 mb-4">使用 useState 管理状态</p>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
        >
          -
        </button>
        <span className="text-2xl font-bold">{count}</span>
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default InteractiveFeature;
