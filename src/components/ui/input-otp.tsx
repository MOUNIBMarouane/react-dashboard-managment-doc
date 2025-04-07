
import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

// Define an interface for the slot object to fix TypeScript errors
interface OTPSlot {
  char?: string
  hasFakeCaret?: boolean
  isActive?: boolean
}

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-3 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const slots = inputOTPContext.slots || []
  // Cast the slot object to our interface type to fix TypeScript errors
  const slot = slots[index] ? slots[index] as OTPSlot : {} as OTPSlot
  
  // Now these properties are properly typed
  const char = slot.char || ''
  const hasFakeCaret = slot.hasFakeCaret || false
  const isActive = slot.isActive || false

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-14 w-12 items-center justify-center rounded-md border-2 text-2xl font-bold transition-all bg-opacity-80",
        isActive && "z-10 ring-2 ring-ring ring-offset-1 ring-offset-background",
        className
      )}
      {...props}
    >
      {char && (
        <span className="animate-scale-in text-center text-3xl font-bold">
          {char}
        </span>
      )}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-1 animate-caret-blink bg-dashboard-accent duration-700" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot className="h-5 w-5 text-muted-foreground" />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
