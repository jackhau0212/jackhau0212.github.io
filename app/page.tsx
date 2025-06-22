'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { socialLinks } from '@/lib/config/social'
import Earth3D from '@/components/ui/earth-3d'

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Array of image paths - you can add more images here
  const images = [
    '/assets/home/profile1.jpg',
    '/assets/home/profile1.jpg', // Duplicate for demo - replace with actual images
    '/assets/home/profile1.jpg', // Duplicate for demo - replace with actual images
  ]

  // Auto-advance slideshow on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [images.length])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Get X (Twitter) link from social config
  const xLink = socialLinks.find(social => social.platform === 'X (Twitter)')

  // Places lived data
  const placesLived = [
    {
      city: 'San Francisco',
      country: 'United States',
      duration: '2022 - Present',
      description: 'Working in tech and exploring AI innovation'
    },
    {
      city: 'London',
      country: 'United Kingdom',
      duration: '2020 - 2022',
      description: 'Studied and worked on machine learning projects'
    },
    {
      city: 'Tokyo',
      country: 'Japan',
      duration: '2018 - 2020',
      description: 'Research collaboration and cultural immersion'
    }
  ]

  // Countries visited (for 3D Earth)
  const countriesVisited = ['US', 'GB', 'JP', 'CA', 'FR', 'DE', 'IT', 'ES', 'NL', 'BE']

  return (
    <main className="max-w-4xl mx-auto px-6 py-4 space-y-8">

      <section className="text-center space-y-2 px-4">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
          WHO AM I?
        </h1>
        <h2 className="text-lg md:text-xl font-medium text-zinc-600 dark:text-zinc-400">
          AI Engineer
        </h2>

        {/* Image Gallery/Slideshow */}
        <div className="flex justify-center pt-4">
          {/* Desktop: Show all images side by side */}
          <div className="hidden md:flex gap-6">
            {images.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Profile image ${index + 1}`}
                width={180}
                height={180}
                className="rounded-full"
              />
            ))}
          </div>

          {/* Mobile: Slideshow */}
          <div className="md:hidden relative">
            <Image
              src={images[currentImageIndex]}
              alt={`Profile image ${currentImageIndex + 1}`}
              width={180}
              height={180}
              className="rounded-full"
            />

            {/* Navigation dots */}
            <div className="flex justify-center mt-4 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex
                    ? 'bg-zinc-600 dark:bg-zinc-400'
                    : 'bg-zinc-300 dark:bg-zinc-600'
                    }`}
                />
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-zinc-800 rounded-full p-2 shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-zinc-800 rounded-full p-2 shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <p className="mx-auto text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          I explore artificial intelligence, machine learning, and how technology shapes our future.
        </p>
      </section>

      {/* 3D Earth Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 text-center">
          My Journey
        </h2>

        <div className="flex justify-center">
          <div className="space-y-4 max-w-4xl w-full">
            <Earth3D
              visitedCountries={countriesVisited}
              className="w-full h-96"
            />
            <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 text-center">
              {countriesVisited.length} countries visited • Interactive 3D globe
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
