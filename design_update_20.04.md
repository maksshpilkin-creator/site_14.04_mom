# Design Update — 20.04
_Audit completed by Claude Code. Based on the frontend-design, page-cro, and copywriting skills from marketingskills._

---

## 🔴 Critical step (do first)

Complete this block before any conversion or visual polish changes:

1. **Unify brand naming in all entry points**  
   Standardize the brand string in header, footer, and SEO tags (`assets/js/site.js`, layout/footer templates, page meta).

2. **Fix visible trust typo on contacts page**  
   Replace `Telegrem` with `Telegram` in `contacts/index.html`.

3. **Remove unused font payload from static pages**  
   Delete Cormorant Garamond + Manrope `<link>` imports from `about/index.html` and `contacts/index.html` (unused by current CSS tokens).

4. **Remove inline quiz styles and move to CSS classes**  
   Replace inline `display/opacity/transform` declarations in `index.html` with semantic class toggles (for example `.quiz-result-hidden`).

5. **Fix mobile readability for hero stats grid**  
   Add mobile breakpoint for `.hero-stats-bar .hero-stats` (`repeat(2, 1fr)` up to 767px) to prevent unreadable 4-column compression.

6. **Validation gate (required)**  
   After steps 1-5: run mobile checks (320px and 375px), verify no inline styles in HTML, and confirm header/footer/meta branding match exactly.

---

## 🟡 Important (affects conversion)

- **H1 is feature-focused, not benefit-focused** — "Поручите задачу профессионалам. Готовый отчёт для банка, суда и нотариуса." describes what the company does, not what the client gets. Outcome-focused wording is needed. Alternatives: "Отчёт для банка — от 2 дней. Принимают 28+ банков, суды и нотариусы." / "Ваш отчёт примут в банке, суде и у нотариуса. Срок — от 1 дня."

- **CTA "Получить консультацию" is weak** — `index.html`, line 222. Weak verb + no clear value. Replace with "Узнать стоимость бесплатно" or "Получить расчёт за 1 минуту".

- **Statistics are duplicated** — the hero stats bar shows 4 metrics (15,000+ reports, from 1 day, 19+ years, 28+ banks), and right after the quiz, `section.section-tight` repeats the same numbers in stat cards. Visitors see identical data twice on one page. Remove one block or reframe one set.

- **"Team" section: h2 = eyebrow** — `index.html`, lines 715–717: `<span class="eyebrow">Команда</span> <h2>Команда</h2>`. Same text appears twice with no added value. Replace h2 with meaningful copy: "Оценщики с подтверждёнными аттестатами СРО".

- **Partner banks appear too late** — `.partners-strip` with СберБанк, ВТБ, Альфа-Банк is near the end of the page after reviews. This is a key trust signal. Move it right below the hero stats bar or into an earlier trust section.

- **Documents link is incorrect** — `index.html`, line 853: `href="/documents/index.html"` should be `/documents/`. Fix it.

- **"About company" page has no CTA** — `about/index.html` has no form or CTA button in the main content area. For B2B visitors researching the company, this is a dead end. Add a CTA banner or inline form near the end.

- **Floating bar overlaps content on mobile** — `.floating-cta-bar` (height ~64px) is fixed to the bottom, but `<body>` has no compensating `padding-bottom`. Bottom content gets hidden behind buttons. Add `padding-bottom: 80px` to `body` at `max-width: 767px`.

- **`!important` hack in production CSS** — `styles.css`, lines 3013–3017: `.stat-value { font-size: 2rem !important; ... color: var(--accent) !important; }` with comment "Fixes: #3". This indicates a specificity conflict. Resolve the source and remove `!important`.

- **Email gate in quiz appears too early** — `index.html`, lines 506–518: price and timeline are shown immediately, but the document list is hidden behind email submission. This adds friction in the middle of the funnel. Consider showing documents immediately and moving the email gate to just before the "Связаться со специалистом" step.

---

## 🟢 Nice to have (polish)

- **`line-height: 0.98` on headings** — `styles.css`, line 113: too tight for multi-line mobile headings. Increase to 1.05–1.1 and test on real devices.

- **No contrasting font for body text** — `design_requirements.md` recommends Manrope/Inter, but all typography uses Raleway for both headings and body. There is no visual hierarchy split. Consider a second font for body text.

