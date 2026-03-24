/* ── Theme init (runs immediately to avoid flash) ───────────────────── */
(function () {
  try {
    const saved = localStorage.getItem("gs-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
  } catch (_) {}
})();

const siteConfig = {
  primaryNav: [
    { href: "index.html", label: "Home", page: "home" },
    { href: "agent.html", label: "For Agents", page: "agent" },
    { href: "builder.html", label: "For Builders", page: "builder" },
    { href: "developer.html", label: "For Developers", page: "developer" },
    { href: "pricing.html", label: "Pricing", page: "pricing" },
    { href: "about.html", label: "About", page: "about" },
  ],
  quickLinks: [
    ["Find Agent", "find-agent.html"],
    ["Builder Floors", "gurgaon/builder-floors/index.html"],
    ["Categories", "categories.html"],
    ["Developer Store", "developer-store.html"],
    ["Maps", "maps.html"],
    ["Goa Homes", "goa-properties.html"],
    ["Insights", "insights.html"],
    ["Platinum Club", "platinum-club.html"],
  ],
  companyLinks: [
    ["About", "about.html"],
    ["Pricing", "pricing.html"],
    ["FAQs", "faqs.html"],
    ["Careers", "career.html"],
    ["Contact", "contact.html"],
    ["Homes", "homes.html"],
  ],
  legalLinks: [
    ["Privacy Policy", "privacy-policy.html"],
    ["Terms & Conditions", "terms-conditions.html"],
    ["Refund Policy", "refund-policy.html"],
    ["Shipping & Delivery", "shipping-delivery.html"],
  ],
};

const renderHeader = () => {
  const currentPage = document.body.dataset.page || "home";
  const root = document.querySelector("[data-site-header]");

  if (!root) {
    return;
  }

  const navLinks = siteConfig.primaryNav
    .map(
      (item) => `
        <a class="nav-link${item.page === currentPage ? " current" : ""}" href="${item.href}">
          ${item.label}
        </a>
      `
    )
    .join("");

  const isDark = document.documentElement.dataset.theme === "dark";

  root.innerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="index.html" aria-label="GharSetu home">
          <span class="brand-mark"></span>
          <span>GharSetu</span>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav class="site-nav" aria-label="Primary">
          ${navLinks}
          <button class="theme-toggle theme-toggle-mobile" type="button" aria-label="Toggle dark mode" data-theme-toggle-mobile>
            <span class="toggle-track"><span class="toggle-thumb"></span></span>
            <span class="toggle-label">${isDark ? "Light mode" : "Dark mode"}</span>
          </button>
        </nav>
        <div class="header-actions">
          <button class="theme-toggle" type="button" aria-label="Toggle dark mode" data-theme-toggle>
            <span class="toggle-track"><span class="toggle-thumb"></span></span>
            <span class="toggle-label">${isDark ? "Light" : "Dark"}</span>
          </button>
          <a class="button button-secondary" href="contact.html">Talk to sales</a>
          <a class="button button-primary" href="pricing.html">Start free trial</a>
        </div>
      </div>
    </header>
  `;

  // Shared toggle logic
  const applyToggle = (btn, shortLabel) => {
    btn.addEventListener("click", () => {
      const html = document.documentElement;
      const next = html.dataset.theme === "dark" ? "light" : "dark";
      html.dataset.theme = next;
      localStorage.setItem("gs-theme", next);
      // Update all toggle labels
      root.querySelectorAll(".toggle-label").forEach((el) => {
        el.textContent = next === "dark" ? (shortLabel ? "Light mode" : "Light") : (shortLabel ? "Dark mode" : "Dark");
      });
    });
  };

  // Desktop toggle
  const toggleBtn = root.querySelector("[data-theme-toggle]");
  if (toggleBtn) applyToggle(toggleBtn, false);

  // Mobile toggle (inside nav)
  const mobileToggleBtn = root.querySelector("[data-theme-toggle-mobile]");
  if (mobileToggleBtn) applyToggle(mobileToggleBtn, true);
};

const renderFooter = () => {
  const root = document.querySelector("[data-site-footer]");

  if (!root) {
    return;
  }

  const linksMarkup = (items) =>
    items
      .map(([label, href]) => `<a href="${href}">${label}</a>`)
      .join("");

  root.innerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-grid">
          <section>
            <a class="brand" href="index.html" aria-label="GharSetu home">
              <span class="brand-mark"></span>
              <span>GharSetu</span>
            </a>
            <p class="page-copy" style="margin-top: 18px;">
              A modern Indian proptech website built around verified agents,
              curated inventory, channel-partner workflows, and faster deal movement.
            </p>
            <div class="downloads">
              <a class="download-chip" href="contact.html">Download App</a>
              <a class="download-chip" href="contact.html">Book a Demo</a>
            </div>
          </section>
          <section>
            <h3 class="section-title">Explore</h3>
            <div class="footer-links">${linksMarkup(siteConfig.quickLinks)}</div>
          </section>
          <section>
            <h3 class="section-title">Company</h3>
            <div class="footer-links">${linksMarkup(siteConfig.companyLinks)}</div>
          </section>
          <section>
            <h3 class="section-title">Legal</h3>
            <div class="footer-links">${linksMarkup(siteConfig.legalLinks)}</div>
            <div class="footer-links" style="margin-top: 12px;">
              <span>y2khouseofrealty@gmail.com</span>
              <span>+91 99715 20011</span>
              <span>Golf Course Road, Gurugram</span>
            </div>
          </section>
        </div>
        <div class="footer-note">
          <span>Copyright © <span id="footer-year"></span> GharSetu Technologies Pvt. Ltd.</span>
          <span>Built as a simple, modern India-first multi-page proptech site.</span>
        </div>
      </div>
    </footer>
  `;
};

const setupNavigation = () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (!menuToggle || !siteNav) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("no-scroll", isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.classList.remove("is-open");
      document.body.classList.remove("no-scroll");
    });
  });
};

