import { Container } from '../../ui/container'
import { QueryData } from './QueryData'
import { useState, useEffect } from 'react'

const QueryTest = () => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          'https://eng-v3.holidaywebtech.co.uk/images/provider_images/4/9856/133861a_hb_p_002_20250314_094634.jpg',
          {
            headers: {
            },
          }
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status}`)
        }

        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setImageUrl(url)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load image')
      } finally {
        setLoading(false)
      }
    }

    fetchImage()

    // Cleanup function to revoke object URL
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [imageUrl])

  return (
    <Container
      wrapperClassName="py-12"
      contentClassName="flex flex-col items-start gap-6"
    >
      {loading && <div>Loading image...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Hotel accommodation"
          className="h-auto max-w-full rounded-lg shadow-md"
        />
      )}
      <QueryData />
    </Container>
  )
}

export { QueryTest }
