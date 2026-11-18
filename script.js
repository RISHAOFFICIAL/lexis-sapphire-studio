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
      emoji: "\u1F423",
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
      emoji: "\u1F490",
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
      emoji: "\u1F1FA\u1F1F8",
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
      emoji: "\u1F4AA",
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
      emoji: "\u1F386",
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
      emoji: "\u1F4AA",
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
      emoji: "\u1F383",
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
      emoji: "\u1F396\uFE0F",
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
      emoji: "\u1F342",
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
      emoji: "\u1F384",
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
  }

  document.addEventListener("DOMContentLoaded", applySeason);
})();

  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("visible"); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { observer.observe(el); });

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
});
