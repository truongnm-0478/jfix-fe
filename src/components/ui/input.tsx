import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-10 w-full rounded-md border border-slate-400 bg-white px-2 text-slate-900
          file:border-0 file:bg-white file:text-sm file:font-medium
          placeholder:text-slate-500
          focus-visible:outline-none focus-visible:border-blue-500 focus-visible:border-[1px]
          disabled:cursor-not-allowed disabled:opacity-50 text-sm`,
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
