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
        </button>
        <nav class="site-nav" aria-label="Primary">
          ${navLinks}
        </nav>
        <div class="header-actions">
          <a class="button button-secondary" href="contact.html">Talk to sales</a>
          <a class="button button-primary" href="pricing.html">Start free trial</a>
        </div>
      </div>
    </header>
  `;
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
    document.body.classList.toggle("no-scroll", isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
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

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const city = String(formData.get("city") || "");
      const homeType = String(formData.get("home_type") || "");
      const budget = String(formData.get("budget") || "");
      const timeline = String(formData.get("timeline") || "");

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

renderHeader();
renderFooter();
setupNavigation();
setupReveal();
setupPricing();
setupForms();
setupFilters();
setupSavedItems();
setupCompare();
setupBuyerBrief();
setupCounters();

const footerYear = document.getElementById("footer-year");
if (footerYear) {
  footerYear.textContent = String(new Date().getFullYear());
}
