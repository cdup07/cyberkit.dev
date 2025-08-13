import Header from "./Header";
import Footer from "./Footer";
import Settings from "./Settings";
import ChangelogModal from "../components/ChangelogModal";
import ParticlesContainer from "./ParticlesContainer";
import { useMemo } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
  showSettings: boolean;
  handleShowSettings: () => void;
  isSimpleBackground: boolean;
  onToggleBackground: () => void;
  showChangelog: boolean;
  onShowChangelog: () => void;
  onCloseChangelog: () => void;
}

const CURRENT_VERSION = "1.1.2";

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showSettings,
  handleShowSettings,
  isSimpleBackground,
  onToggleBackground,
  showChangelog,
  onShowChangelog,
  onCloseChangelog,
}) => {
  const particleSystem = useMemo(() => <ParticlesContainer />, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {!isSimpleBackground && particleSystem}
  
      <Header
        showSettings={showSettings}
        handleShowSettings={handleShowSettings}
      />
  
      <main className="flex-grow-1">
        {children}
      </main>
  
      <Footer onShowChangelog={onShowChangelog} />
  
      <Settings
        showSettings={showSettings}
        handleShowSettings={handleShowSettings}
        isSimpleBackground={isSimpleBackground}
        onToggleBackground={onToggleBackground}
      />
  
      <ChangelogModal
        version={CURRENT_VERSION}
        changelog={[
          "Disabled the 'Show More' button"
        ]}
        show={showChangelog}
        onClose={onCloseChangelog}
      />
    </div>
  );
  
};

export default MainLayout;
