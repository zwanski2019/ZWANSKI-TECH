
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Context Providers
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CookiePreferencesProvider } from "@/context/CookiePreferencesContext";
import { AuthProvider } from "@/context/AuthContext";

// Lazy load components for better performance with error handling
import { lazy, Suspense, startTransition } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

// Enhanced Index import with retry logic
const Index = lazy(() => 
  import("./pages/Index").catch((error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to load Index component:', error);
    }
    // Return a robust fallback component on import failure
    return {
      default: () => (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8 max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-foreground">Zwanski Tech</h1>
            <p className="text-muted-foreground mb-6">Professional IT Services & Digital Education Platform</p>
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      )
    };
  })
);
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ComputerModel = lazy(() => import("./pages/ComputerModel"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Support = lazy(() => import("./pages/Support"));
const Auth = lazy(() => import("./pages/Auth"));
const Settings = lazy(() => import("./pages/Settings"));
const Academy = lazy(() => import("./pages/Academy"));
const Freelancers = lazy(() => import("./pages/Freelancers"));
const Jobs = lazy(() => import("./pages/Jobs"));
const PostJob = lazy(() => import("./pages/PostJob"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const IMEICheck = lazy(() => import("./pages/IMEICheck"));
const Infrastructure = lazy(() => import("./pages/Infrastructure"));
const Tools = lazy(() => import("./pages/Tools"));
const Blog = lazy(() => import("./pages/Blog"));
const ContactPage = lazy(() => import("./pages/Contact"));
const RSS = lazy(() => import("./pages/RSS"));
const Search = lazy(() => import("./pages/Search"));
const AIAssistantPage = lazy(() => import("./pages/ai"));
const ThreatMap = lazy(() => import("./pages/ThreatMap"));

// Admin pages - separate chunk
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminJobs = lazy(() => import("./pages/admin/AdminJobs"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages"));
const AdminPosts = lazy(() => import("./pages/admin/AdminPosts"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
import { LanguageDetectionNotice } from "./components/LanguageDetectionNotice";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { AccessibilityEnhancer } from "./components/AccessibilityEnhancer";
import { usePerformanceMonitoring, useMemoryMonitoring } from "./hooks/usePerformanceMonitoring";
import Preloader from "./components/Preloader";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Styles
import "./App.css";
import "./styles/components.css";
import "./styles/utilities.css";
import "./styles/base.css";
import "./styles/animations.css";

const queryClient = new QueryClient(); // Force refresh for Tools import

function App() {
  // Performance monitoring hooks - moved to top level to follow React Rules of Hooks
  usePerformanceMonitoring();
  useMemoryMonitoring();

  // Preloader state for home page only
  const [showPreloader, setShowPreloader] = useState(false);
  const [preloaderCompleted, setPreloaderCompleted] = useState(false);

  useEffect(() => {
    // Show preloader only on initial load to home page
    const isHomePage = window.location.pathname === '/';
    const hasSeenPreloader = sessionStorage.getItem('preloader-shown');
    
    if (isHomePage && !hasSeenPreloader) {
      setShowPreloader(true);
      sessionStorage.setItem('preloader-shown', 'true');
    }
  }, []);

  const handlePreloaderComplete = () => {
    setPreloaderCompleted(true);
    setShowPreloader(false);
  };

  const MinimalLoader = () => (
    <div className="flex items-center justify-center p-4" role="status" aria-label="Loading page">
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
      <span className="sr-only">Loading page content</span>
    </div>
  );

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider>
            <LanguageProvider>
              <CookiePreferencesProvider>
                <AuthProvider>
                  <BrowserRouter>
                    <ErrorBoundary>
                      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
                      <ScrollToTop />
                      <Helmet>
                        <title>Zwanski Tech - Professional IT Services & Digital Education Platform</title>
                        <meta name="description" content="Expert IT services in Tunisia: computer repair, cybersecurity, web development, and digital education. Professional solutions for businesses and individuals." />
                      </Helmet>
                      <div className="app-content-ready homepage-content">
                        <Suspense fallback={<MinimalLoader />}>
                          <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/services" element={<Services />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/computer-model" element={<ComputerModel />} />
                          <Route path="/3d" element={<ComputerModel />} />
                          <Route path="/newsletter" element={<Newsletter />} />
                          <Route path="/academy" element={<Academy />} />
                          <Route path="/jobs" element={<Jobs />} />
                          <Route path="/jobs/:id" element={<JobDetail />} />
                          <Route path="/post-job" element={<PostJob />} />
                           <Route path="/freelancers" element={<Freelancers />} />
                           <Route path="/auth" element={<Auth />} />
                           <Route path="/login" element={<Auth />} />
                           <Route path="/register" element={<Auth />} />
                           <Route path="/signup" element={<Auth />} />
                          <Route path="/blog" element={<Blog />} />
                          <Route path="/contact" element={<ContactPage />} />

                          {/* Admin Routes */}
                          <Route path="/admin" element={<AdminDashboard />} />
                          <Route path="/admin/users" element={<AdminUsers />} />
                          <Route path="/admin/posts" element={<AdminPosts />} />
                          <Route path="/admin/jobs" element={<AdminJobs />} />
                          <Route path="/admin/messages" element={<AdminMessages />} />
                          <Route path="/admin/settings" element={<AdminSettings />} />
                          
                          {/* User Profile Routes */}
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/settings" element={<Settings />} />
                          
                          {/* Privacy and Terms Routes */}
                          <Route path="/privacy" element={<PrivacyPolicy />} />
                          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                          <Route path="/terms" element={<TermsOfService />} />
                          <Route path="/terms-of-service" element={<TermsOfService />} />
                          
                          <Route path="/support" element={<Support />} />
                          <Route path="/faq" element={<FAQ />} />
                          <Route path="/infrastructure" element={<Infrastructure />} />
                          <Route path="/imei-check" element={<IMEICheck />} />
                          <Route path="/tools" element={<Tools />} />
                          <Route path="/threat-map" element={<ThreatMap />} />
                          <Route path="/ai" element={<AIAssistantPage />} />
                          <Route path="/search" element={<Search />} />
                          <Route path="/rss" element={<RSS />} />
                          <Route path="/feed" element={<RSS />} />
                          <Route path="*" element={<NotFound />} />
                          </Routes>
                        </Suspense>
                      </div>
                      
                      <AccessibilityEnhancer />
                      <LanguageDetectionNotice />
                      <ScrollToTopButton />
                      <Toaster />
                    </ErrorBoundary>
                  </BrowserRouter>
                </AuthProvider>
              </CookiePreferencesProvider>
            </LanguageProvider>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
