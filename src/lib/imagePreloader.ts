import placeholder from '@/assets/placeholder.jpg'

class ImagePreloader {
  // Cache of successfully preloaded image URLs
  private preloadedImages = new Set<string>()

  preload(src: string): Promise<void> {
    if (this.preloadedImages.has(src)) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      // Use browser's Image API to download and cache
      const img = new Image()

      img.onload = () => {
        this.preloadedImages.add(src)
        resolve()
      }

      img.onerror = () => {
        console.warn(`Failed to preload image: ${src}`)
        resolve()
      }

      // Setting src triggers the browser download
      img.src = src
    })
  }

  preloadBatch(sources: string[]): Promise<void[]> {
    return Promise.all(sources.map((src) => this.preload(src)))
  }

  isPreloaded(src: string): boolean {
    return this.preloadedImages.has(src)
  }
}

// Create singleton instance
export const imagePreloader = new ImagePreloader()

imagePreloader.preload(placeholder).catch(console.warn)

export { placeholder }

export function useImagePreloader() {
  return {
    preload: imagePreloader.preload.bind(imagePreloader),
    preloadBatch: imagePreloader.preloadBatch.bind(imagePreloader),
    isPreloaded: imagePreloader.isPreloaded.bind(imagePreloader),
  }
}
