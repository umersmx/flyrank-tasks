"use client";

import React, {
  createContext,
  useContext,
  useId,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { ChevronDown } from "lucide-react";

// --- Standalone Disclosure Component ---
export interface DisclosureProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  disabled?: boolean;
}

export function Disclosure({
  title,
  children,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onOpenChange,
  className = "",
  triggerClassName = "",
  contentClassName = "",
  disabled = false,
}: DisclosureProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
  const id = useId();
  const triggerId = `${id}-trigger`;
  const contentId = `${id}-content`;

  const isExpanded = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;

  const handleToggle = () => {
    if (disabled) return;
    const nextState = !isExpanded;
    if (controlledIsOpen === undefined) {
      setInternalOpen(nextState);
    }
    onOpenChange?.(nextState);
  };

  return (
    <div className={`rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden ${className}`}>
      <h3>
        <button
          type="button"
          id={triggerId}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          disabled={disabled}
          onClick={handleToggle}
          className={`flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-zinc-100 hover:bg-zinc-800/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none ${triggerClassName}`}
        >
          <span>{title}</span>
          <ChevronDown
            className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
              isExpanded ? "rotate-180 text-emerald-400" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>

      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isExpanded}
        className={`px-5 pb-5 pt-1 text-sm text-zinc-300 leading-relaxed ${
          !isExpanded ? "hidden" : "block"
        } ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
}

// --- Multi-Item Accordion Compound Components ---
export type AccordionType = "single" | "multiple";

interface AccordionContextValue {
  expandedItems: Set<string>;
  toggleItem: (value: string) => void;
  disabled?: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionItem compound components must be inside an <Accordion> parent.");
  }
  return context;
}

export interface AccordionProps {
  type?: AccordionType;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export function Accordion({
  type = "single",
  defaultValue,
  value: controlledValue,
  onValueChange,
  disabled = false,
  className = "",
  children,
}: AccordionProps) {
  const getInitialSet = (): Set<string> => {
    const val = controlledValue !== undefined ? controlledValue : defaultValue;
    if (!val) return new Set();
    if (Array.isArray(val)) return new Set(val);
    return new Set([val]);
  };

  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(getInitialSet);

  const expandedItems = controlledValue !== undefined
    ? new Set(Array.isArray(controlledValue) ? controlledValue : [controlledValue])
    : internalExpanded;

  const toggleItem = useCallback(
    (itemValue: string) => {
      if (disabled) return;

      const next = new Set(expandedItems);
      if (type === "single") {
        if (next.has(itemValue)) {
          next.clear();
        } else {
          next.clear();
          next.add(itemValue);
        }
      } else {
        if (next.has(itemValue)) {
          next.delete(itemValue);
        } else {
          next.add(itemValue);
        }
      }

      if (controlledValue === undefined) {
        setInternalExpanded(next);
      }

      if (onValueChange) {
        if (type === "single") {
          const first = Array.from(next)[0] || "";
          onValueChange(first);
        } else {
          onValueChange(Array.from(next));
        }
      }
    },
    [disabled, expandedItems, type, controlledValue, onValueChange]
  );

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem, disabled }}>
      <div className={`space-y-3 ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  value: string;
  title: ReactNode;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export function AccordionItem({
  value,
  title,
  disabled = false,
  className = "",
  children,
}: AccordionItemProps) {
  const { expandedItems, toggleItem, disabled: groupDisabled } = useAccordionContext();
  const id = useId();
  const triggerId = `${id}-trigger-${value}`;
  const contentId = `${id}-content-${value}`;

  const isExpanded = expandedItems.has(value);
  const isDisabled = disabled || groupDisabled;

  return (
    <div className={`rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden ${className}`}>
      <h3>
        <button
          type="button"
          id={triggerId}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          disabled={isDisabled}
          onClick={() => toggleItem(value)}
          className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-zinc-100 hover:bg-zinc-800/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none"
        >
          <span>{title}</span>
          <ChevronDown
            className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
              isExpanded ? "rotate-180 text-emerald-400" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>

      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isExpanded}
        className={`px-5 pb-5 pt-1 text-sm text-zinc-300 leading-relaxed ${
          !isExpanded ? "hidden" : "block"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
