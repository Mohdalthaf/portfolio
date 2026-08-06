"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      closeButton
      richColors
      toastOptions={{
        classNames: {
          toast:
            "group toast !bg-surface !text-foreground !border-border !shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
          title: "!text-sm !font-semibold",
          description: "!text-muted !text-xs",
          success: "!border-accent/40",
          error: "!border-red-500/40",
          closeButton: "!bg-surface-2 !border-border !text-foreground",
        },
      }}
      {...props}
    />
  );
}
