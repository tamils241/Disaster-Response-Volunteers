/* ==========================================================================
   Disaster Response Volunteers — main.js
   Progressive enhancement only: nav toggle, sticky header, smooth anchors,
   scroll reveal, animated counters, join form validation, footer year.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- DOM REFS ---------- */
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.querySelector(".site-nav");
  var body = document.body;

  /* ---------- MOBILE NAV ---------- */
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.classList.toggle("is-open", open);
      body.classList.toggle("nav-locked", open);
    });

    siteNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.classList.remove("is-open");
        body.classList.remove("nav-locked");
      }
    });
  }

  /* ---------- DASHBOARD SIDE DRAWER ---------- */
  var dashToggle = document.querySelector(".dash-toggle");
  var dashSide = document.querySelector(".dash-side");
  if (dashToggle && dashSide) {
    dashToggle.addEventListener("click", function () {
      var open = dashSide.classList.toggle("open");
      dashToggle.setAttribute("aria-expanded", open ? "true" : "false");
      dashToggle.classList.toggle("is-open", open);
      body.classList.toggle("nav-locked", open);
    });

    dashSide.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        dashSide.classList.remove("open");
        dashToggle.setAttribute("aria-expanded", "false");
        dashToggle.classList.remove("is-open");
        body.classList.remove("nav-locked");
      }
    });
  }

  /* ---------- STICKY HEADER SHADOW ---------- */
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 6); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- SMOOTH ANCHORS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var hash = a.getAttribute("href");
      if (hash.length > 1) {
        var target = document.querySelector(hash);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
      }
    });
  });

  /* ---------- SCROLL REVEAL ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- ANIMATED COUNTERS ---------- */
  var counters = document.querySelectorAll(".num[data-count]");
  if (counters.length) {
    var calc = function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      var dur = 1400;
      var start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step); else el.textContent = target.toLocaleString() + suffix;
      };
      requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { calc(en.target); cio.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { cio.observe(el); });
    } else {
      counters.forEach(calc);
    }
  }

  /* ---------- PASSWORD SHOW / HIDE ---------- */
  document.querySelectorAll(".pass-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.getElementById(btn.getAttribute("data-target"));
      if (!target) return;
      var show = target.type === "password";
      target.type = show ? "text" : "password";
      btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
      var eye = btn.querySelector(".ico-eye");
      var eyeOff = btn.querySelector(".ico-eye-off");
      if (eye) eye.classList.toggle("show", show);
      if (eyeOff) eyeOff.classList.toggle("show", !show);
    });
  });

  /* ---------- JOIN FORM ---------- */
  var joinForm = document.getElementById("joinForm");
  var note = document.getElementById("formNote");
  if (joinForm) {
    joinForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("joinName").value.trim();
      var email = document.getElementById("joinEmail").value.trim();
      var district = document.getElementById("joinDistrict").value.trim();
      if (!name || (!email && !district)) {
        note.textContent = "Please fill in your name and at least one contact method.";
        note.className = "form-note err";
        return;
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        note.textContent = "Please enter a valid email address.";
        note.className = "form-note err";
        return;
      }
      note.textContent = "Thanks, " + name + "! A coordinator will reach out within 24 hours.";
      note.className = "form-note ok";
      joinForm.reset();
    });
  }

  /* ---------- LOGIN / REGISTER / CONTACT FORMS ---------- */
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var flash = function (n, cls, msg) {
    var el = document.getElementById(n);
    if (!el) return;
    el.textContent = msg;
    el.className = "auth-note " + cls;
  };

  var loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("loginEmail").value.trim();
      var pass = document.getElementById("loginPassword").value;
      if (!email || !pass) return flash("loginNote", "err", "Please enter both email and password.");
      if (!emailRe.test(email)) {
        alert("Invalid email address. Please enter a valid email like jane@example.com.");
        return flash("loginNote", "err", "Please enter a valid email address.");
      }
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[\s\S]{8,}$/.test(pass)) {
        alert("Password is not strong enough — use at least 8 characters with an uppercase letter, a lowercase letter, a number, and a symbol.");
        return flash("loginNote", "err", "Password must be at least 8 characters with an uppercase letter, a lowercase letter, a number, and a symbol.");
      }
      var rememberBox = document.getElementById("loginRemember");
      if (rememberBox && !rememberBox.checked) {
        alert("Please tick the 'Remember me' box to continue.");
        return flash("loginNote", "err", "Please tick the 'Remember me' box.");
      }
      var roleSel = document.getElementById("loginRole");
      var dest = roleSel && roleSel.value === "admin" ? "admin-dashboard.html" : "volunteer-dashboard.html";
      if (typeof sessionStorage !== "undefined" && sessionStorage) {
        try { sessionStorage.setItem("drvUserEmail", email); } catch (err) {}
      }
      var dashMail = document.getElementById("dashUserEmail");
      if (dashMail && email) dashMail.textContent = email;
      setTimeout(function () { window.location.href = dest; }, 900);
    });
  }

  /* Letters-only, max 16: block invalid keys as they are typed */
  ["regName", "regDistrict", "cName"].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", function () {
      var cleaned = el.value.replace(/[^A-Za-z]/g, "").slice(0, 16);
      if (cleaned !== el.value) el.value = cleaned;
    });
  });

  var registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("regName").value.trim();
      var email = document.getElementById("regEmail").value.trim();
      var district = document.getElementById("regDistrict").value.trim();
      var pass = document.getElementById("regPassword").value;
      if (!name) {
        alert("Please tell us your full name.");
        return flash("registerNote", "err", "Please tell us your name.");
      }
      if (name.length > 16 || !/^[A-Za-z]+$/.test(name)) {
        alert("Full name may contain letters only, maximum 16 characters.\nNumbers, spaces and special characters are not allowed.");
        return flash("registerNote", "err", "Name must be 16 letters only — no numbers, spaces, or symbols.");
      }
      if (!emailRe.test(email)) {
        alert("Invalid email address. Please enter a valid email like jane@example.com.");
        return flash("registerNote", "err", "Please enter a valid email address.");
      }
      if (!district) {
        alert("Please add your nearest district or city.");
        return flash("registerNote", "err", "Please add your nearest district or city.");
      }
      if (district.length > 16 || !/^[A-Za-z]+$/.test(district)) {
        alert("District / city may contain letters only, maximum 16 characters.\nNumbers, spaces and special characters are not allowed.");
        return flash("registerNote", "err", "District must be 16 letters only — no numbers, spaces, or symbols.");
      }
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[\s\S]{8,}$/.test(pass)) {
        alert("Password is not strong enough — use at least 8 characters with an uppercase letter, a lowercase letter, a number, and a symbol.");
        return flash("registerNote", "err", "Password must include an uppercase letter, a lowercase letter, a number, and a symbol (min 8 chars).");
      }
      var passConfirm = document.getElementById("regPasswordConfirm").value;
      if (passConfirm !== pass) {
        alert("Passwords do not match. Please re-enter the same password.");
        return flash("registerNote", "err", "Passwords do not match.");
      }
      flash("registerNote", "ok", "Account created! Redirecting to the login page…");
      registerForm.reset();
      setTimeout(function () { window.location.href = "login.html"; }, 900);
    });
  }

  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("cName").value.trim();
      var email = document.getElementById("cEmail").value.trim();
      var msg = document.getElementById("cMessage").value.trim();
      if (!name) {
        alert("Please tell us your full name.");
        return flash("contactNote", "err", "Please tell us your name.");
      }
      if (name.length > 16 || !/^[A-Za-z]+$/.test(name)) {
        alert("Full name may contain letters only, maximum 16 characters.\nNumbers, spaces and special characters are not allowed.");
        return flash("contactNote", "err", "Name must be 16 letters only — no numbers, spaces, or symbols.");
      }
      if (!emailRe.test(email)) return flash("contactNote", "err", "Please enter a valid email address.");
      if (!msg) return flash("contactNote", "err", "Please write a short message.");
      flash("contactNote", "ok", "Thanks, " + name + "! Your message is on its way — we reply within 24 hours.");
      contactForm.reset();
    });
  }

  /* ---------- PAGE LOADER ---------- */
  var loader = document.getElementById("pageLoader");
  if (loader) {
    var hideLoader = function () {
      loader.classList.add("is-done");
      setTimeout(function () {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 600);
    };
    // Show briefly, then hide as soon as the DOM is ready —
    // don't wait for large hero videos to finish downloading.
    setTimeout(hideLoader, 600);
    // Safety net in case anything above stalls.
    setTimeout(hideLoader, 4500);
  }

  /* ---------- FOOTER YEAR ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- DASHBOARD USER EMAIL ---------- */
  var dashMailEl = document.getElementById("dashUserEmail");
  if (dashMailEl) {
    var savedMail = sessionStorage.getItem("drvUserEmail");
    if (savedMail) dashMailEl.textContent = savedMail;
  }
})();
