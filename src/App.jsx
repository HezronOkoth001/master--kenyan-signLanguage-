import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VideoSection from "./components/VideoSection";

function App() {
  return (
    <div className="app">

      <Navbar />

      <main>

        <Hero />

        <VideoSection />

      </main>

    </div>
  );
}

export default App;