const setupReveal = () => {
  const nodes = document.querySelectorAll("[data-reveal]");

  nodes.forEach((node) => {
    const delay = node.getAttribute("data-reveal-delay");
    if (delay) {
      node.style.setProperty("--delay", `${delay}ms`);
    }
  });

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
  );

  nodes.forEach((node) => observer.observe(node));
};

const setupHeroMeta = () => {
  document.querySelectorAll(".page-hero .breadcrumbs:not(.breadcrumbs-stack)").forEach((breadcrumbs) => {
    const eyebrow = breadcrumbs.nextElementSibling;

    if (!eyebrow || !eyebrow.classList.contains("eyebrow")) {
      return;
    }

    const main = document.createElement("div");
    main.className = "breadcrumbs-main";

    while (breadcrumbs.firstChild) {
      main.appendChild(breadcrumbs.firstChild);
    }

    const sub = document.createElement("div");
    sub.className = "breadcrumbs-sub";
    sub.textContent = eyebrow.textContent.trim();

    breadcrumbs.classList.add("breadcrumbs-stack");
    breadcrumbs.append(main, sub);
    eyebrow.remove();
  });
};

const setupPricing = () => {
  document.querySelectorAll("[data-pricing]").forEach((root) => {
    root.querySelectorAll("[data-plan-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const mode = button.dataset.planToggle;

        root.querySelectorAll("[data-plan-toggle]").forEach((item) => {
          item.classList.toggle("is-active", item === button);
        });

        root.querySelectorAll("[data-price-card]").forEach((card) => {
          const monthly = card.querySelector("[data-price-monthly]");
          const annual = card.querySelector("[data-price-annual]");
          const suffix = card.querySelector("[data-price-suffix]");

          if (!monthly || !annual || !suffix) {
            return;
          }

          const annualMode = mode === "annual";
          monthly.hidden = annualMode;
          annual.hidden = !annualMode;
          suffix.textContent = annualMode ? "/year" : "/month";
        });
      });
    });
  });
};

