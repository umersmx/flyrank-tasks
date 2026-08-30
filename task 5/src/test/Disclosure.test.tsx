import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Disclosure, Accordion, AccordionItem } from "../components/accessible/Disclosure";

describe("Accessible Disclosure & Accordion Component", () => {
  it("renders disclosure trigger with correct aria-expanded and controls", () => {
    render(
      <Disclosure title="What is WAI-ARIA?">
        <p>WAI-ARIA provides accessible rich internet applications specifications.</p>
      </Disclosure>
    );

    const button = screen.getByRole("button", { name: /What is WAI-ARIA\?/i });
    expect(button).toHaveAttribute("aria-expanded", "false");

    const content = screen.getByRole("region", { hidden: true });
    expect(button).toHaveAttribute("aria-controls", content.id);
    expect(content).toHaveAttribute("aria-labelledby", button.id);
    expect(content).toHaveAttribute("hidden");
  });

  it("toggles disclosure with click and keyboard (Enter/Space)", async () => {
    const user = userEvent.setup();

    render(
      <Disclosure title="Toggle Me">
        <p>Revealed details</p>
      </Disclosure>
    );

    const button = screen.getByRole("button", { name: /Toggle Me/i });

    // Click to open
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region")).not.toHaveAttribute("hidden");
    expect(screen.getByText("Revealed details")).toBeVisible();

    // Click to close
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");

    // Keyboard Space to open
    button.focus();
    await user.keyboard(" ");
    expect(button).toHaveAttribute("aria-expanded", "true");

    // Keyboard Enter to close
    await user.keyboard("{Enter}");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("manages single accordion item expansion correctly", async () => {
    const user = userEvent.setup();

    render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1" title="Section 1">
          <p>Section 1 Content</p>
        </AccordionItem>
        <AccordionItem value="item-2" title="Section 2">
          <p>Section 2 Content</p>
        </AccordionItem>
      </Accordion>
