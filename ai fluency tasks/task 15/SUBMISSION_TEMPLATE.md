# Submissions for Task 15: Explain It Like You Built It

This document contains copy-paste-ready submission content for the FlyRank portal submission modal for **Task 15: Explain It Like You Built It** (`Week 5 | Phase: Build`).

---

### Deliverable links:
```text
https://github.com/umersmx/flyrank-tasks/blob/main/ai%20fluency%20tasks/task%2015/EXPLAIN_IT_LIKE_YOU_BUILT_IT.md
https://smxai-flyrank.vercel.app/
```

*(Note: One URL per line as required by portal guidelines)*

---

### Notes:
```text
Task 15 — Explain It Like You Built It (General AI Fluency | Week 5 | Phase: Build)

1. Real Piece of Build Chosen:
- The Smart Auto-Scroll Pinning & "60-Pixel Leash" Viewport Physics in our Streaming AI Chat Interface (located at task 6/src/components/chat/StreamingChat.tsx).

2. Plain-English Explanation ("The Cash Register Receipt & The Window"):
- Imagine the conversation is a long roll of paper receipt (scrollHeight). Your screen is a little glass window you look through (clientHeight). When you roll the paper up, that distance is scrollTop.
- The Naive AI Way: Every time a new token arrives (40 times/sec), it forces the screen to the bottom. If the user scrolls up to read or copy a code block, the page violently jerks their mouse back down.
- Our Math Solution: distance = scrollHeight - scrollTop - clientHeight.
- If distance <= 60px: You are within a finger-flick of the bottom. The system stays pinned and follows new words.
- If distance > 60px: The "leash snaps." The auto-scroll turns off completely so you can read in peace without the page twitching.
- Floating Beacon: When unpinned, a pill button appears ("↓ New messages below (X tokens)") allowing a 1-click smooth glide back to the live stream.
