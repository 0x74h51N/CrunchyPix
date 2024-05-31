import { useState, useEffect } from 'react'

const useBlurUrl = (id: string) => {
  const [blurUrl, setBlurUrl] = useState(null)

  useEffect(() => {
    if (!id || id === 'crunchypix/.jpg' || id === 'crunchypix/policies.jpg') {
      return
    } else {
      const fetchBlurUrl = async () => {
        try {
          const res = await fetch(`/api/generate-blur-url?id=${id}`)
          const data = await res.json()
          setBlurUrl(data.blurUrl)
        } catch (error) {
          console.error('Failed to fetch blur image URL:', error)
        }
      }
      setBlurUrl(null)
      fetchBlurUrl()
    }
  }, [id])

  return blurUrl
}

export default useBlurUrl