const setupForms = () => {
  document.querySelectorAll("[data-ui-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const button = form.querySelector("button[type='submit']");
      const message = form.querySelector("[data-form-message]");
      const action = form.getAttribute("action") || "";
      const endpoint = action.startsWith("https://formsubmit.co/")
        ? action.replace("https://formsubmit.co/", "https://formsubmit.co/ajax/")
        : action;
      const formData = new FormData(form);

      if (button) {
        const original = button.textContent;
        button.dataset.originalText = original;
        button.textContent = "Sending...";
        button.disabled = true;
      }

      formData.set("_url", window.location.href);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Submission failed");
        }

        if (message) {
          message.textContent = "Thanks. Your enquiry has been sent.";
        }

        form.reset();
      } catch (error) {
        if (message) {
          message.textContent =
            "We could not send your enquiry right now. Email y2khouseofrealty@gmail.com or call +91 99715 20011.";
        }
      } finally {
        if (button) {
          const original = button.dataset.originalText || "Send enquiry";
          button.textContent = original;
          button.disabled = false;
        }

        if (message) {
          window.setTimeout(() => {
            message.textContent = "";
          }, 4000);
        }
      }
    });
  });
};

const setupFilters = () => {
  document.querySelectorAll("[data-filter-root]").forEach((root) => {
    const items = [...root.querySelectorAll("[data-filter-item]")];
    if (!items.length) {
      return;
    }

    const results = root.querySelector("[data-filter-results]");
    const input = root.querySelector("[data-filter-input]");
    const count = root.querySelector("[data-filter-count]");
    const empty = root.querySelector("[data-filter-empty]");
    const sort = root.querySelector("[data-filter-sort]");
    const submit = root.querySelector("[data-filter-submit]");
    const selectControls = [...root.querySelectorAll("[data-filter-select-group]")];
    const activeFilters = {};

    root.querySelectorAll("[data-filter-chip]").forEach((chip) => {
      const group = chip.dataset.filterChipGroup || "tag";
      if (chip.classList.contains("is-active")) {
        activeFilters[group] = chip.dataset.filterChip || "all";
      }
    });

    selectControls.forEach((select) => {
      const group = select.dataset.filterSelectGroup || "tag";
      activeFilters[group] = select.value || activeFilters[group] || "all";
    });

    const sorters = {
      featured: (a, b) => Number(a.dataset.order || 0) - Number(b.dataset.order || 0),
      "price-asc": (a, b) => Number(a.dataset.priceValue || 0) - Number(b.dataset.priceValue || 0),
      "price-desc": (a, b) => Number(b.dataset.priceValue || 0) - Number(a.dataset.priceValue || 0),
      "area-desc": (a, b) => Number(b.dataset.areaValue || 0) - Number(a.dataset.areaValue || 0),
      "experience-desc": (a, b) => Number(b.dataset.experienceValue || 0) - Number(a.dataset.experienceValue || 0),
      "rating-desc": (a, b) => Number(b.dataset.ratingValue || 0) - Number(a.dataset.ratingValue || 0),
    };

    const matchesFilterGroup = (item, group, value) => {
      if (!value || value === "all") {
        return true;
      }

      const itemValues = (item.dataset[group] || item.dataset.tag || "")
        .toLowerCase()
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);

      return itemValues.includes(value);
    };

    const syncGroupControls = (group, value) => {
      root.querySelectorAll("[data-filter-chip]").forEach((item) => {
        const itemGroup = item.dataset.filterChipGroup || "tag";
        if (itemGroup === group) {
          item.classList.toggle("is-active", (item.dataset.filterChip || "all") === value);
        }
      });

      root.querySelectorAll("[data-filter-select-group]").forEach((select) => {
        const selectGroup = select.dataset.filterSelectGroup || "tag";
        if (selectGroup === group) {
          select.value = value;
        }
      });
    };

    const applyFilters = () => {
      const query = input ? input.value.trim().toLowerCase() : "";
      const visibleItems = items.filter((item) => {
        const haystack = (item.dataset.search || "").toLowerCase();
        const queryMatch = !query || haystack.includes(query);
        const groupMatch = Object.entries(activeFilters).every(([group, value]) =>
          matchesFilterGroup(item, group, value)
        );

        return queryMatch && groupMatch;
      });

      const sortValue = sort?.value || "featured";
      const sorter = sorters[sortValue];

      if (sorter) {
        visibleItems.sort(sorter);
      }

      if (results) {
        visibleItems.forEach((item) => {
          results.appendChild(item);
        });
      }

      items.forEach((item) => {
        item.hidden = !visibleItems.includes(item);
      });

      if (count) {
        count.textContent = String(visibleItems.length);
      }

      if (empty) {
        empty.hidden = visibleItems.length !== 0;
      }
    };

    input?.addEventListener("input", applyFilters);
    sort?.addEventListener("change", applyFilters);

    root.querySelectorAll("[data-filter-chip]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const group = chip.dataset.filterChipGroup || "tag";
        activeFilters[group] = chip.dataset.filterChip || "all";
        syncGroupControls(group, activeFilters[group]);

        applyFilters();
      });
    });

    selectControls.forEach((select) => {
      select.addEventListener("change", () => {
        const group = select.dataset.filterSelectGroup || "tag";
        activeFilters[group] = select.value || "all";
        syncGroupControls(group, activeFilters[group]);
        applyFilters();
      });
    });

    submit?.addEventListener("click", () => {
      applyFilters();
      results?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    applyFilters();
  });
};

