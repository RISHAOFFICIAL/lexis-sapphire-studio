// ============================================================
// Seasonal holiday decor — auto-switches by date.
// Add a new holiday by adding one entry to HOLIDAYS below.
// Each entry: id, name, emoji, banner text, footer text,
// banner gradient, and hero glow colors. The date window
// is computed by start/end functions that take the year.
// ============================================================
(function () {
  // --- Date helpers (all local time) ---
  function nthWeekdayOfMonth(year, month, weekday, n) {
    // month 0-11, weekday 0=Sun..6=Sat, n=1st..4th (or -1 for last)
    var d;
    if (n > 0) {
      d = new Date(year, month, 1);
      var offset = (weekday - d.getDay() + 7) % 7;
      d.setDate(1 + offset + (n - 1) * 7);
    } else {
      d = new Date(year, month + 1, 0);
      var back = (d.getDay() - weekday + 7) % 7;
      d.setDate(d.getDate() - back);
    }
    return d;
  }
  function easterSunday(year) {
    // Anonymous Gregorian algorithm
    var a = year % 19, b = Math.floor(year / 100), c = year % 100;
    var d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4), k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
    var day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month, day);
  }
  function daysBefore(date, n) {
    var d = new Date(date);
    d.setDate(d.getDate() - n);
    return d;
  }
  function atMidnight(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  var HOLIDAYS = [
    {
      id: "new-year",
      emoji: "\u2728",
      falling: ["\u2728", "\u2B50", "\uD83C\uDF89"],
      banner: "Happy New Year from Lexis Sapphire Studio! New year, new app, new website. Let us build yours.",
      footer: "Happy New Year! Here is to bold ideas and bigger launches in the year ahead.",
      gradient: "linear-gradient(90deg, #0a0a2e 0%, #1a1a4e 25%, #2d1b69 50%, #1a1a4e 75%, #0a0a2e 100%)",
      glow: "rgba(147, 112, 219, 0.15)",
      window: function (y) {
        return { start: new Date(y, 11, 26), end: new Date(y + 1, 0, 1, 23, 59, 59) };
      }
    },
    {
      id: "valentines",
      emoji: "\u2764\uFE0F",
      falling: ["\u2764\uFE0F", "\uD83D\uDC95", "\uD83D\uDC97"],
      banner: "Happy Valentine's Day from Lexis Sapphire Studio! Fall in love with a website your customers adore.",
      footer: "Happy Valentine's Day! Built with love in Detroit.",
      gradient: "linear-gradient(90deg, #5c0e1e 0%, #8b1a2b 25%, #c2183b 50%, #8b1a2b 75%, #5c0e1e 100%)",
      glow: "rgba(194, 24, 59, 0.15)",
      window: function (y) {
        return { start: new Date(y, 1, 1), end: new Date(y, 1, 14, 23, 59, 59) };
      }
    },
    {
      id: "st-patricks",
      emoji: "\u2618\uFE0F",
      falling: ["\u2618\uFE0F", "\uD83C\uDF40"],
      banner: "Happy St. Patrick's Day from Lexis Sapphire Studio! A little luck, a lot of hard work, and a website that shines.",
      footer: "Happy St. Patrick's Day! Wishing you luck in business and beyond.",
      gradient: "linear-gradient(90deg, #0b3d1e 0%, #145a32 25%, #1e8449 50%, #145a32 75%, #0b3d1e 100%)",
      glow: "rgba(30, 132, 73, 0.15)",
      window: function (y) {
        return { start: new Date(y, 2, 10), end: new Date(y, 2, 17, 23, 59, 59) };
      }
    },
    {
      id: "easter",
      emoji: "\uD83D\uDC23",
      falling: ["\uD83C\uDF38", "\uD83C\uDF37", "\uD83D\uDC23"],
      banner: "Happy Easter from Lexis Sapphire Studio! Fresh ideas, fresh starts, fresh websites.",
      footer: "Happy Easter! Wishing you a bright and hopeful spring.",
      gradient: "linear-gradient(90deg, #6b4c8a 0%, #9b7bb8 25%, #c9a0dc 50%, #9b7bb8 75%, #6b4c8a 100%)",
      glow: "rgba(155, 123, 184, 0.15)",
      window: function (y) {
        var easter = easterSunday(y);
        return { start: daysBefore(easter, 14), end: new Date(easter.getFullYear(), easter.getMonth(), easter.getDate(), 23, 59, 59) };
      }
    },
    {
      id: "mothers-day",
      emoji: "\uD83D\uDC90",
      falling: ["\uD83C\uDF38", "\uD83D\uDC90", "\uD83C\uDF37"],
      banner: "Happy Mother's Day from Lexis Sapphire Studio! To every mom building a business and a family at the same time.",
      footer: "Happy Mother's Day! Honoring the moms who make it all happen.",
      gradient: "linear-gradient(90deg, #6b2d4a 0%, #9b4a72 25%, #d4789e 50%, #9b4a72 75%, #6b2d4a 100%)",
      glow: "rgba(212, 120, 158, 0.15)",
      window: function (y) {
        var md = nthWeekdayOfMonth(y, 4, 0, 2);
        return { start: new Date(y, 4, 1), end: new Date(md.getFullYear(), md.getMonth(), md.getDate(), 23, 59, 59) };
      }
    },
    {
      id: "memorial-day",
      emoji: "\uD83C\uDDFA\uD83C\uDDF8",
      falling: ["\u2B50", "\u2764\uFE0F", "\uD83D\uDC99"],
      banner: "This Memorial Day, Lexis Sapphire Studio honors those who served and gave everything.",
      footer: "Remembering and honoring our fallen heroes this Memorial Day.",
      gradient: "linear-gradient(90deg, #1a1a3e 0%, #2c3e6b 25%, #4a6fa5 50%, #2c3e6b 75%, #1a1a3e 100%)",
      glow: "rgba(74, 111, 165, 0.15)",
      window: function (y) {
        var md = nthWeekdayOfMonth(y, 4, 1, -1);
        return { start: daysBefore(md, 7), end: new Date(md.getFullYear(), md.getMonth(), md.getDate(), 23, 59, 59) };
      }
    },
    {
      id: "fathers-day",
      emoji: "\uD83D\uDCAA",
      falling: ["\uD83D\uDC99", "\u2B50", "\uD83D\uDCAA"],
      banner: "Happy Father's Day from Lexis Sapphire Studio! To every dad building a legacy for his family.",
      footer: "Happy Father's Day! Honoring the dads who build, provide, and inspire.",
      gradient: "linear-gradient(90deg, #1a2f4a 0%, #2c4a6b 25%, #4a7a9b 50%, #2c4a6b 75%, #1a2f4a 100%)",
      glow: "rgba(74, 122, 155, 0.15)",
      window: function (y) {
        var fd = nthWeekdayOfMonth(y, 5, 0, 3);
        return { start: daysBefore(fd, 10), end: new Date(fd.getFullYear(), fd.getMonth(), fd.getDate(), 23, 59, 59) };
      }
    },
    {
      id: "juneteenth",
      emoji: "\u270A\uFE0F",
      falling: ["\u2B50", "\u2764\uFE0F", "\uD83D\uDC9A"],
      banner: "Happy Juneteenth from Lexis Sapphire Studio! Celebrating freedom, resilience, and Black excellence in Detroit and beyond.",
      footer: "Happy Juneteenth! Freedom, pride, and progress.",
      gradient: "linear-gradient(90deg, #5c0e0e 0%, #8b1a1a 25%, #1a5c1a 50%, #1a1a8b 75%, #5c0e0e 100%)",
      glow: "rgba(139, 26, 26, 0.12)",
      window: function (y) {
        return { start: new Date(y, 5, 12), end: new Date(y, 5, 19, 23, 59, 59) };
      }
    },
    {
      id: "july-4th",
      emoji: "\uD83C\uDF86",
      falling: ["\uD83C\uDF86", "\u2B50", "\uD83C\uDF1F"],
      banner: "Happy Independence Day from Lexis Sapphire Studio! Built free, built bold, built in Detroit.",
      footer: "Happy 4th of July! Celebrating freedom and the American dream.",
      gradient: "linear-gradient(90deg, #0e2a5c 0%, #1a4a8b 25%, #c2183b 50%, #1a4a8b 75%, #0e2a5c 100%)",
      glow: "rgba(194, 24, 59, 0.12)",
      window: function (y) {
        return { start: new Date(y, 5, 27), end: new Date(y, 6, 4, 23, 59, 59) };
      }
    },
    {
      id: "labor-day",
      emoji: "\uD83D\uDCAA",
      falling: ["\u2B50", "\uD83D\uDCAA", "\uD83D\uDC4F"],
      banner: "Happy Labor Day from Lexis Sapphire Studio! Honoring every worker, builder, and dreamer.",
      footer: "Happy Labor Day! Rest well, you earned it.",
      gradient: "linear-gradient(90deg, #2e4a1e 0%, #4a6b2e 25%, #6b8e3e 50%, #4a6b2e 75%, #2e4a1e 100%)",
      glow: "rgba(107, 142, 62, 0.15)",
      window: function (y) {
        var ld = nthWeekdayOfMonth(y, 8, 1, 1);
        return { start: daysBefore(ld, 7), end: new Date(ld.getFullYear(), ld.getMonth(), ld.getDate(), 23, 59, 59) };
      }
    },
    {
      id: "halloween",
      emoji: "\uD83C\uDF83",
      falling: ["\uD83C\uDF83", "\uD83D\uDC7B", "\uD83E\uDD87"],
      banner: "Happy Halloween from Lexis Sapphire Studio! No tricks, just treats. A website so good it is scary.",
      footer: "Happy Halloween! Have a spooky, safe, and sweet night.",
      gradient: "linear-gradient(90deg, #1a0a2e 0%, #2e1a4a 25%, #e65100 50%, #2e1a4a 75%, #1a0a2e 100%)",
      glow: "rgba(230, 81, 0, 0.15)",
      window: function (y) {
        return { start: new Date(y, 9, 15), end: new Date(y, 9, 31, 23, 59, 59) };
      }
    },
    {
      id: "veterans-day",
      emoji: "\uD83C\uDF96\uFE0F",
      falling: ["\u2B50", "\u2764\uFE0F", "\uD83D\uDC99"],
      banner: "Happy Veterans Day from Lexis Sapphire Studio! Thank you to every veteran who served.",
      footer: "Thank you, veterans, for your service and sacrifice.",
      gradient: "linear-gradient(90deg, #1a1a3e 0%, #2c3e6b 25%, #8b1a1a 50%, #2c3e6b 75%, #1a1a3e 100%)",
      glow: "rgba(44, 62, 107, 0.15)",
      window: function (y) {
        return { start: new Date(y, 10, 4), end: new Date(y, 10, 11, 23, 59, 59) };
      }
    },
    {
      id: "thanksgiving",
      emoji: "\uD83C\uDF42",
      falling: ["\uD83C\uDF42", "\uD83C\uDF41", "\uD83C\uDF43"],
      banner: "Happy Thanksgiving from Lexis Sapphire Studio! We are grateful for every Detroit business we get to build for.",
      footer: "Happy Thanksgiving! Grateful for our clients, our community, and the city we call home.",
      gradient: "linear-gradient(90deg, #5c2e0e 0%, #8b4513 25%, #b5651d 50%, #8b4513 75%, #5c2e0e 100%)",
      glow: "rgba(181, 101, 29, 0.15)",
      window: function (y) {
        var tg = nthWeekdayOfMonth(y, 10, 4, 4);
        return { start: new Date(y, 10, 12), end: new Date(tg.getFullYear(), tg.getMonth(), tg.getDate(), 23, 59, 59) };
      }
    },
    {
      id: "christmas",
      emoji: "\uD83C\uDF84",
      falling: ["\u2744\uFE0F", "\u26C4", "\uD83C\uDF84"],
      banner: "Merry Christmas from Lexis Sapphire Studio! Wishing you joy, peace, and a brand new website under the tree.",
      footer: "Merry Christmas! Wishing you warmth, joy, and a wonderful new year.",
      gradient: "linear-gradient(90deg, #0b3d1e 0%, #145a32 25%, #8b1a1a 50%, #145a32 75%, #0b3d1e 100%)",
      glow: "rgba(20, 90, 50, 0.15)",
      window: function (y) {
        return { start: new Date(y, 10, 27), end: new Date(y, 11, 25, 23, 59, 59) };
      }
    }
  ];

  function currentHoliday() {
    var now = new Date();
    var year = now.getFullYear();
    // Check this year and last year (New Year window spans Dec-Jan)
    var years = [year - 1, year];
    for (var i = 0; i < years.length; i++) {
      for (var j = 0; j < HOLIDAYS.length; j++) {
        var w = HOLIDAYS[j].window(years[i]);
        if (now >= w.start && now <= w.end) return HOLIDAYS[j];
      }
    }
    return null;
  }

  // --- Falling seasonal elements (leaves, snow, etc.) ---
  // Pure CSS animation on emoji characters: zero image downloads,
  // GPU-accelerated transforms only, so page speed is unaffected.
  // Respects prefers-reduced-motion and pauses when tab is hidden.
  function startFalling(h) {
    if (!h || !h.falling || !h.falling.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Fewer pieces on small screens for performance
    var isMobile = window.innerWidth < 700;
    var count = isMobile ? 10 : 16;
    var container = document.createElement("div");
    container.className = "falling-layer";
    container.setAttribute("aria-hidden", "true");
    for (var i = 0; i < count; i++) {
      var el = document.createElement("span");
      el.className = "falling-piece";
      el.textContent = h.falling[i % h.falling.length];
      // Randomize position, size, speed, and phase
      el.style.left = (Math.random() * 96 + 2) + "%";
      el.style.fontSize = (Math.random() * 10 + 14) + "px";
      el.style.opacity = (Math.random() * 0.4 + 0.5).toFixed(2);
      var duration = (Math.random() * 8 + 10).toFixed(1);
      el.style.animationDuration = duration + "s";
      // Negative delay spreads pieces across the screen on load
      el.style.animationDelay = (-Math.random() * parseFloat(duration)).toFixed(1) + "s";
      container.appendChild(el);
    }
    document.body.appendChild(container);
  }

  function applySeason() {
    var banner = document.querySelector(".seasonal-banner");
    var footer = document.querySelector(".seasonal-footer");
    var hero = document.querySelector(".hero");
    if (!banner) return;
    var h = currentHoliday();
    if (!h) {
      // No holiday right now: hide the banner and footer line
      banner.style.display = "none";
      if (footer) footer.style.display = "none";
      return;
    }
    // Banner text + colors
    banner.style.background = h.gradient;
    var text = banner.querySelector("p");
    if (text) text.textContent = h.banner;
    var leaves = banner.querySelectorAll(".seasonal-leaf");
    leaves.forEach(function (el) { el.textContent = h.emoji; });
    // Footer line
    if (footer) {
      footer.textContent = h.emoji + " " + h.footer + " " + h.emoji;
      footer.style.display = "";
    }
    // Hero warm glow
    if (hero) {
      hero.style.background =
        "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201, 162, 39, 0.12) 0%, transparent 70%)," +
        "radial-gradient(ellipse 50% 40% at 50% 100%, " + h.glow + " 0%, transparent 70%)," +
        "var(--bg)";
    }
    // Falling seasonal pieces (leaves for Thanksgiving, snow for Christmas, etc.)
    startFalling(h);
  }

  document.addEventListener("DOMContentLoaded", applySeason);
})();

