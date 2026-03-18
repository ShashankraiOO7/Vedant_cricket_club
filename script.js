const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const atmosphere = document.querySelector("#sports-atmosphere");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const siteFooter = document.querySelector(".site-footer");

if (siteFooter) {
  siteFooter.innerHTML = `
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

if (atmosphere) {
  const motifs = [
    { name: "bat", min: 36, max: 56 },
    { name: "cricket-ball", min: 24, max: 44 },
    { name: "football", min: 28, max: 46 },
    { name: "karate", min: 30, max: 54 },
    { name: "fitness", min: 30, max: 50 }
  ];

  for (let index = 0; index < 20; index += 1) {
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

document.querySelectorAll(".smart-form[data-form-name]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.nextElementSibling;
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

const rankingList = document.querySelector("#ranking-list");
const compareForm = document.querySelector("#player-compare-form");
const compareOutput = document.querySelector("#compare-output");
const playerASelect = document.querySelector("#player-a-select");
const playerBSelect = document.querySelector("#player-b-select");

const fallbackPlayers = [
  { id: "aryan-singh", name: "Aryan Singh", role: "Top Order Batter", matches: 18, runs: 428, wickets: 3, strikeRate: 134.6, economy: 7.4, best: "86" },
  { id: "shivam-yadav", name: "Shivam Yadav", role: "Fast Bowler", matches: 16, runs: 96, wickets: 24, strikeRate: 112.2, economy: 5.4, best: "4/18" },
  { id: "r-khan", name: "R. Khan", role: "All-Rounder", matches: 15, runs: 276, wickets: 14, strikeRate: 128.1, economy: 6.2, best: "55 runs, 2 wickets" },
  { id: "aditya-rai", name: "Aditya Rai", role: "Bowling All-Rounder", matches: 14, runs: 184, wickets: 17, strikeRate: 121.4, economy: 5.9, best: "4/19" },
  { id: "rohan-gautam", name: "Rohan Gautam", role: "Middle Order Batter", matches: 17, runs: 309, wickets: 2, strikeRate: 129.8, economy: 7.8, best: "74" }
];

if (rankingList && compareForm && compareOutput && playerASelect && playerBSelect) {
  const initPlayerTools = (players) => {
    const scorePlayer = (player) => {
      const runScore = player.runs * 0.25;
      const wicketScore = player.wickets * 18;
      const strikeScore = player.strikeRate * 1.5;
      const economyBonus = Math.max(0, (8 - player.economy) * 16);
      const matchFactor = player.matches * 2;
      return runScore + wicketScore + strikeScore + economyBonus + matchFactor;
    };

    const ranked = [...players]
      .map((player) => ({ ...player, score: scorePlayer(player) }))
      .sort((a, b) => b.score - a.score);

    rankingList.innerHTML = ranked
      .map(
        (player, index) => `
            <div class="ranking-row">
              <span>#${index + 1}</span>
              <span>${player.name}</span>
              <span>${player.role}</span>
              <span>${player.score.toFixed(1)}</span>
            </div>
          `
      )
      .join("");

    players.forEach((player) => {
      const optionA = document.createElement("option");
      optionA.value = player.id;
      optionA.textContent = `${player.name} (${player.role})`;
      playerASelect.appendChild(optionA);

      const optionB = document.createElement("option");
      optionB.value = player.id;
      optionB.textContent = `${player.name} (${player.role})`;
      playerBSelect.appendChild(optionB);
    });

    if (players.length > 1) {
      playerASelect.value = players[0].id;
      playerBSelect.value = players[1].id;
    }

    const renderComparison = () => {
      const playerA = players.find((player) => player.id === playerASelect.value);
      const playerB = players.find((player) => player.id === playerBSelect.value);
      const status = compareForm.nextElementSibling;

      if (!playerA || !playerB) {
        return;
      }

      if (playerA.id === playerB.id) {
        if (status) {
          status.textContent = "Please select two different players.";
        }
        return;
      }

      if (status) {
        status.textContent = "Comparison generated.";
      }

      compareOutput.innerHTML = `
          <p class="card-label">Live Comparison</p>
          <h3>${playerA.name} vs ${playerB.name}</h3>
          <div class="compare-grid">
            <div class="compare-col">
              <strong>${playerA.name}</strong>
              <p>Matches: ${playerA.matches}</p>
              <p>Runs: ${playerA.runs}</p>
              <p>Wickets: ${playerA.wickets}</p>
              <p>Strike Rate: ${playerA.strikeRate}</p>
              <p>Economy: ${playerA.economy}</p>
              <p>Best: ${playerA.best}</p>
            </div>
            <div class="compare-col">
              <strong>${playerB.name}</strong>
              <p>Matches: ${playerB.matches}</p>
              <p>Runs: ${playerB.runs}</p>
              <p>Wickets: ${playerB.wickets}</p>
              <p>Strike Rate: ${playerB.strikeRate}</p>
              <p>Economy: ${playerB.economy}</p>
              <p>Best: ${playerB.best}</p>
            </div>
          </div>
        `;
    };

    compareForm.addEventListener("submit", (event) => {
      event.preventDefault();
      renderComparison();
    });

    playerASelect.addEventListener("change", renderComparison);
    playerBSelect.addEventListener("change", renderComparison);
    renderComparison();
  };

  fetch("./data/players.json")
    .then((response) => response.json())
    .then((players) => initPlayerTools(players))
    .catch(() => {
      initPlayerTools(fallbackPlayers);
    });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
