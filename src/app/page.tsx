'use client'

import { useState } from 'react'
import ImageUpload from '@/components/ImageUpload'
import ResultDisplay from '@/components/ResultDisplay'

export interface SnakeResult {
  species: string
  isVenomous: boolean
  confidence: number
  description?: string
}

export default function Home() {
  const [result, setResult] = useState<SnakeResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = async (file: File) => {
    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('/api/identify', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to identify snake')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🐍 Snake Species Identifier
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload an image of a snake to identify its species and learn whether it's venomous or not.
            Our AI-powered system will analyze the image and provide detailed information.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <ImageUpload onImageUpload={handleImageUpload} loading={loading} />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <div className="text-red-600 mr-3">⚠️</div>
              <div>
                <h3 className="text-red-800 font-semibold">Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <ResultDisplay result={result} />
          </div>
        )}
      </div>
    </main>
  )
}
