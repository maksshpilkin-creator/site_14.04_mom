const SITE_CONFIG = {
  webhookUrl: "https://timocekaluy.beget.app/webhook/764e3ba2-d92d-4b23-a7de-aa8f9ed1b696",
  phoneDisplay: "+7 (812) 640-44-46",
  phoneHref: "+78126404446",
  whatsappHref: "https://wa.me/78126404446",
  email: "info@ocenka-group.ru",
  address: "Санкт-Петербург, пр. Энгельса, д. 33, БЦ «Светлановский», оф. 502А",
  legalName: "ООО «Экспресс Оценка»",
  inn: "ИНН 7802596912",
  ogrn: "ОГРН 1167847399895",
};

const SUBMIT_COOLDOWN_MS = 30_000;
const SUBMIT_STORAGE_KEY = "ocenka_last_submit";
const COOKIE_STORAGE_KEY = "cookie_consent";

const NAV_ITEMS = [
  { href: "/services/", label: "Услуги", key: "services" },
  { href: "/knowledge/", label: "Статьи", key: "knowledge" },
  { href: "/about/", label: "О компании", key: "about" },
  { href: "/documents/", label: "Документы", key: "documents" },
  { href: "/reviews/", label: "Отзывы", key: "reviews" },
  { href: "/contacts/", label: "Контакты", key: "contacts" },
];

const QUIZ_RULES = {
  objectTypes: {
    "Квартира или дом": {
      title: "Для жилой недвижимости можно быстро подготовить отчет под вашу задачу.",
      priceRange: [9000, 15000],
      timelineRange: [2, 3],
      docs: ["Паспорт заказчика", "Правоустанавливающие документы", "Адрес или кадастровый номер"],
    },
    "Коммерческая недвижимость": {
      title: "По коммерческим объектам ориентир зависит от площади, назначения и состава документов.",
      priceRange: [18000, 32000],
      timelineRange: [3, 5],
      docs: ["Реквизиты или паспорт заказчика", "Правоустанавливающие документы", "Технические характеристики объекта"],
    },
    "Бизнес или доля": {
      title: "Для оценки бизнеса или доли сначала проверяем объем финансовых данных и цель отчета.",
      priceRange: [45000, 90000],
      timelineRange: [5, 10],
      docs: ["Учредительные документы", "Бухгалтерская отчетность", "Сведения по активам и обязательствам"],
    },
    "Ущерб": {
      title: "По ущербу важны дата события, фотофиксация и состав подтверждающих документов.",
      priceRange: [15000, 28000],
      timelineRange: [2, 4],
      docs: ["Фото повреждений", "Акты или справки по событию", "Документы на объект или имущество"],
    },
    "Оборудование или транспорт": {
      title: "Для транспорта и оборудования ориентир зависит от количества единиц и технических характеристик.",
      priceRange: [12000, 26000],
      timelineRange: [2, 4],
      docs: ["Перечень объектов", "ПТС, СТС или техпаспорта", "Фотографии и ключевые характеристики"],
    },
  },
  purposes: {
    "Банк или ипотека": {
      fitText: "Отчет можно подготовить под требования банка или кредитной сделки.",
      priceDelta: [0, 2000],
      timelineDelta: [0, 1],
      docsAdd: ["Название банка или формат требований"],
    },
    "Суд или спор": {
      fitText: "Отчет можно адаптировать для суда или переговорной позиции по спору.",
      priceDelta: [4000, 8000],
      timelineDelta: [1, 2],
      docsAdd: ["Материалы спора, претензии или судебные документы"],
    },
    "Нотариус или наследство": {
      fitText: "Отчет можно подготовить для нотариуса и наследственного оформления.",
      priceDelta: [1000, 3000],
      timelineDelta: [0, 1],
      docsAdd: ["Сведения по наследственному делу или нотариальному запросу"],
    },
    "Сделка или продажа": {
      fitText: "Отчет подойдет для сделки, продажи, переговоров и внутреннего ориентира по цене.",
      priceDelta: [0, 0],
      timelineDelta: [0, 0],
      docsAdd: ["Краткое описание сделки или задачи"],
    },
    "Бизнес-задача или бухгалтерия": {
      fitText: "Отчет можно подготовить для корпоративной процедуры, учета или внутренней проверки.",
      priceDelta: [5000, 15000],
      timelineDelta: [2, 4],
      docsAdd: ["Реквизиты компании и исходные файлы по задаче"],
    },
  },
  regions: {
    "Москва и Московская область": {
      priceDelta: [0, 0],
      timelineDelta: [0, 0],
      summary: "Объект находится в Москве или области.",
    },
    "Санкт-Петербург и Ленинградская область": {
      priceDelta: [1000, 3000],
      timelineDelta: [0, 1],
      summary: "Объект находится в Санкт-Петербурге или Ленинградской области.",
    },
    "Другой регион России": {
      priceDelta: [2000, 5000],
      timelineDelta: [1, 2],
      summary: "Задача по региону России, срок зависит от доступа к данным и формата работы.",
    },
    "Нужен выезд на объект": {
      priceDelta: [4000, 8000],
      timelineDelta: [1, 3],
      summary: "Нужен выезд на объект, поэтому срок и бюджет будут выше стандартного.",
    },
  },
};

