# ROLE
You are a Senior Frontend Developer & UI/UX Designer specializing in high-converting, trust-building landing pages for professional B2B and legal services.

# OBJECTIVE
Create a modern, authoritative, light-style landing page for a **property valuation company** (оценка имущества). The result must inspire trust, signal expertise, and convert visitors into applicants.

# OUTPUT FORMAT
Return ONLY a complete working project:
- One HTML file
- Embedded CSS (inside `<style>`)
- Embedded JavaScript (inside `<script>`)
- No explanations
- No comments outside code

# STYLE (STRICT)
Aesthetic: Clean corporate, premium, confidence-inspiring

### Design principles:
- Structured layout with clear visual hierarchy
- Professional but not cold — warm accents for approachability
- Smooth animations that signal precision and reliability
- No decorative excess — every element must earn its place

### Color palette:
- Background: `#FFFFFF` or `#F8F7F4` (warm white)
- Primary: `#1A1A2E` (deep navy)
- Accent: `#C8973A` (gold — signals value, authority)
- Secondary: `#EDEAE3`
- Text muted: `#6B6B6B`

### Typography:
- Headings: authoritative serif (`Cormorant Garamond` or `Playfair Display`)
- Body: clean sans-serif (`Mulish` or `DM Sans`)
- Use tracking and weight contrast to establish hierarchy

# STRUCTURE (AUTO-GENERATE BEST UX)
Include these sections in this order:

## 1. NAVBAR
- Logo: company name (text-based, serif)
- Links: Услуги, О компании, Лицензии, Отзывы, Контакты
- Sticky on scroll
- Thin gold bottom border appears on scroll

## 2. HERO SECTION
- Full screen (100vh)
- Background: high-quality real estate / property image from Unsplash
- Dark overlay gradient
- Heading: trust-focused (e.g. "Независимая оценка имущества — точно, законно, в срок")
- Subheading: brief value proposition (e.g. "Работаем с физическими и юридическими лицами. Результат принимается в судах и банках.")
- CTA button: "Получить консультацию"
- Trust badges row: "Лицензия СРО", "Стаж 12 лет", "1500+ объектов"

## 3. SERVICES
- 4–6 cards in grid
- Example services:
  - Оценка недвижимости
  - Оценка бизнеса и активов
  - Оценка для суда и наследства
  - Оценка транспорта и оборудования
  - Оценка ущерба и страховые случаи
  - Экспертиза и рецензирование
- Each card:
  - Minimalist icon (SVG inline)
  - Title
  - 1–2 sentence description
- Hover: gold left border + slight lift

## 4. HOW IT WORKS
- 3-step horizontal flow:
  1. Заявка — "Оставьте заявку или позвоните нам"
  2. Осмотр — "Выезд специалиста или сбор документов"
  3. Отчёт — "Готовый отчёт в установленный срок"
- Clean numbered steps with connecting line

## 5. ABOUT
- Image + text split layout (office or document theme from Unsplash)
- Company story: emphasis on independence, legal compliance, experience
- Key facts: year founded, number of completed valuations, SRO membership
- Trust-building tone

## 6. LICENSES & CERTIFICATES
- Simple icon grid or card row
- SRO membership badge
- Insurance policy
- RICS or other relevant standards (if applicable)
- Text: "Наши отчёты принимаются банками, судами и государственными органами"

## 7. REVIEWS / TESTIMONIALS
- 3–5 client testimonials
- Name, role (физическое лицо / директор ООО / нотариус)
- Stars
- Slider or grid

## 8. CTA BLOCK
- Strong call to action
- Heading: "Нужна оценка? Получите бесплатную консультацию"
- Subtext: "Ответим в течение 30 минут в рабочее время"
- Button: "Оставить заявку"
- Subtle warm background contrast

## 9. CONTACT
- Phone (clickable)
- Address
- Working hours
- Simple form: Имя, Телефон, Тип объекта (dropdown), Комментарий
- Button with hover animation
- Map placeholder or Google Maps embed note

## 10. FOOTER
- Minimal
- License number and SRO info
- Social links (if any)
- Privacy policy link
- Copyright

# INTERACTIONS
- Smooth scrolling
- Fade-in animations on scroll (IntersectionObserver)
- Button hover effects (gold glow or border)
- Card hover: gold left border + translateY(-4px)
- Navbar gold border appears on scroll

# JAVASCRIPT REQUIREMENTS
- Scroll animations (IntersectionObserver)
- Form validation (phone format, required fields)
- Smooth anchor navigation
- Dropdown in contact form

# IMAGE RULES
- Use ONLY real Unsplash image links
- Theme: real estate, documents, office, city buildings, property inspection
- High quality, professional

# CONSTRAINTS
- No frameworks (no React, no Tailwind)
- Pure HTML + CSS + JS
- Clean, readable code
- No lorem ipsum — realistic Russian content
- All text in **Russian**

# CONTENT TONE
- Professional and reliable, not dry
- Client-focused: explain benefits, not features
- Legal credibility: mention courts, banks, SRO
- Use specific numbers wherever possible

# QUALITY BAR
The page must feel like:
- A trusted regional valuation firm with real experience
- Not a template
- Ready to show to a real client in the first meeting

If it looks basic — tighten typography, increase spacing, and add a gold accent where trust needs signaling.

# FINAL RULE
Do not explain anything.
Return ONLY code.