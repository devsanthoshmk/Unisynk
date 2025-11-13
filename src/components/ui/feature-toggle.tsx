"use client"

import * as React from "react"
import { Info, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Switch } from "./switch"
import { Label } from "./label"

export interface FeatureToggleProps {
  id: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  title: string
  description?: string
  tooltip?: string
  benefits?: string[]
  disabled?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
  layout?: "horizontal" | "vertical"
  showIcon?: boolean
  icon?: React.ReactNode
}

const FeatureToggle = React.forwardRef<
  React.ElementRef<typeof Switch>,
  FeatureToggleProps
>(({ 
  id,
  checked, 
  onCheckedChange, 
  title,
  description,
  tooltip,
  benefits,
  disabled = false,
  className,
  size = "md",
  layout = "horizontal",
  showIcon = false,
  icon,
  ...props 
}, ref) => {
  const [showTooltip, setShowTooltip] = React.useState(false)
  const [showBenefits, setShowBenefits] = React.useState(false)

  const sizeClasses = {
    sm: {
      container: "p-3",
      title: "text-sm font-medium",
      description: "text-xs text-muted-foreground",
      benefits: "text-xs"
    },
    md: {
      container: "p-4",
      title: "text-base font-medium",
      description: "text-sm text-muted-foreground",
      benefits: "text-sm"
    },
    lg: {
      container: "p-6",
      title: "text-lg font-semibold",
      description: "text-base text-muted-foreground",
      benefits: "text-base"
    }
  }

  const currentSize = sizeClasses[size]

  const handleToggleChange = React.useCallback((newChecked: boolean) => {
    if (!disabled) {
      onCheckedChange(newChecked)
    }
  }, [disabled, onCheckedChange])

  const toggleBenefits = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setShowBenefits(!showBenefits)
  }, [showBenefits])

  return (
    <div 
      className={cn(
        "relative border rounded-lg transition-all duration-200",
        checked ? "border-primary bg-primary/5" : "border-border bg-background",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/50",
        currentSize.container,
        className
      )}
      onClick={() => handleToggleChange(!checked)}
    >
      <div className={cn(
        "flex items-start gap-3",
        layout === "vertical" ? "flex-col" : "flex-row"
      )}>
        {/* Icon */}
        {showIcon && icon && (
          <div className="flex-shrink-0 mt-1">
            {icon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <Label 
                htmlFor={id}
                className={cn(
                  currentSize.title,
                  disabled ? "cursor-not-allowed" : "cursor-pointer"
                )}
              >
                {title}
              </Label>
              
              {description && (
                <p className={cn("mt-1", currentSize.description)}>
                  {description}
                </p>
              )}
            </div>

            {/* Tooltip trigger */}
            {tooltip && (
              <div className="relative">
                <button
                  type="button"
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowTooltip(!showTooltip)
                  }}
                >
                  <HelpCircle className="h-4 w-4" />
                </button>

                {/* Tooltip */}
                {showTooltip && (
                  <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-popover border border-border rounded-md shadow-md z-10">
                    <p className="text-sm text-popover-foreground">{tooltip}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Benefits */}
          {benefits && benefits.length > 0 && (
            <div className="mt-2">
              <button
                type="button"
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                onClick={toggleBenefits}
              >
                <Info className="h-3 w-3" />
                {showBenefits ? "Hide benefits" : "Show benefits"}
              </button>

              {showBenefits && (
                <ul className={cn("mt-2 space-y-1", currentSize.benefits)}>
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Switch */}
        <div className="flex-shrink-0">
          <Switch
            ref={ref}
            id={id}
            checked={checked}
            onCheckedChange={handleToggleChange}
            disabled={disabled}
            {...props}
          />
        </div>
      </div>

      {/* Checked indicator overlay */}
      {checked && (
        <div className="absolute inset-0 rounded-lg border-2 border-primary pointer-events-none" />
      )}
    </div>
  )
})

FeatureToggle.displayName = "FeatureToggle"

export { FeatureToggle }