import { Toaster } from "@/components/ui/sonner";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { LanguageDetectionNotice } from "./components/LanguageDetectionNotice";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ChatWidget from "./components/ChatWidget";
import { AccessibilityEnhancer } from "./components/AccessibilityEnhancer";
import NewsTicker from "./components/NewsTicker";
import { usePerformanceMonitoring, useMemoryMonitoring } from "./hooks/usePerformanceMonitoring";
import Preloader from "./components/Preloader";
import AppProviders from "./AppProviders";
import AppRoutes from "./routes/AppRoutes";

import "./App.css";
import "./styles/components.css";
import "./styles/utilities.css";
import "./styles/base.css";
import "./styles/animations.css";

function App() {
  usePerformanceMonitoring();
  useMemoryMonitoring();

  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    const isHomePage = window.location.pathname === "/";
    const hasSeenPreloader = sessionStorage.getItem("preloader-shown");

    if (isHomePage && !hasSeenPreloader) {
      setShowPreloader(true);
      sessionStorage.setItem("preloader-shown", "true");
    }
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  return (
    <AppProviders>
      {/* <MobileTouchOptimizer>
        <MobilePerformanceWrapper> */}
        <ErrorBoundary>
          {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
          <ScrollToTop />
          <Helmet>
            <title>Zwanski Tech - Professional IT Services & Digital Education Platform</title>
            <meta
              name="description"
              content="Expert IT services in Tunisia: computer repair, cybersecurity, web development, and digital education. Professional solutions for businesses and individuals."
            />
          </Helmet>
          <NewsTicker />
          <div className="app-content-ready homepage-content mobile-container">
            <AppRoutes />
          </div>
          <AccessibilityEnhancer />
          <LanguageDetectionNotice />
          <ScrollToTopButton />
          <ChatWidget />
          <Toaster />
        </ErrorBoundary>
      {/* </MobilePerformanceWrapper>
      </MobileTouchOptimizer> */}
    </AppProviders>
  );
}

export default App;
