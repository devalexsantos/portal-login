import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NextTopLoader from 'nextjs-toploader'
import Header from './_components/Header'
import Footer from './_components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portal Login',
  description: 'Portal de edições online da Login Informática.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="container m-auto mt-10">
            <NextTopLoader height={5} color="#fff" />
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
