"use client";

import { Check, Copy } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";

export function CopyButton({
  value,
  label = "Copy",
  size,
  icon,
}: {
  value: string;
  label?: string;
  size?: "default" | "sm";
  icon?: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button type="button" variant="outline" size={size} onClick={copy}>
      {copied ? (
        <>
          <Check className="h-4 w-4" aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          {icon ?? <Copy className="h-4 w-4" aria-hidden="true" />}
          {label}
        </>
      )}
    </Button>
  );
}