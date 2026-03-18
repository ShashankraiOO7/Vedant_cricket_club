const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const atmosphere = document.querySelector("#sports-atmosphere");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

if (menuToggle && nav) {
  menuToggle.setAttribute("aria-label", "Open menu");
  menuToggle.innerHTML = `
    <span class="menu-toggle-lines" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </span>
    <span class="menu-toggle-text">Menu</span>
  `;
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const siteFooter = document.querySelector(".site-footer");

if (siteFooter) {
  siteFooter.innerHTML = `
    <div class="footer-water" aria-hidden="true">
      <span class="footer-wave footer-wave-one"></span>
      <span class="footer-wave footer-wave-two"></span>
      <span class="footer-wave footer-wave-three"></span>
    </div>
    <div class="footer-grid">
      <div>
        <div class="footer-brand-heading">
          <span class="footer-brand-mark" aria-hidden="true"></span>
          <div>
            <p class="card-label">Vedant Cricket Club</p>
            <p>A modern cricket academy and tournament platform based in Nizamudinpura, Bhiti-Mau.</p>
          </div>
        </div>
      </div>
      <div>
        <p class="card-label">Quick Links</p>
        <p><a href="academy.html">Academy</a> - <a href="tournaments.html">Tournaments</a> - <a href="live.html">Live</a></p>
        <p><a href="results.html">Results</a> - <a href="gallery.html">Gallery</a> - <a href="contact.html">Contact</a></p>
        <p><a href="privacy-policy.html">Privacy Policy</a> - <a href="terms-and-conditions.html">Terms & Conditions</a></p>
      </div>
      <div>
        <p class="card-label">Contact</p>
        <p class="support-copy">For admission, tournament, or any other query, contact us directly.</p>
        <div class="support-actions footer-support-actions">
          <a class="support-icon-link" href="tel:9455051375" aria-label="Call Vedant Cricket Club">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1z"/></svg>
          </a>
          <a class="support-icon-link" href="https://wa.me/919455051375" target="_blank" rel="noreferrer" aria-label="WhatsApp Vedant Cricket Club">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 0 1-11.8 7l-4.2 1 1.1-4A8 8 0 1 1 20 12zm-4.3 2.1c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1l-.4.5c-.1.2-.3.2-.5.1-.2-.1-1-.4-1.8-1.2-.7-.7-1.1-1.5-1.2-1.7-.1-.2 0-.4.1-.5l.3-.4.2-.3c.1-.1.1-.3 0-.4l-.7-1.6c-.1-.2-.3-.2-.4-.2h-.4c-.1 0-.4 0-.6.3-.2.2-.8.8-.8 1.9s.8 2.1.9 2.2c.1.2 1.5 2.3 3.6 3.2.5.2.9.4 1.2.5.5.1 1 .1 1.4.1.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1 0-.1-.2-.2-.4-.3z"/></svg>
          </a>
          <a class="support-icon-link" href="mailto:vedantcricketckubmau@gmail.com?subject=Vedant%20Cricket%20Club%20Enquiry" aria-label="Email Vedant Cricket Club">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v.2l8 5.3 8-5.3V7H4zm16 10V9.5l-7.4 4.9a1 1 0 0 1-1.2 0L4 9.5V17h16z"/></svg>
          </a>
        </div>
        <p class="support-meta">Nizamudinpura, Bhiti-Mau</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>Vedant Cricket Club. All Rights Reserved.</p>
      <p><a class="footer-admin-link" href="admin.html">Admin Login</a></p>
    </div>
  `;
}

const whatsAppDefaults = {
  "admission.html": "Hello, I want to ask about admission in Vedant Cricket Club.",
  "tournament-registration.html": "Hello, I want to ask about tournament registration in Vedant Cricket Club.",
  default: "Hello, I want to ask something about Vedant Cricket Club."
};

document.querySelectorAll('a[href*="wa.me/919455051375"]').forEach((link) => {
  if (link.id === "wa-send-link") {
    return;
  }
  const message = whatsAppDefaults[currentPage] || whatsAppDefaults.default;
  link.href = `https://wa.me/919455051375?text=${encodeURIComponent(message)}`;
});

const supportCopy = document.querySelector(".form-support-bar .support-copy");
if (supportCopy) {
  if (currentPage === "admission.html") {
    supportCopy.textContent = "If you want to ask anything about admission, contact us here.";
  } else if (currentPage === "tournament-registration.html") {
    supportCopy.textContent = "If you want to ask anything about tournament registration, contact us here.";
  }
}

const heroLocalVideo = document.querySelector("#hero-local-video");

if (heroLocalVideo) {
  const loopStart = Number(heroLocalVideo.dataset.loopStart || "0");
  const loopEnd = Number(heroLocalVideo.dataset.loopEnd || "0");
  let autoplayAttempts = 0;
  let startSynced = false;

  heroLocalVideo.muted = true;
  heroLocalVideo.defaultMuted = true;
  heroLocalVideo.volume = 0;
  heroLocalVideo.autoplay = true;
  heroLocalVideo.playsInline = true;
  heroLocalVideo.setAttribute("muted", "");
  heroLocalVideo.setAttribute("autoplay", "");
  heroLocalVideo.setAttribute("playsinline", "");

  const tryAutoplay = () => {
    autoplayAttempts += 1;
    heroLocalVideo.play().catch(() => {});
    if (autoplayAttempts < 8 && heroLocalVideo.paused) {
      window.setTimeout(tryAutoplay, 450);
    }
  };

  const syncHeroVideoStart = () => {
    if (!startSynced && Number.isFinite(loopStart) && loopStart > 0) {
      try {
        heroLocalVideo.currentTime = loopStart;
        startSynced = true;
      } catch (_) {}
    }
    tryAutoplay();
  };

  heroLocalVideo.load();
  heroLocalVideo.addEventListener("loadedmetadata", syncHeroVideoStart);
  heroLocalVideo.addEventListener("loadeddata", syncHeroVideoStart);
  heroLocalVideo.addEventListener("canplay", syncHeroVideoStart);
  heroLocalVideo.addEventListener("canplaythrough", syncHeroVideoStart);
  window.addEventListener("load", syncHeroVideoStart);
  window.addEventListener("pageshow", syncHeroVideoStart);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      syncHeroVideoStart();
    }
  });
  ["pointerdown", "touchstart", "keydown"].forEach((eventName) => {
    window.addEventListener(eventName, syncHeroVideoStart, { passive: true });
  });
  heroLocalVideo.addEventListener("timeupdate", () => {
    if (Number.isFinite(loopEnd) && loopEnd > loopStart && heroLocalVideo.currentTime >= loopEnd) {
      heroLocalVideo.currentTime = loopStart;
      tryAutoplay();
    }
  });
}

