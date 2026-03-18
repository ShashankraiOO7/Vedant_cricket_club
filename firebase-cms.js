import { auth, db, hasFirebaseConfig } from "./firebase-config.js";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  onValue,
  ref,
  set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const currentPage = window.location.pathname.split("/").pop() || "index.html";

const defaultContent = {
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
    },
    downloads: {
      admissionForm: "docs/admission-form.pdf",
      brochure: "docs/academy-brochure.pdf"
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
      brochure: "docs/tournament-brochure.pdf",
      fixtures: "docs/fixtures-sheet.pdf",
      source: "docs/registration-form.pdf"
    }
  },
  live: {
    title: "Watch Vedant Cricket Club Live",
    youtubeUrl: "https://www.youtube.com/watch?v=AUzzBuQdz_I"
  },
  gallery: {
    sections: [
      {
        title: "Training Gallery",
        items: Array.from({ length: 10 }, (_, index) => ({
          title: `Training Photo ${index + 1}`,
          image: "",
          alt: `Training Photo ${index + 1}`
        }))
      },
      {
        title: "Match Day Gallery",
        items: Array.from({ length: 10 }, (_, index) => ({
          title: `Match Day Photo ${index + 1}`,
          image: "",
          alt: `Match Day Photo ${index + 1}`
        }))
      },
      {
        title: "Event Gallery",
        items: Array.from({ length: 10 }, (_, index) => ({
          title: `Event Photo ${index + 1}`,
          image: "",
          alt: `Event Photo ${index + 1}`
        }))
      }
    ]
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

const mergeDeep = (base, incoming) => {
  if (Array.isArray(base)) {
    return Array.isArray(incoming) ? incoming : base;
  }
  if (typeof base !== "object" || base === null) {
    return incoming ?? base;
  }
  const output = { ...base };
  Object.keys(incoming || {}).forEach((key) => {
    output[key] = key in base ? mergeDeep(base[key], incoming[key]) : incoming[key];
  });
  return output;
};

const setBulletList = (selector, items) => {
  const node = document.querySelector(selector);
  if (!node || !Array.isArray(items)) return;
  node.innerHTML = items.filter(Boolean).map((item) => `<li>${item}</li>`).join("");
};

const setText = (selector, value) => {
  const node = document.querySelector(selector);
  if (node && typeof value === "string") node.textContent = value;
};

const extractYouTubeVideoId = (url) => {
  if (!url) return "";
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return parsed.pathname.replace(/\//g, "").slice(0, 11);
    if (host.includes("youtube.com")) {
      const v = parsed.searchParams.get("v");
      if (v) return v.slice(0, 11);
      const parts = parsed.pathname.split("/").filter(Boolean);
      const marker = ["live", "embed", "shorts"].find((item) => parts.includes(item));
      if (marker) return parts[parts.indexOf(marker) + 1]?.slice(0, 11) || "";
    }
  } catch (_) {
    return "";
  }
  return "";
};

const renderResultsCards = (matches) => {
  document.querySelectorAll("[data-result-card]").forEach((card, index) => {
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
      <h2>${match.title || ""}</h2>
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

const renderResultHighlights = (highlights) => {
  document.querySelectorAll("[data-highlight-card]").forEach((card, index) => {
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

const renderGallery = (sections) => {
  document.querySelectorAll("[data-gallery-section]").forEach((sectionNode, sectionIndex) => {
    const section = sections[sectionIndex];
    const heading = sectionNode.querySelector("h2");
    const grid = sectionNode.querySelector(`[data-gallery-grid="${sectionIndex}"]`);
    if (!section || !grid) {
      sectionNode.hidden = true;
      return;
    }

    sectionNode.hidden = false;
    if (heading) {
      heading.textContent = section.title || `Gallery Section ${sectionIndex + 1}`;
    }

    const validItems = (section.items || []).filter((item) => item && item.image);
    grid.innerHTML = validItems.length
      ? validItems
          .map(
            (item) => `
              <article class="media-box">
                <img class="gallery-photo" src="${item.image}" alt="${item.alt || item.title || "Gallery image"}" loading="lazy" />
                <div class="media-overlay">
                  <span>${item.title || "Gallery Photo"}</span>
                </div>
              </article>
            `
          )
          .join("")
      : `<div class="content-card gallery-empty-card"><p class="card-label">No Photos Yet</p><p>Add gallery image links from the admin panel to show photos in this section.</p></div>`;
  });
};

const renderLive = (live) => {
  const card = document.querySelector("#live-stream-card");
  const frame = document.querySelector("#live-youtube-frame");
  const watch = document.querySelector("#live-youtube-watch");
  if (!card || !frame) return;
  setText("#live-stream-title", live.title || defaultContent.live.title);
  const url = live.youtubeUrl || "";
  card.dataset.youtubeLiveUrl = url;
  const id = extractYouTubeVideoId(url);
  if (id) {
    frame.hidden = false;
    frame.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&modestbranding=1`;
    if (watch) {
      watch.hidden = false;
      watch.href = `https://www.youtube.com/watch?v=${id}`;
    }
  } else {
    frame.hidden = true;
    if (watch) watch.hidden = true;
  }
};

const applyContent = (content) => {
  const heroImage = document.querySelector("#home-hero-image");
  if (heroImage && content.home.heroImage) {
    heroImage.src = content.home.heroImage;
  }
  setText("#home-founder-label", content.home.founder?.label || defaultContent.home.founder.label);
  setText("#home-founder-name", content.home.founder?.name || defaultContent.home.founder.name);
  setText("#home-founder-text", content.home.founder?.text || defaultContent.home.founder.text);
  setBulletList("#home-notices-list", content.home.notices);
  setBulletList("#home-news-list", content.home.news);
  setBulletList("#academy-training-list", [
    `Morning: ${content.academy.training.morning}`,
    `Evening: ${content.academy.training.evening}`,
    content.academy.training.special
  ]);
  const academyDownloadMap = {
    "#academy-download-form-link": content.academy.downloads.admissionForm,
    "#academy-download-brochure-link": content.academy.downloads.brochure
  };
  Object.entries(academyDownloadMap).forEach(([selector, url]) => {
    const node = document.querySelector(selector);
    if (node && url) node.href = url;
  });
  setBulletList("#tournament-events-list", content.tournaments.events);
  setBulletList("#tournament-fixtures-list", content.tournaments.fixtures);
  setBulletList("#tournament-prizes-list", content.tournaments.prizes);
  setText("#tournament-countdown-title", content.tournaments.countdownTitle);
  const grid = document.querySelector("#tournament-countdown-grid");
  if (grid) grid.setAttribute("data-target-date", content.tournaments.countdownDate || defaultContent.tournaments.countdownDate);

  const links = {
    "#download-rules-link": content.tournaments.downloads.rules,
    "#download-brochure-link": content.tournaments.downloads.brochure,
    "#download-fixtures-link": content.tournaments.downloads.fixtures,
    "#download-source-link": content.tournaments.downloads.source
  };
  Object.entries(links).forEach(([selector, url]) => {
    const node = document.querySelector(selector);
    if (node && url) node.href = url;
  });

  renderLive(content.live);
  renderResultsCards(content.results.matches);
  renderResultHighlights(content.results.highlights);
  renderGallery(content.gallery.sections);
};

const loginCard = document.querySelector("#admin-auth-card");
const dashboard = document.querySelector("#admin-dashboard");
const loginForm = document.querySelector("#admin-login-form");
const contentForm = document.querySelector("#admin-content-form");
const logoutButton = document.querySelector("#admin-logout");
const resetButton = document.querySelector("#admin-reset-defaults");
const statusNodes = document.querySelectorAll(".admin-status");
const firebaseHelp = document.querySelector("#firebase-help");

const setStatus = (message) => {
  statusNodes.forEach((node) => {
    node.textContent = message;
  });
};

const setAdminVisibility = (loggedIn) => {
  if (loginCard) {
    loginCard.hidden = loggedIn;
    loginCard.style.display = loggedIn ? "none" : "";
  }
  if (dashboard) {
    dashboard.hidden = !loggedIn;
    dashboard.style.display = loggedIn ? "grid" : "none";
  }
};

const setValue = (selector, value) => {
  const node = document.querySelector(selector);
  if (node) node.value = value || "";
};

const lines = (selector) =>
  (document.querySelector(selector)?.value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const valueOf = (selector) => (document.querySelector(selector)?.value || "").trim();

const fillAdminForm = (content) => {
  setValue("#admin-home-hero-image", content.home.heroImage || "");
  setValue("#admin-home-founder-label", content.home.founder?.label || "");
  setValue("#admin-home-founder-name", content.home.founder?.name || "");
  setValue("#admin-home-founder-text", content.home.founder?.text || "");
  setValue("#admin-home-notices", content.home.notices.join("\n"));
  setValue("#admin-home-news", content.home.news.join("\n"));
  setValue("#admin-academy-morning", content.academy.training.morning);
  setValue("#admin-academy-evening", content.academy.training.evening);
  setValue("#admin-academy-special", content.academy.training.special);
  setValue("#admin-academy-download-form", content.academy.downloads.admissionForm);
  setValue("#admin-academy-download-brochure", content.academy.downloads.brochure);
  setValue("#admin-tournament-events", content.tournaments.events.join("\n"));
  setValue("#admin-tournament-fixtures", content.tournaments.fixtures.join("\n"));
  setValue("#admin-tournament-prizes", content.tournaments.prizes.join("\n"));
  setValue("#admin-countdown-title", content.tournaments.countdownTitle);
  setValue("#admin-countdown-date", content.tournaments.countdownDate);
  setValue("#admin-download-rules", content.tournaments.downloads.rules);
  setValue("#admin-download-brochure", content.tournaments.downloads.brochure);
  setValue("#admin-download-fixtures", content.tournaments.downloads.fixtures);
  setValue("#admin-download-source", content.tournaments.downloads.source);
  setValue("#admin-live-title", content.live.title);
  setValue("#admin-live-url", content.live.youtubeUrl);
  content.results.matches.forEach((match, index) => {
    setValue(`#result-${index}-label`, match.label);
    setValue(`#result-${index}-achievement`, match.achievement);
    setValue(`#result-${index}-title`, match.title);
    setValue(`#result-${index}-score1`, match.scoreOne);
    setValue(`#result-${index}-score2`, match.scoreTwo);
    setValue(`#result-${index}-batter`, match.topBatter);
    setValue(`#result-${index}-bowler`, match.topBowler);
    setValue(`#result-${index}-mom`, match.manOfMatch);
  });
  content.results.highlights.forEach((item, index) => {
    setValue(`#highlight-${index}-label`, item.label);
    setValue(`#highlight-${index}-title`, item.title);
    setValue(`#highlight-${index}-points`, item.points.join("\n"));
  });
  content.gallery.sections.forEach((section, index) => {
    setValue(`#gallery-section-${index}-title`, section.title);
    setValue(`#gallery-section-${index}-item-titles`, (section.items || []).map((item) => item.title || "").join("\n"));
    setValue(`#gallery-section-${index}-item-images`, (section.items || []).map((item) => item.image || "").join("\n"));
    setValue(`#gallery-section-${index}-item-alts`, (section.items || []).map((item) => item.alt || "").join("\n"));
  });
};

const collectAdminForm = () => ({
  home: {
    heroImage: valueOf("#admin-home-hero-image"),
    founder: {
      label: valueOf("#admin-home-founder-label"),
      name: valueOf("#admin-home-founder-name"),
      text: valueOf("#admin-home-founder-text")
    },
    notices: lines("#admin-home-notices"),
    news: lines("#admin-home-news")
  },
  academy: {
    training: {
      morning: valueOf("#admin-academy-morning"),
      evening: valueOf("#admin-academy-evening"),
      special: valueOf("#admin-academy-special")
    },
    downloads: {
      admissionForm: valueOf("#admin-academy-download-form"),
      brochure: valueOf("#admin-academy-download-brochure")
    }
  },
  tournaments: {
    events: lines("#admin-tournament-events"),
    fixtures: lines("#admin-tournament-fixtures"),
    prizes: lines("#admin-tournament-prizes"),
    countdownTitle: valueOf("#admin-countdown-title"),
    countdownDate: valueOf("#admin-countdown-date"),
    downloads: {
      rules: valueOf("#admin-download-rules"),
      brochure: valueOf("#admin-download-brochure"),
      fixtures: valueOf("#admin-download-fixtures"),
      source: valueOf("#admin-download-source")
    }
  },
  live: {
    title: valueOf("#admin-live-title"),
    youtubeUrl: valueOf("#admin-live-url")
  },
  gallery: {
    sections: Array.from({ length: 3 }, (_, sectionIndex) => {
      const titles = lines(`#gallery-section-${sectionIndex}-item-titles`).slice(0, 10);
      const images = lines(`#gallery-section-${sectionIndex}-item-images`).slice(0, 10);
      const alts = lines(`#gallery-section-${sectionIndex}-item-alts`).slice(0, 10);
      const maxLength = Math.max(titles.length, images.length, alts.length);
      return {
        title: valueOf(`#gallery-section-${sectionIndex}-title`),
        items: Array.from({ length: maxLength }, (_, itemIndex) => ({
          title: titles[itemIndex] || `Gallery Photo ${itemIndex + 1}`,
          image: images[itemIndex] || "",
          alt: alts[itemIndex] || titles[itemIndex] || `Gallery Photo ${itemIndex + 1}`
        })).filter((item) => item.image)
      };
    })
  },
  results: {
    matches: Array.from({ length: 3 }, (_, index) => ({
      label: valueOf(`#result-${index}-label`),
      achievement: valueOf(`#result-${index}-achievement`),
      title: valueOf(`#result-${index}-title`),
      scoreOne: valueOf(`#result-${index}-score1`),
      scoreTwo: valueOf(`#result-${index}-score2`),
      topBatter: valueOf(`#result-${index}-batter`),
      topBowler: valueOf(`#result-${index}-bowler`),
      manOfMatch: valueOf(`#result-${index}-mom`)
    })),
    highlights: Array.from({ length: 2 }, (_, index) => ({
      label: valueOf(`#highlight-${index}-label`),
      title: valueOf(`#highlight-${index}-title`),
      points: lines(`#highlight-${index}-points`)
    }))
  }
});

const contentRef = hasFirebaseConfig && db ? ref(db, "siteContent") : null;

if (!hasFirebaseConfig) {
  if (currentPage === "admin.html") {
    setAdminVisibility(false);
    setStatus("Add your Firebase project config in firebase-config.js to activate the online admin panel.");
    if (firebaseHelp) firebaseHelp.hidden = false;
  }
} else if (contentRef) {
  onValue(contentRef, (snapshot) => {
    const content = mergeDeep(defaultContent, snapshot.val() || {});
    applyContent(content);
    if (currentPage === "admin.html") {
      fillAdminForm(content);
    }
  });

  if (currentPage === "admin.html" && auth) {
    onAuthStateChanged(auth, (user) => {
      setAdminVisibility(Boolean(user));
      if (user) {
        setStatus(`Logged in as ${user.email}`);
      } else {
        setStatus("Login with your Firebase admin email and password.");
      }
    });

    if (loginForm) {
      loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = valueOf("#admin-email");
        const password = valueOf("#admin-password");
        try {
          await signInWithEmailAndPassword(auth, email, password);
          setStatus("Login successful.");
        } catch (error) {
          setStatus(error.message || "Login failed.");
        }
      });
    }

    if (logoutButton) {
      logoutButton.addEventListener("click", async () => {
        try {
          await signOut(auth);
          setStatus("Logged out successfully.");
        } catch (error) {
          setStatus(error.message || "Logout failed.");
        }
      });
    }

    if (contentForm) {
      contentForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        try {
          await set(contentRef, collectAdminForm());
          setStatus("Content saved to Firebase successfully.");
        } catch (error) {
          setStatus(error.message || "Saving failed.");
        }
      });
    }

    if (resetButton) {
      resetButton.addEventListener("click", async () => {
        try {
          await set(contentRef, defaultContent);
          setStatus("Default content restored to Firebase.");
        } catch (error) {
          setStatus(error.message || "Reset failed.");
        }
      });
    }
  }
}
