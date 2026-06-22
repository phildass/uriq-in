import { cn } from "@/lib/utils/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-medium transition-opacity disabled:opacity-50",
          variant === "primary" && "bg-slate-900 text-white hover:opacity-95",
          variant === "secondary" &&
            "border border-zinc-200 bg-white text-slate-900 hover:bg-zinc-50",
          variant === "ghost" && "text-slate-600 hover:bg-zinc-100",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
