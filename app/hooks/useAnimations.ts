'use client'

import { useEffect, useRef } from 'react'

export function useAnimations() {
  const elementsRef = useRef<Set<Element>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // Observe all elements with animate-in class
    const elements = document.querySelectorAll('.animate-in')
    elements.forEach((el) => {
      elementsRef.current.add(el)
      observer.observe(el)
    })

    return () => {
      elementsRef.current.forEach((el) => observer.unobserve(el))
      elementsRef.current.clear()
    }
  }, [])

  const animateSequence = (selectors: string[], delay = 100) => {
    selectors.forEach((selector, index) => {
      setTimeout(() => {
        const element = document.querySelector(selector)
        if (element) {
          element.classList.add('show')
        }
      }, index * delay)
    })
  }

  return { animateSequence }
}