const setupSavedItems = () => {
  const buttons = [...document.querySelectorAll("[data-save-toggle]")];

  if (!buttons.length || !window.localStorage) {
    return;
  }

  const storageKey = "gharsetu-saved-items";
  const savedItems = new Set(JSON.parse(window.localStorage.getItem(storageKey) || "[]"));
  const countNodes = document.querySelectorAll("[data-save-count]");

  const sync = () => {
    buttons.forEach((button) => {
      const id = button.dataset.saveId;
      const isSaved = savedItems.has(id);
      button.classList.toggle("is-active", isSaved);
      button.textContent = isSaved ? (button.dataset.savedText || "Saved") : (button.dataset.defaultText || "Save");
    });

    countNodes.forEach((node) => {
      node.textContent = String(savedItems.size);
    });

    window.localStorage.setItem(storageKey, JSON.stringify([...savedItems]));
  };

  buttons.forEach((button) => {
    button.dataset.defaultText = button.textContent.trim();
    button.addEventListener("click", () => {
      const id = button.dataset.saveId;

      if (!id) {
        return;
      }

      if (savedItems.has(id)) {
        savedItems.delete(id);
      } else {
        savedItems.add(id);
      }

      sync();
    });
  });

  sync();
};

const setupCompare = () => {
  document.querySelectorAll("[data-compare-root]").forEach((root) => {
    const buttons = [...root.querySelectorAll("[data-compare-toggle]")];

    if (!buttons.length) {
      return;
    }

    const compareBar = root.querySelector("[data-compare-bar]");
    const compareCount = root.querySelector("[data-compare-count]");
    const compareList = root.querySelector("[data-compare-list]");
    const compareMessage = root.querySelector("[data-compare-message]");
    const selected = new Map();

    const sync = () => {
      buttons.forEach((button) => {
        const id = button.dataset.compareId;
        const isSelected = selected.has(id);
        button.classList.toggle("is-active", isSelected);
        button.textContent = isSelected ? "Selected" : "Compare";
      });

      if (compareBar) {
        compareBar.hidden = selected.size === 0;
      }

      if (compareCount) {
        compareCount.textContent = String(selected.size);
      }

      if (compareList) {
        compareList.innerHTML = [...selected.values()]
          .map((label) => `<span class="tag">${label}</span>`)
          .join("");
      }
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.compareId;
        const label = button.dataset.compareLabel || "Selected listing";

        if (!id) {
          return;
        }

        if (selected.has(id)) {
          selected.delete(id);
          if (compareMessage) {
            compareMessage.textContent = "";
          }
        } else if (selected.size < 3) {
          selected.set(id, label);
          if (compareMessage) {
            compareMessage.textContent = "";
          }
        } else if (compareMessage) {
          compareMessage.textContent = "You can compare up to 3 listings at a time.";
        }

        sync();
      });
    });

    sync();
  });
};