const extractYouTubeVideoId = (url) => {
  if (!url) {
    return "";
  }

  const trimmed = url.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return parsed.pathname.replace(/\//g, "").slice(0, 11);
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      const watchId = parsed.searchParams.get("v");
      if (watchId) {
        return watchId.slice(0, 11);
      }

      const parts = parsed.pathname.split("/").filter(Boolean);
      const liveIndex = parts.indexOf("live");
      const embedIndex = parts.indexOf("embed");
      const shortsIndex = parts.indexOf("shorts");

      if (liveIndex !== -1 && parts[liveIndex + 1]) {
        return parts[liveIndex + 1].slice(0, 11);
      }

      if (embedIndex !== -1 && parts[embedIndex + 1]) {
        return parts[embedIndex + 1].slice(0, 11);
      }

      if (shortsIndex !== -1 && parts[shortsIndex + 1]) {
        return parts[shortsIndex + 1].slice(0, 11);
      }
    }
  } catch (_) {
    return "";
  }

  return "";
};

const CMS_STORAGE_KEY = "vcc-site-content-v1";
const ADMIN_SESSION_KEY = "vcc-admin-session-v1";
const ADMIN_DEFAULTS = {
  username: "vccadmin",
  password: "vedant2026"
};

const defaultSiteContent = {
  home: {
    heroImage: "hero-founder.jpeg",
    founder: {
      label: "Founder Spotlight",
      name: "Sundaram Dubey",
      text: "A disciplined cricket vision focused on training intensity, player confidence, and tournament-ready preparation."
    },
    notices: [
      "New academy admission batch is currently open",
      "Junior Talent Cup entries close on 24 April 2026",
      "Sunday fitness assessment remains compulsory for the open group"
    ],
    news: [
      "Vedant Cricket Club announces Summer Cricket Championship 2026",
      "Structured coaching model attracts new academy admissions",
      "Top performers shortlisted for district-level opportunities"
    ]
  },
  academy: {
    training: {
      morning: "5:30 AM - 8:00 AM",
      evening: "4:00 PM - 7:00 PM",
      special: "Sunday: match simulation and assessment"
    }
  },
  tournaments: {
    events: [
      "Summer Cricket Championship - 12 April 2026",
      "Junior Talent Cup - 28 April 2026",
      "Monsoon League Trials - 10 May 2026"
    ],
    fixtures: [
      "12 Apr: VCC XI vs Blasters Club",
      "13 Apr: Rising Stars vs Warrior Boys",
      "14 Apr: Junior Talent Showcase Match"
    ],
    prizes: [
      "Winner: Rs. 51,000 + Trophy",
      "Runner Up: Rs. 21,000 + Trophy",
      "Best Batter Award",
      "Best Bowler Award"
    ],
    countdownTitle: "Summer Cricket Championship starts in",
    countdownDate: "2026-04-12T08:00:00+05:30",
    downloads: {
      rules: "docs/tournament-rules.pdf",
      brochure: "docs/academy-brochure.pdf",
      fixtures: "docs/fixtures-sheet.pdf",
      source: "docs/registration-form.pdf"
    }
  },
  live: {
    title: "Watch Vedant Cricket Club Live",
    youtubeUrl: "https://www.youtube.com/watch?v=AUzzBuQdz_I"
  },
  results: {
    matches: [
      {
        label: "Match 1",
        achievement: "VCC XI won by 27 runs",
        title: "VCC XI vs Rising Stars",
        scoreOne: "VCC XI: 168/6 (20 overs)",
        scoreTwo: "Rising Stars: 141/9 (20 overs)",
        topBatter: "Aryan Singh - 71 (39)",
        topBowler: "Vikash Yadav - 3/24",
        manOfMatch: "Aryan Singh"
      },
      {
        label: "Match 2",
        achievement: "VCC Juniors won by 5 wickets",
        title: "VCC Juniors vs Warrior Boys",
        scoreOne: "Warrior Boys: 122 all out (18.3 overs)",
        scoreTwo: "VCC Juniors: 123/5 (17.4 overs)",
        topBatter: "Shivam Yadav - 52* (36)",
        topBowler: "Aditya Rai - 4/19",
        manOfMatch: "Shivam Yadav"
      },
      {
        label: "Match 3",
        achievement: "Champion Club won by 12 runs",
        title: "Academy Blues vs Champion Club",
        scoreOne: "Champion Club: 154/8 (20 overs)",
        scoreTwo: "Academy Blues: 142/9 (20 overs)",
        topBatter: "R. Khan - 64 (44)",
        topBowler: "N. Gupta - 3/21",
        manOfMatch: "R. Khan"
      }
    ],
    highlights: [
      {
        label: "Most Runs",
        title: "Aryan Singh - 348",
        points: ["Innings: 8", "Average: 49.7", "Strike Rate: 143.2"]
      },
      {
        label: "Most Wickets",
        title: "Aditya Rai - 17",
        points: ["Matches: 8", "Economy: 6.1", "Best: 4/19"]
      }
    ]
  }
};

