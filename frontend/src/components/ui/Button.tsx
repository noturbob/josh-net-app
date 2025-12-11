import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// 1. Define Button Variants (Shadcn Style)
const buttonVariants = cva(
  "flex-row items-center justify-center rounded-xl px-4 py-3 active:opacity-80",
  {
    variants: {
      variant: {
        default: "bg-primary",
        destructive: "bg-danger",
        outline: "border border-border bg-transparent",
        secondary: "bg-surface border border-border",
        ghost: "bg-transparent",
      },
      size: {
        default: "h-12",
        sm: "h-9 px-3",
        lg: "h-14 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const textVariants = cva("font-bold text-center", {
  variants: {
    variant: {
      default: "text-white",
      destructive: "text-white",
      outline: "text-white",
      secondary: "text-white",
      ghost: "text-primary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// 2. Define Props
interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  label: string;
  icon?: React.ReactNode;
}

// 3. The Component
export const Button = ({ className, variant, size, label, icon, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {icon && <View className="mr-2">{icon}</View>}
      <Text className={cn(textVariants({ variant }))}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};