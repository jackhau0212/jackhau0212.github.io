'use client'

import { useState } from 'react'
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  MobileNavItems,
  ThemeToggle,
} from '@/components/ui/resizable-navbar'
import { navigationConfig } from '@/lib/config/navigation'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Use centralized navigation configuration
  const { left: leftNavItems, right: rightNavItems } = navigationConfig
  const allNavItems = [...leftNavItems, ...rightNavItems]

  return (
    <div className="relative w-full">
      <ResizableNavbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={allNavItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Chat</NavbarButton>
            <ThemeToggle />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen}>
            <MobileNavItems
              items={allNavItems}
              onItemClick={() => setIsMobileMenuOpen(false)}
            />
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  )
}
