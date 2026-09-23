"use client";

import { toast } from "@/components/Toaster";

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers / insecure contexts: fall back to a hidden textarea.
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

/**
 * Copies the email address and confirms with a toast. Used instead of a
 * mailto: link, which does nothing on machines without a mail app.
 */
export function CopyEmailButton({
  email,
  className,
  children,
}: {
  email: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        const ok = await copy(email);
        toast(ok ? `Email copied: ${email}` : `Email: ${email}`);
      }}
    >
      {children}
    </button>
  );
}
