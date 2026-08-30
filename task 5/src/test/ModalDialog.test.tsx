import React, { useState, useRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModalDialog } from "../components/accessible/ModalDialog";

describe("Accessible ModalDialog Component", () => {
  it("renders with correct ARIA roles and attributes when open", () => {
    render(
      <ModalDialog
        isOpen={true}
        onClose={() => {}}
        title="Account Settings"
        description="Manage your profile and privacy preferences."
      >
        <p>Dialog Body Content</p>
      </ModalDialog>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");

    const title = screen.getByRole("heading", { name: "Account Settings" });
    expect(title).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-labelledby", title.id);

    const description = screen.getByText("Manage your profile and privacy preferences.");
    expect(dialog).toHaveAttribute("aria-describedby", description.id);
  });

  it("does not render when isOpen is false", () => {
    render(
      <ModalDialog
        isOpen={false}
        onClose={() => {}}
        title="Hidden Dialog"
      >
        <p>Hidden Content</p>
      </ModalDialog>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose when Escape key is pressed", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <ModalDialog
        isOpen={true}
        onClose={handleClose}
        title="Escape Test"
      >
        <button type="button">Action Button</button>
      </ModalDialog>
    );

    await user.keyboard("{Escape}");
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("traps focus and cycles through focusable elements on Tab and Shift+Tab", async () => {
    const user = userEvent.setup();

    render(
      <ModalDialog
        isOpen={true}
        onClose={() => {}}
        title="Focus Trap Test"
      >
        <input data-testid="input-1" placeholder="First Field" />
        <input data-testid="input-2" placeholder="Second Field" />
        <button type="button" data-testid="submit-btn">Save</button>
      </ModalDialog>
    );

    const closeBtn = screen.getByRole("button", { name: "Close dialog" });
    const input1 = screen.getByTestId("input-1");
    const input2 = screen.getByTestId("input-2");
    const submitBtn = screen.getByTestId("submit-btn");

    // Initial focus lands on the first focusable element (close button)
    expect(document.activeElement).toBe(closeBtn);

    // Tab moves to input 1
    await user.tab();
    expect(document.activeElement).toBe(input1);

    // Tab moves to input 2
    await user.tab();
    expect(document.activeElement).toBe(input2);

    // Tab moves to submit button (last element)
    await user.tab();
    expect(document.activeElement).toBe(submitBtn);

    // Tab on last element wraps back to first element (close button)
    await user.tab();
    expect(document.activeElement).toBe(closeBtn);

    // Shift+Tab on first element wraps backwards to last element (submit button)
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(submitBtn);
  });

  it("restores focus to trigger element when closed", async () => {
    const user = userEvent.setup();

    function TestComponent() {
      const [open, setOpen] = useState(false);
      return (
        <div>
          <button data-testid="trigger-btn" onClick={() => setOpen(true)}>
            Open Modal
          </button>
          <ModalDialog isOpen={open} onClose={() => setOpen(false)} title="Restoration Modal">
            <button data-testid="inside-btn" onClick={() => setOpen(false)}>
              Close from inside
            </button>
          </ModalDialog>
        </div>
      );
    }

    render(<TestComponent />);

    const triggerBtn = screen.getByTestId("trigger-btn");
    triggerBtn.focus();
    expect(document.activeElement).toBe(triggerBtn);

    // Open modal
    await user.click(triggerBtn);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Close modal
    const insideBtn = screen.getByTestId("inside-btn");
    await user.click(insideBtn);

    // Dialog is closed and focus returns to trigger
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(triggerBtn);
  });
});