function createHeader(page) {
  const links = NAV_ITEMS.map((item) => {
    const isActive = page === item.key || (page.startsWith("service-") && item.key === "services");
    const navLink = `<a href="${item.href}" class="${isActive ? "active" : ""}">${item.label}</a>`;
    if (item.key === "contacts") {
      return `${navLink}<a class="header-phone" href="tel:+78126404446">+7 812 640 44 46</a>`;
    }
    return navLink;
  }).join("");

  return `
    <header class="site-header" data-header>
      <div class="container">
        <div class="nav-shell">
          <a class="brand" href="/" aria-label="Экспресс Оценка">
            <span class="brand-mark">Экспресс Оценка</span>
            <span class="brand-note">Отчеты для банка, суда, нотариуса и бизнеса</span>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>
            <span class="nav-toggle-icon" aria-hidden="true">
              <span class="nav-toggle-line"></span>
              <span class="nav-toggle-line"></span>
              <span class="nav-toggle-line"></span>
            </span>
          </button>
          <nav class="nav-links" id="site-nav" aria-label="Основная навигация" data-nav>
            ${links}
          </nav>
          <div class="nav-actions">
            <a class="btn" href="/contacts/#lead-form">Узнать стоимость</a>
          </div>
        </div>
      </div>
    </header>
  `;
}

function createFooter() {
  return `
    <footer class="footer">
      <div class="footer-accent" aria-hidden="true"></div>
      <div class="container footer-inner">
        <div class="footer-main">
          <div class="footer-brand">
            <a class="footer-logo" href="/">
              <span class="footer-logo-mark">Экспресс Оценка</span>
              <span class="footer-logo-tagline">Федеральная оценочная практика для частных клиентов и бизнеса</span>
            </a>
            <p class="footer-lead">Работаем по всей России. Подсказываем стоимость, сроки и список документов без лишней бюрократии.</p>
            <p class="footer-trust">СРО, страхование ответственности, отчеты для банков, судов, нотариусов и корпоративных процедур.</p>
          </div>
          <nav class="footer-nav" aria-labelledby="footer-nav-title">
            <h3 id="footer-nav-title" class="footer-heading">Разделы</h3>
            <ul class="helper-list">
              <li><a href="/services/real-estate/">Оценка недвижимости</a></li>
              <li><a href="/services/business-valuation/">Оценка бизнеса</a></li>
              <li><a href="/documents/">Документы и образцы</a></li>
              <li><a href="/reviews/">Отзывы и кейсы</a></li>
            </ul>
          </nav>
          <div class="footer-contact" aria-labelledby="footer-contact-title">
            <h3 id="footer-contact-title" class="footer-heading">Контакты</h3>
            <ul class="helper-list">
              <li><a href="tel:${SITE_CONFIG.phoneHref}">${SITE_CONFIG.phoneDisplay}</a></li>
              <li><a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a></li>
              <li>${SITE_CONFIG.address}</li>
            </ul>
            <ul class="helper-list footer-requisites" aria-label="Реквизиты компании">
              <li>${SITE_CONFIG.legalName}</li>
              <li>${SITE_CONFIG.inn}</li>
              <li>${SITE_CONFIG.ogrn}</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copyright">© <span data-current-year></span> Экспресс Оценка</p>
          <a class="footer-legal" href="/terms/">Публичная оферта</a>
          <a class="footer-legal" href="/privacy/">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  `;
}

function mountShell() {
  const page = document.body.dataset.page || "home";
  const placeholder = document.querySelector("[data-site-header]");
  const main = document.getElementById("main-content");
  const footerTarget = document.querySelector("[data-site-footer]");

  if (main && main.parentElement === document.body) {
    if (!document.querySelector("[data-header]")) {
      main.insertAdjacentHTML("beforebegin", createHeader(page).trim());
    }
    if (placeholder) placeholder.remove();
  } else if (placeholder) {
    placeholder.innerHTML = createHeader(page);
  }

  if (footerTarget) footerTarget.innerHTML = createFooter();
}

function setupNavigation() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const header = document.querySelector("[data-header]");
  if (!toggle || !nav || !header) return;

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  function syncHeader() {
    header.classList.toggle("scrolled", window.scrollY > 50);
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  function setRippleOrigin(e) {
    if (reducedMotion.matches) return;
    const r = toggle.getBoundingClientRect();
    const x = Math.round(((e.clientX - r.left) / r.width) * 100);
    const y = Math.round(((e.clientY - r.top) / r.height) * 100);
    toggle.setAttribute("data-ripple-x", String(x));
    toggle.setAttribute("data-ripple-y", String(y));
    toggle.classList.add("nav-toggle--ripple");
  }

  toggle.addEventListener("pointerdown", setRippleOrigin);

  toggle.addEventListener("animationend", (e) => {
    if (e.animationName !== "nav-toggle-ripple") return;
    toggle.classList.remove("nav-toggle--ripple");
    toggle.removeAttribute("data-ripple-x");
    toggle.removeAttribute("data-ripple-y");
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1200) closeNav();
  });
  window.addEventListener("scroll", syncHeader, { passive: true });
  syncHeader();
}

function setupReveal() {
  const cardSelectors = ".card, .stat-card, .trust-card, .step-card, .document-card, .review-card, .contact-card";
  const grids = document.querySelectorAll('[class$="-grid"], .form-row, .process-track');
  grids.forEach((grid) => {
    const cards = Array.from(grid.querySelectorAll(cardSelectors));
    cards.forEach((card, index) => {
      if (!card.classList.contains("reveal")) card.classList.add("reveal");
      card.dataset.revealIndex = String(Math.min(index, 3));
    });
  });

  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px 140px 0px", threshold: 0.1 }
  );

  items.forEach((item) => observer.observe(item));
}

function parseCountValue(rawText) {
  const text = String(rawText || "").trim();
  const match = text.match(/(\d[\d\s]*)/);
  if (!match) return null;

  const consumed = match[1];
  const trimmedEnd = consumed.replace(/\s+$/, "");
  const numericPart = trimmedEnd.replace(/\s/g, "");
  const targetValue = Number.parseInt(numericPart, 10);
  if (!Number.isFinite(targetValue) || targetValue <= 0) return null;

  const suffix = text.slice(match.index + trimmedEnd.length);
  return { targetValue, suffix };
}

