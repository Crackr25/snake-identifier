'use client'

import { SnakeResult } from '@/app/page'

interface ResultDisplayProps {
  result: SnakeResult
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const confidenceColor = result.confidence > 0.8 ? 'text-green-600' : 
                          result.confidence > 0.6 ? 'text-yellow-600' : 'text-red-600'
  
  const venomousColor = result.isVenomous ? 'text-red-600' : 'text-green-600'
  const venomousIcon = result.isVenomous ? '⚠️' : '✅'

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Identification Results
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Species Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            🐍 Species Information
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600">Species:</span>
              <p className="text-lg font-semibold text-gray-800 capitalize">
                {result.species}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Confidence:</span>
              <p className={`text-lg font-semibold ${confidenceColor}`}>
                {(result.confidence * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Venomous Status */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            {venomousIcon} Safety Information
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600">Status:</span>
              <p className={`text-lg font-semibold ${venomousColor}`}>
                {result.isVenomous ? 'Venomous' : 'Non-venomous'}
              </p>
            </div>
            {result.isVenomous && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">
                  <strong>⚠️ Warning:</strong> This snake is potentially dangerous. 
                  Keep a safe distance and contact local wildlife authorities if encountered.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {result.description && (
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            📖 Description
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {result.description}
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Disclaimer:</strong> This identification is based on AI analysis and should not be used 
          as the sole basis for determining if a snake is dangerous. Always exercise caution around 
          unknown snakes and consult with local wildlife experts when in doubt.
        </p>
      </div>
    </div>
  )
}
