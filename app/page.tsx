'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Earth3D from '@/components/ui/earth-3d'

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Array of image paths - you can add more images here
  const images = [
    '/assets/home/profile_1.jpg',
    '/assets/home/profile_2.JPG', // Duplicate for demo - replace with actual images
    '/assets/home/profile_3.jpg', // Duplicate for demo - replace with actual images
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

  // Places lived data
  const placesLived = [
    {
      city: 'Hong Kong',
      country: 'HKG',
      duration: '2001 - 2013',
      description: 'Born and raised',
    },
    {
      city: 'Bath',
      country: 'UK',
      duration: '2013 - 2019',
      description: 'Studied high school',
    },
    {
      city: 'London',
      country: 'UK',
      duration: '2019 - Present',
      description: 'Studied at UCL and Imperial. Working in AI',
    },
    {
      city: 'Where next?',
      country: 'XXX',
      duration: 'Future -',
      description: 'Somewhere hot for work, family, and fun',
    },
  ]

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-2">
      <section className="space-y-2 px-4 text-center">
        {/* GIF */}
        <div className="mb-4 flex justify-center">
          <Image
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXF6Zzh0NmF5dDkyMjUxNGYxOHRqcGJ2NmJjazB0d2gzNDRxZDNpeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Nx0rz3jtxtEre/giphy.gif"
            alt="Hello wave GIF"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight md:text-4xl">
          Hi - I&apos;m Jack
        </h1>

        <h2 className="text-lg font-medium text-zinc-600 md:text-lg dark:text-zinc-400">
          AI | Robotics | Machine Learning | Finance | Sports
        </h2>

        {/* Image Gallery/Slideshow */}
        <div className="flex justify-center pt-4">
          {/* Desktop: Show all images side by side */}
          <div className="hidden gap-6 md:flex">
            {images.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Profile image ${index + 1}`}
                width={180}
                height={180}
                className="rounded-full object-cover"
              />
            ))}
          </div>

          {/* Mobile: Slideshow */}
          <div className="relative md:hidden">
            <Image
              src={images[currentImageIndex]}
              alt={`Profile image ${currentImageIndex + 1}`}
              width={180}
              height={180}
              className="rounded-full object-cover"
            />

            {/* Navigation dots */}
            <div className="mt-4 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentImageIndex
                      ? 'bg-zinc-600 dark:bg-zinc-400'
                      : 'bg-zinc-300 dark:bg-zinc-600'
                  }`}
                />
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-0 -translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-0 translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg dark:text-zinc-400">
          I&apos;m an AI engineer who is passionate at exploring artificial
          intelligence, robotics, machine learning, and how technology shapes
          our future.
        </p>
      </section>

      {/* 3D Earth Section */}
      <section className="space-y-6">
        <h2 className="text-center text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          My Journey
        </h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 3D Earth - Left Side */}
          <div className="space-y-6">
            <Earth3D className="h-96 w-full" />
          </div>

          {/* Timeline - Right Side */}
          <div className="space-y-6 lg:col-start-2">
            <div className="mx-auto max-w-md space-y-6 lg:mx-0">
              {placesLived.map((place, index) => (
                <div key={index} className="relative">
                  {/* Timeline line */}
                  {index < placesLived.length - 1 && (
                    <div className="absolute top-12 left-6 h-16 w-0.5 bg-zinc-200 dark:bg-zinc-700" />
                  )}

                  {/* Timeline dot */}
                  <div className="absolute top-4 left-4 h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-sm dark:border-zinc-800" />

                  {/* Content */}
                  <div className="ml-12">
                    <div className="mb-1 flex items-baseline gap-2">
                      <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                        {place.city}
                      </h4>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {place.country}
                      </span>
                    </div>
                    <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                      {place.duration}
                    </p>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {place.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
