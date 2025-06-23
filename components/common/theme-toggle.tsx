'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'

interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  }

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  // Don't render theme-dependent content until mounted
  if (!mounted) {
    return (
      <button
        className={`flex ${sizeClasses[size]} items-center justify-center rounded-full text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white ${className}`}
        aria-label="Toggle theme"
      >
        <MoonIcon className={iconSizes[size]} />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`flex ${sizeClasses[size]} items-center justify-center rounded-full text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white ${className}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <SunIcon className={iconSizes[size]} />
      ) : (
        <MoonIcon className={iconSizes[size]} />
      )}
    </button>
  )
}