- **Hardcoded colors outside variables** — in `styles.css`: `#C5A880`, `#d4b87a`, `#b8966e`, `#3e3e3e`, `#080d18`, `#0e1e3c`, `#23314e` are written directly in rules. Replace with CSS variables (`var(--accent)`, `var(--accent-dark)`, `var(--hero-flat-bg)`, etc.) for maintainability.

- **Team cards have no hover effect** — `.team-card` has no hover behavior, while `.card:hover` and `.trust-card:hover` do. Add consistent `transform: translateY(-4px)` for team cards.

- **Decorative "RU" element** — `index.html`, line 967: `<span class="coverage-accent" aria-hidden="true">RU</span>` looks unfinished. Either style it as a full background element or remove it.

- **Reveal animation uses `!important`** — `styles.css`, line 2092: `transition: ... !important;` should be fixed through selector specificity instead of `!important`.

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

- **Color in `.hero-stat__value` and `.hero-stat__icon`** — `styles.css`, lines 641–643: `color: #C5A880` instead of `var(--accent)`.

- **Color in `.coverage-benefit-row p`** — `styles.css`, line 1804: `color: #3e3e3e` instead of `var(--muted)` or `var(--text)`.

- **No systematic h4–h6 scale** — `styles.css`, lines 116–120: `h4, h5, h6` define font family and weight but no font size. Typography scale is incomplete.

---

## 📱 Mobile Issues

- **hero-stats-bar: 4 columns without breakpoint** — `grid-template-columns: repeat(4, 1fr)` at all sizes. On < 480px, four icons + text become unreadable. Add `@media (max-width: 767px) { grid-template-columns: repeat(2, 1fr); }`.

- **No bottom padding for floating bar** — floating CTA bar takes ~64px at the bottom, but body/main does not compensate. Bottom content (FAQ, footer) gets hidden behind buttons on mobile.

- **mobile-first is violated in hero** — `.hero.hero--split .hero-copy` sets `padding: 80px 48px 72px` as the base value (`styles.css`, line 3093), then overrides it in media queries. This violates the mobile-first rule in `CLAUDE.md` — base styles should target mobile.

- **Header CTA button is missing on tablets** — `nav-actions` are hidden below 1200px. On tablets (768–1199px), there is no direct path from header to form. Show "Рассчитать" starting at 768px.

- **Touch targets for `.btn-text`** — `min-height: auto; padding: 0` (`styles.css`, lines 328–330): buttons like "Назад", "Изменить ответы", "Открыть страницу" can be < 44px on mobile. Add `min-height: 44px` on mobile.

- **Quiz options on small screens** — 5 options with icon + title + description on iPhone SE (320px) require too much vertical scroll with little visible progress. Consider compact mode (title only, no `.quiz-option-note`) below 480px.

---

## ⚡ Quick Wins (each < 30 minutes)

1. **Fix "Telegrem" → "Telegram"** — `contacts/index.html`, line 106. (1 min)
2. **Sync brand naming** — "Экспресс Оценка" → "Экспресс Оценка" in `site.js`, line 122. (2 min)
3. **Remove unused fonts** (Cormorant Garamond + Manrope) from `about/index.html` and `contacts/index.html`. (5 min)
4. **Move partners strip (banks) higher** — right after hero stats bar. (10 min)
5. **Add `padding-bottom: 80px`** to `body` in `@media (max-width: 767px)` — eliminate floating bar overlap. (5 min)
6. **Fix stats bar on mobile** — add `@media (max-width: 767px) { .hero-stats-bar .hero-stats { grid-template-columns: repeat(2, 1fr); } }`. (5 min)
7. **Fix link** `/documents/index.html` → `/documents/` in `index.html`, line 853. (1 min)
8. **Remove duplicated eyebrow + h2 "Команда"** — replace `<h2>Команда</h2>` with "Оценщики с подтверждёнными аттестатами СРО". (5 min)
9. **Replace CTA "Получить консультацию"** → "Узнать стоимость бесплатно" in hero `index.html`, line 222. (2 min)
10. **Move quiz inline styles** from `index.html`, lines 521–533 into CSS classes `.quiz-result-hidden` / `.quiz-result-visible`. (10 min)