const cloneDefaultContent = () => JSON.parse(JSON.stringify(defaultSiteContent));

const loadSiteContent = () => {
  try {
    const saved = localStorage.getItem(CMS_STORAGE_KEY);
    if (!saved) {
      return cloneDefaultContent();
    }
    return { ...cloneDefaultContent(), ...JSON.parse(saved) };
  } catch (_) {
    return cloneDefaultContent();
  }
};

const saveSiteContent = (content) => {
  localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(content));
};

const setBulletList = (selector, items) => {
  const list = document.querySelector(selector);
  if (!list || !Array.isArray(items)) {
    return;
  }
  list.innerHTML = items
    .filter(Boolean)
    .map((item) => `<li>${item}</li>`)
    .join("");
};

const setText = (selector, value) => {
  const node = document.querySelector(selector);
  if (node && typeof value === "string") {
    node.textContent = value;
  }
};

const renderResultsCards = (matches) => {
  const cards = document.querySelectorAll("[data-result-card]");
  if (!cards.length || !Array.isArray(matches)) {
    return;
  }
  cards.forEach((card, index) => {
    const match = matches[index];
    if (!match) {
      card.hidden = true;
      return;
    }
    card.hidden = false;
    card.innerHTML = `
      <div class="result-head">
        <p class="card-label">${match.label || `Match ${index + 1}`}</p>
        <span class="player-achievement">${match.achievement || ""}</span>
      </div>
      <h2>${match.title || "Match Result"}</h2>
      <ul class="bullet-list">
        <li>${match.scoreOne || ""}</li>
        <li>${match.scoreTwo || ""}</li>
      </ul>
      <div class="performer-grid">
        <div class="performer-chip"><strong>Top Batter</strong><span>${match.topBatter || ""}</span></div>
        <div class="performer-chip"><strong>Top Bowler</strong><span>${match.topBowler || ""}</span></div>
        <div class="performer-chip"><strong>Man of the Match</strong><span>${match.manOfMatch || ""}</span></div>
      </div>
    `;
  });
};

