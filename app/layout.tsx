import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono, Outfit } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const displayFont = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700', '800', '900'],
})

const bodyFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
})

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://trustscope.ai'),
  title: {
    default: 'TrustScope | Know. Control. Prove.',
    template: '%s | TrustScope',
  },
  description:
    'Know what your AI is doing. Control it. Prove it. AI agent governance with 26 detection engines and cryptographic evidence.',
  keywords: [
    'AI governance',
    'AI compliance',
    'AI agent security',
    'AIUC-1',
    'EU AI Act',
    'NIST AI RMF',
    'agent monitoring',
  ],
  authors: [{ name: 'TrustScope' }],
  openGraph: {
    title: 'TrustScope | Know. Control. Prove.',
    description: 'Safe Mode for AI Agents.',
    url: 'https://trustscope.ai',
    siteName: 'TrustScope',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'TrustScope' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrustScope | Know. Control. Prove.',
    description: 'Safe Mode for AI Agents.',
    images: ['/og.png'],
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
      <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
        <Header />
        <main className="pt-20 md:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
