'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from 'lucide-react'

type NavItem = {
    label: string
    href: string
}

const navItems: NavItem[] = [
    { label: 'ABOUT', href: '/about' },
    { label: 'WORK', href: '/work' },
    { label: 'LIFE', href: '/life' },
    { label: 'BLOG', href: '/blog' },
]

// Logo Component
function Logo() {
    return (
        <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center">
                <Image
                    src="/favicon.ico"
                    alt="Jack Hau Logo"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                />
            </div>
            <span className="font-semibold text-black dark:text-white">JACK HAU</span>
        </Link>
    )
}

export function Navbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const { theme, setTheme } = useTheme()

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
            <div className="mx-auto flex w-full max-w-screen-sm items-center justify-between px-4 py-3">
                <Logo />

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:space-x-6">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative px-1 py-2 text-sm transition-colors ${isActive
                                    ? 'text-black dark:text-white'
                                    : 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white'
                                    }`}
                            >
                                {item.label}
                                {isActive && (
                                    <motion.div
                                        className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-black dark:bg-white"
                                        layoutId="navbar-indicator"
                                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                    />
                                )}
                            </Link>
                        )
                    })}

                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="ml-2 flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <SunIcon className="h-4 w-4" />
                        ) : (
                            <MoonIcon className="h-4 w-4" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation Toggle */}
                <div className="flex items-center md:hidden">
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="mr-4 flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <SunIcon className="h-4 w-4" />
                        ) : (
                            <MoonIcon className="h-4 w-4" />
                        )}
                    </button>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="space-y-1.5">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                className="block h-0.5 w-6 bg-black dark:bg-white"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="block h-0.5 w-6 bg-black dark:bg-white"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                className="block h-0.5 w-6 bg-black dark:bg-white"
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <motion.div
                className="md:hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                style={{ overflow: 'hidden' }}
            >
                <div className="flex flex-col space-y-4 px-4 pb-6">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`text-sm ${isActive
                                    ? 'font-medium text-black dark:text-white'
                                    : 'text-zinc-600 dark:text-zinc-400'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </div>
            </motion.div>
        </nav>
    )
} 