function setupStatsCountUp() {
  const statNodes = document.querySelectorAll(".stat-card .stat-value");
  if (!statNodes.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateNode(node) {
    if (node.dataset.counted === "true") return;
    node.dataset.counted = "true";

    const parsed = parseCountValue(node.textContent);
    if (!parsed) return;

    const { targetValue, suffix } = parsed;
    if (prefersReducedMotion) {
      node.textContent = `${targetValue}${suffix}`;
      return;
    }

    const durationMs = 1200;
    const startTs = performance.now();

    function tick(now) {
      const progress = Math.min(1, (now - startTs) / durationMs);
      const nextValue = Math.max(1, Math.floor(targetValue * progress));
      node.textContent = `${nextValue}${suffix}`;
      if (progress < 1) {
        window.requestAnimationFrame(tick);
        return;
      }
      node.textContent = `${targetValue}${suffix}`;
    }

    window.requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateNode(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  statNodes.forEach((node) => observer.observe(node));
}

function setupProcessStepSequence() {
  const section = document.querySelector("#process");
  if (!section) return;

  const steps = Array.from(section.querySelectorAll(".process-step"));
  if (steps.length < 2) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeIndex = -1;
  let timerId = null;
  let isRunning = false;

  function setActive(index) {
    steps.forEach((step, i) => step.classList.toggle("is-sequence-active", i === index));
    activeIndex = index;
  }

  function tick() {
    const nextIndex = activeIndex < 0 ? 0 : (activeIndex + 1) % steps.length;
    setActive(nextIndex);
  }

  function startSequence() {
    if (isRunning) return;
    isRunning = true;
    tick();
    if (prefersReducedMotion) return;
    timerId = window.setInterval(tick, 1500);
  }

  function stopSequence() {
    isRunning = false;
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
    steps.forEach((step) => step.classList.remove("is-sequence-active"));
    activeIndex = -1;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startSequence();
          return;
        }
        stopSequence();
      });
    },
    { threshold: 0.35 }
  );

  observer.observe(section);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopSequence();
      return;
    }
    const rect = section.getBoundingClientRect();
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < viewportH * 0.65 && rect.bottom > viewportH * 0.2) {
      startSequence();
    }
  });
}

/** Raw digits → up to 11 chars: Russian E.164 style 7XXXXXXXXXX */
function digitsToCanonicalRuTel(raw) {
  let x = String(raw).replace(/\D/g, "");
  if (!x) return "";
  if (x.length > 11) x = x.slice(0, 11);
  if (x.length === 11 && x[0] === "8") x = "7" + x.slice(1);
  if (x.length === 10 && x[0] !== "7") x = "7" + x;
  return x;
}

/** Stored / webhook: digits only (11 for full RU mobile/landline). */
function normalizePhone(value) {
  return digitsToCanonicalRuTel(value);
}

/** Display mask: +7 (XXX) XXX-XX-XX */
function formatRuPhoneDisplay(digits) {
  const d = digitsToCanonicalRuTel(digits);
  if (!d) return "";

  if (d[0] !== "7") {
    const rest = d;
    if (rest.length <= 3) return "+7 (" + rest;
    let s = "+7 (" + rest.slice(0, 3) + ") " + rest.slice(3, 6);
    if (rest.length <= 6) return s;
    s += "-" + rest.slice(6, 8);
    if (rest.length <= 8) return s;
    s += "-" + rest.slice(8, 10);
    return s;
  }

  const rest = d.slice(1);
  if (rest.length === 0) return "+7 ";

  if (rest.length <= 3) return "+7 (" + rest;
  let s = "+7 (" + rest.slice(0, 3) + ") " + rest.slice(3, 6);
  if (rest.length <= 6) return s;
  s += "-" + rest.slice(6, 8);
  if (rest.length <= 8) return s;
  s += "-" + rest.slice(8, 10);
  return s;
}

function isValidPhone(value) {
  const digits = normalizePhone(value);
  return digits.length === 11 && digits[0] === "7";
}

