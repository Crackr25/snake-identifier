"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  loading: boolean;
}

export default function ImageUpload({
  onImageUpload,
  loading,
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
      // Reset the input value to allow selecting the same file again
      e.target.value = "";
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    onImageUpload(file);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? "border-emerald-400 bg-emerald-50"
            : "border-gray-300 hover:border-emerald-400"
        } ${loading ? "opacity-50 pointer-events-none" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={loading}
        />

        {preview ? (
          <div className="space-y-4">
            <img
              src={preview}
              alt="Snake preview"
              className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
            />
            <div className="text-sm text-gray-600">
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600"></div>
                  <span>Analyzing image...</span>
                </div>
              ) : (
                <p onClick={onButtonClick}>
                  Click or drag another image to replace
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-6xl">🐍</div>
            <div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Upload a snake image
              </p>
              <p className="text-gray-500 mb-4">
                Drag and drop an image here, or click to select
              </p>
              <button
                type="button"
                onClick={onButtonClick}
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                {loading ? "Processing..." : "Choose Image"}
              </button>
            </div>
            <p className="text-xs text-gray-400">
              Supported formats: JPG, PNG, GIF, WebP
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