const setupBuyerBrief = () => {
  document.querySelectorAll("[data-buyer-brief]").forEach((form) => {
    const resultPanel = document.querySelector("[data-buyer-brief-result]");
    const summaryNode = resultPanel?.querySelector("[data-buyer-summary]");
    const linksNode = resultPanel?.querySelector("[data-buyer-links]");
    const messageNode = form.querySelector("[data-buyer-brief-message]");
    const button = form.querySelector("button[type='submit']");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const city = String(formData.get("city") || "");
      const homeType = String(formData.get("home_type") || "");
      const budget = String(formData.get("budget") || "");
      const timeline = String(formData.get("timeline") || "");
      const action = form.getAttribute("action") || "";
      const endpoint = action.startsWith("https://formsubmit.co/")
        ? action.replace("https://formsubmit.co/", "https://formsubmit.co/ajax/")
        : action;

      const suggestions = [];

      if (city === "gurugram" && homeType === "builder-floor") {
        suggestions.push(["Explore Gurgaon builder floors", "gurgaon/builder-floors/index.html"]);
      }

      if (city === "goa" || homeType === "villa") {
        suggestions.push(["Browse Goa homes", "goa-properties.html"]);
      }

      if (budget === "premium" || homeType === "project") {
        suggestions.push(["Review premium launch inventory", "developer-store.html"]);
      }

      suggestions.push(["Find a local specialist", "find-agent.html"]);
      suggestions.push(["Speak to the team", "contact.html"]);

      const summary = `Based on your ${city || "city"} search, ${homeType || "preferred"} requirement, and ${timeline || "current"} timeline, start with these options.`;

      if (summaryNode) {
        summaryNode.textContent = summary;
      }

      if (linksNode) {
        linksNode.innerHTML = suggestions
          .slice(0, 3)
          .map(
            ([label, href]) => `<a class="button button-secondary" href="${href}">${label}</a>`
          )
          .join("");
      }

      if (resultPanel) {
        resultPanel.hidden = false;
      }

      if (button) {
        const original = button.textContent;
        button.dataset.originalText = original;
        button.textContent = "Sending...";
        button.disabled = true;
      }

      formData.set("_url", window.location.href);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Submission failed");
        }

        if (messageNode) {
          messageNode.textContent = "Buyer brief sent. We will reach out shortly.";
        }
      } catch (error) {
        if (messageNode) {
          messageNode.textContent =
            "We could not send the brief right now. Email y2khouseofrealty@gmail.com or call +91 99715 20011.";
        }
      } finally {
        if (button) {
          button.textContent = button.dataset.originalText || "Show my options";
          button.disabled = false;
        }

        if (messageNode) {
          window.setTimeout(() => {
            messageNode.textContent = "";
          }, 4000);
        }
      }
    });
  });
};