const renderResultsHighlights = (highlights) => {
  const cards = document.querySelectorAll("[data-highlight-card]");
  if (!cards.length || !Array.isArray(highlights)) {
    return;
  }
  cards.forEach((card, index) => {
    const item = highlights[index];
    if (!item) {
      card.hidden = true;
      return;
    }
    card.hidden = false;
    card.innerHTML = `
      <p class="card-label">${item.label || ""}</p>
      <h3>${item.title || ""}</h3>
      <ul class="bullet-list">
        ${(item.points || []).filter(Boolean).map((point) => `<li>${point}</li>`).join("")}
      </ul>
    `;
  });
};

const applySiteContent = (content) => {
  setBulletList("#home-notices-list", content.home?.notices || []);
  setBulletList("#home-news-list", content.home?.news || []);
  setBulletList("#academy-training-list", [
    `Morning: ${content.academy?.training?.morning || ""}`,
    `Evening: ${content.academy?.training?.evening || ""}`,
    content.academy?.training?.special || ""
  ]);
  setBulletList("#tournament-events-list", content.tournaments?.events || []);
  setBulletList("#tournament-fixtures-list", content.tournaments?.fixtures || []);
  setBulletList("#tournament-prizes-list", content.tournaments?.prizes || []);
  setText("#tournament-countdown-title", content.tournaments?.countdownTitle || "");
  const countdownGrid = document.querySelector("#tournament-countdown-grid");
  if (countdownGrid && content.tournaments?.countdownDate) {
    countdownGrid.setAttribute("data-target-date", content.tournaments.countdownDate);
  }
  const downloadMap = [
    ["#download-rules-link", content.tournaments?.downloads?.rules],
    ["#download-brochure-link", content.tournaments?.downloads?.brochure],
    ["#download-fixtures-link", content.tournaments?.downloads?.fixtures],
    ["#download-source-link", content.tournaments?.downloads?.source]
  ];
  downloadMap.forEach(([selector, url]) => {
    const link = document.querySelector(selector);
    if (link && url) {
      link.href = url;
    }
  });
  const liveCard = document.querySelector("#live-stream-card");
  if (liveCard && content.live?.youtubeUrl) {
    liveCard.dataset.youtubeLiveUrl = content.live.youtubeUrl;
  }
  setText("#live-stream-title", content.live?.title || "");
  renderResultsCards(content.results?.matches || []);
  renderResultsHighlights(content.results?.highlights || []);
};

const siteContent = loadSiteContent();
applySiteContent(siteContent);

