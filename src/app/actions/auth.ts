'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: '请填写邮箱和密码' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: '登录失败: ' + error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}

export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('登出失败:', error.message)
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || password.length < 6) {
    return { error: '新密码长度至少需要 6 位' }
  }

  if (password !== confirmPassword) {
    return { error: '两次输入的密码不一致' }
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return { error: '修改密码失败: ' + error.message }
  }

  // 密码修改成功后，登出并要求重新登录
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
