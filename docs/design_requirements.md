# Design Requirements & Visual System: "Ocenka Group"

## 1. Design Philosophy
* **Vibe:** Premium, trustworthy, corporate yet modern (Luxury B2B/B2C).
* **Core Principles:** Minimalist, high contrast, clean typography, and intuitive high-conversion UI. 
* **Avoid:** Cluttered layouts, aggressive drop shadows, cheap gradient presets, and overly complex animations that distract from the main CTA.

## 2. Color Palette (CSS Variables)
Use a sophisticated, high-end color palette. *Note: Adjust hex codes if the client has strict brand guidelines.*
* **Primary Background:** `#FAFAFA` (Very light gray, almost white, for a clean look).
* **Secondary Background:** `#1A1A1A` (Deep dark gray for high-contrast footer or premium dark sections).
* **Primary Text:** `#2D2D2D` (Soft black for readability).
* **Secondary Text:** `#666666` (Medium gray for descriptions and subtitles).
* **Accent/CTA Color:** `#C5A880` (Muted luxury gold/champagne) or `#0A2540` (Deep trust blue). Use strictly for conversion elements (Buttons, Quiz highlights).

## 3. Typography
* **Headings (H1, H2, H3):** Use a clean, premium Sans-Serif (e.g., 'Inter', 'Montserrat', or 'Manrope'). Font weights: 600 or 700. Tight tracking (letter-spacing: -0.02em).
* **Body Text (p, span, li):** Use the same font family. Font weight: 400 or 500. Line-height: 1.6 for excellent readability.
* **Hierarchy:** Ensure a strict visual hierarchy. H1 should instantly grab attention; body text should be highly legible.

## 4. UI Components & Geometry
* **Border Radius:** Use subtle rounding for a modern look. `border-radius: 8px` for buttons, `12px` for service cards. Avoid fully pill-shaped buttons unless it's a specific floating action button.
* **Borders:** Use delicate 1px solid borders (`#EAEAEA`) for cards and form inputs to maintain a crisp look. 
* **Glassmorphism (where applicable):** For sticky headers or overlapping cards, use a premium blur effect. [cite_start]Example parameters: `backdrop-filter: blur(12px); background: rgba(255, 255, 255, 0.85); border-bottom: 1px solid rgba(0, 0, 0, 0.05);`.
* **Forms & Inputs (Crucial for n8n Webhooks):** Inputs must look clickable and premium. Height: `48px` or `56px`. Padding: `0 16px`. Focus state must have a clear 2px outline using the Accent Color.

## 5. Micro-Animations & Interactions
* **Hover States (Cards):** Service cards should have a subtle hover effect: `transform: translateY(-4px); transition: all 0.3s ease; box-shadow: 0 12px 24px rgba(0,0,0,0.06);`.
* **Hover States (Buttons):** Buttons should slightly scale up or change opacity. `transform: scale(1.02); transition: transform 0.2s ease;`.
* **Page Load:** Elements should fade in softly (`opacity: 0` to `1`, `transform: translateY(10px)` to `0`).

## 6. Layout & Spacing
* **Mobile-First:** All CSS must be written mobile-first. 
* **Container Width:** Max-width of `1200px` for desktop, with `24px` padding on mobile.
* **Spacing (Gaps/Margins):** Use a strict 8pt grid system (8px, 16px, 24px, 32px, 48px, 64px, 96px) to maintain rhythm and consistency across the entire codebase.