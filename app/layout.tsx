import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog and Projects',
  description: 'A simple blog and projects management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <header className="border-b">
              <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
                <MainNav />
              </div>
            </header>
            <main className="flex-1 container mx-auto py-6 px-4 md:px-6 lg:px-8">
              {children}
            </main>
            <footer className="border-t py-4 text-center text-sm text-gray-500">
              <div className="container mx-auto px-4 md:px-0">
                © 2023 Blog and Projects. All rights reserved.
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