const liveStreamCard = document.querySelector(".live-stream-card");
const liveYoutubeFrame = document.querySelector("#live-youtube-frame");
const liveYoutubeWatch = document.querySelector("#live-youtube-watch");
const renderLiveEmbed = () => {
  if (!liveStreamCard || !liveYoutubeFrame) {
    return;
  }

  const liveUrl = liveStreamCard.dataset.youtubeLiveUrl || "";
  const videoId = extractYouTubeVideoId(liveUrl);

  if (videoId) {
    liveStreamCard.classList.remove("live-stream-empty");
    liveYoutubeFrame.hidden = false;
    liveYoutubeFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`;
    if (liveYoutubeWatch) {
      liveYoutubeWatch.hidden = false;
      liveYoutubeWatch.href = `https://www.youtube.com/watch?v=${videoId}`;
    }
  } else {
    liveStreamCard.classList.add("live-stream-empty");
    liveYoutubeFrame.hidden = true;
    if (liveYoutubeWatch) {
      liveYoutubeWatch.hidden = true;
    }
  }
};

renderLiveEmbed();

window.addEventListener("storage", (event) => {
  if (event.key === CMS_STORAGE_KEY) {
    applySiteContent(loadSiteContent());
    renderLiveEmbed();
  }
});

const adminLoginForm = document.querySelector("#admin-login-form");
const adminDashboard = document.querySelector("#admin-dashboard");
const adminAuthCard = document.querySelector("#admin-auth-card");
const adminStatusNodes = document.querySelectorAll(".admin-status");
const adminLogout = document.querySelector("#admin-logout");
const adminContentForm = document.querySelector("#admin-content-form");
const adminReset = document.querySelector("#admin-reset-defaults");

const setAdminStatus = (message) => {
  adminStatusNodes.forEach((node) => {
    node.textContent = message;
  });
};

const setAdminVisibility = (loggedIn) => {
  if (adminAuthCard) {
    adminAuthCard.hidden = loggedIn;
  }
  if (adminDashboard) {
    adminDashboard.hidden = !loggedIn;
  }
};

