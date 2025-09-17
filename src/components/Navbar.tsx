import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Wrench, Shield, GraduationCap, Briefcase, Settings2, FileText, MessageSquare, Bot, Activity, Search, ChevronDown } from "lucide-react";
import ZwanskiLogo from "./ZwanskiLogo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import { GlobalSearchBar } from "./search/GlobalSearchBar";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const mainNavItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Services", path: "/services", icon: Wrench },
    { label: "Academy", path: "/academy", icon: GraduationCap },
    { label: "Tools", path: "/tools", icon: Settings2 },
    { label: "Jobs", path: "/jobs", icon: Briefcase },
    { label: "Blog", path: "/blog", icon: FileText },
    { label: "Chat", path: "/chat", icon: MessageSquare },
    { label: "AI", path: "/ai", icon: Bot },
    { label: "Threat Map", path: "/threat-map", icon: Activity }
  ];

  const serviceCategories = [
    { label: "Fix", path: "/services?category=repair", icon: Wrench, description: "Device Repair & Recovery" },
    { label: "Build", path: "/services?category=development", icon: Briefcase, description: "Custom Development" },
    { label: "Secure", path: "/services?category=security", icon: Shield, description: "Cybersecurity Solutions" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg' 
        : 'bg-background/95 backdrop-blur-md border-b border-border/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 transition-transform duration-200 hover:scale-105">
            <ZwanskiLogo onClick={handleLogoClick} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {mainNavItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className={`group relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary/5 ${
                    isActive 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </Button>
              );
            })}
            
            {/* More Dropdown for Additional Items */}
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-all duration-200"
              >
                <span>More</span>
                <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
              </Button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  {mainNavItems.slice(6).map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.path}
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(item.path)}
                        className="w-full justify-start gap-3 text-sm hover:bg-primary/5 transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <GlobalSearchBar 
              placeholder="Search everything..." 
              className="w-full bg-secondary/30 border-0 rounded-full px-4 py-2 text-sm placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-primary/20 transition-all duration-200"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button - Mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 hover:bg-primary/5 transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Theme & Language - Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              <ThemeToggle />
              <LanguageSelector />
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 hover:bg-primary/5 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 transition-transform rotate-90" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Button 
                size="sm"
                onClick={() => navigate("/services")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="lg:hidden py-4 border-t border-border/30 animate-fade-in">
            <GlobalSearchBar 
              placeholder="Search everything..." 
              className="w-full bg-secondary/30 border-0 rounded-xl px-4 py-3"
            />
          </div>
        )}

        {/* Desktop Service Categories Bar */}
        <div className="hidden lg:block border-t border-border/20">
          <div className="flex items-center justify-between py-3">
            {/* Service Categories */}
            <div className="flex items-center space-x-6">
              {serviceCategories.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(item.path)}
                    className="group flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-muted-foreground hover:text-primary transition-all duration-200"
                  >
                    <Icon className="h-3 w-3 transition-transform group-hover:scale-110" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Support Link */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/support")}
              className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              24/7 Support
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border/50 shadow-2xl animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Main Navigation */}
            <div className="space-y-1 mb-6">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                Navigation
              </h3>
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className={`w-full justify-start gap-4 h-12 text-base font-medium rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-foreground hover:bg-primary/5'
                    }`}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Services */}
            <div className="space-y-1 mb-6">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                Services
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {serviceCategories.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.path}
                      variant="ghost"
                      className="h-auto p-4 flex items-start gap-4 text-left rounded-xl hover:bg-primary/5 transition-colors"
                      onClick={() => {
                        navigate(item.path);
                        setIsMenuOpen(false);
                      }}
                    >
                      <Icon className="h-6 w-6 mt-0.5 text-primary" />
                      <div>
                        <div className="font-semibold text-base mb-1">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Settings & Actions */}
            <div className="pt-4 border-t border-border/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  <span className="text-sm text-muted-foreground">Theme</span>
                </div>
                <LanguageSelector />
              </div>
              
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold py-3 transition-all duration-200 hover:scale-[1.02]"
                onClick={() => {
                  navigate("/services");
                  setIsMenuOpen(false);
                }}
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;