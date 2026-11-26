// Vira portfolio — no backend, no dependencies.
// 1. Light/dark theme toggle (saved in localStorage, defaults to system preference).
// 2. Copy-email button.
// 3. Contact form: builds a mailto: link and opens the visitor's email app.

(function () {
  "use strict";

  var EMAIL = "viramanganew@gmail.com";

  /* --- Theme --- */
  var toggle = document.getElementById("theme-toggle");
  var root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) toggle.textContent = theme === "dark" ? "☀️" : "🌙";
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
        // Fallback for older browsers.
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