const setupCounters = () => {
  const formatter = new Intl.NumberFormat("en-IN");
  const counters = document.querySelectorAll("[data-count-to]");

  if (!("IntersectionObserver" in window)) {
    counters.forEach((counter) => {
      counter.textContent = `${formatter.format(Number(counter.dataset.countTo || 0))}${counter.dataset.countSuffix || ""}`;
    });
    return;
  }

  const animateCounter = (node) => {
    const target = Number(node.dataset.countTo || 0);
    const suffix = node.dataset.countSuffix || "";
    const duration = 1100;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = `${formatter.format(Math.round(target * eased))}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
};

const WHATSAPP_NUMBER = "919971520011";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi GharSetu! I'd like to know more about your property matching platform."
);

const renderAnnouncementBar = () => {
  const dismissed = window.sessionStorage.getItem("gs-promo-dismissed");
  if (dismissed) {
    return;
  }

  const bar = document.createElement("div");
  bar.className = "announcement-bar";
  bar.setAttribute("role", "banner");
  bar.innerHTML = `
    <span>🎉 Limited offer: Get <strong>2 months free</strong> when you choose an annual plan.
      <a href="pricing.html">See pricing →</a>
    </span>
    <button class="announcement-dismiss" aria-label="Dismiss announcement" type="button">×</button>
  `;

  bar.querySelector(".announcement-dismiss").addEventListener("click", () => {
    bar.remove();
    window.sessionStorage.setItem("gs-promo-dismissed", "1");
  });

  document.body.prepend(bar);
};

const renderWhatsAppFAB = () => {
  const fab = document.createElement("a");
  fab.className = "whatsapp-fab";
  fab.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
  fab.target = "_blank";
  fab.rel = "noopener noreferrer";
  fab.setAttribute("aria-label", "Chat with us on WhatsApp");
  fab.innerHTML = `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <span class="fab-label">Chat with us</span>
  `;

  document.body.appendChild(fab);
};

const setupSavingsDisplay = () => {
  document.querySelectorAll("[data-pricing]").forEach((root) => {
    root.querySelectorAll("[data-plan-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const mode = button.dataset.planToggle;
        root.querySelectorAll("[data-savings-badge]").forEach((badge) => {
          badge.hidden = mode !== "annual";
        });
      });
    });
  });
};

const setupROICalculator = () => {
  const calc = document.querySelector("[data-roi-calc]");
  if (!calc) {
    return;
  }

  const formatter = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

  const dealsInput = calc.querySelector("[data-roi-deals]");
  const avgValueInput = calc.querySelector("[data-roi-avg-value]");
  const commissionInput = calc.querySelector("[data-roi-commission]");
  const dealsDisplay = calc.querySelector("[data-roi-deals-display]");
  const avgValueDisplay = calc.querySelector("[data-roi-avg-value-display]");
  const commissionDisplay = calc.querySelector("[data-roi-commission-display]");
  const grossEarnings = calc.querySelector("[data-roi-gross]");
  const subscriptionCost = calc.querySelector("[data-roi-subscription]");
  const netEarnings = calc.querySelector("[data-roi-net]");

  const PLAN_COST = 7499;

  const update = () => {
    const deals = Number(dealsInput?.value || 3);
    const avgValue = Number(avgValueInput?.value || 80) * 100000;
    const commission = Number(commissionInput?.value || 2);

    const gross = deals * avgValue * (commission / 100);
    const net = gross - PLAN_COST;

    if (dealsDisplay) dealsDisplay.textContent = `${deals} deal${deals > 1 ? "s" : ""}/month`;
    if (avgValueDisplay) avgValueDisplay.textContent = formatter.format(avgValue);
    if (commissionDisplay) commissionDisplay.textContent = `${commission}%`;
    if (grossEarnings) grossEarnings.textContent = formatter.format(gross);
    if (subscriptionCost) subscriptionCost.textContent = formatter.format(PLAN_COST);
    if (netEarnings) netEarnings.textContent = formatter.format(net);
  };

  [dealsInput, avgValueInput, commissionInput].forEach((input) => {
    input?.addEventListener("input", update);
  });

  update();
};

const setupLeadMagnet = () => {
  document.querySelectorAll("[data-lead-magnet]").forEach((form) => {
    const message = form.querySelector("[data-lead-message]");
    const button = form.querySelector("button[type='submit']");
    const action = form.getAttribute("action") || "";
    const endpoint = action.startsWith("https://formsubmit.co/")
      ? action.replace("https://formsubmit.co/", "https://formsubmit.co/ajax/")
      : action;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      formData.set("_url", window.location.href);
      formData.set("_subject", "Free Market Report Request");

      if (button) {
        button.textContent = "Sending...";
        button.disabled = true;
      }

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });

        if (!response.ok) throw new Error("failed");

        if (message) message.textContent = "Report request received. Check your inbox shortly.";
        form.reset();
      } catch {
        if (message) message.textContent = "Could not send right now. Email y2khouseofrealty@gmail.com";
      } finally {
        if (button) {
          button.textContent = "Get free report";
          button.disabled = false;
        }
        if (message) {
          window.setTimeout(() => { message.textContent = ""; }, 4000);
        }
      }
    });
  });
};

renderAnnouncementBar();
renderHeader();
renderFooter();
renderWhatsAppFAB();
setupNavigation();
setupHeroMeta();
setupReveal();
setupPricing();
setupSavingsDisplay();
setupForms();
setupFilters();
setupSavedItems();
setupCompare();
setupBuyerBrief();
setupCounters();
setupROICalculator();
setupLeadMagnet();
setupModernAnimations();
setupTypewriter();

const footerYear = document.getElementById("footer-year");
if (footerYear) {
  footerYear.textContent = String(new Date().getFullYear());
}

/* ── Modern animation enhancements ─────────────────────────────────── */

function setupModernAnimations() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── Magnetic hover on primary buttons ────────────────────────────
  if (!reduced) {
    document.querySelectorAll(".button-primary, .button-accent").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
        btn.style.transform = `translateY(-2px) translate(${x}px,${y}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }

  // ── Subtle 3D tilt on cards (desktop only, not inverted cards) ───
  if (window.innerWidth > 920 && !reduced) {
    document.querySelectorAll(".card:not(.card-inverted):not(.card-hover-invert), .quote-card, .price-card").forEach((card) => {
      card.style.transformStyle = "preserve-3d";
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-3px) rotateX(${(-y * 4).toFixed(1)}deg) rotateY(${(x * 4).toFixed(1)}deg)`;
        card.style.transition = "transform 80ms linear";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.transition = "transform 400ms cubic-bezier(0.16,1,0.3,1), box-shadow 400ms ease, border-color 400ms ease";
      });
    });
  }

  // ── Hero parallax ────────────────────────────────────────────────
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg && !reduced) {
    let tick = false;
    window.addEventListener("scroll", () => {
      if (!tick) {
        requestAnimationFrame(() => {
          heroBg.style.backgroundPositionY = `calc(40% + ${window.scrollY * 0.25}px)`;
          tick = false;
        });
        tick = true;
      }
    }, { passive: true });
  }

  // ── Stats strip counter (own observer, re-runs on reveal) ────────
  const strip = document.querySelector(".stats-strip");
  if (strip) {
    const animate = () => {
      strip.querySelectorAll(".counting[data-count-to]:not([data-counted])").forEach((el) => {
        el.dataset.counted = "1";
        const target = parseInt(el.dataset.countTo, 10);
        const suffix = el.dataset.countSuffix || "";
        const dur = 1500;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          const v = Math.floor((1 - Math.pow(1 - p, 4)) * target);
          el.textContent = (target >= 1000 ? v.toLocaleString("en-IN") : v) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    };
    new IntersectionObserver((es) => { if (es[0].isIntersecting) animate(); }, { threshold: 0.3 }).observe(strip);
  }

  // ── City tile hover lift ──────────────────────────────────────────
  document.querySelectorAll(".city-tile").forEach((t) => {
    t.addEventListener("mouseenter", () => {
      t.style.cssText += ";transform:translateY(-5px) scale(1.01);box-shadow:0 20px 50px rgba(0,0,0,0.25);transition:transform 300ms cubic-bezier(0.16,1,0.3,1),box-shadow 300ms ease;";
    });
    t.addEventListener("mouseleave", () => { t.style.transform = ""; t.style.boxShadow = ""; });
  });
}

/* ── Typewriter effect on hero headline ─────────────────────────────── */

function setupTypewriter() {
  const el = document.getElementById("hero-headline");
  if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const lines = ["Verified inventory.", "Better matches.", "Faster closures."];
  const speed = 52;   // ms per char
  const pause = 600;  // ms after full word
  let cursor = document.createElement("span");
  cursor.className = "typewriter-cursor";
  el.textContent = "";
  el.appendChild(cursor);

  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let fullText = "";

  const type = () => {
    const current = lines[lineIndex];

    if (!isDeleting) {
      fullText = current.slice(0, charIndex + 1);
      charIndex++;
    } else {
      fullText = current.slice(0, charIndex - 1);
      charIndex--;
    }

    // Rebuild
    el.textContent = "";
    lines.forEach((line, i) => {
      const span = document.createElement("span");
      if (i < lineIndex) {
        span.textContent = line;
      } else if (i === lineIndex) {
        span.textContent = fullText;
      }
      el.appendChild(span);
      if (i <= lineIndex) el.appendChild(document.createElement("br"));
    });
    el.appendChild(cursor);

    if (!isDeleting && charIndex === current.length) {
      // Finished this line — move to next if not last
      if (lineIndex < lines.length - 1) {
        lineIndex++;
        charIndex = 0;
        setTimeout(type, pause);
      }
      // Last line — stop (leave cursor blinking)
      return;
    }

    setTimeout(type, isDeleting ? speed * 0.5 : speed);
  };

  setTimeout(type, 400);
}
