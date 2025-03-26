import React, { useState, useEffect, useMemo } from "react";
import ParticlesContainer from "./layout/ParticlesContainer";
import Home from "./pages/Home";
import Footer from "./layout/Footer";
import ChangelogModal from "./components/ChangelogModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const CURRENT_VERSION = "1.0.1"; // Update this version as needed

function App() {
  const [isSimpleBackground, setIsSimpleBackground] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);

  // Toggle background state
  const handleToggleBackground = () => {
    setIsSimpleBackground((prev) => !prev);
  };

  // Toggle settings pane state
  const handleShowSettings = () => {
    setShowSettings((prev) => !prev);
  };

  // Check localStorage for the version
  useEffect(() => {
    const storedVersion = localStorage.getItem("app_version");

    if (storedVersion !== CURRENT_VERSION) {
      setShowChangelog(true); // Show the modal for a new version
      localStorage.setItem("app_version", CURRENT_VERSION); // Update localStorage
    }
  }, []);

  const particleSystem = useMemo(() => <ParticlesContainer />, []);

  return (
    <>
      {!isSimpleBackground && particleSystem}

      <Home
        showSettings={showSettings}
        handleShowSettings={handleShowSettings}
        isSimpleBackground={isSimpleBackground}
        onToggleBackground={handleToggleBackground}
        onShowChangelog={() => setShowChangelog(true)}
      />

      <Footer onShowChangelog={() => setShowChangelog(true)} />

      <ChangelogModal
        version={CURRENT_VERSION}
        changelog={[
          "Its been a hot minute. If you see this, let me know that you're still using the site. Ty!",
          "Restored Ipv6 support.",
          "Loosened Regex requirements (ex. you can have a space before an IP).",
          "Fixed the VirusTotal total count for domains (ex. it used to show 0/63 when it should've been 0/94).",
        ]}
        show={showChangelog}
        onClose={() => setShowChangelog(false)}
      />
    </>
  );
}

export default App;