function setupPhoneInputs() {
  document.querySelectorAll('input[type="tel"]').forEach((input) => {
    input.setAttribute("inputmode", "tel");

    function applyFromString(str, moveCaretToEnd) {
      const d = digitsToCanonicalRuTel(str);
      input.value = formatRuPhoneDisplay(d);
      if (moveCaretToEnd) {
        const end = input.value.length;
        input.setSelectionRange(end, end);
      }
    }

    input.addEventListener("input", () => {
      applyFromString(input.value, true);
    });

    input.addEventListener("blur", () => {
      applyFromString(input.value, false);
    });

    if (input.value.trim()) {
      applyFromString(input.value, false);
    }
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

function formatPriceRange(range) {
  return `${formatPrice(range[0])} - ${formatPrice(range[1])} руб.`;
}

function formatTimelineRange(range) {
  return `${range[0]}-${range[1]} рабочих дня`;
}

function mergeRange(baseRange, deltaRange) {
  const min = Math.max(1, baseRange[0] + deltaRange[0]);
  const max = Math.max(min, baseRange[1] + deltaRange[1]);
  return [min, max];
}

function buildQuizRecommendation(answers) {
  const objectRule = QUIZ_RULES.objectTypes[answers.object_type];
  const purposeRule = QUIZ_RULES.purposes[answers.valuation_purpose];
  const regionRule = QUIZ_RULES.regions[answers.region_scope];

  if (!objectRule || !purposeRule || !regionRule) return null;

  const priceRange = mergeRange(mergeRange(objectRule.priceRange, purposeRule.priceDelta), regionRule.priceDelta);
  const timelineRange = mergeRange(mergeRange(objectRule.timelineRange, purposeRule.timelineDelta), regionRule.timelineDelta);
  const docs = [...new Set([...objectRule.docs, ...purposeRule.docsAdd])];

  return {
    title: objectRule.title,
    fitText: purposeRule.fitText,
    priceText: formatPriceRange(priceRange),
    timelineText: formatTimelineRange(timelineRange),
    documents: docs,
    message: `Объект: ${answers.object_type}. Цель: ${answers.valuation_purpose}. Локация: ${answers.region_scope}. Ориентир: ${formatPriceRange(priceRange)}, срок ${formatTimelineRange(timelineRange)}.`,
    summary: [
      `Запрос: ${answers.object_type}`,
      `Цель: ${answers.valuation_purpose}`,
      regionRule.summary,
    ],
  };
}

function renderQuizRecommendation(form, recommendation) {
  if (!recommendation) return;

  const titleNode = form.querySelector("[data-quiz-result-title]");
  const fitNode = form.querySelector("[data-quiz-result-fit]");
  const priceNode = form.querySelector("[data-quiz-price]");
  const timelineNode = form.querySelector("[data-quiz-timeline]");
  const docsNode = form.querySelector("[data-quiz-doc-list]");
  const summaryNode = form.querySelector("[data-quiz-summary]");

  if (titleNode) titleNode.textContent = recommendation.title;
  if (fitNode) fitNode.textContent = recommendation.fitText;
  if (priceNode) priceNode.textContent = recommendation.priceText;
  if (timelineNode) timelineNode.textContent = recommendation.timelineText;

  if (docsNode) {
    docsNode.innerHTML = recommendation.documents.map((item) => `<li>${item}</li>`).join("");
  }

  if (summaryNode) {
    summaryNode.innerHTML = recommendation.summary.map((item) => `<li>${item}</li>`).join("");
  }

  const estimatedPriceField = form.elements.estimated_price;
  const estimatedTimelineField = form.elements.estimated_timeline;
  const recommendedDocumentsField = form.elements.recommended_documents;
  const reportFitField = form.elements.report_fit;
  const messageField = form.elements.message;

  if (estimatedPriceField) estimatedPriceField.value = recommendation.priceText;
  if (estimatedTimelineField) estimatedTimelineField.value = recommendation.timelineText;
  if (recommendedDocumentsField) recommendedDocumentsField.value = recommendation.documents.join("; ");
  if (reportFitField) reportFitField.value = recommendation.fitText;
  if (messageField) messageField.value = recommendation.message;
}

function scrollQuizIntoView(quiz) {
  if (!quiz) return;
  const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height"), 10) || 62;
  const top = quiz.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
  window.scrollTo({ top, behavior: "smooth" });
}

function setupQuiz() {
  const quizzes = document.querySelectorAll("[data-quiz]");
  if (!quizzes.length) return;

  quizzes.forEach((quiz) => {
    const form = quiz.querySelector("form[data-quiz-form]");
    const steps = Array.from(quiz.querySelectorAll("[data-quiz-step]"));
    const progressSteps = Array.from(quiz.querySelectorAll("[data-quiz-progress-step]"));
    const answerButtons = Array.from(quiz.querySelectorAll("[data-quiz-answer]"));
    const backButtons = Array.from(quiz.querySelectorAll("[data-quiz-back]"));
    const restartButton = quiz.querySelector("[data-quiz-restart]");
    if (!form || !steps.length) return;

    let activeStepIndex = 0;
    const progressLabel = quiz.querySelector("#quiz-progress-label");
    const progressHeader = quiz.querySelector("[data-quiz-progress-header]");

    function syncActiveAnswers() {
      answerButtons.forEach((button) => {
        const fieldName = button.dataset.quizField;
        const field = fieldName ? form.elements[fieldName] : null;
        const isSelected = Boolean(field && "value" in field && field.value === button.dataset.value);
        button.classList.toggle("is-selected", isSelected);
      });
    }

    function updateProgressChrome(stepIndex) {
      if (progressLabel) {
        if (stepIndex < 3) {
          progressLabel.hidden = false;
          progressLabel.textContent = `Вопрос ${stepIndex + 1} из 3`;
        } else {
          progressLabel.hidden = true;
        }
      }
      if (progressHeader) {
        progressHeader.classList.toggle("is-result", stepIndex >= 3);
      }
      progressSteps.forEach((step, index) => {
        step.classList.toggle("is-active", index <= stepIndex);
      });
    }

    function setStep(nextStepIndex, instant = false) {
      const target = Math.max(0, Math.min(nextStepIndex, steps.length - 1));
      if (target === activeStepIndex) {
        if (steps[target]?.classList.contains("is-active")) {
          updateProgressChrome(target);
          return;
        }
        instant = true;
      }

      const outgoing = steps[activeStepIndex];
      const incoming = steps[target];
      const forward = target > activeStepIndex;

      function applyInstant() {
        activeStepIndex = target;
        steps.forEach((step, index) => {
          step.classList.toggle("is-active", index === target);
          step.classList.remove(
            "quiz-step--exit-fwd",
            "quiz-step--exit-back",
            "quiz-step--enter-fwd",
            "quiz-step--enter-back"
          );
        });
        updateProgressChrome(target);
      }

      if (instant || !outgoing || !incoming || outgoing === incoming) {
        applyInstant();
        return;
      }

      const exitClass = forward ? "quiz-step--exit-fwd" : "quiz-step--exit-back";
      const enterClass = forward ? "quiz-step--enter-fwd" : "quiz-step--enter-back";

      let completed = false;
      function finish() {
        if (completed) return;
        completed = true;
        outgoing.classList.remove("is-active", exitClass);
        activeStepIndex = target;
        incoming.classList.add("is-active", enterClass);
        updateProgressChrome(target);
        function onEnterEnd(e) {
          if (e.target !== incoming) return;
          incoming.removeEventListener("animationend", onEnterEnd);
          incoming.classList.remove(enterClass);
        }
        incoming.addEventListener("animationend", onEnterEnd, { once: true });
        window.setTimeout(() => incoming.classList.remove(enterClass), 280);
      }

      outgoing.classList.add(exitClass);

      outgoing.addEventListener(
        "animationend",
        function onExitEnd(e) {
          if (e.target !== outgoing) return;
          outgoing.removeEventListener("animationend", onExitEnd);
          finish();
        },
        { once: true }
      );

      window.setTimeout(() => {
        if (completed || incoming.classList.contains("is-active")) return;
        finish();
      }, 240);
    }

    function resetQuizMessages() {
      const successBox = form.querySelector("[data-success-message]");
      const errorBox = form.querySelector("[data-form-error]");
      setFormMessage(successBox, "", true);
      setFormMessage(errorBox, "", false);
    }

    function restartQuiz() {
      form.reset();
      form.querySelectorAll("input, select, textarea").forEach((field) => clearFieldError(field));
      syncActiveAnswers();
      resetQuizMessages();
      setStep(0, true);
    }

    answerButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const fieldName = button.dataset.quizField;
        const value = button.dataset.value || "";
        const field = fieldName ? form.elements[fieldName] : null;
        if (!field || !("value" in field)) return;

        field.value = value;
        clearFieldError(field);
        syncActiveAnswers();
        resetQuizMessages();

        if (activeStepIndex < 2) {
          setStep(activeStepIndex + 1);
          return;
        }

        const recommendation = buildQuizRecommendation({
          object_type: String(form.elements.object_type?.value || ""),
          valuation_purpose: String(form.elements.valuation_purpose?.value || ""),
          region_scope: String(form.elements.region_scope?.value || ""),
        });

        renderQuizRecommendation(form, recommendation);
        setStep(3);
      });
    });

    backButtons.forEach((button) => {
      button.addEventListener("click", () => {
        resetQuizMessages();
        setStep(activeStepIndex === 3 ? 2 : activeStepIndex - 1);
        scrollQuizIntoView(quiz);
      });
    });

    if (restartButton) {
      restartButton.addEventListener("click", restartQuiz);
    }

    syncActiveAnswers();
    setStep(0, true);
  });
}

