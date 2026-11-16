/**
 * AI DEVELOPMENT COMPANY — PREMIUM DEMO JAVASCRIPT
 * Vanilla JS (Zero external frameworks, 100% Hostinger Static Compatible)
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initScrollReveal();
  initBackToTop();
  initFaqAccordion();
  initInteractiveUseCaseSelector();
  initPortfolioModals();
  initContactFormValidation();
  highlightActiveNavLink();
});

/* --------------------------------------------------------------------------
   1. Sticky Header & Scroll Handler
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Hamburger Menu
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!toggleBtn || !mobileNav) return;

  const toggleMenu = () => {
    const isOpen = toggleBtn.classList.toggle('active');
    mobileNav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    toggleBtn.setAttribute('aria-expanded', isOpen);
  };

  toggleBtn.addEventListener('click', toggleMenu);

  // Close when clicking any nav link inside mobile drawer
  mobileNav.querySelectorAll('.nav-link, .btn').forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when pressing ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      toggleBtn.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   3. Highlight Active Nav Link based on Current URL
   -------------------------------------------------------------------------- */
function highlightActiveNavLink() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    const linkPage = href.split('/').pop();
    if (linkPage === page || (page === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   4. Scroll Reveal via IntersectionObserver
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if observer not supported
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

/* --------------------------------------------------------------------------
   5. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const bttBtn = document.querySelector('.back-to-top');
  if (!bttBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      bttBtn.classList.add('visible');
    } else {
      bttBtn.classList.remove('visible');
    }
  }, { passive: true });

  bttBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   6. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherPanel = otherItem.querySelector('.faq-panel');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. Interactive Use-Case Selector (Solutions Page)
   -------------------------------------------------------------------------- */
const useCaseData = {
  support: {
    badge: "Customer Support Automation",
    title: "Instant 24/7 Multi-Channel Resolution Agent",
    desc: "Deploy intelligent assistants capable of diagnosing user inquiries, executing policy-compliant account actions, and escalating intricate queries with rich context directly to human specialists.",
    steps: [
      "Natural Language Intent Identification & multi-lingual parsing",
      "Real-time knowledge retrieval from indexed company documentation",
      "Secure API execution for routine tasks (order status, booking updates, reset flows)",
      "Zero-latency human agent handoff with summarized customer intent"
    ],
    metric1: "85%",
    metric1Label: "Routine Inquiries Resolved",
    metric2: "< 1.2s",
    metric2Label: "Median First Response Time",
    metric3: "24/7",
    metric3Label: "Autonomous Coverage"
  },
  sales: {
    badge: "Sales & Pipeline Acceleration",
    title: "Autonomous Inbound Lead Qualification & Scheduler",
    desc: "Engage inbound visitors in consultative dialogue, evaluate qualification parameters according to custom ICP rubrics, and dynamically book high-intent meetings onto sales reps' calendars.",
    steps: [
      "Real-time conversational qualification against Ideal Customer Profile (ICP)",
      "Automatic data enrichment from company registry and domain intelligence",
      "Instant calendar routing based on territory, deal size and AE availability",
      "Automatic bidirectional CRM sync (Salesforce, HubSpot, Custom APIs)"
    ],
    metric1: "4.2x",
    metric1Label: "Faster Qualification Cycle",
    metric2: "94%",
    metric2Label: "Lead Parameter Accuracy",
    metric3: "0 min",
    metric3Label: "Response Lag Time"
  },
  operations: {
    badge: "Document & Workflow Automation",
    title: "End-to-End Invoice & Contract Intelligence Engine",
    desc: "Ingest unstructured PDF, scanned paperwork, and email attachments, parsing critical entities into structured schemas with human-in-the-loop verification triggers for anomaly mitigation.",
    steps: [
      "Computer vision & layout-aware optical character extraction",
      "Semantic entity mapping against customizable schema definitions",
      "Confidence scoring with automatic flagging of discrepancies",
      "Direct integration into ERP, accounting software and cloud storage"
    ],
    metric1: "99.4%",
    metric1Label: "Entity Extraction Accuracy",
    metric2: "80%",
    metric2Label: "Manual Processing Reduction",
    metric3: "2.4s",
    metric3Label: "Average Processing Per Page"
  },
  internal: {
    badge: "Internal Team Productivity",
    title: "Secure Enterprise Knowledge Retrieval Assistant",
    desc: "Unify company wikis, Jira tickets, Notion workspaces, and product specs into a privacy-first conversational index so internal teams find verified answers instantly with citations.",
    steps: [
      "Role-based access control (RBAC) ensuring employees see only authorized data",
      "Hybrid dense-sparse vector search over private enterprise repositories",
      "Source citation with clickable links to original internal documentation",
      "Automated gap analysis highlighting missing documentation topics"
    ],
    metric1: "3.5 hrs",
    metric1Label: "Saved Per Employee / Week",
    metric2: "100%",
    metric2Label: "Verifiable Source Citations",
    metric3: "SOC-2",
    metric3Label: "Privacy Architecture Alignment"
  }
};

function initInteractiveUseCaseSelector() {
  const tabs = document.querySelectorAll('.usecase-tab-btn');
  const panel = document.querySelector('.usecase-content-panel');
  if (!tabs.length || !panel) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const caseKey = tab.getAttribute('data-case');
      const data = useCaseData[caseKey];
      if (!data) return;

      // Update panel content with subtle fade
      panel.style.opacity = '0.4';
      setTimeout(() => {
        panel.innerHTML = `
          <div class="usecase-badge">${data.badge}</div>
          <h3 class="usecase-solution-title">${data.title}</h3>
          <p class="usecase-solution-desc">${data.desc}</p>
          <div class="usecase-step-list">
            ${data.steps.map((step, idx) => `
              <div class="usecase-step-item">
                <div class="usecase-step-bullet">${idx + 1}</div>
                <div>${step}</div>
              </div>
            `).join('')}
          </div>
          <div class="usecase-metrics-bar">
            <div class="usecase-metric">
              <span class="metric-val">${data.metric1}</span>
              <span class="metric-label">${data.metric1Label}</span>
            </div>
            <div class="usecase-metric">
              <span class="metric-val">${data.metric2}</span>
              <span class="metric-label">${data.metric2Label}</span>
            </div>
            <div class="usecase-metric">
              <span class="metric-val">${data.metric3}</span>
              <span class="metric-label">${data.metric3Label}</span>
            </div>
          </div>
        `;
        panel.style.opacity = '1';
      }, 150);
    });
  });
}

