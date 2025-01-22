import React, { useState, useEffect, useMemo } from "react";
import ParticlesContainer from "./layout/ParticlesContainer";
import Home from "./pages/Home";
import Footer from "./layout/Footer";
import ChangelogModal from "./components/ChangelogModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const CURRENT_VERSION = "1.0.0"; // Update this version as needed

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
          "Added Simple Background toggle.",
          "Improved settings pane UI.",
          "Fixed particle system reset issue.",
        ]}
        show={showChangelog}
        onClose={() => setShowChangelog(false)}
      />
    </>
  );
}

export default App;
