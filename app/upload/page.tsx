"use client"

import VideoUploadForm from "../components/VideoUploadForm"
import { Upload } from "lucide-react"

export default function VideoUploadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-center">Upload New Reel</h1>
          <p className="text-base-content/70 mt-2 text-center">Share your amazing videos with the world</p>
        </div>

        <div className="bg-base-100 p-6 rounded-xl shadow-md">
          <VideoUploadForm />
        </div>
      </div>
    </div>
  )
}
