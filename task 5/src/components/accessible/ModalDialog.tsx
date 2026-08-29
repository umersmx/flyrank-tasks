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
