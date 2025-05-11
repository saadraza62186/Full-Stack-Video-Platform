"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import type { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { useNotification } from "./Notification"
import { apiClient } from "@/lib/api-client"
import FileUpload from "./FileUpload"

interface VideoFormData {
  title: string
  description: string
  videoUrl: string
  thumbnailUrl: string
}

export default function VideoUploadForm() {
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)
  const { showNotification } = useNotification()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  })

  const videoUrl = watch("videoUrl")

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("videoUrl", response.filePath)
    setValue("thumbnailUrl", response.thumbnailUrl || response.filePath)
    setUploadComplete(true)
    showNotification("Video uploaded successfully!", "success")
  }

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress)
  }

  const onSubmit = async (data: VideoFormData) => {
    if (!data.videoUrl) {
      showNotification("Please upload a video first", "error")
      return
    }

    setLoading(true)
    try {
      await apiClient.createVideo(data)
      showNotification("Video published successfully!", "success")

      // Reset form after successful submission
      setValue("title", "")
      setValue("description", "")
      setValue("videoUrl", "")
      setValue("thumbnailUrl", "")
      setUploadProgress(0)
      setUploadComplete(false)
    } catch (error) {
      showNotification(error instanceof Error ? error.message : "Failed to publish video", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control md:col-span-2">
          <label className="label font-medium">
            <span className="label-text">Title</span>
            {errors.title && (
              <span className="label-text-alt text-error flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.title.message}
              </span>
            )}
          </label>
          <input
            type="text"
            placeholder="Enter a catchy title for your video"
            className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`}
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 100,
                message: "Title must be less than 100 characters",
              },
            })}
          />
        </div>

        <div className="form-control md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium text-sm">Description</label>
            {errors.description && (
              <span className="text-error text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.description.message}
              </span>
            )}
          </div>

          <textarea
            placeholder="Describe your video to help viewers find it"
            className={`textarea textarea-bordered h-24 w-full ${errors.description ? "textarea-error" : ""}`}
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 500,
                message: "Description must be less than 500 characters",
              },
            })}
          />

          <div className="flex justify-end mt-1">
            <span className="text-xs text-base-content/60">{watch("description")?.length || 0}/500 characters</span>
          </div>
        </div>

        <div className="form-control md:col-span-2">
          <label className="label font-medium">
            <span className="label-text">Upload Video</span>
          </label>

          {uploadComplete ? (
            <div className="border border-success/30 bg-success/5 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <div>
                  <p className="font-medium text-success">Video uploaded successfully</p>
                  <p className="text-sm text-base-content/70">Your video is ready to be published</p>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm ml-auto"
                  onClick={() => {
                    setValue("videoUrl", "")
                    setValue("thumbnailUrl", "")
                    setUploadComplete(false)
                    setUploadProgress(0)
                  }}
                >
                  Change
                </button>
              </div>
            </div>
          ) : (
            <FileUpload fileType="video" onSuccess={handleUploadSuccess} onProgress={handleUploadProgress} />
          )}
        </div>
      </div>

      <div className="pt-4 border-t">
        <button type="submit" className="btn btn-primary btn-block" disabled={loading || !videoUrl}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Publishing Video...
            </>
          ) : (
            "Publish Video"
          )}
        </button>
      </div>
    </form>
  )
}