if (currentPage === "admin.html" && document.body?.dataset.adminMode !== "firebase") {
  const isLoggedIn = localStorage.getItem(ADMIN_SESSION_KEY) === "true";
  setAdminVisibility(isLoggedIn);

  const fillAdminForm = (content) => {
    const setValue = (id, value) => {
      const node = document.querySelector(id);
      if (node) {
        node.value = value || "";
      }
    };

    setValue("#admin-home-notices", (content.home?.notices || []).join("\n"));
    setValue("#admin-home-news", (content.home?.news || []).join("\n"));
    setValue("#admin-academy-morning", content.academy?.training?.morning);
    setValue("#admin-academy-evening", content.academy?.training?.evening);
    setValue("#admin-academy-special", content.academy?.training?.special);
    setValue("#admin-tournament-events", (content.tournaments?.events || []).join("\n"));
    setValue("#admin-tournament-fixtures", (content.tournaments?.fixtures || []).join("\n"));
    setValue("#admin-tournament-prizes", (content.tournaments?.prizes || []).join("\n"));
    setValue("#admin-countdown-title", content.tournaments?.countdownTitle);
    setValue("#admin-countdown-date", content.tournaments?.countdownDate);
    setValue("#admin-download-rules", content.tournaments?.downloads?.rules);
    setValue("#admin-download-brochure", content.tournaments?.downloads?.brochure);
    setValue("#admin-download-fixtures", content.tournaments?.downloads?.fixtures);
    setValue("#admin-download-source", content.tournaments?.downloads?.source);
    setValue("#admin-live-title", content.live?.title);
    setValue("#admin-live-url", content.live?.youtubeUrl);

    (content.results?.matches || []).forEach((match, index) => {
      setValue(`#result-${index}-label`, match.label);
      setValue(`#result-${index}-achievement`, match.achievement);
      setValue(`#result-${index}-title`, match.title);
      setValue(`#result-${index}-score1`, match.scoreOne);
      setValue(`#result-${index}-score2`, match.scoreTwo);
      setValue(`#result-${index}-batter`, match.topBatter);
      setValue(`#result-${index}-bowler`, match.topBowler);
      setValue(`#result-${index}-mom`, match.manOfMatch);
    });

    (content.results?.highlights || []).forEach((item, index) => {
      setValue(`#highlight-${index}-label`, item.label);
      setValue(`#highlight-${index}-title`, item.title);
      setValue(`#highlight-${index}-points`, (item.points || []).join("\n"));
    });
  };

  fillAdminForm(siteContent);

  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.querySelector("#admin-username")?.value.trim();
      const password = document.querySelector("#admin-password")?.value.trim();
      if (username === ADMIN_DEFAULTS.username && password === ADMIN_DEFAULTS.password) {
        localStorage.setItem(ADMIN_SESSION_KEY, "true");
        setAdminVisibility(true);
        setAdminStatus("Login successful.");
      } else {
        setAdminStatus("Invalid user ID or password.");
      }
    });
  }

  if (adminLogout) {
    adminLogout.addEventListener("click", () => {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      setAdminVisibility(false);
      setAdminStatus("Logged out successfully.");
    });
  }

  if (adminContentForm) {
    adminContentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const lines = (id) =>
        (document.querySelector(id)?.value || "")
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);

      const value = (id) => (document.querySelector(id)?.value || "").trim();

      const updatedContent = {
        home: {
          notices: lines("#admin-home-notices"),
          news: lines("#admin-home-news")
        },
        academy: {
          training: {
            morning: value("#admin-academy-morning"),
            evening: value("#admin-academy-evening"),
            special: value("#admin-academy-special")
          }
        },
        tournaments: {
          events: lines("#admin-tournament-events"),
          fixtures: lines("#admin-tournament-fixtures"),
          prizes: lines("#admin-tournament-prizes"),
          countdownTitle: value("#admin-countdown-title"),
          countdownDate: value("#admin-countdown-date"),
          downloads: {
            rules: value("#admin-download-rules"),
            brochure: value("#admin-download-brochure"),
            fixtures: value("#admin-download-fixtures"),
            source: value("#admin-download-source")
          }
        },
        live: {
          title: value("#admin-live-title"),
          youtubeUrl: value("#admin-live-url")
        },
        results: {
          matches: [0, 1, 2].map((index) => ({
            label: value(`#result-${index}-label`),
            achievement: value(`#result-${index}-achievement`),
            title: value(`#result-${index}-title`),
            scoreOne: value(`#result-${index}-score1`),
            scoreTwo: value(`#result-${index}-score2`),
            topBatter: value(`#result-${index}-batter`),
            topBowler: value(`#result-${index}-bowler`),
            manOfMatch: value(`#result-${index}-mom`)
          })),
          highlights: [0, 1].map((index) => ({
            label: value(`#highlight-${index}-label`),
            title: value(`#highlight-${index}-title`),
            points: lines(`#highlight-${index}-points`)
          }))
        }
      };

      saveSiteContent(updatedContent);
      setAdminStatus("Content saved successfully. Reload the public pages to see updates.");
    });
  }

  if (adminReset) {
    adminReset.addEventListener("click", () => {
      const defaults = cloneDefaultContent();
      saveSiteContent(defaults);
      fillAdminForm(defaults);
      setAdminStatus("Default content restored successfully.");
    });
  }
}

const initBackgroundAtmosphere = () => {
  if (!atmosphere || atmosphere.childElementCount) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const motifs = [
    { name: "bat", min: 36, max: 56 },
    { name: "cricket-ball", min: 24, max: 44 },
    { name: "football", min: 28, max: 46 },
    { name: "karate", min: 30, max: 54 },
    { name: "fitness", min: 30, max: 50 }
  ];

  const totalItems = window.innerWidth < 768 ? 8 : 12;

  for (let index = 0; index < totalItems; index += 1) {
    const motif = motifs[index % motifs.length];
    const size = motif.min + Math.random() * (motif.max - motif.min);
    const item = document.createElement("div");
    item.className = `sports-item ${motif.name}`;
    item.style.setProperty("--size", `${size}px`);
    item.style.left = `${Math.random() * 100}%`;
    item.style.top = `${Math.random() * 100}%`;
    item.style.setProperty("--move-x", `${Math.round(Math.random() * 120 - 60)}px`);
    item.style.setProperty("--move-y", `${Math.round(-26 - Math.random() * 70)}px`);
    item.style.setProperty("--rotate", `${Math.round(Math.random() * 150 - 75)}deg`);
    item.style.animationDuration = `${16 + Math.random() * 16}s`;
    item.style.animationDelay = `${Math.random() * -10}s`;
    atmosphere.appendChild(item);
  }
};

