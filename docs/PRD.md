# Product Requirement Document (PRD): "Ocenka Group" Redesign

## 1. Project Overview
* **Current Problem:** Outdated website design (ocenka-group.ru), weak structure of conversion elements, and the absence of an automated lead capture funnel.
* **Project Goal:** Complete visual redesign of the website with a focus on a premium look (luxury/premium UI) and the implementation of high-conversion logic.
* **Business Objective:** Increase the number of incoming leads for property valuation (real estate, vehicles, business) by introducing interactive quizzes, micro-animations, and automated data collection.

## 2. Success Criteria
* **Visual Upgrade:** The website looks modern and establishes trust with both B2B and B2C clients. The interface must be clean and free of unnecessary visual noise.
* **Conversion (Lead Generation):** Implementation of at least 2-3 conversion touchpoints (e.g., a sticky header with a "Request Valuation" button, a cost estimation quiz, and a lead magnet).
* **Logic Automation:** All contact forms and quizzes must successfully transmit data via Webhooks to n8n, which then routes the data to Google Sheets and the client's Telegram.
* **Speed & Responsiveness:** The website must load instantly and render perfectly on all mobile devices (Mobile-first approach).

## 3. Core Functionality
* **Hero Section:** A clear Unique Selling Proposition (USP) combined with a prominent Call to Action (CTA) button directing users to the quiz or application form.
* **Interactive Quiz:** Logic for estimating the cost and timeframe of the valuation. The user answers 3-4 simple questions (property type, purpose of valuation, region) and submits their phone number to receive the calculation.
* **Services Grid:** Interactive cards featuring micro-animations (hover effects) for the main services: Real Estate Valuation, Vehicle Valuation, Business Valuation, and Equipment Valuation.
* **Trust Factors:** Dedicated sections for client reviews, official certificates, partner logos, and trust counters (e.g., "Over 10 years on the market").
* **Integration Layer:** Seamless connection with the n8n webhook API to handle POST requests from all website forms.

## 4. User Flow
1.  The user arrives at the Landing Page (e.g., via targeted ads).
2.  The user reads and understands the USP in the Hero Section within the first 3 seconds.
3.  The user clicks the "Calculate Valuation Cost" button.
4.  The user completes the 3-step quiz by selecting relevant parameters.
5.  The user inputs their contact details (Name, Phone Number).
6.  The user is redirected to a Success Page ("Thank You" page).
7.  The user's data is automatically processed via n8n and populated into the business owner's Google Sheet.

## 5. Technical Constraints
* **Tech Stack:** HTML, CSS, JS (or your chosen lightweight framework), deployed via Netlify.
* **Code Quality:** Clean, semantic, and functional approach. Zero unnecessary boilerplate.
* **Copywriting Style:** Professional, concise, and direct. 
* [cite_start]**Banned Words:** Strict prohibition on using AI-generated cliches (e.g., "seamless", "performant", "mission-critical", "it's not just X, it's Y")[cite: 17]. [cite_start]Prioritize technical precision and raw code over explanations[cite: 97].