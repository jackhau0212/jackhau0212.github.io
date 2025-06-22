export interface NavItem {
    label: string
    href: string
}

export interface NavigationConfig {
    left: NavItem[]
    right: NavItem[]
}