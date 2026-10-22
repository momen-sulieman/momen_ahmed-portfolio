"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { assetPath } from "@/lib/paths";

type CertificateViewerProps = {
  src: string;
  title: string;
};

export function CertificateViewer({ src, title }: CertificateViewerProps) {
  const [open, setOpen] = useState(false);
  const url = assetPath(src);

  return (
    <>
      <div className="flex shrink-0 flex-col items-center gap-1.5">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="overflow-hidden rounded-md border border-accent-border transition-colors hover:border-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          aria-label={`View certificate: ${title}`}
        >
          <Image
            src={url}
            alt={`Certificate thumbnail: ${title}`}
            width={64}
            height={48}
            className="h-12 w-16 object-cover"
          />
        </button>
        <Button
          type="button"
          variant="link"
          onClick={() => setOpen(true)}
          className="h-auto px-0 text-xs"
        >
          View certificate
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-3 sm:p-5" aria-describedby={undefined}>
          <DialogTitle className="mb-3 pr-12 text-base">{title}</DialogTitle>
          <Image
            src={url}
            alt={`Certificate: ${title}`}
            width={1600}
            height={1200}
            className="h-auto max-h-[75vh] w-full rounded-lg object-contain"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}