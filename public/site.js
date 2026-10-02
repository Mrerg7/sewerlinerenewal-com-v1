(function () {
  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");
  function label() {
    if (!toggle) return;
    var dark = root.dataset.theme === "dark";
    toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    var icon = toggle.querySelector("[data-theme-icon]");
    if (icon) icon.textContent = dark ? "☀" : "☾";
  }
  label();
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("slr-theme", next);
      } catch (e) {}
      label();
    });
  }

  var navBtn = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  if (navBtn && nav) {
    navBtn.addEventListener("click", function () {
      var open = nav.hasAttribute("hidden");
      if (open) nav.removeAttribute("hidden");
      else nav.setAttribute("hidden", "");
      navBtn.setAttribute("aria-expanded", open ? "true" : "false");
      navBtn.textContent = open ? "Close" : "Menu";
    });
  }

  var form = document.getElementById("offer-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var email = String(data.get("email") || "").trim();
      var offer = String(data.get("offer") || "").trim();
      var error = form.querySelector("[data-error]");
      function fail(msg) {
        if (error) {
          error.hidden = false;
          error.textContent = msg;
        }
      }
      if (name.length < 2) return fail("Add your name so the broker knows who is writing.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Use a real email. That is how the reply comes back.");
      if (offer && !/^\d[\d,]*$/.test(offer)) return fail("Offer should be a number in US dollars, or leave it blank.");
      if (error) error.hidden = true;
      var body = [
        "Name: " + name,
        "Email: " + email,
        "Company: " + (data.get("company") || "—"),
        "Intent: " + (data.get("intent") || "Make an offer"),
        "Offer (USD): " + (offer || "Not specified"),
        "",
        data.get("message") || "(no note)",
      ].join("\n");
      var sent = document.getElementById("offer-sent");
      var pre = document.getElementById("offer-pre");
      if (pre) pre.textContent = body;
      form.hidden = true;
      if (sent) sent.hidden = false;
      location.href =
        "mailto:sales@desertrich.com?subject=" +
        encodeURIComponent("Offer for sewerlinerenewal.com") +
        "&body=" +
        encodeURIComponent(body);
    });
    var copy = document.getElementById("offer-copy");
    if (copy) {
      copy.addEventListener("click", function () {
        var pre = document.getElementById("offer-pre");
        if (!pre) return;
        navigator.clipboard.writeText(pre.textContent || "").then(function () {
          copy.textContent = "Copied";
        });
      });
    }
    var edit = document.getElementById("offer-edit");
    if (edit) {
      edit.addEventListener("click", function () {
        form.hidden = false;
        var sent = document.getElementById("offer-sent");
        if (sent) sent.hidden = true;
      });
    }
  }

  var exit = document.getElementById("exit");
  var exitForm = document.getElementById("exit-form");
  if (exit && window.matchMedia("(pointer: fine)").matches) {
    var armed = false;
    setTimeout(function () {
      armed = true;
    }, 8000);
    document.documentElement.addEventListener("mouseleave", function (e) {
      if (!armed || e.clientY > 0) return;
      try {
        if (sessionStorage.getItem("slr-exit")) return;
        sessionStorage.setItem("slr-exit", "1");
      } catch (err) {
        return;
      }
      exit.hidden = false;
    });
    var close = exit.querySelector("[data-exit-close]");
    if (close) close.addEventListener("click", function () { exit.hidden = true; });
    if (exitForm) {
      exitForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var email = exitForm.querySelector("input").value;
        var body = "Please send the transfer outline for sewerlinerenewal.com.\n\nReply to: " + email;
        location.href =
          "mailto:sales@desertrich.com?subject=" +
          encodeURIComponent("Transfer outline — sewerlinerenewal.com") +
          "&body=" +
          encodeURIComponent(body);
        exitForm.hidden = true;
        var done = document.getElementById("exit-done");
        if (done) done.hidden = false;
      });
    }
  }
})();
