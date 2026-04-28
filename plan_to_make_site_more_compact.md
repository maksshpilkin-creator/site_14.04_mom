# Assessment: Make Site More Compact

Goal: reduce vertical space by ~15-22% while preserving hierarchy, readability, and premium style.

## Current spacing baseline (confirmed in CSS)

- `.section`: `72px` (mobile), `64px` (`>=768`), `96px` (`>=1200`)
- `.section-tight`: `48px`
- `.section-head`: `margin-bottom: 40px`
- `.hero`: `padding: 60px 0 64px`
- `.hero-stats-bar`: `padding: 24px 0`
- `.hero-stats`: `margin-top: 40px; padding-top: 24px`
- `.cta-banner`: `padding: 24px`
- `.process-track`: `gap: 24px` (already compact)
- `body`: `line-height: 1.6`

Assessment: the page is visually strong, but vertical rhythm is oversized in section wrappers and hero-related blocks. The biggest gains come from reducing container padding, not typography.

---

## Priority recommendations

### P1 - High impact, low risk

1) Global sections  
- `.section`: `72px -> 56px` (base)  
- `@media (min-width: 768px) .section`: `64px -> 56px`  
- `@media (min-width: 1200px) .section`: `96px -> 76px`

2) Tight sections  
- `.section-tight`: `48px -> 36px`  
- `.section-tight:has(.stats-grid)`: `clamp(20px, 4vw, 28px) -> clamp(14px, 3vw, 22px)`

3) Section headings  
- `.section-head`: `margin-bottom: 40px -> 28px`

Expected effect: faster scan, shorter scroll depth, no structural breakage.

### P2 - Medium impact, low risk

4) Hero compression  
- `.hero`: `60px 0 64px -> 44px 0 48px`

5) Hero stats compression  
- `.hero-stats-bar`: `24px 0 -> 16px 0`  
- `.hero-stats`: `margin-top: 40px -> 24px`, `padding-top: 24px -> 16px`

6) CTA cards  
- `.cta-banner`: `24px -> 18px`

Expected effect: first-screen density improves and primary CTA appears earlier.

### P3 - Optional refinement

7) Body text line-height  
- `body line-height: 1.6 -> 1.55` (not 1.5 initially)

Expected effect: small global compactness increase.  
Risk: readability regression on long paragraphs; apply only if P1/P2 are insufficient.

---

## What not to compress now

- `.process-track { gap: 24px }`: already balanced.
- Core form control heights (`48px+`): keep as-is for tap comfort and conversion.
- Dense trust/review cards with existing image + text hierarchy: avoid aggressive padding cuts in first pass.

---

## Estimated outcome

- **Above-the-fold compaction:** ~12-18%
- **Full-page scroll length reduction:** ~15-22%
- **Visual quality risk:** low if limited to P1/P2 values above

---

## Rollout sequence (safe)

1. P1 (sections + headings)  
2. P2 (hero + stats + CTA)  
3. Recheck on mobile widths: `360`, `390`, `430`  
4. Recheck on desktop widths: `1280`, `1440`  
5. Apply P3 only if still too airy

Decision: proceed with P1 first for the best compactness gain per CSS change.
