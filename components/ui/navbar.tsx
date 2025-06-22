'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon, MonitorIcon } from 'lucide-react'

type NavItem = {
    label: string
    href: string
}

const leftNavItems: NavItem[] = [
    { label: 'ABOUT', href: '/about' },
    { label: 'WORK', href: '/work' },
    { label: 'LIFE', href: '/life' },
]

const centerNavItems: NavItem[] = [
    { label: 'BLOG', href: '/blog' },
    { label: 'AI CHAT', href: '/chat' },
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

// Navigation Link Component
function NavLink({ item, isActive, layoutId }: { item: NavItem; isActive: boolean; layoutId: string }) {
    return (
        <Link
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
                    layoutId={layoutId}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
            )}
        </Link>
    )
}

// Theme Toggle Component
function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Don't render theme-dependent content until mounted
    if (!mounted) {
        return (
            <div className="flex items-center space-x-1">
                <button
                    className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
                    aria-label="System theme"
                >
                    <MonitorIcon className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return (
        <div className="flex items-center space-x-1">
            <button
                onClick={() => setTheme('system')}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${theme === 'system'
                    ? 'text-black dark:text-white'
                    : 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white'
                    }`}
                aria-label="System theme"
            >
                <MonitorIcon className="h-4 w-4" />
            </button>
            <button
                onClick={() => setTheme('dark')}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${theme === 'dark'
                    ? 'text-black dark:text-white'
                    : 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white'
                    }`}
                aria-label="Dark theme"
            >
                <MoonIcon className="h-4 w-4" />
            </button>
            <button
                onClick={() => setTheme('light')}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${theme === 'light'
                    ? 'text-black dark:text-white'
                    : 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white'
                    }`}
                aria-label="Light theme"
            >
                <SunIcon className="h-4 w-4" />
            </button>
        </div>
    )
}

// Mobile Menu Toggle Component
function MobileMenuToggle({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
    return (
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
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
    )
}

// Mobile Menu Component
function MobileMenu({ isOpen, navItems }: { isOpen: boolean; navItems: NavItem[] }) {
    const pathname = usePathname()

    return (
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
            <div className="flex flex-col space-y-4 px-6 pb-6">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
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
    )
}

export function Navbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const allNavItems = [...leftNavItems, ...centerNavItems]

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md dark:bg-zinc-950/80">
                <div className="relative mx-auto flex w-full max-w-screen-lg items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-6 py-3">
                    {/* Left Section */}
                    <div className="flex items-center space-x-8">
                        <Logo />
                        <div className="hidden md:flex md:items-center md:space-x-6">
                            {leftNavItems.map((item) => (
                                <NavLink
                                    key={item.href}
                                    item={item}
                                    isActive={pathname === item.href}
                                    layoutId="navbar-indicator"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Center Section */}
                    <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex md:items-center md:space-x-6">
                        {centerNavItems.map((item) => (
                            <NavLink
                                key={item.href}
                                item={item}
                                isActive={pathname === item.href}
                                layoutId="navbar-indicator-center"
                            />
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex items-center md:hidden">
                        <ThemeToggle />
                        <MobileMenuToggle isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                </div>

                <MobileMenu isOpen={isOpen} navItems={allNavItems} />
            </nav>
        )
    }

    return (
        <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md dark:bg-zinc-950/80">
            <div className="relative mx-auto flex w-full max-w-screen-lg items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-6 py-3">
                {/* Left Section */}
                <div className="flex items-center space-x-8">
                    <Logo />
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {leftNavItems.map((item) => (
                            <NavLink
                                key={item.href}
                                item={item}
                                isActive={pathname === item.href}
                                layoutId="navbar-indicator"
                            />
                        ))}
                    </div>
                </div>

                {/* Center Section */}
                <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex md:items-center md:space-x-6">
                    {centerNavItems.map((item) => (
                        <NavLink
                            key={item.href}
                            item={item}
                            isActive={pathname === item.href}
                            layoutId="navbar-indicator-center"
                        />
                    ))}
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                </div>

                {/* Mobile Navigation */}
                <div className="flex items-center md:hidden">
                    <ThemeToggle />
                    <MobileMenuToggle isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
            </div>

            <MobileMenu isOpen={isOpen} navItems={allNavItems} />
        </nav>
    )
} 