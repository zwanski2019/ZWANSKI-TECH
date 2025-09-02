
import { MessageSquare, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import DMCABadge from "@/components/DMCABadge";
import { Container, Spacer } from "@/components/heroui";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="Zwanski Tech RSS Feed" 
          href="/rss" 
        />
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="Zwanski Tech Feed" 
          href="/feed" 
        />
      </Helmet>
      
      <footer className="py-12 bg-secondary/30 border-t border-border">
        <Container className="px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="sm:col-span-2 md:col-span-2 lg:col-span-2">
              <Link to="/" className="text-xl font-bold text-gradient">
                ZWANSKI TECH
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                {t('hero.subtitle')}
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-4 flex-wrap">
                  <Link 
                    to="/rss" 
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    title="Subscribe to RSS Feed"
                  >
                    RSS Feed
                  </Link>
                  <a 
                    href="https://t.me/zwanski_tech" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    title="Join our Telegram for instant news"
                  >
                    <MessageSquare className="h-3 w-3" />
                    Join Telegram for instant news
                  </a>
                </div>
                
                {/* Social Media Links */}
                <div className="mt-4 flex items-center gap-4">
                  <h4 className="text-sm font-medium">Follow Us:</h4>
                  <div className="flex items-center gap-3">
                    <a 
                      href="https://www.linkedin.com/company/zwanski-tech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Follow us on LinkedIn"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://github.com/zwanski01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Follow us on GitHub"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.facebook.com/ethicalhackerzwanskitech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Follow us on Facebook"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/academy" className="text-muted-foreground hover:text-primary transition-colors">
                    Academy
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="text-muted-foreground hover:text-primary transition-colors">
                    Job Marketplace
                  </Link>
                </li>
                <li>
                  <Link to="/infrastructure" className="text-muted-foreground hover:text-primary transition-colors">
                    Infrastructure
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h3 className="font-semibold mb-3">Support & Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h3 className="font-semibold mb-3">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/academy" className="text-muted-foreground hover:text-primary transition-colors">
                    Academy
                  </Link>
                </li>
                <li>
                  <Link to="/tools" className="text-muted-foreground hover:text-primary transition-colors">
                    Tools
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="text-muted-foreground hover:text-primary transition-colors">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/threat-map" className="text-muted-foreground hover:text-primary transition-colors">
                    Threat Map
                  </Link>
                </li>
              </ul>
            </div>

            {/* Interaction */}
            <div>
              <h3 className="font-semibold mb-3">Interaction</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/chat" className="text-muted-foreground hover:text-primary transition-colors">
                    Chat
                  </Link>
                </li>
                <li>
                  <Link to="/ai" className="text-muted-foreground hover:text-primary transition-colors">
                    AI
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                    Get Help
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                    Build Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                    Security Services
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-semibold mb-3">Community</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/freelancers" className="text-muted-foreground hover:text-primary transition-colors">
                    Freelancers
                  </Link>
                </li>
                <li>
                  <Link to="/post-job" className="text-muted-foreground hover:text-primary transition-colors">
                    Post Job
                  </Link>
                </li>
                <li>
                  <Link to="/newsletter" className="text-muted-foreground hover:text-primary transition-colors">
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link to="/imei-check" className="text-muted-foreground hover:text-primary transition-colors">
                    IMEI Check
                  </Link>
                </li>
                <li>
                  <Link to="/api-explorer" className="text-muted-foreground hover:text-primary transition-colors">
                    API Explorer
                  </Link>
                </li>
                <li>
                  <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors">
                    Search
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://github.com/zwanski01" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Spacer y={8} />
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Zwanski Tech. {t('footer.rights')}
              </p>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <Link 
                  to="/privacy" 
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy
                </Link>
                <Link 
                  to="/terms" 
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms
                </Link>
                <Link 
                  to="/faq" 
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
                <DMCABadge size="small" className="ml-2" />
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}
