import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VideoSection from "./components/VideoSection";
import About from "./components/About";
import Services from "./components/Services";
import Classes from "./components/Classes";
import Blog from "./components/Blog";
import Contact from "./components/Contact";

import BlogPage from "./pages/BlogPage";
import BlogArticle from "./pages/BlogArticle";
import AdminLogin from "./pages/AdminLogin";
import AdminBlog from "./pages/AdminBlog";


function Home() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Hero />
        <VideoSection />
        <About />
        <Services />
        <Classes />
        <Blog />
        <Contact />
      </main>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* PUBLIC BLOG */}
        <Route path="/blog" element={<BlogPage />} />

        {/* SINGLE BLOG ARTICLE */}
        <Route path="/blog/:id" element={<BlogArticle />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN BLOG DASHBOARD */}
        <Route path="/admin/blog" element={<AdminBlog />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;