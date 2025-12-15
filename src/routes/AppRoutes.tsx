import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Index = lazy(() =>
  import("@/pages/Index").catch((error) => {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to load Index component:", error);
    }
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
      ),
    };
  })
);
const Services = lazy(() => import("@/pages/Services"));
const About = lazy(() => import("@/pages/About"));
const Chat = lazy(() => import("@/pages/Chat"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const ComputerModel = lazy(() => import("@/pages/ComputerModel"));
const Newsletter = lazy(() => import("@/pages/Newsletter"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Support = lazy(() => import("@/pages/Support"));
const AcademyHomePage = lazy(() => import("@/pages/Academy/AcademyHomePage"));
const Freelancers = lazy(() => import("@/pages/Freelancers"));
const Jobs = lazy(() => import("@/pages/Jobs"));
const PostJob = lazy(() => import("@/pages/PostJob"));
const JobDetail = lazy(() => import("@/pages/JobDetail"));
const IMEICheck = lazy(() => import("@/pages/IMEICheck"));
const Infrastructure = lazy(() => import("@/pages/Infrastructure"));
const Tools = lazy(() => import("@/pages/Tools"));
const Blog = lazy(() => import("@/pages/Blog"));
const RSS = lazy(() => import("@/pages/RSS"));
const Search = lazy(() => import("@/pages/Search"));
const AIAssistantPage = lazy(() => import("@/pages/ai"));
const ThreatMap = lazy(() => import("@/pages/ThreatMap"));
const PublicAPIExplorer = lazy(() => import("@/pages/PublicAPIExplorer"));

const MinimalLoader = () => (
  <div className="flex items-center justify-center p-4" role="status" aria-label="Loading page">
    <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
    <span className="sr-only">Loading page content</span>
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<MinimalLoader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/computer-model" element={<ComputerModel />} />
        <Route path="/3d" element={<ComputerModel />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/academy" element={<AcademyHomePage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/freelancers" element={<Freelancers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/support" element={<Support />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/imei-check" element={<IMEICheck />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/api-explorer" element={<PublicAPIExplorer />} />
        <Route path="/threat-map" element={<ThreatMap />} />
        <Route path="/ai" element={<AIAssistantPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/rss" element={<RSS />} />
        <Route path="/feed" element={<RSS />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
