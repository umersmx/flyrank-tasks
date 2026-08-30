"use client";

import React, { useEffect, useRef, useId, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  finalFocusRef?: React.RefObject<HTMLElement | null>;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  role?: "dialog" | "alertdialog";
  showCloseButton?: boolean;
}

const FOCUSABLE_SELECTOR = [
  'a[href]:not([tabindex="-1"])',
  'area[href]:not([tabindex="-1"])',
  'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'iframe:not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
  '[contentEditable=true]:not([tabindex="-1"])',
].join(", ");

export function ModalDialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  initialFocusRef,
  finalFocusRef,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = "",
  role = "dialog",
  showCloseButton = true,
}: ModalDialogProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const titleId = useId();
  const descriptionId = useId();

  // Mount tracking for React Portals in SSR environments (Next.js)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Capture trigger element & handle focus restoration + focus trapping
  useEffect(() => {
    if (!isOpen) return;

    // 1. Store currently focused element to return focus on close
    triggerElementRef.current = document.activeElement as HTMLElement | null;

    // 2. Lock body scroll
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // 3. Move initial focus into modal immediately
    const focusTarget = () => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusables.length > 0) {
          focusables[0].focus();
        } else {
          dialogRef.current.focus();
        }
      }
    };

    focusTarget();
    const frameId = requestAnimationFrame(focusTarget);

    // 4. Keyboard event handler for Escape & Tab trap
    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusableElements = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter((el) => {
          // Check visibility where supported (in jsdom offsetWidth is 0, so avoid filtering out everything)
          if (typeof window !== "undefined" && "checkVisibility" in el) {
            try {
              return (el as unknown as { checkVisibility: () => boolean }).checkVisibility();
            } catch {
              return true;
            }
          }
          return !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true";
        });

        if (focusableElements.length === 0) {
          event.preventDefault();
          dialogRef.current.focus();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement || document.activeElement === dialogRef.current) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;

      // 5. Restore focus to trigger element (or specified finalFocusRef)
      if (finalFocusRef?.current) {
        finalFocusRef.current.focus();
      } else if (triggerElementRef.current && typeof triggerElementRef.current.focus === "function") {
        triggerElementRef.current.focus();
      }
    };
  }, [isOpen, mounted, closeOnEscape, onClose, initialFocusRef, finalFocusRef]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      {/* Backdrop / Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
        aria-hidden="true"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal Dialog Box */}
      <div
        ref={dialogRef}
        role={role}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={`relative z-10 w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-100 p-6 shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-3">
          <div className="space-y-1">
            <h2 id={titleId} className="text-xl font-semibold tracking-tight text-zinc-100">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="text-sm text-zinc-400">
                {description}
              </p>
            )}
          </div>
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="mt-3 text-sm text-zinc-300">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
