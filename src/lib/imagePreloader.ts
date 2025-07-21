/**
 * Preloads critical images for better performance
 */

// Import the placeholder image as a static asset
import placeholderUrl from '@/assets/placeholder.jpg'

class ImagePreloader {
  private preloadedImages = new Set<string>()

  /**
   * Preloads an image and stores it in cache
   */
  preload(src: string): Promise<void> {
    if (this.preloadedImages.has(src)) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      const img = new Image()

      img.onload = () => {
        this.preloadedImages.add(src)
        resolve()
      }

      img.onerror = () => {
        // Don't reject on failed preloads since we have fallback logic
        // Just log a warning and resolve
        console.warn(`Failed to preload image: ${src}`)
        resolve()
      }

      img.src = src
    })
  }

  /**
   * Preloads multiple images concurrently
   */
  preloadBatch(sources: string[]): Promise<void[]> {
    return Promise.all(sources.map((src) => this.preload(src)))
  }

  /**
   * Checks if an image has been preloaded
   */
  isPreloaded(src: string): boolean {
    return this.preloadedImages.has(src)
  }
}

// Create singleton instance
export const imagePreloader = new ImagePreloader()

// Preload the placeholder image immediately
imagePreloader.preload(placeholderUrl).catch(console.warn)

// Export the placeholder URL for components
export { placeholderUrl }

/**
 * Hook for preloading images in React components
 */
export function useImagePreloader() {
  return {
    preload: imagePreloader.preload.bind(imagePreloader),
    preloadBatch: imagePreloader.preloadBatch.bind(imagePreloader),
    isPreloaded: imagePreloader.isPreloaded.bind(imagePreloader),
  }
}