document.addEventListener("DOMContentLoaded", function () {
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { observer.observe(el); });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Lightbox: tap a work image to see it full size
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxClose = document.getElementById("lightbox-close");
  if (lightbox && lightboxImg) {
    document.querySelectorAll(".work-visual img").forEach(function (img) {
      img.addEventListener("click", function () {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });
    function closeLightbox() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }
    lightbox.addEventListener("click", closeLightbox);
    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  // PopOut demo video: show a play button if autoplay fails, tap to play/pause
  var demoVideo = document.getElementById("popout-demo");
  var playBtn = document.getElementById("popout-play-btn");
  if (demoVideo && playBtn) {
    function syncPlayButton() {
      playBtn.hidden = !demoVideo.paused;
    }
    // Autoplay may be blocked; check after a short delay
    setTimeout(syncPlayButton, 500);
    demoVideo.addEventListener("play", syncPlayButton);
    demoVideo.addEventListener("pause", syncPlayButton);
    playBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      demoVideo.play();
    });
    demoVideo.addEventListener("click", function () {
      if (demoVideo.paused) {
        demoVideo.play();
      } else {
        demoVideo.pause();
      }
    });
  }
});

// Social share: copy link + floating share panel
document.addEventListener("DOMContentLoaded", function () {
  var toast = document.getElementById("share-toast");
  var toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2000);
  }
  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
    done();
  }
  function copyText(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  }
  document.querySelectorAll(".js-copy-link").forEach(function (btn) {
    btn.addEventListener("click", function () {
      copyText(btn.getAttribute("data-url") || "https://lexissapphirestudio.com/", function () {
        showToast("Link copied!");
      });
    });
  });
  var floatWrap = document.getElementById("share-float");
  var floatToggle = document.getElementById("share-float-toggle");
  if (floatWrap && floatToggle) {
    floatToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = floatWrap.classList.toggle("open");
      floatToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!floatWrap.contains(e.target)) {
        floatWrap.classList.remove("open");
        floatToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
});