function getFormPayload(form) {
  const payload = {};

  Array.from(new FormData(form).entries()).forEach(([key, value]) => {
    const normalizedValue = String(value).trim();
    if (!normalizedValue) return;
    payload[key] = normalizedValue;
  });

  if (payload.phone) payload.phone = normalizePhone(payload.phone);
  payload.timestamp = new Date().toISOString();
  payload.personalDataConsent = Boolean(form.elements.personalDataConsent?.checked);
  payload.marketingConsent = Boolean(form.elements.marketingConsent?.checked);
  payload.consentTimestamp = new Date().toISOString();
  payload.consentSource = window.location.href;
  payload.consentDocuments = {
    privacyPolicy: "/privacy-policy",
    personalDataConsent: "/personal-data-consent",
    marketingConsent: "/marketing-consent",
  };
  return payload;
}

function clearFieldError(field) {
  const error = field.closest(".field")?.querySelector(".error-message");
  field.removeAttribute("aria-invalid");
  if (!error) return;
  error.textContent = "";
  error.classList.remove("is-visible");
}

function setFieldError(field, message) {
  const error = field.closest(".field")?.querySelector(".error-message");
  field.setAttribute("aria-invalid", "true");
  if (!error) return;
  error.textContent = message;
  error.classList.add("is-visible");
}

function setFormMessage(target, message, isSuccess) {
  if (!target) return;
  target.textContent = message;
  target.classList.toggle("is-visible", Boolean(message));
  target.classList.toggle("success-message", isSuccess);
  target.classList.toggle("error-message", !isSuccess);
}

async function submitLeadForm(form) {
  const webhookUrl = form.dataset.webhook || SITE_CONFIG.webhookUrl;
  if (!webhookUrl || webhookUrl === "YOUR_N8N_WEBHOOK_URL") throw new Error("webhook_missing");

  const payload = getFormPayload(form);

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("submit_failed");
  return payload;
}

