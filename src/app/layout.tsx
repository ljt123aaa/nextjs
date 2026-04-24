import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/actions/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold text-gray-900 tracking-tight">
                    NextBlog
                  </span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/admin"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  管理员登录
                </Link>
                {user && (
                  <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                    <Link
                      href="/admin/password"
                      className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      修改密码
                    </Link>
                    <form action={logout}>
                      <button type="submit" className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors">
                        退出登录
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} NextBlog. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