// Bella chatbot: floating assistant for the Studio homepage
document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("bella-btn");
  var win = document.getElementById("bella-window");
  var closeBtn = document.getElementById("bella-close");
  var messages = document.getElementById("bella-messages");
  var quick = document.getElementById("bella-quick");
  var form = document.getElementById("bella-form");
  var input = document.getElementById("bella-input");
  if (!btn || !win || !messages || !form || !input) return;

  var INTAKE = "https://lexissapphirestudio.com/intake/";
  var welcomed = false;
  var leadStep = null; // null, "name", "email", "service", "details"
  var lead = { name: "", email: "", service: "", details: "" };

  var DEFAULT_QUICK = [
    "What services do you offer?",
    "How much does a website cost?",
    "How much does an app cost?",
    "Do you offer payment plans?",
    "How long does a project take?",
    "I want to start a project",
    "Talk to a human"
  ];
  var SERVICE_QUICK = ["Website", "iOS App", "PopOut Video", "Social Media"];

  function scrollBottom() {
    messages.scrollTop = messages.scrollHeight;
  }
  function addBot(html) {
    var div = document.createElement("div");
    div.className = "bella-msg bella-msg-bot";
    div.innerHTML = html;
    messages.appendChild(div);
    scrollBottom();
  }
  function addUser(text) {
    var div = document.createElement("div");
    div.className = "bella-msg bella-msg-user";
    div.textContent = text;
    messages.appendChild(div);
    scrollBottom();
  }
  function showTyping() {
    var div = document.createElement("div");
    div.className = "bella-msg bella-msg-bot bella-typing";
    div.id = "bella-typing";
    div.innerHTML = "<span></span><span></span><span></span>";
    messages.appendChild(div);
    scrollBottom();
  }
  function hideTyping() {
    var t = document.getElementById("bella-typing");
    if (t) t.remove();
  }
  function botReply(html, chips) {
    showTyping();
    setTimeout(function () {
      hideTyping();
      addBot(html);
      renderQuick(chips === undefined ? DEFAULT_QUICK : chips);
    }, 700);
  }
  function renderQuick(items) {
    quick.innerHTML = "";
    if (!items || !items.length) return;
    items.forEach(function (label) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "bella-chip";
      chip.textContent = label;
      chip.addEventListener("click", function () {
        handleUserText(label);
      });
      quick.appendChild(chip);
    });
  }
  function intakeLink(text) {
    return '<a href="' + INTAKE + '" target="_blank" rel="noopener">' + (text || "intake form") + "</a>";
  }

  function answerFor(text) {
    var t = text.toLowerCase();
    var has = function () {
      for (var i = 0; i < arguments.length; i++) {
        if (t.indexOf(arguments[i]) !== -1) return true;
      }
      return false;
    };
    if (has("start a project", "start my project", "get started", "i want to start", "begin a project", "hire you", "work with you", "book a project", "quote")) return "lead";
    if (has("human", "real person", "talk to someone", "contact", "phone", "call you", "email")) {
      return "You can reach Risha directly at <a href=\"mailto:hello@lexissapphirestudio.com\">hello@lexissapphirestudio.com</a> or (248) 722-8198. Every serious inquiry gets a reply. You can also tell us about your project on the " + intakeLink() + ".";
    }
    if (has("payment plan", "payment options", "pay over time", "klarna", "afterpay", "financing", "installment", "pay in parts")) {
      return "Yes! Payment plans are available on every service through Klarna and Afterpay. We also accept Apple Pay, Google Pay, and all major credit and debit cards.";
    }
    if (has("black friday", "sale", "deal", "discount", "promo", "gta6", "coupon")) {
      return "Our Black Friday sale runs through Sunday, November 29 at midnight ET. Get 20% off any website or app with a $150 deposit, or 3 PopOut Videos for $150 (normally $225). Use code GTA6 at checkout for 6% more off. Payment plans available.";
    }
    if (has("website") && has("cost", "price", "much", "charge")) {
      return "Websites start at $1,500 and are typically done in 2 weeks. Payment plans are available through Klarna and Afterpay. Want to start one? Tell us about your project on the " + intakeLink() + ".";
    }
    if ((has("app") || has("ios") || has("iphone")) && has("cost", "price", "much", "charge")) {
      return "iOS apps start at $3,000 and typically take 4 to 6 weeks. That includes design, development, TestFlight, and App Store release. Payment plans are available. Tell us about your app idea on the " + intakeLink() + ".";
    }
    if (has("popout", "pop out", "video")) {
      return "PopOut Videos are $75 for one video or $110 for two. Your product breaks right out of the post, made from your real photos, delivered in 48 hours. Want one? Tell us about it on the " + intakeLink() + ".";
    }
    if (has("social media", "content pack", "posting", "manage my instagram", "manage my social")) {
      return "Social media management starts with a Content Pack from $45, and monthly management starts at $300 per month. That covers posts, reels, and captions planned around your goals. Tell us about your business on the " + intakeLink() + ".";
    }
    if (has("how long", "timeline", "how fast", "turnaround", "take to build", "delivery time")) {
      return "Websites take about 2 weeks, iOS apps take 4 to 6 weeks, and PopOut Videos are delivered in 48 hours.";
    }
    if (has("service", "what do you offer", "what do you do", "offerings", "help with")) {
      return "We build iOS apps (from $3,000), websites (from $1,500), PopOut Videos ($75), and social media management (from $300 per month). Payment plans are available on everything. What are you looking for?";
    }
    if (has("process", "how does it work", "how do we start", "steps", "what happens")) {
      return "It is simple: fill out the " + intakeLink() + ", we talk through your project, then we design, build, and launch it. Websites are usually live in 2 weeks.";
    }
    if (has("hiring", "job", "apply", "work for", "career", "position", "opening")) {
      return "Yes, we are hiring! We have 2 Web Developer roles and 2 Social Media Manager roles, both contract. Email your portfolio and resume to <a href=\"mailto:hello@lexissapphirestudio.com\">hello@lexissapphirestudio.com</a> with the role in the subject line.";
    }
    if (has("where", "located", "location", "detroit")) {
      return "We are based in Detroit, Michigan and work with businesses locally and remotely.";
    }
    if (has("hello", "hi ", "hi!", "hey", "good morning", "good afternoon")) {
      return "Hi there! Great to meet you. I can answer questions about our services, pricing, timelines, and payment plans, or help you start a project. What can I do for you?";
    }
    if (has("thank")) {
      return "You are welcome! Anything else I can help with?";
    }
    if (has("bye", "goodbye", "see you")) {
      return "Thanks for stopping by! You can always reach us at hello@lexissapphirestudio.com. Have a great day!";
    }
    return null;
  }

  function startLead() {
    leadStep = "name";
    lead = { name: "", email: "", service: "", details: "" };
    botReply("Wonderful, let us get your project started! What is your name? You can also skip ahead and fill out the " + intakeLink() + " directly.", []);
  }

  function handleLead(text) {
    if (leadStep === "name") {
      lead.name = text;
      leadStep = "email";
      botReply("Nice to meet you, " + text + "! What email should we use to reach you?", []);
      return true;
    }
    if (leadStep === "email") {
      if (text.indexOf("@") === -1 || text.indexOf(".") === -1) {
        botReply("That email does not look quite right. Could you double check it?", []);
        return true;
      }
      lead.email = text;
      leadStep = "service";
      botReply("Thanks! What do you need help with?", SERVICE_QUICK);
      return true;
    }
    if (leadStep === "service") {
      lead.service = text;
      leadStep = "details";
      botReply("Got it, a " + text.toLowerCase() + ". Tell me a little about your project, your business, and anything else that would help.", []);
      return true;
    }
    if (leadStep === "details") {
      lead.details = text;
      leadStep = null;
      botReply("Thank you, " + lead.name + "! Here is what I have:<br><br>Service: " + lead.service + "<br>Project: " + text + "<br><br>To finish up, please send your details through the " + intakeLink() + " or email <a href=\"mailto:hello@lexissapphirestudio.com\">hello@lexissapphirestudio.com</a> and Risha will get back to you. Every serious inquiry gets a reply.");
      return true;
    }
    return false;
  }

  function handleUserText(text) {
    var clean = text.trim();
    if (!clean) return;
    addUser(clean);
    renderQuick([]);
    if (leadStep) {
      showTyping();
      setTimeout(function () { hideTyping(); handleLead(clean); }, 600);
      return;
    }
    var answer = answerFor(clean);
    if (answer === "lead") {
      showTyping();
      setTimeout(function () { hideTyping(); startLead(); }, 600);
      return;
    }
    if (answer) {
      botReply(answer);
      return;
    }
    botReply("Great question! Let me connect you with Risha. You can email <a href=\"mailto:hello@lexissapphirestudio.com\">hello@lexissapphirestudio.com</a>, call (248) 722-8198, or fill out our " + intakeLink() + " and she will get back to you.");
  }

  function openChat() {
    win.hidden = false;
    requestAnimationFrame(function () { win.classList.add("open"); });
    btn.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
    if (!welcomed) {
      welcomed = true;
      showTyping();
      setTimeout(function () {
        hideTyping();
        addBot("Hi! I am Bella, your Lexis Sapphire Studio assistant. How can I help you today?");
        renderQuick(DEFAULT_QUICK);
      }, 700);
    }
    setTimeout(function () { input.focus(); }, 300);
  }
  function closeChat() {
    win.classList.remove("open");
    btn.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
    setTimeout(function () { if (!win.classList.contains("open")) win.hidden = true; }, 250);
  }

  btn.addEventListener("click", function () {
    if (win.classList.contains("open")) { closeChat(); } else { openChat(); }
  });
  closeBtn.addEventListener("click", closeChat);
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = input.value;
    input.value = "";
    handleUserText(text);
  });
});
