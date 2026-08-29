"use client";

import React, {
  createContext,
  useContext,
  useId,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";

// --- Types ---
export type TabOrientation = "horizontal" | "vertical";
export type TabActivationMode = "automatic" | "manual";

export interface TabsContextValue {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  orientation: TabOrientation;
  activationMode: TabActivationMode;
  baseId: string;
  registerTab: (value: string, element: HTMLButtonElement | null) => void;
  unregisterTab: (value: string) => void;
  getTabId: (value: string) => string;
  getPanelId: (value: string) => string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs compound components must be rendered within a <Tabs> parent.");
  }
  return context;
}

// --- Tabs Root Component ---
export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: TabOrientation;
  activationMode?: TabActivationMode;
  className?: string;
  children: ReactNode;
}

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  orientation = "horizontal",
  activationMode = "automatic",
  className = "",
  children,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState<string>(defaultValue || "");
  const baseId = useId();
  const tabsRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  const selectedValue = value !== undefined ? value : internalValue;

  const setSelectedValue = useCallback(
    (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [value, onValueChange]
  );

  const registerTab = useCallback((tabValue: string, element: HTMLButtonElement | null) => {
    if (element) {
      tabsRef.current.set(tabValue, element);
    } else {
      tabsRef.current.delete(tabValue);
    }
  }, []);

  const unregisterTab = useCallback((tabValue: string) => {
    tabsRef.current.delete(tabValue);
  }, []);

  const getTabId = useCallback((tabValue: string) => `${baseId}-tab-${tabValue}`, [baseId]);
  const getPanelId = useCallback((tabValue: string) => `${baseId}-panel-${tabValue}`, [baseId]);

  return (
    <TabsContext.Provider
      value={{
        selectedValue,
        setSelectedValue,
        orientation,
        activationMode,
        baseId,
        registerTab,
        unregisterTab,
        getTabId,
        getPanelId,
      }}
    >
      <div
        className={`flex ${
          orientation === "vertical" ? "flex-row gap-6" : "flex-col gap-4"
        } ${className}`}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// --- TabList Component ---
export interface TabListProps {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
  children: ReactNode;
}

export function TabList({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className = "",
  children,
}: TabListProps) {
  const { orientation, activationMode, setSelectedValue } = useTabsContext();
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!listRef.current) return;

    const tabs = Array.from(
      listRef.current.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
    );
    if (tabs.length === 0) return;

    const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex: number | null = null;
    const isHorizontal = orientation === "horizontal";

    switch (event.key) {
      case isHorizontal ? "ArrowRight" : "ArrowDown":
        event.preventDefault();
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case isHorizontal ? "ArrowLeft" : "ArrowUp":
        event.preventDefault();
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = tabs.length - 1;
        break;
      default:
        break;
    }

    if (nextIndex !== null) {
      const nextTab = tabs[nextIndex];
      nextTab.focus();

      if (activationMode === "automatic") {
        const tabValue = nextTab.getAttribute("data-value");
        if (tabValue) {
          setSelectedValue(tabValue);
        }
      }
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
      className={`inline-flex items-center rounded-xl bg-zinc-900/80 p-1 border border-zinc-800 text-zinc-400 ${
        orientation === "vertical" ? "flex-col items-stretch" : "flex-row"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// --- Tab Trigger Component ---
export interface TabProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export function Tab({ value, disabled = false, className = "", children }: TabProps) {
  const {
    selectedValue,
    setSelectedValue,
    activationMode,
    getTabId,
    getPanelId,
    registerTab,
  } = useTabsContext();

  const isSelected = selectedValue === value;
  const tabId = getTabId(value);
