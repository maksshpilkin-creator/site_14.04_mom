# Master Instructions: "Ocenka Group" Website Redesign

## 1. Project Context & Current State
* **Current Phase:** Initialization & Core Structure Setup.
* **Goal:** Rebuild the "Ocenka Group" website into a premium, high-conversion landing page featuring an interactive valuation quiz and n8n webhook automation.
* **Tech Stack:** HTML, CSS (Vanilla or lightweight framework), JS, n8n (Webhooks).

## 2. Documentation Architecture (Source of Truth)
Agent, you MUST read and apply the constraints from these files before making any architectural, design, or copywriting decisions:
* `docs/PRD.md`: Core features, functional requirements, and conversion logic.
* `docs/design_requirements.md`: Visual system, color palette, spacing (8pt grid), and micro-animations.
* `docs/ICP.md`: Target audience pain points and copywriting tone.

## 3. Agent Execution Rules (Strict Compliance Required)
1. **Plan First:** Always use "Plan Mode" to propose file structure and architecture before generating any code.
2. **Iterative Workflow:** Do not generate the entire website in one massive output. Work in small, verifiable steps (e.g., 1. File structure -> 2. CSS variables -> 3. Hero Section -> 4. Quiz Logic).
3. **Zero-Entropy Edits:** Make predictable, deterministic code changes that strictly adhere to the `design_requirements.md`.
4. **Form & Automation Readiness:** All `<form>` elements and the interactive Quiz must be structured cleanly with proper `id` and `name` attributes to easily send POST requests to an external n8n webhook URL.
5. **No AI Cliches:** Strictly avoid words like "seamless", "performant", or "mission-critical" in code comments, commit messages, and UI text.
6. **Language:** Keep all internal code comments, system logic, and variables in English to optimize token usage. The final UI text visible to the user will be in Russian.