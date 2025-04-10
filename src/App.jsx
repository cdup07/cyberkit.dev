import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sandbox from "./pages/Sandbox";
import MainLayout from "./layout/MainLayout";

// ✅ ADD THESE TWO LINES BACK IN:
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // or adjust the path if App.css moved


function App() {
  const [isSimpleBackground, setIsSimpleBackground] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);

  useEffect(() => {
    const storedVersion = localStorage.getItem("app_version");
    if (storedVersion !== "1.0.1") {
      setShowChangelog(true);
      localStorage.setItem("app_version", "1.0.1");
    }
  }, []);

  return (
    <Router>
      <MainLayout
        showSettings={showSettings}
        handleShowSettings={() => setShowSettings((prev) => !prev)}
        isSimpleBackground={isSimpleBackground}
        onToggleBackground={() => setIsSimpleBackground((prev) => !prev)}
        showChangelog={showChangelog}
        onShowChangelog={() => setShowChangelog(true)}
        onCloseChangelog={() => setShowChangelog(false)}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sandbox" element={<Sandbox isSimpleBackground={isSimpleBackground} />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
