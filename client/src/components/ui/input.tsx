import * as React from "react";
import { cn } from "@/libs/utils";

// Use a type alias instead of an interface to avoid the empty-interface warning
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full text-black-600/80  rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-2  focus-visible:border-primary focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        // defaultValue=""
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
