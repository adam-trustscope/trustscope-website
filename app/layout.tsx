import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://trustscope.ai'),
  title: {
    default: 'TrustScope - Evidence Infrastructure for AI Agents',
    template: '%s | TrustScope',
  },
  description: 'Know what your AI agents are doing. Control what they can do. Prove it to anyone who asks. 25 detection engines, 50+ policy types, cryptographic evidence.',
  keywords: ['AI governance', 'AI compliance', 'AI agents', 'AI safety', 'audit trail', 'SOC 2', 'EU AI Act', 'NIST AI RMF', 'agent monitoring', 'LLM observability'],
  authors: [{ name: 'TrustScope' }],
  creator: 'TrustScope',
  publisher: 'TrustScope',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'TrustScope - Evidence Infrastructure for AI Agents',
    description: 'Know. Control. Prove. The governance platform for AI agents.',
    url: 'https://trustscope.ai',
    siteName: 'TrustScope',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrustScope - Evidence Infrastructure for AI Agents',
    description: 'Know. Control. Prove. The governance platform for AI agents.',
    creator: '@trustscope',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
