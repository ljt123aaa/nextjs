import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // 这个错误在服务器组件（Server Components）调用 setAll 时可能发生，
            // 但如果仅仅是在 Server Actions 或 Route Handlers 中调用则是安全的。
            // 因为我们在 Server Components 主要是读，可以忽略这个错误。
          }
        },
      },
    }
  )
}
