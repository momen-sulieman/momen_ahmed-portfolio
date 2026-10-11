"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (insecure context, denied permission) — the
      // mailto link beside this button still works.
    }
  }

  return (
    <Button type="button" variant="outline" onClick={copy}>
      {copied ? (
        <>
          <Check className="h-4 w-4" aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" aria-hidden="true" />
          Copy email
        </>
      )}
    </Button>
  );
}
