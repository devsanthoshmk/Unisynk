"use client"

import * as React from "react"
import { Upload, X, Image } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  accept?: string
  maxSize?: number // in MB
  preview?: string | null
  placeholder?: string
  className?: string
  disabled?: boolean
  error?: string
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ 
    onFileSelect, 
    accept = "image/*", 
    maxSize = 5, 
    preview, 
    placeholder = "Upload file",
    className,
    disabled = false,
    error,
    ...props 
  }, ref) => {
    const [dragActive, setDragActive] = React.useState(false)
    const [uploadError, setUploadError] = React.useState<string | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current!)

    const handleDrag = React.useCallback((e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true)
      } else if (e.type === "dragleave") {
        setDragActive(false)
      }
    }, [])

    const validateFile = React.useCallback((file: File): string | null => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        return `File size must be less than ${maxSize}MB`
      }

      // Check file type if accept is specified
      if (accept && accept !== "*") {
        const acceptedTypes = accept.split(",").map(type => type.trim())
        const fileType = file.type
        const isValidType = acceptedTypes.some(type => {
          if (type.startsWith(".")) {
            return file.name.toLowerCase().endsWith(type.toLowerCase())
          }
          if (type.includes("*")) {
            const baseType = type.split("/")[0]
            return fileType.startsWith(baseType)
          }
          return fileType === type
        })

        if (!isValidType) {
          return `File type not supported. Accepted types: ${accept}`
        }
      }

      return null
    }, [accept, maxSize])

    const handleFiles = React.useCallback((files: FileList | null) => {
      if (!files || files.length === 0) return

      const file = files[0]
      const validationError = validateFile(file)

      if (validationError) {
        setUploadError(validationError)
        onFileSelect(null)
        return
      }

      setUploadError(null)
      onFileSelect(file)
    }, [validateFile, onFileSelect])

    const handleDrop = React.useCallback((e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (disabled) return

      const files = e.dataTransfer.files
      handleFiles(files)
    }, [disabled, handleFiles])

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files)
    }, [handleFiles])

    const handleClick = React.useCallback(() => {
      if (disabled) return
      inputRef.current?.click()
    }, [disabled])

    const handleRemove = React.useCallback((e: React.MouseEvent) => {
      e.stopPropagation()
      setUploadError(null)
      onFileSelect(null)
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    }, [onFileSelect])

    const displayError = error || uploadError

    return (
      <div className={cn("w-full", className)}>
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg transition-colors cursor-pointer",
            dragActive && !disabled ? "border-primary bg-primary/5" : "border-border",
            disabled ? "opacity-50 cursor-not-allowed" : "hover:border-primary/50",
            displayError ? "border-destructive" : "",
            preview ? "p-2" : "p-6"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
            disabled={disabled}
            {...props}
          />

          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="File preview"
                className="w-full h-32 object-cover rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={handleRemove}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-2">
                {accept.includes("image") ? (
                  <Image className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                ) : (
                  <Upload className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                )}
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                {placeholder}
              </p>
              <p className="text-xs text-muted-foreground">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Max size: {maxSize}MB
              </p>
            </div>
          )}
        </div>

        {displayError && (
          <p className="text-sm text-destructive mt-2">{displayError}</p>
        )}
      </div>
    )
  }
)

FileUpload.displayName = "FileUpload"

export { FileUpload }