if ("requestIdleCallback" in window) {
  window.requestIdleCallback(initBackgroundAtmosphere, { timeout: 1200 });
} else {
  window.addEventListener("load", initBackgroundAtmosphere, { once: true });
}

const getSuccessOverlay = () => {
  let overlay = document.querySelector("#success-overlay");
  if (overlay) {
    return overlay;
  }

  overlay = document.createElement("div");
  overlay.id = "success-overlay";
  overlay.className = "success-overlay";
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="success-card" role="dialog" aria-modal="true" aria-labelledby="success-title">
      <p class="card-label">Submission Complete</p>
      <h2 id="success-title">Thank you</h2>
      <p id="success-message">Your form has been submitted successfully.</p>
      <div class="hero-actions">
        <button class="button primary" type="button" id="success-close">Back to Website</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const closeButton = overlay.querySelector("#success-close");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      overlay.hidden = true;
    });
  }

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.hidden = true;
    }
  });

  return overlay;
};

const getFieldLabel = (field) => {
  const label = field.closest("label");
  if (!label) {
    return field.name || "Field";
  }
  const clonedLabel = label.cloneNode(true);
  clonedLabel.querySelectorAll("input, select, textarea, span, a").forEach((node) => node.remove());
  const labelText = clonedLabel.textContent.replace(/\s+/g, " ").trim();
  return labelText || field.name || "Field";
};

const getFieldValue = (field) => {
  if (field.type === "file") {
    const fileCount = field.files ? field.files.length : 0;
    if (!fileCount) {
      return "";
    }
    return fileCount === 1 ? "Selected. Please attach this file manually in WhatsApp." : `${fileCount} files selected. Please attach them manually in WhatsApp.`;
  }

  if (field.tagName === "SELECT") {
    return field.options[field.selectedIndex]?.text?.trim() || "";
  }

  if (field.type === "checkbox" || field.type === "radio") {
    return field.checked ? "Yes" : "";
  }

  return field.value.trim();
};

const buildWhatsAppFormMessage = (form) => {
  const formName = form.dataset.formName || "Form";
  const formType = form.dataset.whatsappSubmit || "general";
  const introMap = {
    admission: `Hello Vedant Cricket Club, a new ${formName.toLowerCase()} has been submitted. Details are below:`,
    tournament: `Hello Vedant Cricket Club, a new ${formName.toLowerCase()} has been submitted. Team details are below:`,
    general: `Hello Vedant Cricket Club, a new ${formName.toLowerCase()} has been submitted. Details are below:`
  };

  const lines = [introMap[formType] || introMap.general, ""];

  Array.from(form.elements).forEach((field) => {
    if (!(field instanceof HTMLElement) || !field.name || field.disabled) {
      return;
    }
    const value = getFieldValue(field);
    if (!value) {
      return;
    }
    lines.push(`${getFieldLabel(field)}: ${value}`);
  });

  return lines.join("\n");
};

document.querySelectorAll(".smart-form[data-form-name]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.nextElementSibling;
    const whatsappNumber = form.dataset.whatsappNumber;
    if (whatsappNumber) {
      const message = buildWhatsAppFormMessage(form);
      if (status) {
        status.textContent = "Opening WhatsApp with your filled details. If you selected a file, attach it there before sending.";
      }

      window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      return;
    }
    const name = form.dataset.formName || "Form";
    const overlay = getSuccessOverlay();
    const title = form.dataset.successTitle || `${name} Submitted`;
    const message = form.dataset.successMessage || `Thank you. We have received your ${name.toLowerCase()} and will contact you soon.`;
    if (status) {
      status.textContent = `${name} submitted successfully.`;
    }
    const titleNode = overlay.querySelector("#success-title");
    const messageNode = overlay.querySelector("#success-message");
    if (titleNode) {
      titleNode.textContent = title;
    }
    if (messageNode) {
      messageNode.textContent = message;
    }
    overlay.hidden = false;
    form.reset();
  });
});

