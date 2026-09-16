import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VideoSection from "./components/VideoSection";
import About from "./components/About";
import Services from "./components/Services";
import Classes from "./components/Classes";
import Contact from "./components/Contact";

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

        <Contact />

      </main>

    </div>
  );
}

export default App;