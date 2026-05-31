---
name: explain-visually
description: >
  Generates a self-contained, interactive HTML page that explains any concept, system, problem, or
  architecture visually — with clickable elements, hover effects, animated diagrams, and plain-language
  descriptions that anyone can follow. Use this skill whenever the user wants to understand or explain
  something visually, says things like "explain X visually", "make an interactive diagram of X",
  "help me visualize how X works", "create a visual explanation", "draw how this fits together",
  "show me / show them how X works", or just describes a system and seems to want insight rather than
  code. Also trigger when someone shares a complex document, codebase, or architecture and wants
  a high-level picture. When in doubt, trigger — a rich HTML page is almost always more helpful
  than a wall of text.
---

# explain-visually

Your job is to produce a **single, self-contained HTML file** that makes the user's topic click — for
them, for their team, or for anyone who opens it. Think of it as an interactive explainer poster that
lives in a browser.

## Understanding the topic first

Before writing any HTML, make sure you actually understand what you're explaining:

- If the user gave you code, a document, or an architecture description, read it carefully.
- If the topic is ambiguous, ask one focused question to clarify scope (e.g., "Should this focus on
  the happy-path flow, or also show error cases?").
- If the concept is well-known (OAuth, TCP/IP, React rendering, etc.), you can proceed without
  asking — you already know it.

The HTML should reflect **accurate** understanding, not a generic template.

## What the HTML page must do

### Explain like a kid, but don't dumb it down

Use plain words. Avoid jargon unless you also explain it on hover or click. The goal is that someone
who has never heard of this topic can look at the page for 2 minutes and walk away with a real mental
model. Think: "if I had to explain this to a smart 12-year-old, what would I say?"

### Show relationships visually

Every page needs at least one visual that shows how pieces connect. Choose the right shape for the topic:

- **Flow / sequence** → boxes with arrows (steps, pipelines, request/response)
- **Hierarchy** → tree layout (file systems, org charts, class hierarchies)
- **Network / graph** → nodes and edges (microservices, dependencies, concepts)
- **State machine** → circles with labeled transitions
- **Timeline** → horizontal strip with events
- **Layers / stack** → stacked blocks (OSI model, software stack)

Use SVG, CSS, or a small canvas drawing — whatever produces the cleanest result inline. No external
libraries unless they're loaded from a CDN (and even then, prefer pure CSS/JS to keep the file portable).

### Make it interactive — not just pretty

Interactivity is what separates this from a static diagram. Every page should have at least 3 of these:

- **Click to expand** — clicking a node/box reveals a deeper explanation in plain language
- **Hover tooltips** — mousing over a term shows a one-sentence definition
- **Step-through animation** — a "Next step →" button walks through a process one stage at a time
- **Toggle views** — switch between "simple" and "detailed" mode
- **Highlight on click** — clicking a node highlights all its connections
- **Search / filter** — typing filters which concepts are shown

Don't add all of them to every page — pick the ones that make sense for the topic. The rule is: the
user should be able to *do something* that makes the concept clearer than just reading would.

### Visual design

- Clean, modern look. White or very light background, generous whitespace.
- Use color purposefully: one accent color for "active / selected", a neutral palette for everything
  else. Don't use more than 3–4 colors total.
- SVG arrows should be actual arrows (marker-end), not dashes.
- Text must be readable: minimum 14px, good contrast.
- The page should look good at 1280px wide without scrolling for the main diagram. Add scroll only
  for secondary detail panels.
- Add a clear title and a 1–2 sentence summary at the top of the page.

## File output

1. Write the file to `/tmp/explain-<slug>.html` where `<slug>` is a 2–3 word kebab-case summary of
   the topic (e.g., `explain-oauth-flow.html`, `explain-kafka-topics.html`).
2. Open it in the default browser: `xdg-open /tmp/explain-<slug>.html` (Linux) or
   `open /tmp/explain-<slug>.html` (macOS). Detect the OS with `uname` if unsure.
3. Tell the user where the file is saved so they can share it.

## Structure of the HTML

There is no rigid template — the layout should fit the topic. But every page should have:

```
[Title + one-line summary]
[Main visual / diagram — takes up most of the viewport]
[Detail panel — appears when user clicks something in the diagram]
[Optional: step-through controls if it's a process]
[Footer: "Click anything to explore" or similar hint]
```

Keep all CSS and JS inline in the `<style>` and `<script>` tags. No external files.

## Common mistakes to avoid

- **Walls of text.** If a section has more than 3 sentences, it probably belongs in a click-to-reveal
  detail panel, not in the main view.
- **Generic boxes.** "Service A → Service B" diagrams that could apply to anything. Use real names,
  real data, real examples from the user's topic.
- **Static diagrams.** A diagram with no interaction is just a picture. Add at least one click behavior.
- **Wrong abstraction level.** If the user said "explain how TCP/IP works", they want the concept,
  not a byte-level breakdown of packet headers. Match the depth to what they asked.
- **Forgetting mobile.** Add `viewport` meta tag and make sure the page doesn't break at 375px even
  if you optimize for desktop.
