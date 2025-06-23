import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/layout/footer'
import { ThemeProvider } from 'next-themes'
import { Navbar } from '@/components/layout/navbar'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://jackhau.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Jack Hau | AI Engineer',
    template: '%s | Jack Hau 🤖',
  },
  description:
    'Jack Hau is an AI engineer passionate about artificial intelligence, robotics, machine learning, and how technology shapes our future.',
  openGraph: {
    title: 'Jack Hau - AI Engineer',
    description:
      'AI engineer passionate about artificial intelligence, robotics, machine learning, and how technology shapes our future.',
    url: 'https://jackhau.com',
    siteName: 'Jack Hau',
    images: [
      {
        url: '/assets/home/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Jack Hau - AI Engineer',
      },
    ],
    locale: 'en_UK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jack Hau - AI Engineer',
    description:
      'AI engineer passionate about artificial intelligence, robotics, machine learning, and how technology shapes our future.',
    images: ['/assets/home/profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          storageKey="theme"
          defaultTheme="dark"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <Navbar />
            <div className="relative mx-auto w-full max-w-screen-lg flex-1 px-2 pt-20">
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
