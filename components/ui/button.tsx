import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 text-primary-foreground shadow-lg shadow-sky-500/30 hover:translate-y-[-1px] hover:shadow-xl hover:shadow-blue-500/35",
        secondary:
          "bg-secondary/90 text-secondary-foreground shadow-md shadow-sky-200/40 hover:bg-secondary",
        outline:
          "border border-sky-200/70 bg-white/55 text-foreground hover:bg-sky-100/70 dark:border-sky-300/20 dark:bg-slate-950/40 dark:hover:bg-sky-500/10",
        ghost: "hover:bg-sky-100/70 dark:hover:bg-sky-500/10",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
