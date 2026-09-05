/**
 * Realistic Mock Token Generator for Zero-API-Key Review & Testing.
 * 
 * Provides authentic, progressive token streaming with jittered intervals
 * (15ms - 35ms) so reviewers can test:
 * - Visible token-by-token emission
 * - Mid-stream stopping and state persistence
 * - Multi-turn conversational memory
 * - Thinking indicator handoff
 */

interface MockMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function getMockResponseText(userPrompt: string, historyLength: number): string {
  const promptLower = userPrompt.toLowerCase();

  if (promptLower.includes('layout shift') || promptLower.includes('cls')) {
    return `In generative streaming UI, **Cumulative Layout Shift (CLS)** is the #1 visual defect. When LLM tokens stream in unpredictably, containers without locked geometric bounds constantly expand and push downstream content down.

Here is how we tame it in SMX AI:
1. **Deterministic Skeletons**: Predict the expected payload shape from schema metadata and pre-allocate fixed min-height container boxes.
2. **50ms Animation Frame Throttling**: Rather than re-rendering on every single SSE character, buffer token chunks to sync with browser refresh cycles.
3. **Hardware-Accelerated Height Transitions**: Use CSS \`contain: layout size\` to isolate DOM reflows strictly to the generating card.

\`\`\`tsx
export function BoundedStreamCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[160px] contain-layout transition-all duration-200 ease-out">
      {children}
    </div>
  );
}
\`\`\`

Would you like to test an intentional mid-stream drop to inspect the error boundary fallback?`;
  }

  if (promptLower.includes('stop') || promptLower.includes('abort')) {
    return `The stop button is fundamentally a **state problem, not a UI toggle**. 

When you hit stop:
- The \`AbortController\` signals the server stream to disconnect immediately.
- The partial assistant message is committed to local history rather than discarded.
- The input textarea instantly re-enables and regains focus.
- Your next prompt sends both the full prior history AND the partial response, preserving conversational continuity without memory corruption.`;
  }

  if (promptLower.includes('react 19') || promptLower.includes('next.js')) {
    return `React 19 introduces major upgrades for AI-driven interfaces:
- **Actions & \`useActionState\`**: Native asynchronous transitions that manage pending states without custom \`isSubmitting\` boilerplate.
- **Server Components & Server Actions**: Zero client bundle overhead for server-side secret handling (\`ANTHROPIC_API_KEY\`).
- **Optimistic UI with \`useOptimistic\`**: Display user messages instantly in the chat timeline while the network handshake establishes the SSE pipeline.

What part of the streaming lifecycle would you like to drill into next?`;
  }

  // Multi-turn context recognition
  if (historyLength > 2) {
    return `Building on our earlier context (Turn #${Math.floor(historyLength / 2) + 1}):

I've registered your question: "${userPrompt.slice(0, 60)}${userPrompt.length > 60 ? '...' : ''}".

In production frontend engineering, maintaining dependable streaming UX requires:
- **Screen Reader Announcements**: Using \`role="status"\` and \`aria-live="polite"\` throttled to sentence boundaries so VoiceOver doesn't flood the user with 80 announcements per second.
- **Auto-scroll Pinning**: Only lock to the viewport bottom if the user hasn't scrolled up to review earlier code snippets.

Hit **Stop Generating** to test our abort resilience, or send another follow-up!`;
  }

  // General default response
  return `Hello! I'm **SMX AI**, your Frontend AI Engineering assistant.

I'm configured with **Claude 3.5 Sonnet** standards to demonstrate production-ready streaming chat interfaces:
- ⚡ **Token-by-Token Streaming**: Watch words emit live with zero layout snapping.
- 🛑 **Resilient Abort Control**: Hit "Stop Generating" at any moment; your partial text will persist and the input will immediately re-enable.
- 📜 **Smart Viewport Pinning**: Scroll up right now while I'm generating—I will release the bottom pin and display a "Jump to latest ↓" button.
- 💾 **Local Persistence**: Refresh this page mid-conversation; your conversation state survives cleanly in \`localStorage\`.

Ask me about **Cumulative Layout Shift**, **React 19 streaming architecture**, or **WCAG 2.1 AA accessibility**!`;
}

/**
 * Creates a ReadableStream yielding SSE chunks with realistic delays.
 */
export function createMockSSEStream(responseText: string, signal?: AbortSignal): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  // Split into natural token-like chunks (words + punctuation)
  const tokens = responseText.match(/(\s+|\S+)/g) || [responseText];

  return new ReadableStream({
    async start(controller) {
      for (let i = 0; i < tokens.length; i++) {
        if (signal?.aborted) {
          controller.close();
          return;
        }

        const token = tokens[i];
        // SSE format: data: {"token": "..."}\n\n
        const payload = `data: ${JSON.stringify({ token, index: i })}\n\n`;
        controller.enqueue(encoder.encode(payload));

        // Jittered delay between 15ms and 35ms to simulate realistic neural inference
        const delay = Math.floor(Math.random() * 20) + 15;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      // Final SSE end event
      controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
      controller.close();
    },
  });
}
