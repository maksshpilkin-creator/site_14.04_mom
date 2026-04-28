# Implementation Plan: Ocenka Group Website

---

## Strategic Direction

**Style:** Conservative premium corporate — typical of strong legal, valuation, and financial firms in Russia.

- Light background, dark navy text, restrained gold accent
- Strong typography, large whitespace, clean document-like layouts
- Minimal motion, no flashy startup effects, no experimental art direction

**Why:** The goal is sales. Buyers need trust, speed, and legal confidence more than originality.

---

## Positioning

The homepage presents the company as a federal valuation partner for private clients and business.

**Main message:**
> «Оценка имущества по всей России. Отчеты для банка, суда, нотариуса и бизнеса.»

**Support message:**
> «Квартиры, дома, коммерческая недвижимость, бизнес, ущерб, оборудование и транспорт. Сразу называем стоимость, сроки и список документов.»

**Key copy direction — sell outcomes, not "valuation":**
- Report accepted
- Clear сроки
- Понятная стоимость
- Минимум действий со стороны клиента
- Legal and business confidence

---

## Site Map

| # | Page | Path |
|---|---|---|
| 1 | Homepage (conversion hub) | `/` |
| 2 | Real estate valuation | `/services/real-estate/` |
| 3 | Business valuation | `/services/business-valuation/` |
| 4 | Commercial property valuation | `/services/commercial-property/` |
| 5 | Court valuation | `/services/court-valuation/` |
| 6 | Notary / inheritance valuation | `/services/notary-inheritance/` |
| 7 | Damage valuation | `/services/damage-valuation/` |
| 8 | Equipment / transport valuation | `/services/equipment-transport/` |
| 9 | About company | `/about/` |
| 10 | Documents and certificates | `/documents/` |
| 11 | Reviews / cases | `/reviews/` |
| 12 | Contacts | `/contacts/` |
| 13 | Privacy policy | `/privacy/` |
| 14 | Thank-you page | `/thanks/` |

**Homepage strategy:** One conversion homepage with immediate routing (Частным клиентам / Бизнесу), then route into focused landing pages. No generic "about company" landing.

---

## Design System

**Palette:**
| Token | Value |
|---|---|
| background | `#F7F5F0` |
| surface | `#FFFFFF` |
| primary text | `#1F2A37` |
| muted text | `#5B6472` |
| accent (gold) | `#B68A45` |
| accent-dark | `#8F6A32` |
| border | `#E7E1D6` |
| footer-bg | `#18202C` |
| danger | `#B03F3F` |

**Typography:**
- Headings: `Cormorant Garamond` (elegant serif) — legal-financial, calm, precise; used on the homepage quiz questions and result screen (`index.html` inline design block).
- Body: `Inter` on the homepage; subpages may still use `Manrope` / `Inter` — consolidation remains a Phase 4 item.

**Visual behavior:**
- Subtle card lift on hover (global cards; the hero quiz card intentionally keeps a flat, document-like shadow without lift)
- Soft fade-in on scroll (300–500ms)
- Very restrained gold highlights on CTA and trust markers
- Premium document-like blocks
- No aggressive shadows

---

## Homepage Wireframe (reference)

