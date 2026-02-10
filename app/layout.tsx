import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TrustScope - Safe Mode for AI Agents',
  description: 'See what your AI agents are really doing. Then prove it. Request early access to the private beta.',
  keywords: 'AI governance, AI compliance, AI agents, AI safety, audit trail',
  openGraph: {
    title: 'TrustScope - Safe Mode for AI Agents',
    description: 'See what your AI agents are really doing. Then prove it.',
    url: 'https://trustscope.ai',
    siteName: 'TrustScope',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrustScope - Safe Mode for AI Agents',
    description: 'See what your AI agents are really doing. Then prove it.',
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
        {children}
      </body>
    </html>
  )
}
