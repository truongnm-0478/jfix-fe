import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-9 w-full border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors font-kakugothic
          file:border-0 file:bg-white file:text-sm file:font-medium file:text-foreground
          placeholder:text-muted-foreground
          focus-visible:outline focus-visible:border-primary-30 focus-visible:border-[1px] focus-visible:ring-1 focus-visible:ring-ring
          disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded-md`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
