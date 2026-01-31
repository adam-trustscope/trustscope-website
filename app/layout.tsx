import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TrustScope - Evidence Infrastructure for AI Agents',
  description: 'Document that your AI agents followed policy with cryptographically signed evidence. Not a score. Not a checklist. Evidence.',
  keywords: 'AI governance, AI compliance, AI agents, EU AI Act, SOC 2, NIST AI RMF, audit trail',
  openGraph: {
    title: 'TrustScope - Evidence Infrastructure for AI Agents',
    description: 'Document that your AI agents followed policy with cryptographically signed evidence.',
    url: 'https://trustscope.ai',
    siteName: 'TrustScope',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrustScope - Evidence Infrastructure for AI Agents',
    description: 'Document that your AI agents followed policy with cryptographically signed evidence.',
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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
