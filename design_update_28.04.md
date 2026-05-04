# Design Update — 20.04
_Audit completed by Claude Code. Based on the frontend-design, page-cro, and copywriting skills from marketingskills._
_Status last updated: 2026-05-04_

---

## 🟢 Nice to have (polish)

- **`line-height: 0.98` on headings** — `styles.css`, line 113: too tight for multi-line mobile headings. Increase to 1.05–1.1 and test on real devices.

- **No contrasting font for body text** — `design_requirements.md` recommends Manrope/Inter, but all typography uses Raleway for both headings and body. There is no visual hierarchy split. Consider a second font for body text.

- **Hardcoded colors outside variables** — in `styles.css`: `#C5A880`, `#d4b87a`, `#b8966e`, `#3e3e3e`, `#080d18`, `#0e1e3c`, `#23314e` appear ~11 times in raw rules. Replace with CSS variables (`var(--accent)`, `var(--accent-dark)`, `var(--hero-flat-bg)`, etc.) for maintainability.

- **Team cards have no hover effect** — `.team-card` (styles.css line 6142) has no hover behavior, while `.card:hover` and `.trust-card:hover` do. Add consistent `transform: translateY(-4px)` for team cards.

- **Decorative "RU" element** — `index.html`, line 983: `<span class="coverage-accent" aria-hidden="true">RU</span>` looks unfinished. Either style it as a full background element or remove it.

- **Reveal animation uses `!important`** — `styles.css`: `transition: ... !important` appears in multiple rules. Fix through selector specificity instead of `!important`.

---

## 📐 Missing Sections

- **"Guarantees" block** — the main client fear is: "Will the report be accepted?". FAQ answers this partially, but there is no clear guarantee section. Needed: "Free revision if required", "Valuer liability insurance", "SRO-compliant work". Placement: after trust cards or before FAQ.

- **Price list** — pricing is hidden inside FAQ text. This hurts transparency and trust. Add cards: service / from X RUB / timeline. Placement: between the "Services" and "Trust" sections.

- **"Who it is for" block** — the site speaks to everyone at once: individuals, businesses, banks, courts. No segmentation. Add 3–4 cards: "For mortgage", "For court", "For business", "For inheritance" with distinct pain points and CTAs. Placement: after hero.

- **Bank logos** — `.partners-strip__item` currently contains text only ("СберБанк", "ВТБ"). Visual logos would have a 3–5x stronger trust effect. Request client permission to use bank logos.

- **Video or process preview** — for a B2B service (business valuation from 50,000 RUB), a 60-second director video usually converts better than text. Consider embedding Yandex Video in the about section or on a dedicated page.

- **Dedicated B2B page** — there is no separate flow for corporate clients with a different CTA ("Обсудить проект" instead of "Рассчитать стоимость") and different pain points.

---

## 🎨 Design System Gaps

- **Three hero background variants** — `:root` defines `--hero-flat-bg: #0e1e3c` and `--hero-stats-bg: #23314e`, but `.hero.hero--split` directly uses `background-image: linear-gradient(165deg, #060a12 0%, ...)`. A third variant exists outside tokens — unify this.

- **Card radius is inconsistent** — `.hero-portrait` uses `border-radius: 12px` in one place and `16px` in another (both outside variables). `.case-card__icon { border-radius: 14px }` also bypasses tokens. Normalize all to `--radius-sm / --radius-md / --radius-lg`.

- **Color in `.hero-stat__value` and `.hero-stat__icon`** — `styles.css` lines 752, 770: `color: #C5A880` instead of `var(--accent)`.

- **Color in `.coverage-benefit-row p`** — `styles.css` line 1996: `color: #3e3e3e` instead of `var(--muted)` or `var(--text)`.

- **No systematic h4–h6 scale** — `styles.css` lines 116–121: `h4, h5, h6` define font family and weight but no font size. Typography scale is incomplete.

---

## 📱 Mobile Issues

- **mobile-first is violated in hero** — `.hero.hero--split .hero-copy` sets desktop padding as the base value in `styles.css`, then overrides it in media queries. This violates the mobile-first rule in `CLAUDE.md` — base styles should target mobile.

- **Header CTA button is missing on tablets** — `nav-actions` are hidden below 1200px (`styles.css` line 473: base `display: none`, shown at `min-width: 1200px` line 2441). On tablets (768–1199px), there is no direct path from header to form. Show "Рассчитать" starting at 768px.

- **Touch targets for `.btn-text`** — `min-height: auto; padding: 0` (`styles.css`, lines 328–330): buttons like "Назад", "Изменить ответы", "Открыть страницу" can be < 44px on mobile. Add `min-height: 44px` on mobile.

- **Quiz options on small screens** — 5 options with icon + title + description on iPhone SE (320px) require too much vertical scroll with little visible progress. Consider compact mode (title only, no `.quiz-option-note`) below 480px.
