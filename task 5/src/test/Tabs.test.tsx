import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabList, Tab, TabPanel } from "../components/accessible/Tabs";

describe("Accessible Tabs Component", () => {
  it("renders with correct ARIA roles, attributes, and roving tabindex", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabList aria-label="Settings Categories">
          <Tab value="tab1">Profile</Tab>
          <Tab value="tab2">Security</Tab>
          <Tab value="tab3">Billing</Tab>
        </TabList>
        <TabPanel value="tab1">Profile Settings Content</TabPanel>
        <TabPanel value="tab2">Security Settings Content</TabPanel>
        <TabPanel value="tab3">Billing Settings Content</TabPanel>
      </Tabs>
    );

    const tablist = screen.getByRole("tablist", { name: "Settings Categories" });
    expect(tablist).toBeInTheDocument();

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(3);

    // Profile tab is active
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(tabs[0]).toHaveAttribute("tabindex", "0");
    expect(tabs[1]).toHaveAttribute("aria-selected", "false");
    expect(tabs[1]).toHaveAttribute("tabindex", "-1");

    const activePanel = screen.getByRole("tabpanel");
    expect(activePanel).toHaveTextContent("Profile Settings Content");
    expect(activePanel).toHaveAttribute("aria-labelledby", tabs[0].id);
    expect(tabs[0]).toHaveAttribute("aria-controls", activePanel.id);
  });

  it("navigates tabs using ArrowRight, ArrowLeft, Home, and End keys (automatic activation)", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="tab1" activationMode="automatic">
        <TabList aria-label="Navigation">
          <Tab value="tab1">Tab One</Tab>
          <Tab value="tab2">Tab Two</Tab>
          <Tab value="tab3">Tab Three</Tab>
        </TabList>
        <TabPanel value="tab1">Panel One</TabPanel>
        <TabPanel value="tab2">Panel Two</TabPanel>
        <TabPanel value="tab3">Panel Three</TabPanel>
      </Tabs>
    );

    const tabs = screen.getAllByRole("tab");

    // Focus the first tab
    tabs[0].focus();
    expect(document.activeElement).toBe(tabs[0]);

    // ArrowRight moves focus to Tab 2 and automatically activates it
    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(tabs[1]);
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel Two");

    // ArrowRight again moves to Tab 3
    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(tabs[2]);
    expect(tabs[2]).toHaveAttribute("aria-selected", "true");

    // ArrowRight on last tab wraps around to first tab
    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(tabs[0]);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    // ArrowLeft on first tab wraps backwards to last tab
    await user.keyboard("{ArrowLeft}");
    expect(document.activeElement).toBe(tabs[2]);
    expect(tabs[2]).toHaveAttribute("aria-selected", "true");

    // Home key jumps to first tab
    await user.keyboard("{Home}");
    expect(document.activeElement).toBe(tabs[0]);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    // End key jumps to last tab
    await user.keyboard("{End}");
    expect(document.activeElement).toBe(tabs[2]);
    expect(tabs[2]).toHaveAttribute("aria-selected", "true");
  });

  it("supports manual activation mode with Enter/Space", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="tab1" activationMode="manual">
        <TabList aria-label="Manual Mode">
          <Tab value="tab1">Tab A</Tab>
          <Tab value="tab2">Tab B</Tab>
        </TabList>
        <TabPanel value="tab1">Panel A</TabPanel>
        <TabPanel value="tab2">Panel B</TabPanel>
      </Tabs>
    );
