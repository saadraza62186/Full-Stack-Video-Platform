"use client"

import type React from "react"

import { IKUpload } from "imagekitio-next"
import type { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props"
import { useState, useRef } from "react"
import { Loader2, Upload, AlertCircle } from "lucide-react"

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void
  onProgress?: (progress: number) => void
  fileType?: "image" | "video"
}

export default function FileUpload({ onSuccess, onProgress, fileType = "image" }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const uploadRef = useRef<HTMLInputElement>(null)

  const onError = (err: { message: string }) => {
    setError(err.message)
    setUploading(false)
  }

  const handleSuccess = (response: IKUploadResponse) => {
    setUploading(false)
    setError(null)
    onSuccess(response)
  }

  const handleStartUpload = () => {
    setUploading(true)
    setError(null)
  }

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100
      onProgress(Math.round(percentComplete))
    }
  }

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file")
        return false
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("Video size must be less than 100MB")
        return false
      }
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/webp"]
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, or WebP)")
        return false
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB")
        return false
      }
    }
    return true
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    // The actual file handling will be done by IKUpload
  }

  const handleClick = () => {
    // Trigger the hidden IKUpload input
    if (uploadRef.current) {
      uploadRef.current.click()
    }
  }

  return (
    <div className="space-y-3">
      <div
        className={`border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer ${
          dragActive ? "border-primary bg-primary/5" : "border-base-300"
        } ${error ? "border-error/50" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <div className={`p-3 rounded-full ${uploading ? "bg-primary/10" : "bg-base-200"}`}>
            {uploading ? (
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            ) : (
              <Upload className="w-6 h-6 text-base-content/70" />
            )}
          </div>

          <div className="text-center">
            <p className="text-sm font-medium mb-1">
              {uploading ? "Uploading..." : `Drag & drop your ${fileType} here or click to browse`}
            </p>
            <p className="text-xs text-base-content/60">
              {fileType === "video" ? "MP4, WebM or MOV (max. 100MB)" : "JPEG, PNG or WebP (max. 5MB)"}
            </p>
          </div>
        </div>

        {/* Hidden IKUpload component */}
        <IKUpload
          ref={uploadRef}
          fileName={fileType === "video" ? "video" : "image"}
          onError={onError}
          onSuccess={handleSuccess}
          onUploadStart={handleStartUpload}
          onUploadProgress={handleProgress}
          accept={fileType === "video" ? "video/*" : "image/*"}
          className="hidden" // Hide the actual input
          validateFile={validateFile}
          useUniqueFileName={true}
          folder={fileType === "video" ? "/videos" : "/images"}
        />
      </div>

      {uploading && onProgress && (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span>Uploading...</span>
            <span className="font-medium">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-base-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 text-error text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

// Helper variable for the component
const uploadProgress = 0