/* --------------------------------------------------------------------------
   8. Portfolio Demo Modals
   -------------------------------------------------------------------------- */
const portfolioModalData = {
  support: {
    title: "AI Customer Support Assistant — Architecture & Workflow",
    category: "Conversational AI & Ticket Deflection",
    tagline: "Illustrative Prototype: Hybrid Retrieval-Augmented Support Assistant",
    overview: "This demonstration illustrates an automated tier-1 customer support architecture. Incoming inquiries undergo real-time sentiment scoring and semantic intent classification before referencing approved documentation stores to formulate grounded responses.",
    features: [
      "Sub-second vector retrieval over domain knowledge bases",
      "Configurable escalation thresholds with full conversation context preservation",
      "Multilingual translation and tone adaptation based on user sentiment",
      "Zero training on private customer conversations (stateless inference)"
    ],
    technicalHighlights: [
      "Inference Latency: ~84ms",
      "Architecture: Retrieval-Augmented Generation (RAG) + Guardrail Filter",
      "Integration Surface: REST Webhooks, WebSocket stream, Helpdesk SDK"
    ]
  },
  voice: {
    title: "AI Voice Receptionist Interface — Interactive Demonstration",
    category: "Speech AI & Telephony Automation",
    tagline: "Illustrative Prototype: Low-Latency Conversational Voice Agent",
    overview: "Demonstrating high-fidelity inbound phone call handling. The agent operates with natural turn-taking dynamics, handling appointment booking, caller routing, and basic triage without robotic delays.",
    features: [
      "Under 600ms end-to-end voice-to-voice response cycle",
      "Dynamic acoustic interruption handling (duplex conversational flow)",
      "Automated phone call transcription, recording, and CRM summary sync",
      "Fallback to human operator on caller distress or complex edge cases"
    ],
    technicalHighlights: [
      "Voice Pipeline: Real-time STT + LLM Engine + Neural TTS",
      "Telephony: SIP Trunking / Twilio / WebRTC compatibility",
      "Availability: 24/7/365 uninterrupted concurrent call capacity"
    ]
  },
  document: {
    title: "Intelligent Document Processing System — Demo Overview",
    category: "Vision & Document Intelligence",
    tagline: "Illustrative Prototype: Unstructured OCR & Entity Extraction",
    overview: "Showcasing automated extraction from unstructured invoices, contracts, receipts, and clinical intake forms into strongly typed JSON data schemas ready for enterprise ingestion.",
    features: [
      "High-accuracy optical character recognition on scanned PDFs and images",
      "Hierarchical entity pairing (line items, taxation tables, signer metadata)",
      "Confidence-weighted validation flags for anomaly review",
      "Standardized JSON/CSV export directly into existing ERP systems"
    ],
    technicalHighlights: [
      "Vision Pipeline: Multimodal Vision-Language Models + OCR",
      "Throughput: Batch ingestion at up to 120 pages/minute",
      "Security: End-to-end encrypted processing with zero cloud data retention"
    ]
  },
  workflow: {
    title: "AI Workflow Automation Dashboard — Multi-System Orchestration",
    category: "Autonomous Systems & Agentic Workflows",
    tagline: "Illustrative Prototype: Multi-Agent Tool-Assisted Execution",
    overview: "Demonstrating how multi-step business logic can be autonomously executed by coordinated AI agents. From webhook receipt to database synthesis and team notification, the pipeline self-corrects on transient failures.",
    features: [
      "Autonomous tool execution with strict human-in-the-loop approval gates",
      "Real-time visual node tracking and detailed execution logs",
      "Resilient retry mechanisms with automatic prompt refactoring",
      "Universal connector support for internal REST APIs and third-party tools"
    ],
    technicalHighlights: [
      "Orchestration: Directed Acyclic Graph (DAG) state machine",
      "Execution Sandboxing: Isolated compute containers for code evaluation",
      "Observability: OpenTelemetry metrics & step-level trace latency logs"
    ]
  }
};

