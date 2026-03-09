// ==========================================
// ⚙️ CONFIGURATION DES LIENS DE TÉLÉCHARGEMENT
// ==========================================
const LINK_ANDROID = "lien_vers_votre_apk_ou_play_store_ici";
const LINK_IOS = "lien_vers_votre_app_store_ici";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Détection de l'OS (Système d'exploitation)
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const downloadButtons = document.querySelectorAll(".btn-download-app");
  const apkNotice = document.getElementById("apk-notice-text");
  let currentOS = "desktop";

  if (/android/i.test(userAgent)) {
    currentOS = "android";
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    currentOS = "ios";
  }

  // Mise à jour dynamique des boutons (sans écraser le SVG)
  downloadButtons.forEach((btn) => {
    const textSpan = btn.querySelector(".btn-text"); // On cible uniquement le texte

    if (currentOS === "android") {
      btn.href = LINK_ANDROID;
      if (textSpan) textSpan.textContent = `Télécharger pour Android`;
    } else if (currentOS === "ios") {
      btn.href = LINK_IOS;
      if (textSpan) textSpan.textContent = `Télécharger sur l'App Store`;
      if (apkNotice) apkNotice.style.display = "none"; // Cache la notice APK sur iPhone
    } else {
      btn.href = "#download";
      if (textSpan) textSpan.textContent = `Obtenir l'App Gratuitement`;
    }
  });

  // 2. Gestion de l'ombre du Header au scroll
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 3. Animations au défilement (Scroll Reveal)
  const reveals = document.querySelectorAll(".reveal");
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    });
  }, revealOptions);

  reveals.forEach((reveal) => revealOnScroll.observe(reveal));

  // 4. Smooth scroll pour les ancres de navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
