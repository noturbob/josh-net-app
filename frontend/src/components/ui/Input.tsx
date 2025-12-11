import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import { cn } from '../../lib/utils';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <View className="w-full space-y-2">
        {label && (
          <Text className="text-sm font-medium text-muted-foreground text-slate-300 ml-1">
            {label}
          </Text>
        )}
        <View
          className={cn(
            "flex-row items-center h-12 w-full rounded-xl border border-border bg-surface px-3 focus:border-primary",
            error && "border-danger",
            className
          )}
        >
          {icon && <View className="mr-2">{icon}</View>}
          <TextInput
            ref={ref}
            className="flex-1 text-base text-white placeholder:text-muted"
            placeholderTextColor="#71717a"
            {...props}
          />
        </View>
        {error && <Text className="text-xs text-danger ml-1">{error}</Text>}
      </View>
    );
  }
);