function initPortfolioModals() {
  const modalOverlay = document.getElementById('demoModalOverlay');
  const openButtons = document.querySelectorAll('[data-demo-modal]');
  const closeBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  if (!modalOverlay || !openButtons.length) return;

  const openModal = (demoKey) => {
    const data = portfolioModalData[demoKey];
    if (!data) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalBody) {
      modalBody.innerHTML = `
        <div style="margin-bottom: 1.25rem;">
          <div class="demo-disclaimer-pill" style="margin-bottom: 0.75rem;">ILLUSTRATIVE DEMO PROTOTYPE</div>
          <h4 style="font-size: 1.2rem; margin-bottom: 0.5rem; color: var(--accent-cyan);">${data.tagline}</h4>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${data.overview}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin-top: 1.5rem;">
          <div style="background: rgba(13, 19, 36, 0.8); border: 1px solid var(--border-subtle); padding: 1.25rem; border-radius: var(--radius-md);">
            <h5 style="color: var(--text-primary); margin-bottom: 0.75rem; font-size: 0.95rem; font-weight: 700;">Key Capabilities</h5>
            <ul style="display: flex; flex-direction: column; gap: 0.5rem;">
              ${data.features.map(f => `<li style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.85rem; color: var(--text-secondary);"><span style="color: var(--accent-cyan); font-weight: 700;">•</span> ${f}</li>`).join('')}
            </ul>
          </div>

          <div style="background: rgba(13, 19, 36, 0.8); border: 1px solid var(--border-subtle); padding: 1.25rem; border-radius: var(--radius-md);">
            <h5 style="color: var(--text-primary); margin-bottom: 0.75rem; font-size: 0.95rem; font-weight: 700;">Architecture Considerations</h5>
            <ul style="display: flex; flex-direction: column; gap: 0.5rem;">
              ${data.technicalHighlights.map(t => `<li style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.85rem; color: var(--text-secondary);"><span style="color: var(--accent-blue); font-weight: 700;">→</span> ${t}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div style="margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <span style="font-size: 0.8rem; color: var(--text-muted);">Demonstration interface mockup. No proprietary customer data included.</span>
          <a href="contact.html" class="btn btn-primary btn-sm">Discuss Similar Architecture</a>
        </div>
      `;
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const demoKey = btn.getAttribute('data-demo-modal');
      openModal(demoKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   9. Contact Form Validation (Strictly Demo & Client-Side Only)
   -------------------------------------------------------------------------- */
function initContactFormValidation() {
  const form = document.getElementById('projectEnquiryForm');
  const alertBox = document.getElementById('formSuccessAlert');
  if (!form) return;

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
    return cleaned.length >= 7 && /^\d+$/.test(cleaned);
  };

  const setGroupError = (input, hasError) => {
    const group = input.closest('.form-group');
    if (!group) return;
    if (hasError) {
      group.classList.add('has-error');
    } else {
      group.classList.remove('has-error');
    }
  };

  // Live validation on blur
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateSingleField(input);
    });
    input.addEventListener('input', () => {
      if (input.closest('.form-group').classList.contains('has-error')) {
        validateSingleField(input);
      }
    });
  });

  const validateSingleField = (input) => {
    const name = input.name;
    const value = input.value.trim();
    let isInvalid = false;

    if (name === 'fullName') {
      isInvalid = value.length < 2;
    } else if (name === 'email') {
      isInvalid = !validateEmail(value);
    } else if (name === 'phone') {
      isInvalid = !validatePhone(value);
    } else if (name === 'companyName') {
      isInvalid = value.length < 2;
    } else if (name === 'service') {
      isInvalid = !value || value === '';
    } else if (name === 'projectDescription') {
      isInvalid = value.length < 10;
    }

    setGroupError(input, isInvalid);
    return !isInvalid;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    inputs.forEach(input => {
      const valid = validateSingleField(input);
      if (!valid) allValid = false;
    });

    if (allValid) {
      // Simulated successful demonstration submission
      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      form.reset();

      // Clear success alert after 8 seconds
      setTimeout(() => {
        if (alertBox) alertBox.style.display = 'none';
      }, 8000);
    }
  });
}
