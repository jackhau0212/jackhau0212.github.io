# Jack Hau Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design** - Clean, minimal design inspired by modern portfolios
- **Dark/Light Theme** - Toggle between dark and light themes
- **Responsive** - Fully responsive design for all devices
- **TypeScript** - Full TypeScript support for better development experience
- **Performance** - Optimized for speed and SEO
- **Accessibility** - WCAG compliant with proper ARIA labels

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── blog/              # Blog pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── robots.ts          # SEO robots file
├── components/            # React components
│   ├── layout/           # Layout components
│   │   ├── navbar.tsx    # Navigation bar
│   │   └── footer.tsx    # Footer component
│   ├── common/           # Reusable components
│   │   └── theme-toggle.tsx
│   └── ui/               # UI components
│       ├── animated-background.tsx
│       ├── magnetic.tsx
│       ├── morphing-dialog.tsx
│       ├── scroll-progress.tsx
│       ├── spotlight.tsx
│       ├── text-effect.tsx
│       ├── text-loop.tsx
│       └── text-morph.tsx
├── lib/                  # Utility libraries
│   ├── config/          # Configuration files
│   │   └── navigation.ts
│   ├── types/           # TypeScript type definitions
│   │   └── navigation.ts
│   ├── constants.ts     # App constants
│   └── utils.ts         # Utility functions
├── hooks/               # Custom React hooks
├── public/              # Static assets
└── mdx-components.tsx   # MDX component overrides
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes
- **Content**: MDX

## 🎨 Design System

### Colors

- **Primary**: Black/White (theme-dependent)
- **Secondary**: Zinc-600/Zinc-400 (theme-dependent)
- **Background**: White/Zinc-950 (theme-dependent)

### Typography

- **Font**: Geist (Google Fonts)
- **Mono Font**: Geist Mono

### Components

- **Navbar**: Fixed top navigation with theme toggle
- **Footer**: Social links and copyright
- **Theme Toggle**: Dark/Light mode switcher

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Navigation

Edit `lib/config/navigation.ts` to modify navigation items and social links.

### Theme

The default theme is set to dark. Users can toggle between dark and light modes.

### Styling

Global styles are in `app/globals.css`. Component-specific styles use Tailwind CSS classes.

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

- Proper ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Semantic HTML structure

## 🎯 Performance

- Optimized images with Next.js Image component
- Code splitting with dynamic imports
- Minimal bundle size
- Fast loading times

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ by Jack Hau
