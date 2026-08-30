"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowLeft,
  Keyboard,
  Info,
  Sliders,
  CheckCircle2,
  ExternalLink,
  Code2,
} from "lucide-react";

// Scratch Accessible Components
import { ModalDialog } from "@/components/accessible/ModalDialog";
import { Tabs as CustomTabs, TabList as CustomTabList, Tab as CustomTab, TabPanel as CustomTabPanel } from "@/components/accessible/Tabs";
import { Disclosure, Accordion, AccordionItem } from "@/components/accessible/Disclosure";

// Shadcn Components (Radix UI)
import {
  Dialog as ShadcnDialog,
  DialogTrigger as ShadcnDialogTrigger,
  DialogContent as ShadcnDialogContent,
  DialogHeader as ShadcnDialogHeader,
  DialogTitle as ShadcnDialogTitle,
  DialogDescription as ShadcnDialogDescription,
  DialogFooter as ShadcnDialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs as ShadcnTabs,
  TabsList as ShadcnTabsList,
  TabsTrigger as ShadcnTabsTrigger,
  TabsContent as ShadcnTabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function PlaygroundPage() {
  // Modal states
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [customAlertDialogOpen, setCustomAlertDialogOpen] = useState(false);
  const [customInitialFocusModalOpen, setCustomInitialFocusModalOpen] = useState(false);
  const [shadcnModalOpen, setShadcnModalOpen] = useState(false);

  const customInputRef = useRef<HTMLInputElement | null>(null);

  // Tabs states
  const [tabActivationMode, setTabActivationMode] = useState<"automatic" | "manual">("automatic");
  const [tabOrientation, setTabOrientation] = useState<"horizontal" | "vertical">("horizontal");

  // Keyboard and Focus telemetry tracker
  const [activeElementInfo, setActiveElementInfo] = useState<{
    tagName: string;
    role: string | null;
    id: string | null;
    ariaLabel: string | null;
    ariaSelected: string | null;
    ariaExpanded: string | null;
  }>({
    tagName: "BODY",
    role: null,
    id: null,
    ariaLabel: null,
    ariaSelected: null,
    ariaExpanded: null,
  });

  const [recentKeys, setRecentKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleFocusChange = () => {
      const el = document.activeElement as HTMLElement | null;
      if (el) {
        setActiveElementInfo({
          tagName: el.tagName,
          role: el.getAttribute("role"),
          id: el.id || null,
          ariaLabel: el.getAttribute("aria-label") || el.getAttribute("aria-labelledby"),
          ariaSelected: el.getAttribute("aria-selected"),
          ariaExpanded: el.getAttribute("aria-expanded"),
        });
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      setRecentKeys((prev) => [e.key, ...prev.slice(0, 7)]);
      // Allow microtask tick for focus to settle
      setTimeout(handleFocusChange, 10);
    };

    document.addEventListener("focusin", handleFocusChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("focusin", handleFocusChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Overview
            </Link>
            <span className="text-zinc-700">|</span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                FE-05
              </span>
              <h1 className="text-sm font-semibold text-zinc-200">
                Accessible Component Playground
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-zinc-400 hidden sm:inline-flex items-center gap-1">
              <Keyboard className="h-3.5 w-3.5 text-emerald-400" />
              Keyboard Navigation Mode Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Real-time Focus & A11y Telemetry HUD */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Live Focus & A11y Telemetry Inspector
                </h2>
              </div>
              <p className="text-xs text-zinc-400">
                Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-[10px]">Tab</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-[10px]">Shift+Tab</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-[10px]">Arrows</kbd>, or <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-[10px]">Escape</kbd> to inspect active ARIA node state.
              </p>
            </div>

            {/* Keys pressed badge strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-[11px] text-zinc-400 mr-1">Recent Keys:</span>
              {recentKeys.length === 0 ? (
                <span className="text-xs text-zinc-400 italic">No keys pressed yet</span>
              ) : (
                recentKeys.map((key, i) => (
                  <kbd
                    key={i}
                    className={`px-2 py-1 rounded text-xs font-mono border transition-all ${
                      i === 0
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold scale-105"
                        : "bg-zinc-800/80 text-zinc-400 border-zinc-700 opacity-70"
                    }`}
                  >
                    {key === " " ? "Space" : key}
                  </kbd>
                ))
              )}
            </div>
          </div>

          {/* Active element node cards */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
            <div className="bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800">
              <span className="text-zinc-400 block text-[10px] uppercase">Active Tag</span>
              <span className="text-emerald-400 font-semibold">{activeElementInfo.tagName}</span>
            </div>
            <div className="bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800">
              <span className="text-zinc-400 block text-[10px] uppercase">Role</span>
              <span className="text-zinc-200">{activeElementInfo.role || "none / native"}</span>
            </div>
            <div className="bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800 truncate">
              <span className="text-zinc-400 block text-[10px] uppercase">Element ID</span>
              <span className="text-zinc-200" title={activeElementInfo.id || "none"}>{activeElementInfo.id || "none"}</span>
            </div>
            <div className="bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800">
              <span className="text-zinc-400 block text-[10px] uppercase">aria-selected</span>
              <span className="text-zinc-200">{activeElementInfo.ariaSelected || "n/a"}</span>
            </div>
            <div className="bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800">
              <span className="text-zinc-400 block text-[10px] uppercase">aria-expanded</span>
              <span className="text-zinc-200">{activeElementInfo.ariaExpanded || "n/a"}</span>
            </div>
            <div className="bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800 truncate">
              <span className="text-zinc-400 block text-[10px] uppercase">aria-label(ledby)</span>
              <span className="text-zinc-200" title={activeElementInfo.ariaLabel || "none"}>{activeElementInfo.ariaLabel || "none"}</span>
            </div>
          </div>
        </section>

        {/* Component 1: Modal Dialog Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <h2 className="text-xl font-semibold text-zinc-100">
                  Modal Dialog Pattern (W3C WAI-ARIA APG)
                </h2>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Full focus trapping (Tab/Shift+Tab wrap), trigger focus restoration on close, Escape key listener, scroll lock, and portal rendering.
              </p>
            </div>
            <span className="text-xs font-mono bg-zinc-800 px-2.5 py-1 rounded-md text-zinc-300 border border-zinc-700">
              role="dialog" | aria-modal="true"
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Custom Modal */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="h-3.5 w-3.5" /> Hand-Built Scratch Component
                  </span>
                  <span className="text-xs text-zinc-400">Zero Dependencies</span>
                </div>
                <h3 className="text-base font-medium text-zinc-200">Custom Accessible Modal Dialog</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Demonstrates programmatic focus cycle, activeElement preservation, and background scroll locking. Test by tabbing through all fields and verifying focus does not escape into the page.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => setCustomModalOpen(true)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold"
                >
                  Open Standard Dialog
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setCustomInitialFocusModalOpen(true)}
                  className="text-xs"
                >
                  Open with Initial Focus on Input
                </Button>
              </div>
            </div>

            {/* Shadcn / Radix Modal */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Sparkles className="h-3.5 w-3.5" /> Shadcn / Radix UI Primitive
                  </span>
                  <span className="text-xs text-zinc-400">@radix-ui/react-dialog</span>
                </div>
                <h3 className="text-base font-medium text-zinc-200">Shadcn Reference Dialog</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Utilizes Radix focus guards, layered dismissable stack, and CSS animation synchronization with data-state.
                </p>
              </div>

              <div>
                <ShadcnDialog open={shadcnModalOpen} onOpenChange={setShadcnModalOpen}>
                  <ShadcnDialogTrigger asChild>
                    <Button variant="secondary">Open Shadcn Dialog</Button>
                  </ShadcnDialogTrigger>
                  <ShadcnDialogContent>
                    <ShadcnDialogHeader>
                      <ShadcnDialogTitle>Edit User Profile</ShadcnDialogTitle>
                      <ShadcnDialogDescription>
                        Make changes to your profile here. Click save when you're done.
                      </ShadcnDialogDescription>
                    </ShadcnDialogHeader>
                    <div className="grid gap-4 py-4 text-sm">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="shadcn-name" className="text-right text-zinc-400">
                          Name
                        </label>
                        <input
                          id="shadcn-name"
                          defaultValue="Muhammad Umer"
                          className="col-span-3 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="shadcn-username" className="text-right text-zinc-400">
                          Username
                        </label>
                        <input
                          id="shadcn-username"
                          defaultValue="@umer"
                          className="col-span-3 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <ShadcnDialogFooter>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setShadcnModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setShadcnModalOpen(false)}
                      >
                        Save changes
                      </Button>
                    </ShadcnDialogFooter>
                  </ShadcnDialogContent>
                </ShadcnDialog>
              </div>
            </div>
          </div>
        </section>

        {/* Component 2: Tabs Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-3 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <h2 className="text-xl font-semibold text-zinc-100">
                  Tabs Pattern (W3C WAI-ARIA APG)
                </h2>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Roving tabIndex (0 for selected, -1 for inactive), ArrowLeft / ArrowRight / Home / End navigation, and automatic vs manual selection.
              </p>
            </div>

            {/* Interactive Tab Mode Controls */}
            <div className="flex items-center gap-3 bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 text-xs">
              <label className="flex items-center gap-1.5 text-zinc-400">
                <Sliders className="h-3.5 w-3.5" /> Activation:
                <select
                  value={tabActivationMode}
                  onChange={(e) => setTabActivationMode(e.target.value as "automatic" | "manual")}
                  className="bg-zinc-950 border border-zinc-700 text-zinc-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="automatic">Automatic (Arrow keys activate)</option>
                  <option value="manual">Manual (Enter / Space activates)</option>
                </select>
              </label>

              <label className="flex items-center gap-1.5 text-zinc-400">
                Orientation:
                <select
                  value={tabOrientation}
                  onChange={(e) => setTabOrientation(e.target.value as "horizontal" | "vertical")}
                  className="bg-zinc-950 border border-zinc-700 text-zinc-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                </select>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Custom Accessible Tabs */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="h-3.5 w-3.5" /> Hand-Built Scratch Tabs
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  role="tablist"
                </span>
              </div>

              <CustomTabs
                defaultValue="overview"
                orientation={tabOrientation}
                activationMode={tabActivationMode}
              >
                <CustomTabList aria-label="Project Management Tabs">
                  <CustomTab value="overview">Overview</CustomTab>
                  <CustomTab value="accessibility">Accessibility Specs</CustomTab>
                  <CustomTab value="keyboard">Keyboard Shortcuts</CustomTab>
                </CustomTabList>

                <CustomTabPanel value="overview">
                  <h4 className="font-semibold text-zinc-100 text-base mb-2">Overview Tab Content</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    This custom component manages focus using roving tabindex. When this panel is active, the tab trigger has <code className="text-emerald-400">tabIndex=0</code> while sibling tabs have <code className="text-emerald-400">tabIndex=-1</code>.
                  </p>
                </CustomTabPanel>

                <CustomTabPanel value="accessibility">
                  <h4 className="font-semibold text-zinc-100 text-base mb-2">Accessibility Specs</h4>
                  <ul className="text-xs text-zinc-400 space-y-1.5 list-disc pl-4">
                    <li><code className="text-emerald-400">role="tablist"</code> contains all tab triggers.</li>
                    <li><code className="text-emerald-400">role="tab"</code> declares <code className="text-emerald-400">aria-selected</code> and <code className="text-emerald-400">aria-controls</code>.</li>
                    <li><code className="text-emerald-400">role="tabpanel"</code> links via <code className="text-emerald-400">aria-labelledby</code>.</li>
                  </ul>
                </CustomTabPanel>

                <CustomTabPanel value="keyboard">
                  <h4 className="font-semibold text-zinc-100 text-base mb-2">Keyboard Interactions</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
                    <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                      <span className="font-mono text-emerald-400 font-semibold">Left / Right Arrow</span>: Move focus
                    </div>
                    <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                      <span className="font-mono text-emerald-400 font-semibold">Home / End</span>: Jump to first / last
                    </div>
                  </div>
                </CustomTabPanel>
              </CustomTabs>
            </div>

            {/* Shadcn Reference Tabs */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Sparkles className="h-3.5 w-3.5" /> Shadcn / Radix Tabs
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  @radix-ui/react-tabs
                </span>
              </div>

              <ShadcnTabs defaultValue="account">
                <ShadcnTabsList className="grid w-full grid-cols-3">
                  <ShadcnTabsTrigger value="account">Account</ShadcnTabsTrigger>
                  <ShadcnTabsTrigger value="password">Password</ShadcnTabsTrigger>
                  <ShadcnTabsTrigger value="team">Team</ShadcnTabsTrigger>
                </ShadcnTabsList>

                <ShadcnTabsContent value="account">
                  <h4 className="font-semibold text-zinc-100 text-base mb-2">Account Configuration</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Powered by Radix Tabs primitives. Automatically supports RTL (Right-to-Left) directional orientation, slot merging, and controlled state binding.
                  </p>
                </ShadcnTabsContent>

                <ShadcnTabsContent value="password">
                  <h4 className="font-semibold text-zinc-100 text-base mb-2">Security & Password</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Change your password and manage two-factor authentication devices.
                  </p>
                </ShadcnTabsContent>

                <ShadcnTabsContent value="team">
                  <h4 className="font-semibold text-zinc-100 text-base mb-2">Team Members</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Invite new collaborators and manage workspace permissions.
                  </p>
                </ShadcnTabsContent>
              </ShadcnTabs>
            </div>
          </div>
        </section>

        {/* Component 3: Disclosure & Accordion Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <h2 className="text-xl font-semibold text-zinc-100">
                  Disclosure & Accordion Pattern (W3C WAI-ARIA APG)
                </h2>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Semantic button trigger with aria-expanded, aria-controls, role="region" linked via aria-labelledby, and Space / Enter toggle interaction.
              </p>
            </div>
            <span className="text-xs font-mono bg-zinc-800 px-2.5 py-1 rounded-md text-zinc-300 border border-zinc-700">
              aria-expanded | role="region"
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Standalone Disclosures */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="h-3.5 w-3.5" /> Standalone Disclosures
                </span>
                <span className="text-xs text-zinc-400">Independent state</span>
              </div>

              <div className="space-y-3">
                <Disclosure title="What is the difference between aria-expanded and hidden?" defaultOpen={true}>
                  <p className="text-xs text-zinc-300">
                    <code className="text-emerald-400">aria-expanded="true|false"</code> communicates whether the collapsible content is currently visible to assistive technology. When collapsed, the panel also sets <code className="text-emerald-400">hidden</code> to prevent keyboard navigation or screen reader virtual cursor traversal into hidden content.
                  </p>
                </Disclosure>

                <Disclosure title="Why should accordion headers use an explicit <h3> or heading tag?">
                  <p className="text-xs text-zinc-300">
                    Wrapping disclosure buttons in heading levels allows screen reader users to jump between sections using heading navigation keys (e.g. pressing 'H' in NVDA/JAWS/VoiceOver).
                  </p>
                </Disclosure>
              </div>
            </div>

            {/* Multi-Item Grouped Accordion */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="h-3.5 w-3.5" /> Grouped Single-Select Accordion
                </span>
                <span className="text-xs text-zinc-400">type="single"</span>
              </div>

              <Accordion type="single" defaultValue="item-1">
                <AccordionItem value="item-1" title="1. Focus Management Standards">
                  <p className="text-xs text-zinc-300">
                    Modals must trap focus while active and restore it to the trigger element when dismissed.
                  </p>
                </AccordionItem>

                <AccordionItem value="item-2" title="2. Keyboard Navigation Protocols">
                  <p className="text-xs text-zinc-300">
                    Tabs require Arrow key roving tabindex so Tab moves out of the tablist into the tabpanel.
                  </p>
                </AccordionItem>

                <AccordionItem value="item-3" title="3. TypeScript Strict Typings">
                  <p className="text-xs text-zinc-300">
                    All components are strictly typed with zero <code className="text-emerald-400">any</code> escapes.
                  </p>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Custom Modals Rendered */}
        <ModalDialog
          isOpen={customModalOpen}
          onClose={() => setCustomModalOpen(false)}
          title="Account Security Verification"
          description="Please verify your two-factor authentication key or manage credentials."
        >
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label htmlFor="auth-code" className="text-xs font-medium text-zinc-300">
                Authentication Code
              </label>
              <input
                id="auth-code"
                placeholder="6-digit code (e.g. 123456)"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <Button
                variant="ghost"
                type="button"
                onClick={() => setCustomModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => setCustomModalOpen(false)}
                className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold"
              >
                Verify & Continue
              </Button>
            </div>
          </div>
        </ModalDialog>

        <ModalDialog
          isOpen={customInitialFocusModalOpen}
          onClose={() => setCustomInitialFocusModalOpen(false)}
          title="Custom Initial Focus Target"
          description="Focus lands directly on the second input field via initialFocusRef."
          initialFocusRef={customInputRef}
        >
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label htmlFor="first-field" className="text-xs font-medium text-zinc-300">
                First Field (Skipped initially)
              </label>
              <input
                id="first-field"
                placeholder="First input"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="target-field" className="text-xs font-medium text-emerald-400">
                Target Field (Received initial focus directly)
              </label>
              <input
                ref={customInputRef}
                id="target-field"
                placeholder="Directly focused on open"
                className="w-full rounded-lg border border-emerald-500/50 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex justify-end pt-2 border-t border-zinc-800">
              <Button
                type="button"
                onClick={() => setCustomInitialFocusModalOpen(false)}
              >
                Done
              </Button>
            </div>
          </div>
        </ModalDialog>

      </main>
    </div>
  );
}
