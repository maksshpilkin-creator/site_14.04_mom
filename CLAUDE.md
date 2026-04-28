# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Ocenka Group" (Оценка Групп) is a Russian federal valuation company providing property, business, and asset valuation reports for banks, courts, notaries, and corporate clients. The website is a premium B2B/B2C landing page focused on lead generation through an interactive cost estimation quiz.

**Tech Stack:** HTML, Vanilla CSS, Vanilla JS, deployed to Netlify, automated via n8n webhooks → Google Sheets → Telegram.

## Architecture

### Core Structure

```
site_for_mom/
├── index.html              # Homepage with quiz and main conversion funnel
├── assets/
│   ├── css/styles.css      # All CSS in single file with CSS variables
│   └── js/site.js          # All JS in single file (quiz, forms, UI)
├── files/                  # Static assets (images, PDFs, certificates)
├── docs/                   # Source of truth for requirements
├── about/                  # Company page
├── contacts/               # Contact page
├── documents/              # Certificates and document samples
├── reviews/                # Client testimonials
└── cases/                  # Case studies
```

### Key JavaScript Modules (assets/js/site.js)

- **Config:** `SITE_CONFIG` (webhook URL, contact info, legal details), `NAV_ITEMS`, `QUIZ_RULES`
- **Shell Rendering:** `createHeader()`, `createFooter()`, `mountShell()` - dynamically injects header/footer
- **Quiz System:** `setupQuiz()` - 3-step valuation estimator with price/timeline/doc recommendations
- **Form Handling:** `setupForms()` - validation, submission to n8n webhook
- **UI Components:** Navigation toggle, scroll header, reveal animations, stats counter, process step sequence, phone input formatting, FAQ accordion, document preview lightbox, floating CTA bar

### CSS Architecture (assets/css/styles.css)

Uses CSS custom properties for a consistent design system:
- Colors: `--bg`, `--surface`, `--text`, `--accent` (#B68A45), etc.
- Spacing: 8pt grid system (8, 16, 24, 32, 48, 64, 96px)
- Typography: Raleway font family for headings and body
- Containers: `--container: 1200px`, `--header-height: 62px`
- Shadows and glassmorphism variables

## Development Commands

This project has no build step or package manager. It's a static site.

**Local development:**
- Use any static file server (e.g., `npx serve`, Python's `http.server`, VS Code Live Server)
- Simply open `index.html` in browser for quick preview

**Deployment:**
- Deploy to Netlify by connecting the repository
- No build configuration needed

## Before Starting Any Task

**Must read these files in order:**
1. `docs/instructions.md` - Execution rules, banned words, language guidelines
2. `docs/PRD.md` - Core features, success criteria, user flows
3. `docs/design_requirements.md` - Visual system, color palette, spacing, micro-animations

## Strict Rules

1. **One task per prompt** - Never do everything at once
2. **Mobile-first approach** - CSS must be written mobile-first
3. **All code comments in English** - UI text visible to users is in Russian
4. **No inline styles** - Use CSS classes only
5. **Animations always last** - Structure and styles first, then animations
6. **No banned words in code/comments** - Avoid: "seamless", "innovative", "robust", "cutting-edge", "it's not just X, it's Y"
7. **Form attributes required** - All forms must have proper `id` and `name` attributes for n8n webhook integration
8. **Webhook integration** - Forms send POST requests to n8n (configured in `SITE_CONFIG.webhookUrl`)

## Key Quiz Logic

The quiz in `QUIZ_RULES` maps user selections to price ranges, timelines, and document requirements:

- **Object Types:** Квартира/дом, Коммерческая недвижимость, Бизнес/доля, Ущерб, Оборудование/транспорт
- **Purposes:** Банк/ипотека, Суд/спор, Нотариус/наследство, Сделка/продажа, Бизнес-задача
- **Regions:** Москва/МО, СПб/ЛО, Другой регион, Выезд на объект

Each combination produces a recommendation via `buildQuizRecommendation()` with price range, timeline, and required documents.

## Phone Number Handling

Russian phone numbers are normalized to E.164 format (11 digits, starting with 7):
- `digitsToCanonicalRuTel()` - converts any format to canonical
- `formatRuPhoneDisplay()` - formats as +7 (XXX) XXX-XX-XX
- `isValidPhone()` - validates exactly 11 digits starting with 7

## Page Shell System

Pages use `data-page` attribute on `<body>` to set active navigation state. Header/footer are injected via `mountShell()`:
```html
<body data-page="home">
  <div data-site-header></div>
  <main id="main-content">...</main>
  <div data-site-footer></div>
</body>
```

Valid page keys: `home`, `services`, `about`, `documents`, `reviews`, `contacts`

## Design System Notes

- Palette: Light background (#F7F5F0), white surfaces, dark navy text (#1F2A37), muted gold accent (#B68A45)
- Border radius: 8px (buttons), 12px (cards), 20px (large), 28px (extra large)
- Glassmorphism for sticky headers: `backdrop-filter: blur(12px); background: rgba(255, 255, 255, 0.85);`
- Micro-interactions: Subtle card lift on hover, button scale, fade-in on scroll
- Typography: Raleway, tight tracking on headings, 1.6 line-height for body