1. **Sticky header** — logo, services, cases, documents, reviews, contacts, CTA «Узнать стоимость»
2. **Hero** — strong headline, trust subheadline, primary CTA «Рассчитать стоимость», secondary CTA «Получить консультацию», trust line (СРО • страхование • отчеты принимают банк, суд и нотариус)
3. **Audience split** — cards «Маршрут клиента» (личная задача / бизнес / срочно / не знаю с чего начать)
4. **Экспресс-квиз (#hero-quiz)** — implemented as the main estimator:
   - Intro copy, then progress label **«Вопрос N из 3»** above a **4-segment** bar (steps 0–2 + result).
   - Three steps: объект → цель → регион; answers are **icon + title + subtitle** cards (2 columns on desktop, 1 on mobile), gold accent, selected checkmark, hover states.
   - **Step transitions:** short fade/slide between steps (`assets/js/site.js` `setupQuiz`).
   - **Result:** heading «Ваш ориентир готов», dynamic title/fit text, two pills (ориентир по стоимости и сроку), divider, email capture for full breakdown; optional phone + consent appears after successful email handoff. Partial email flow uses the existing Railway webhook in inline script — **replace with production n8n URL** when ready (see Phase 1).
5. **Key services grid** — квартиры/дома, коммерция, бизнес/доли, ущерб, транспорт/оборудование
6. **Why clients trust you** — work across Russia, real documents/SRO, accepted formats, clear deadlines, experience
7. **Work process** — заявка → проверка задачи → документы/осмотр → отчет и передача
8. **Documents and credentials** — real assets from `files/`
9. **Reviews and cases** — feedback screenshots from `files/feedbacks/`, case summaries
10. **Russia-wide CTA block**
11. **Contacts** — form, phone, map, messengers
12. **Footer** — legal details, privacy, contacts, office city, nationwide note

---

## Conversion Rules

1. One main CTA repeated across page
2. One short universal form on homepage
3. Quiz is the main lead capture element (visual system and step UX are in place; webhook wiring still to be finalized)
4. Long explanations move to service pages
5. Trust proof must appear before deep copy
6. Mobile click-to-call must stay visible

---

## Asset Use Plan

From existing `files/`:
- Certificates → trust/documents section (`sro_membershipwebp.webp`, `Business Assessment Qualification Certificate.webp`, `diploma.webp`)
- PDFs → downloadable proof examples (`price.pdf`, `example_project.pdf`, `expert_opinion.pdf`)
- Feedback screenshots → review wall from `files/feedbacks/`
- `company.png` and `news.png` → social proof block on `/about/`

---

## PHASE 1 — Conversion-Critical Fixes (highest priority, quick wins)

- [x] **Step 1:** Add "Цель оценки" `<select>` field to the contact form (bank, court, sale, etc.) — missing per §2.9 requirement — `index.html` (#contacts form) [easy] [15 min]
- [x] **Step 2:** Add "Цель оценки" `<select>` field to the contacts page lead form — same gap — `contacts/index.html` [easy] [15 min]
- [x] **Step 3:** Add phone input mask (auto-format `+7 (XXX) XXX-XX-XX`) and silent validation to all `input[type=tel]` — currently raw text, per §3.2 — `assets/js/site.js` [medium] [30 min]
- [x] **Step 4:** Add explicit "Перезвоним за 15 минут" text beneath every submit button — missing per §3.2 — `index.html` + `contacts/index.html` [easy] [15 min]
- [x] **Step 5:** Add privacy consent checkbox with link to `/privacy/` below every lead form — missing per §3.1 — `index.html`, `contacts/index.html`, all 7 service pages [medium] [30 min]
- [ ] **Step 6:** Replace `data-webhook="YOUR_N8N_WEBHOOK_URL"` placeholder with actual production webhook URL on all forms and in `SITE_CONFIG` — currently non-functional — `assets/js/site.js` + all HTML files with forms [easy] [15 min] *(requires business input)* (skip for now). **Also align** the quiz partial-result `fetch` URL in `index.html` with the same production endpoint when deploying.
- [x] **Step 7:** Improve mobile sticky CTA — current `.floating-call` shows phone only; add a prominent "Оставить заявку" sticky button visible on mobile — per §3.2 — `assets/css/styles.css` + `index.html` [medium] [30 min]

---

## PHASE 2 — Missing Content Blocks (conversion + trust impact)

- [x] **Step 8:** Add FAQ section with accordion (6 questions from §2.8: cost, documents, timeline, bank/court acceptance, urgency, online ordering) — completely missing from `index.html` — `index.html` (new `<section>` before `#contacts`) [medium] [1 hour]
- [x] **Step 9:** Add accordion open/close JS logic and CSS for the new FAQ section — `assets/js/site.js` + `assets/css/styles.css` [medium] [30 min] *requires step 8 first*
- [x] **Step 10:** Expand service cards to include "Для кого", "Какие документы", "Ориентир по срокам", and "Оставить заявку" button — implemented across all 7 files in `services/*/index.html` (§2.3) [hard] [1 hour]
- [x] **Step 11:** Add timeline/duration labels to each process step ("~15 мин", "1 день", "1-3 дня", "1-2 дня") — implemented in `index.html` process section per §2.4 [easy] [15 min]
- [x] **Step 12:** Add "Кейсы и примеры отчетов" section with 3-6 structured case cards (object type, goal, timeline, acceptance mark) — implemented as a new `#cases` section after `#reviews` in `index.html` per §2.6 [medium] [1 hour]
- [x] **Step 13:** Add partner/bank logos row to the reviews/trust area — implemented as `.partners-strip` after the reviews block in `index.html` per §2.7 [easy] [30 min]
- [x] **Step 14:** Add company requisites (ИНН, ОГРН, legal name) to footer — implemented in `assets/js/site.js` (`createFooter()` + `SITE_CONFIG`) per §3.1 [easy] [15 min]

---

## PHASE 3 — UX & Animation Polish

- [x] **Step 15:** Add `prefers-reduced-motion` media query to disable all animations for accessible users — completely missing per §4.3 — `assets/css/styles.css` [easy] [15 min] *(should include quiz step transitions in `index.html` / `site.js` scope)*
- [x] **Step 16:** Tune animation durations to spec: micro-animations 150-250ms, block reveals 300-500ms, stagger delays 40-100ms — current values are close but not aligned (e.g. `.reveal` is 450ms); quiz step transitions are ~200ms — `assets/css/styles.css` + inline `<style>` in `index.html` [easy] [15 min]
   - [x] **Step 17:** Add counting-up animation to stat values ("12+", "1500+", "30 мин") — partially exists in inline `<script>` on `index.html` but not in the shared `site.js`; missing on `/about/` page — `assets/js/site.js` [medium] [30 min]
- [x] **Step 18:** Remove navbar button pulse animation (infinite scale bounce on `.site-header .btn`) — violates §4.2 "avoid competing animations" — `index.html` (inline `<style>`) [easy] [15 min]
- [x] **Step 19:** Add sequential step-highlight animation to the process section (§4.1 "поочередное подсвечивание этапов 1-2-3-4") — not implemented — `assets/js/site.js` + `assets/css/styles.css` [medium] [30 min]
- [x] **Step 20:** Consolidate inline `<style>` block from `index.html` (large design-system + quiz overrides) into `assets/css/styles.css` — duplicated and overlapping with main stylesheet — `assets/css/styles.css` + `index.html` [medium] [30 min] *requires steps 15-19 first*

---

## PHASE 4 — SEO & Technical (lowest priority, polish)

- [x] **Step 21:** Add JSON-LD `Organization` schema markup (name, phone, address, logo, SRO) — missing per §3.3 — `index.html` (`<head>`) [easy] [15 min]
- [x] **Step 22:** Add `FAQPage` JSON-LD schema for the FAQ section — missing per §3.3 — `index.html` (`<head>`) [easy] [15 min] *requires step 8 first*
- [x] **Step 23:** Add local SEO-optimized `<title>` and `<meta description>` to each of the 7 service pages with "оценка + тип + город" pattern — current titles are generic (e.g. "Оценка ущерба | Экспресс Оценка") — all 7 `services/*/index.html` [easy] [30 min]
- [x] **Step 24:** Fix font mismatch: subpages load `Cormorant Garamond + Manrope` while `index.html` loads `Cormorant + Noto Serif + Inter` — align typography across site — `contacts/index.html`, `about/index.html`, `privacy/index.html`, `reviews/index.html`, `thanks/index.html`, `documents/index.html`, all 7 service pages [easy] [30 min]
- [x] **Step 25:** Add `<link rel="canonical">` and `Open Graph` meta tags to all pages — completely missing — all HTML files [easy] [30 min]
- [x] **Step 26:** Add "Публичная оферта / Условия оказания услуг" page — missing per §3.1 — new `terms/index.html` + footer link in `assets/js/site.js` [medium] [1 hour]

---

## Status Summary

| Requirement (§) | Status | Notes |
|---|---|---|
| 2.1 Hero-блок | ✅ Implemented | — |
| 2.2 Почему доверяют | ✅ Implemented | — |
| 2.3 Услуги (карточки) | ✅ Implemented | Expanded service cards with audience/documents/timeline/CTA in all `services/*/index.html` pages |
| 2.4 Процесс (этапы) | ✅ Implemented | Timeline labels added to all 4 process steps on `index.html` |
| 2.5 Калькулятор/квиз | ✅ UI + flow | Premium card UI, progress bar, icons, step transitions, result + email states; logic unchanged. Production webhooks still TODO (Phase 1). |
| 2.6 Кейсы | ✅ Implemented | Added structured `#cases` section with object/goal/timeline/acceptance markers on `index.html` |
| 2.7 Отзывы и партнеры | ✅ Implemented | Added partner/bank logos row (`.partners-strip`) after `#reviews` |
| 2.8 FAQ | ❌ Missing | Phase 2, steps 8–9 |
| 2.9 Контакты + CTA | 🔶 Improve | Phase 1, steps 1–2, 4 |
| 3.1 Юридическая корректность | 🔶 Improve | Footer requisites added (Phase 2, 14); public offer page still pending (Phase 4, 26) |
| 3.2 UX и конверсия | 🔶 Improve | Phase 1, steps 3–4, 7 |
| 3.3 SEO и контент | 🔶 Improve | Phase 4, steps 21–25 |
| 4.x Анимации | 🔶 Improve | Quiz motion exists; global `prefers-reduced-motion` and polish still Phase 3 |

---

## Recently aligned (site)

- Homepage quiz: `#hero-quiz` — white elevated card, gold accent `#B68A45`, Cormorant for questions, 2-column option grid, inline SVG icons, selected checkmark, back link on steps 2–3, animated step changes, result screen «Ваш ориентир готов» + pills + email success state.
- Implementation lives primarily in `index.html` (`<style id="design-system">`) and `assets/js/site.js` (`setupQuiz`).
