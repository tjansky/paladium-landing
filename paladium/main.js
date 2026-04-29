(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var menuToggle = document.querySelector(".menu-toggle");
  var navMobile = document.querySelector(".nav-mobile");
  var navBackdrop = document.getElementById("nav-backdrop");
  var mobileLinks = navMobile ? navMobile.querySelectorAll("a") : [];

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setToggleLabel(expanded) {
    if (!menuToggle) return;
    menuToggle.setAttribute("aria-label", expanded ? "Zatvori izbornik" : "Otvori izbornik");
  }

  function closeMobileNav() {
    if (!menuToggle || !navMobile) return;
    menuToggle.setAttribute("aria-expanded", "false");
    navMobile.classList.remove("is-open");
    navMobile.setAttribute("aria-hidden", "true");
    document.body.classList.remove("mobile-nav-open");
    if (navBackdrop) {
      navBackdrop.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
    setToggleLabel(false);
  }

  function openMobileNav() {
    if (!menuToggle || !navMobile) return;
    menuToggle.setAttribute("aria-expanded", "true");
    navMobile.classList.add("is-open");
    navMobile.setAttribute("aria-hidden", "false");
    document.body.classList.add("mobile-nav-open");
    if (navBackdrop) {
      navBackdrop.setAttribute("aria-hidden", "false");
    }
    document.body.style.overflow = "hidden";
    setToggleLabel(true);
  }

  if (menuToggle && navMobile) {
    menuToggle.addEventListener("click", function () {
      var expanded = menuToggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener("click", closeMobileNav);
    }

    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMobileNav();
      });
    });

    window.addEventListener(
      "resize",
      function () {
        if (window.matchMedia("(min-width: 901px)").matches) {
          closeMobileNav();
        }
      },
      { passive: true }
    );
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -48px 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Gallery lightbox */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = lightbox ? lightbox.querySelector(".lightbox-image") : null;
  var lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.removeAttribute("src");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-lightbox]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var img = btn.querySelector("img");
      if (img && img.src) {
        openLightbox(img.src, img.alt);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (lightbox && lightbox.classList.contains("is-open")) {
      closeLightbox();
      return;
    }
    if (navMobile && navMobile.classList.contains("is-open")) {
      closeMobileNav();
    }
  });

  /* Contact form — client-side only (replace with backend or service) */
  var form = document.getElementById("contact-form");
  var formSuccess = document.querySelector(".form-success");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (formSuccess) {
        formSuccess.classList.add("is-visible");
        form.reset();
        setTimeout(function () {
          formSuccess.classList.remove("is-visible");
        }, 6000);
      }
    });
  }
})();
