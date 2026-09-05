import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StreamingChat } from '@/components/chat/StreamingChat';

describe('StreamingChat Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders the initial welcome state with suggested prompts', () => {
    render(<StreamingChat />);
    expect(screen.getByText(/Streaming AI Chat Interface/i)).toBeInTheDocument();
    expect(
      screen.getByText(/How do you prevent Cumulative Layout Shift/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ask SMX AI about streaming/i)).toBeInTheDocument();
  });

  it('sends prompt when a suggested prompt button is clicked', async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('data: {"token": "CLS response"}\n\n'));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      body: stream,
    });

    render(<StreamingChat />);
    const promptBtn = screen.getByText(/How do you prevent Cumulative Layout Shift/i);
    fireEvent.click(promptBtn);

    await waitFor(() => {
      expect(screen.getByText(/CLS response/i)).toBeInTheDocument();
    });
  });

  it('disables send button when textarea is empty', () => {
    render(<StreamingChat />);
    const sendBtn = screen.getByTitle('Send message');
    expect(sendBtn).toBeDisabled();
  });

  it('submits text and shows stop button while streaming', async () => {
    const user = userEvent.setup();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('data: {"token": "Tokens streaming"}\n\n'));
      },
    });

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      body: stream,
    });

    render(<StreamingChat />);
    const input = screen.getByPlaceholderText(/Ask SMX AI about streaming/i);
