import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VideoSection from "./components/VideoSection";
import About from "./components/About";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import Classes from "./components/Classes";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import BlogPage from "./pages/BlogPage";
import BlogArticle from "./pages/BlogArticle";
import AdminLogin from "./pages/AdminLogin";
import AdminBlog from "./pages/AdminBlog";
import KSLGuide from "./pages/KSLGuide";


/* =====================================================
   HOME PAGE
===================================================== */

function Home({ darkMode, setDarkMode }) {
  return (
    <div className="app">

      {/* SEO */}
      <Helmet>

        <title>
          Master Kenyan Sign Language | Learn KSL in Kenya
        </title>

        <meta
          name="description"
          content="Learn Kenyan Sign Language through simple, practical and accessible KSL lessons, private sessions and consultations."
        />

        <meta
          name="keywords"
          content="Kenyan Sign Language, KSL, learn KSL, KSL classes Kenya, sign language Kenya, KSL training, Kenyan sign language lessons"
        />

        <meta
          name="robots"
          content="index, follow"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Master Kenyan Sign Language | Learn KSL in Kenya"
        />

        <meta
          property="og:description"
          content="Learn Kenyan Sign Language through practical lessons, private sessions and personalized guidance."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:site_name"
          content="Master Kenyan Sign Language"
        />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Master Kenyan Sign Language | Learn KSL in Kenya"
        />

        <meta
          name="twitter:description"
          content="Learn Kenyan Sign Language through practical lessons, private sessions and personalized guidance."
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "Master Kenyan Sign Language",
            description:
              "Learn Kenyan Sign Language through simple, practical and accessible KSL lessons, private sessions and consultations.",
            url: window.location.origin,
            sameAs: [
              "https://github.com/HezronOkoth001/master--kenyan-signLanguage-",
              "https://master-kenyan-sign-language-x4v8.vercel.app/"
            ],
            areaServed: {
              "@type": "Country",
              name: "Kenya",
            },
            knowsAbout: [
              "Kenyan Sign Language",
              "KSL Education",
              "KSL Classes in Kenya",
              "Sign Language Learning",
              "Deaf Community Awareness",
            ],
          })}
        </script>

      </Helmet>


      {/* Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />


      {/* Main Content */}
      <main>

        <Hero />

        <VideoSection />

        <About />

        <Services />

        <HowItWorks />

        <Classes />

        <Blog />

        <Contact />

      </main>


      {/* Footer */}
      <Footer />

    </div>
  );
}


/* =====================================================
   APP
===================================================== */

function App() {

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("kslDarkMode") === "true";
  });


  /* ===================================================
     DARK MODE
  =================================================== */

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark-mode",
      darkMode
    );

    localStorage.setItem(
      "kslDarkMode",
      darkMode
    );

  }, [darkMode]);

  /* Scroll-reveal motion inspired by modern social/app interfaces */
  useEffect(() => {
    document.documentElement.classList.add("motion-enabled");

    const targets = document.querySelectorAll(
      "main > section, .service-card, .class-card, .blog-card, .about-feature, .contact-item"
    );

    if (!("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("motion-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    targets.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-enabled");
    };
  }, []);


  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <Home
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />


        {/* PUBLIC BLOG */}
        <Route
          path="/blog"
          element={<BlogPage />}
        />


        {/* SINGLE BLOG ARTICLE */}
        <Route
          path="/blog/:id"
          element={<BlogArticle />}
        />


        {/* ADMIN LOGIN */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* ADMIN BLOG DASHBOARD */}
        <Route
          path="/admin/blog"
          element={<AdminBlog />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;