function setupForms() {
  const forms = document.querySelectorAll("form[data-lead-form]");
  if (!forms.length) return;

  forms.forEach((form) => {
    form.noValidate = true;
    const submitButton = form.querySelector("button[type='submit']");
    const successBox = form.querySelector("[data-success-message]");
    const errorBox = form.querySelector("[data-form-error]");
    const defaultLabel = submitButton?.dataset.defaultLabel || submitButton?.textContent || "Отправить";
    const shouldReset = form.dataset.resetOnSuccess !== "false";
    const successMessage = form.dataset.successMessageText || "Заявка отправлена. Специалист свяжется с вами в рабочее время.";

    form.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener("input", () => clearFieldError(field));
      field.addEventListener("change", () => clearFieldError(field));
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      setFormMessage(successBox, "", true);
      setFormMessage(errorBox, "", false);

      const lastSubmit = Number(localStorage.getItem(SUBMIT_STORAGE_KEY) || 0);
      const elapsed = Date.now() - lastSubmit;
      if (elapsed < SUBMIT_COOLDOWN_MS) {
        const secsLeft = Math.ceil((SUBMIT_COOLDOWN_MS - elapsed) / 1000);
        setFormMessage(errorBox, `Заявка уже отправлена. Повторите через ${secsLeft} сек.`, false);
        return;
      }

      let hasError = false;
      const requiredFields = form.querySelectorAll("[required]");
      requiredFields.forEach((field) => {
        clearFieldError(field);
        const ok =
          field.type === "checkbox" ? field.checked : Boolean(String(field.value).trim());
        if (!ok) {
          hasError = true;
          setFieldError(
            field,
            field.name === "personalDataConsent"
              ? "Необходимо дать согласие на обработку персональных данных."
              : "Заполните поле",
          );
        }
      });

      const phoneField = form.querySelector("input[name='phone']");
      if (phoneField && phoneField.value.trim() && !isValidPhone(phoneField.value)) {
        hasError = true;
        setFieldError(phoneField, "Укажите телефон в корректном формате");
      }

      const emailField = form.querySelector("input[type='email']");
      if (emailField && emailField.value.trim() && !isValidEmail(emailField.value.trim())) {
        hasError = true;
        setFieldError(emailField, "Укажите email в корректном формате");
      }

      if (hasError) return;

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Отправляем...";
      }

      try {
        await submitLeadForm(form);
        localStorage.setItem(SUBMIT_STORAGE_KEY, String(Date.now()));
        if (shouldReset) form.reset();
        setFormMessage(successBox, successMessage, true);
      } catch (error) {
        const message = error.message === "webhook_missing"
          ? "Webhook пока не настроен. Укажите адрес n8n в assets/js/site.js."
          : "Не удалось отправить заявку. Повторите попытку или позвоните нам.";
        setFormMessage(errorBox, message, false);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = defaultLabel;
        }
      }
    });
  });
}

function setupFloatingCtaBar() {
  document.querySelectorAll("a.floating-call").forEach((telLink) => {
    if (telLink.closest(".floating-cta-bar")) return;

    const bar = document.createElement("div");
    bar.className = "floating-cta-bar";

    const lead = document.createElement("a");
    lead.className = "floating-lead";
    lead.href = "/contacts/#lead-form";
    lead.textContent = "Оставить заявку";

    telLink.parentNode.insertBefore(bar, telLink);
    bar.appendChild(lead);
    bar.appendChild(telLink);
  });
}

function fillDynamicText() {
  document.querySelectorAll("[data-phone-display]").forEach((node) => {
    node.textContent = SITE_CONFIG.phoneDisplay;
  });
  document.querySelectorAll("[data-phone-href]").forEach((node) => {
    node.setAttribute("href", `tel:${SITE_CONFIG.phoneHref}`);
  });
  document.querySelectorAll("[data-whatsapp-href]").forEach((node) => {
    node.setAttribute("href", SITE_CONFIG.whatsappHref);
  });
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

function setupPreviewLightbox() {
  const lightbox = document.getElementById("doc-lightbox");
  const image = lightbox ? lightbox.querySelector(".doc-lightbox__img") : null;
  const title = lightbox ? lightbox.querySelector(".doc-lightbox__title") : null;
  const frame = lightbox ? lightbox.querySelector(".doc-lightbox__frame") : null;
  const closeItems = lightbox ? lightbox.querySelectorAll("[data-preview-close]") : [];
  const cards = Array.from(document.querySelectorAll("[data-preview-card]"));
  let activeTrigger = null;

  if (!lightbox || !image || !title || !frame || !cards.length) return;

  function closePreview() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("hidden", "");
    frame.scrollTop = 0;
    image.setAttribute("src", "");
    image.setAttribute("alt", "");
    title.textContent = "";
    document.body.classList.remove("preview-open");
    if (activeTrigger) activeTrigger.focus();
    activeTrigger = null;
  }

  function openPreview(card) {
    const previewImage = card.querySelector("figure img");
    const previewTitle = card.querySelector("h3");
    const src = previewImage ? previewImage.getAttribute("src") : "";
    if (!src) return;

    activeTrigger = card;
    image.setAttribute("src", src);
    image.setAttribute("alt", previewImage.getAttribute("alt") || "");
    title.textContent = previewTitle ? previewTitle.textContent.trim() : "";
    frame.scrollTop = 0;
    lightbox.removeAttribute("hidden");
    document.body.classList.add("preview-open");
    requestAnimationFrame(() => lightbox.classList.add("active"));
  }

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target && target.closest("a, button")) return;
      openPreview(card);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPreview(card);
    });
  });

  closeItems.forEach((item) => item.addEventListener("click", closePreview));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("active")) closePreview();
  });
}

function setupPreviewFallback() {
  if (document.getElementById("doc-lightbox")) return;

  const cards = Array.from(document.querySelectorAll("[data-preview-card]"));
  if (!cards.length) return;

  function openCardImage(card) {
    const image = card.querySelector("figure img");
    const src = image ? image.getAttribute("src") : "";
    if (src) window.open(src, "_blank", "noopener");
  }

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target && target.closest("a, button")) return;
      openCardImage(card);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openCardImage(card);
    });
  });
}

