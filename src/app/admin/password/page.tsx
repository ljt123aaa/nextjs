'use client'

import { useState, useTransition } from 'react'
import { updatePassword } from '@/app/actions/auth'

export default function ChangePasswordPage() {
  const [isPending, startTransition] = useTransition()
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMsg('')
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await updatePassword(formData)
      if (result?.error) {
        setErrorMsg(result.error)
      }
    })
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">修改密码</h1>
        <p className="text-gray-500 mt-2">为了您的账号安全，请定期更新管理员密码</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
            {errorMsg}
          </div>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">新密码</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            minLength={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="至少 6 位字符"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">确认新密码</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            minLength={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="再次输入新密码"
          />
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            disabled={isPending}
          >
            {isPending ? '提交中...' : '确认修改并重新登录'}
          </button>
        </div>
      </form>
    </div>
  )
}