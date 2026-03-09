import { useEffect, useState } from 'react';

const LINK_ANDROID = "lien_vers_votre_apk_ou_play_store_ici";
const LINK_IOS = "lien_vers_votre_app_store_ici";

export default function Home() {
  const [osData, setOsData] = useState({ text: "Obtenir l'App Gratuitement", link: "#download", isIos: false });

  useEffect(() => {
    // 1. Détection de l'OS
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      setOsData({ text: "Télécharger pour Android", link: LINK_ANDROID, isIos: false });
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setOsData({ text: "Télécharger sur l'App Store", link: LINK_IOS, isIos: true });
    }

    // 2. Animations au Scroll
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(reveal => observer.observe(reveal));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content reveal fade-bottom">
          <h1>Gérez votre argent, <span>simplement.</span></h1>
          <p>Rejoignez des tontines sécurisées ou lancez votre plan d'épargne. Téléchargez l'application SmartSaver et prenez le contrôle.</p>
          <div className="hero-buttons">
            <a href={osData.link} className="btn-primary btn-download-app">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span className="btn-text">{osData.text}</span>
            </a>
            <a href="#tontine" className="btn-secondary">Découvrir comment ça marche</a>
          </div>
        </div>
        <div className="hero-image reveal fade-left">
          <div className="phone-mockup floating">
            <img src="/src/assets/image_411d1e.jpg" alt="Aperçu de l'application" />
          </div>
        </div>
      </section>

      {/* Reste de tes sections Tontine, Épargne, Témoignages EXACTEMENT comme avant */}
      {/* N'oublie pas de changer style="width: 100%" en style={{ width: "100%" }} dans la div progress-bar */}

      <section id="download" className="download-section reveal fade-bottom">
        <div className="download-box">
          <h2>Prêt à changer vos habitudes financières ?</h2>
          <p>Rejoignez la communauté SmartSaver. L'application est disponible pour votre smartphone.</p>
          <a href={osData.link} className="btn-primary btn-large btn-download-app">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span className="btn-text">Télécharger l'App SmartSaver</span>
          </a>
          {!osData.isIos && (
            <p className="apk-notice">
              Si vous téléchargez un fichier APK, autorisez l'installation depuis des sources inconnues dans les paramètres de votre téléphone.
            </p>
          )}
        </div>
      </section>
    </>
  );
}