function setupFaqAccordion() {
  const root = document.querySelector("[data-faq-accordion]");
  if (!root) return;

  const items = Array.from(root.querySelectorAll("[data-faq-item]"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function setPanelOpenState(panel, open) {
    if (prefersReducedMotion.matches) {
      panel.style.maxHeight = open ? "none" : "0px";
      panel.setAttribute("aria-hidden", open ? "false" : "true");
      return;
    }

    if (open) {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
      panel.setAttribute("aria-hidden", "false");
      // After transition, set to none to allow for resize
      const onEnd = (e) => {
        if (e.propertyName === "max-height") {
          panel.style.maxHeight = "none";
          panel.removeEventListener("transitionend", onEnd);
        }
      };
      panel.addEventListener("transitionend", onEnd);
    } else {
      // If none, set to scrollHeight first to allow transition
      if (panel.style.maxHeight === "none") {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
        // Force reflow
        panel.offsetHeight;
      }
      panel.style.maxHeight = "0px";
      panel.setAttribute("aria-hidden", "true");
    }
  }

  items.forEach((item, index) => {
    const trigger = item.querySelector("[data-faq-trigger]");
    const panel = item.querySelector("[data-faq-panel]");
    if (!trigger || !panel) return;

    if (!panel.id) panel.id = `faq-panel-${index}`;
    if (!trigger.id) trigger.id = `faq-trigger-${index}`;

    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", panel.id);
    panel.setAttribute("aria-labelledby", trigger.id);
    panel.setAttribute("role", "region");
    panel.hidden = false;
    panel.style.maxHeight = "0px";
    panel.setAttribute("aria-hidden", "true");

    trigger.addEventListener("click", () => {
      const willOpen = trigger.getAttribute("aria-expanded") !== "true";
      items.forEach((other) => {
        const t = other.querySelector("[data-faq-trigger]");
        const p = other.querySelector("[data-faq-panel]");
        if (!t || !p) return;
        const open = other === item ? willOpen : false;
        t.setAttribute("aria-expanded", open ? "true" : "false");
        setPanelOpenState(p, open);
        other.classList.toggle("is-open", open);
      });
    });
  });
}

function setupHeroPrefill() {
  const pills = document.querySelectorAll(".hero-prefill__pill[data-prefill]");
  if (!pills.length) return;
  let isPrefillLocked = false;

  pills.forEach((pill) => {
    pill.addEventListener("click", (e) => {
      e.preventDefault();
      if (isPrefillLocked || pill.classList.contains("is-active")) return;
      isPrefillLocked = true;
      const value = pill.dataset.prefill;

      const quizAnswer = document.querySelector(
        `[data-quiz-answer][data-quiz-field="object_type"][data-value="${value}"]`
      );

      pills.forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");
      pills.forEach((p) => p.setAttribute("aria-disabled", "true"));

      const quizEl = document.getElementById("hero-quiz");
      if (quizEl) {
        quizEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      window.setTimeout(() => {
        if (quizAnswer) quizAnswer.click();
        isPrefillLocked = false;
        pills.forEach((p) => p.removeAttribute("aria-disabled"));
      }, 400);
    });
  });
}

function getTextEffectSegments(text, per) {
  if (per === "line") return String(text).split("\n");
  if (per === "char") return String(text).split("");
  return String(text).split(/(\s+)/);
}

function getTextEffectStagger(per) {
  if (per === "char") return 30;
  if (per === "line") return 100;
  return 90;
}

function animateStaticTextEffect(node) {
  const text = String(node.textContent || "").trim();
  if (!text) return;

  const per = node.dataset.per || "word";
  const preset = node.dataset.preset || "slide";
  const delayMs = Math.max(0, Number(node.dataset.delay || 0) * 1000);
  const isHeroPremium = preset === "hero-premium";
  const staggerMs = isHeroPremium
    ? Math.max(28, Math.floor(getTextEffectStagger(per) * 0.85))
    : Math.max(20, Math.floor(getTextEffectStagger(per) * 0.7));
  const segments = getTextEffectSegments(text, per);
  const segmentClassName = per === "line" ? "is-line" : per === "char" ? "is-char" : "is-word";

  node.setAttribute("aria-label", text);
  node.innerHTML = "";

  segments.forEach((segment, index) => {
    const segmentNode = document.createElement("span");
    segmentNode.className = `text-effect-segment ${segmentClassName}`;
    segmentNode.dataset.preset = preset;
    segmentNode.textContent = segment;
    const noWrapWords = ["суде", "и", "у", "нотариуса.", "Срок", "—", "от", "1", "дня."];
    if (noWrapWords.includes(segment)) {
      segmentNode.style.whiteSpace = "nowrap";
    }
    segmentNode.setAttribute("aria-hidden", "true");
    segmentNode.style.transition = isHeroPremium
      ? "opacity 520ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1), filter 700ms cubic-bezier(0.22, 1, 0.36, 1)"
      : "opacity 420ms ease, transform 540ms ease, filter 540ms ease";
    segmentNode.style.transitionDelay = `${delayMs + index * staggerMs}ms`;
    node.appendChild(segmentNode);
  });

  requestAnimationFrame(() => {
    node.querySelectorAll(".text-effect-segment").forEach((segmentNode) => {
      segmentNode.classList.add("is-visible");
    });
  });
}

function setupStaticTextEffects() {
  const nodes = document.querySelectorAll("[data-text-effect-static]");
  if (!nodes.length) return;
  nodes.forEach((node) => animateStaticTextEffect(node));
}

function setupTextEffectDemo() {
  const root = document.querySelector("[data-text-effect-root]");
  const triggerButton = document.querySelector("[data-text-effect-trigger]");
  const textInput = document.querySelector("[data-text-effect-input]");
  const perSelect = document.querySelector("[data-text-effect-per]");
  const presetSelect = document.querySelector("[data-text-effect-preset]");
  const delayInput = document.querySelector("[data-text-effect-delay]");
  const loopToggle = document.querySelector("[data-text-effect-loop]");

  if (!root || !triggerButton || !textInput || !perSelect || !presetSelect || !delayInput || !loopToggle) return;

  let loopTimerId = null;

  function clearLoop() {
    if (!loopTimerId) return;
    window.clearTimeout(loopTimerId);
    loopTimerId = null;
  }

  function renderAndAnimate() {
    const text = String(textInput.value || "").trim() || "Animate your ideas with motion-primitives";
    const per = perSelect.value;
    const preset = presetSelect.value;
    const delayMs = Math.max(0, Number(delayInput.value || 0) * 1000);
    const shouldLoop = loopToggle.checked;
    const staggerMs = getTextEffectStagger(per);
    const segments = getTextEffectSegments(text, per);
    const segmentClassName = per === "line" ? "is-line" : per === "char" ? "is-char" : "is-word";

    clearLoop();
    root.innerHTML = "";
    root.dataset.per = per;
    root.dataset.preset = preset;
    root.dataset.delay = String(delayMs / 1000);

    segments.forEach((segment, index) => {
      const node = document.createElement("span");
      node.className = `text-effect-segment ${segmentClassName}`;
      node.dataset.preset = preset;
      node.textContent = segment;
      node.style.transition = "opacity 320ms ease, transform 380ms ease, filter 380ms ease";
      node.style.transitionDelay = `${delayMs + index * staggerMs}ms`;
      root.appendChild(node);
    });

    const nodes = root.querySelectorAll(".text-effect-segment");
    requestAnimationFrame(() => {
      nodes.forEach((node) => node.classList.add("is-visible"));
    });

    if (!shouldLoop) return;

    const cycleDuration = delayMs + nodes.length * staggerMs + 1200;
    loopTimerId = window.setTimeout(() => {
      nodes.forEach((node) => node.classList.remove("is-visible"));
      window.setTimeout(renderAndAnimate, 360);
    }, cycleDuration);
  }

  triggerButton.addEventListener("click", renderAndAnimate);
  perSelect.addEventListener("change", renderAndAnimate);
  presetSelect.addEventListener("change", renderAndAnimate);
  delayInput.addEventListener("change", renderAndAnimate);
  loopToggle.addEventListener("change", renderAndAnimate);

  renderAndAnimate();
}

function setupCookieBanner() {
  try {
    if (localStorage.getItem(COOKIE_STORAGE_KEY) === "1") return;
  } catch (error) {
    return;
  }

  const banner = document.createElement("div");
  banner.id = "cookie-banner";
  banner.className = "cookie-banner";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", "Уведомление об использовании cookie");

  banner.innerHTML = `
    <div class="cookie-banner__inner">
      <div class="cookie-banner__body">
        <svg class="cookie-banner__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-9.29-9 .5.5 0 0 1 .5.5 3 3 0 0 0 3 3 .5.5 0 0 1 .5.5 3 3 0 0 0 3 3 .5.5 0 0 1 .29.5"/>
          <circle cx="7.5" cy="10.5" r="0.75" fill="currentColor" stroke="none"/>
          <circle cx="11" cy="14.5" r="0.75" fill="currentColor" stroke="none"/>
          <circle cx="14.5" cy="9.5" r="0.75" fill="currentColor" stroke="none"/>
        </svg>
        <p>Сайт использует cookie для работы виджетов Яндекс.Карт и шрифтов Google. Продолжая использование сайта, вы соглашаетесь с нашей <a href="/privacy/">политикой конфиденциальности</a>.</p>
      </div>
      <button class="cookie-banner__btn" type="button">Понятно</button>
    </div>
  `;

  document.body.appendChild(banner);
  document.body.classList.add("cookie-banner-visible");

  const updateHeight = () => {
    document.documentElement.style.setProperty("--cookie-banner-h", banner.offsetHeight + "px");
  };
  updateHeight();

  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(updateHeight).observe(banner);
  }

  banner.querySelector(".cookie-banner__btn").addEventListener("click", () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, "1");
    } catch (error) {
      // Consent storage is best-effort; the UI should still close.
    }
    banner.classList.add("is-hiding");
    document.body.classList.remove("cookie-banner-visible");
    setTimeout(() => {
      banner.remove();
      document.documentElement.style.removeProperty("--cookie-banner-h");
    }, 340);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mountShell();
  setupFloatingCtaBar();
  fillDynamicText();
  setupNavigation();
  setupReveal();
  setupStatsCountUp();
  setupProcessStepSequence();
  setupPhoneInputs();
  setupQuiz();
  setupHeroPrefill();
  setupForms();
  setupPreviewLightbox();
  setupPreviewFallback();
  setupFaqAccordion();
  setupTextEffectDemo();
  setupStaticTextEffects();
  setupCookieBanner();
});

