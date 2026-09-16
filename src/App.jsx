import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VideoSection from "./components/VideoSection";
import About from "./components/About";
import Services from "./components/Services";
import Classes from "./components/Classes";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import BlogAdmin from "./pages/BlogAdmin";

function App() {
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

        <BlogAdmin />
      </main>

    </div>
  );
}

export default App;
