// Vira portfolio — no backend, no dependencies.
// 1. Light/dark theme toggle (saved in localStorage, defaults to system preference).
// 2. Reveal-on-scroll (IntersectionObserver) + animated honest counters.
// 3. Subtle parallax on hero decorations (data-speed), disabled for reduced motion.
// 4. Copy-email button.
// 5. Contact form: builds a mailto: link and opens the visitor's email app.

(function () {
  "use strict";

  var EMAIL = "viramanganew@gmail.com";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Theme --- */
  var toggle = document.getElementById("theme-toggle");
  var root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
  }

  var saved = null;
  try { saved = localStorage.getItem("vira-theme"); } catch (e) { /* storage unavailable */ }
  var initial = saved || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(initial);

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("vira-theme", next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* --- Reveal on scroll --- */
  var revealEls = document.querySelectorAll(".reveal");
  function showAll() {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    showAll();
  }

  /* --- Animated counters (honest numbers only: repos, demos built, languages) --- */
  var counters = document.querySelectorAll(".stat-num[data-count]");
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reduceMotion) { el.textContent = target; return; }
    var start = null;
    var duration = 900;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && !reduceMotion) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
  }

  /* --- Hero parallax --- */
  var parallaxEls = document.querySelectorAll(".hero-decor [data-speed]");
  if (parallaxEls.length && !reduceMotion) {
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          parallaxEls.forEach(function (el) {
            var speed = parseFloat(el.getAttribute("data-speed")) || 0;
            el.style.translate = "0 " + (y * speed) + "px";
          });
        }
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- Copy email --- */
  var copyBtn = document.getElementById("copy-email");
  var feedback = document.getElementById("copy-feedback");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      function done(ok) {
        if (feedback) feedback.textContent = ok ? "Copied — " + EMAIL : "Couldn't copy automatically — the address is shown above.";
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(function () { done(true); }, function () { done(false); });
      } else {
        var ta = document.createElement("textarea");
        ta.value = EMAIL;
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        done(ok);
      }
    });
  }

  /* --- Contact form (mailto, no backend) --- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var type = document.getElementById("type").value;
      var message = document.getElementById("message").value.trim();

      var subject = "Portfolio contact: " + type + " — " + name;
      var body = "Name: " + name + "\nEmail: " + email + "\nProject type: " + type + "\n\n" + message;
      window.location.href =
        "mailto:" + EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }
})();