function restorePageTransitionState({ deferReady = false } = {}) {
  const curtain = document.getElementById("page-curtain");
  if (curtain) curtain.remove();

  document.body.classList.remove("page-exit");
  const markReady = () => {
    document.body.classList.add("page-ready");
  };

  if (deferReady) {
    window.setTimeout(markReady, 10);
  } else {
    markReady();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  restorePageTransitionState({ deferReady: true });
});

window.addEventListener("pageshow", (event) => {
  if (!event.persisted) return;
  restorePageTransitionState();
});

document.addEventListener("click", (event) => {
  if (event.defaultPrevented) return;
  if (event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const link = event.target instanceof Element ? event.target.closest("a") : null;
  if (!link) return;
  if (link.classList.contains("skip-link")) return;
  if (link.target === "_blank") return;
  if (link.hasAttribute("download")) return;

  const rawHref = link.getAttribute("href");
  if (!rawHref || rawHref.startsWith("#")) return;

  const nextUrl = new URL(link.href, window.location.href);
  if (nextUrl.origin !== window.location.origin) return;
  if (nextUrl.protocol === "mailto:" || nextUrl.protocol === "tel:") return;

  const currentNoHash = `${window.location.origin}${window.location.pathname}${window.location.search}`;
  const nextNoHash = `${nextUrl.origin}${nextUrl.pathname}${nextUrl.search}`;
  if (currentNoHash === nextNoHash && nextUrl.hash) return;

  event.preventDefault();
  document.body.classList.remove("page-ready");
  document.body.classList.add("page-exit");
  window.setTimeout(() => {
    window.location.href = nextUrl.href;
  }, 260);
});