const idCardFields = [
  { input: "#id-name-input", output: "#id-name-preview", fallback: "Player Name" },
  { input: "#id-reg-input", output: "#id-reg-preview", fallback: "VCC-XXXX-0000" },
  { input: "#id-role-input", output: "#id-role-preview", fallback: "Cricket Trainee" },
  { input: "#id-blood-input", output: "#id-blood-preview", fallback: "NA" },
  { input: "#id-contact-input", output: "#id-contact-preview", fallback: "0000000000" }
];

const hasIdCard = idCardFields.every(({ input, output }) => document.querySelector(input) && document.querySelector(output));

if (hasIdCard) {
  const updateIdCard = () => {
    idCardFields.forEach(({ input, output, fallback }) => {
      const inputNode = document.querySelector(input);
      const outputNode = document.querySelector(output);
      if (!inputNode || !outputNode) {
        return;
      }
      const value = inputNode.value.trim();
      outputNode.textContent = value || fallback;
    });
  };

  idCardFields.forEach(({ input }) => {
    const node = document.querySelector(input);
    if (!node) {
      return;
    }
    node.addEventListener("input", updateIdCard);
    node.addEventListener("change", updateIdCard);
  });

  updateIdCard();
}

const countdowns = document.querySelectorAll("[data-countdown]");

if (countdowns.length) {
  const updateCountdown = (node) => {
    const targetRaw = node.getAttribute("data-target-date");
    const target = targetRaw ? new Date(targetRaw).getTime() : NaN;
    const note = node.parentElement ? node.parentElement.querySelector("[data-countdown-note]") : null;

    if (Number.isNaN(target)) {
      if (note) {
        note.textContent = "Invalid countdown date.";
      }
      return;
    }

    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      node.querySelector('[data-time="days"]').textContent = "00";
      node.querySelector('[data-time="hours"]').textContent = "00";
      node.querySelector('[data-time="minutes"]').textContent = "00";
      node.querySelector('[data-time="seconds"]').textContent = "00";
      if (note) {
        note.textContent = "Tournament is now live.";
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    node.querySelector('[data-time="days"]').textContent = String(days).padStart(2, "0");
    node.querySelector('[data-time="hours"]').textContent = String(hours).padStart(2, "0");
    node.querySelector('[data-time="minutes"]').textContent = String(minutes).padStart(2, "0");
    node.querySelector('[data-time="seconds"]').textContent = String(seconds).padStart(2, "0");

    if (note) {
      note.textContent = "Registration closes 24 hours before match start.";
    }
  };

  countdowns.forEach((node) => {
    updateCountdown(node);
    setInterval(() => updateCountdown(node), 1000);
  });
}

const waTemplateType = document.querySelector("#wa-template-type");
const waName = document.querySelector("#wa-name");
const waPhone = document.querySelector("#wa-phone");
const waPreview = document.querySelector("#wa-preview");
const waSendLink = document.querySelector("#wa-send-link");

if (waTemplateType && waName && waPhone && waPreview && waSendLink) {
  const templates = {
    admission: (name, phone) => `Hello Vedant Cricket Club, this is ${name}. I want admission details for academy batches. Contact: ${phone}.`,
    registration: (name, phone) => `Hello Vedant Cricket Club, team/player ${name} wants tournament registration support. Contact: ${phone}.`,
    reminder: (name, phone) => `Hello Vedant Cricket Club, this is ${name}. Please share upcoming match reminder updates on this number: ${phone}.`
  };

  const updateWhatsAppTemplate = () => {
    const type = waTemplateType.value;
    const name = waName.value.trim() || "Player";
    const phone = waPhone.value.trim() || "Not provided";
    const template = templates[type] || templates.admission;
    const message = template(name, phone);
    waPreview.value = message;
    waSendLink.href = `https://wa.me/919455051375?text=${encodeURIComponent(message)}`;
  };

  waTemplateType.addEventListener("change", updateWhatsAppTemplate);
  waName.addEventListener("input", updateWhatsAppTemplate);
  waPhone.addEventListener("input", updateWhatsAppTemplate);
  updateWhatsAppTemplate();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
