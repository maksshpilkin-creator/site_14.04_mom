# Design QA — раздел «Статьи»

## Reference

- Source: `codex-clipboard-05a95bf0-02de-4fce-8737-5c6afdd5c79b.png`
- Reference viewport: 1235 × 707
- Compared state: top of `/knowledge/`, desktop navigation visible, cookie banner dismissed

## Checks

- Desktop hero: header, three-line heading, two-column composition, CTA group and white information card match the reference hierarchy and proportions.
- Background: darkened so the photograph stays secondary to the text, consistent with the reference.
- Article grid: six cards have consistent height, spacing, metadata and direct article links.
- Article pages: shared dark hero, reading column, sticky contents, callouts, CTA and related materials use the same visual system.
- Responsive: checked at 390 × 844; content stays within the viewport, buttons remain reachable, cards and article sidebars stack correctly.
- Interaction: FAQ expands and exposes its answer; navigation and article routes are present in the accessibility tree.
- Browser console: no errors during the checked interaction.

## Resolved issues

- P1: cards looked like articles but opened service pages — resolved with six dedicated article routes.
- P1: desktop navigation collapsed at the reference width — resolved by aligning the breakpoint with the available header width.
- P2: hero heading was too small and wrapped differently from the reference — resolved.
- P2: background photograph competed with the copy — resolved with a stronger overlay.
- P2: cached shared assets could preserve the old layout — resolved with a versioned asset URL on knowledge pages.
- P3: the text and arrow in the “Читать статьи” button sat against the top edge — centered on one visual line.
- P3: the “Пройти короткий квиз” label sat against the top edge — centered vertically in the button.

## Result

final result: passed
