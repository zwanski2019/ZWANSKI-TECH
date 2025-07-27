import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Menu,
  X,
  Home,
  Wrench,
  Shield,
  GraduationCap,
  Briefcase,
  Settings2,
  FileText,
  MessageSquare,
  Mail,
  Bot,
  Activity
} from "lucide-react";
import ZwanskiLogo from "./ZwanskiLogo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import { GlobalSearchBar } from "./search/GlobalSearchBar";
import { UserMenu } from "./navbar/UserMenu";
import { NotificationButton } from "./navbar/NotificationButton";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Fetch user profile and notifications
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserProfile();
      fetchNotifications();
    }
  }, [isAuthenticated, user]);

  const fetchUserProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        if (process.env.NODE_ENV === 'development') {
          console.error("Error fetching profile:", error);
        }
        return;
      }

      setUserProfile(data);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error fetching user profile:", error);
      }
    }
  };

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      const { count, error } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("read", false);

      if (error) throw error;
      setUnreadNotifications(count || 0);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error fetching notifications:", error);
      }
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate("/");
    setIsMenuOpen(false); // Close mobile menu if open
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const mainNavItems = [
    { label: "Home", path: "/", icon: Home },
    { 
      label: "Fix", 
      path: "/services?category=repair", 
      icon: Wrench,
      description: "Device Repair & Recovery"
    },
    { 
      label: "Build", 
      path: "/services?category=development", 
      icon: Briefcase,
      description: "Custom Development"
    },
    { 
      label: "Secure", 
      path: "/services?category=security", 
      icon: Shield,
      description: "Cybersecurity Solutions"
    },
    { 
      label: "Teach", 
      path: "/academy", 
      icon: GraduationCap,
      description: "Education & Training"
    },
    { label: "Tools", path: "/tools", icon: Settings2 },
    { label: "Jobs", path: "/jobs", icon: Briefcase },
    { label: "Blog", path: "/blog", icon: FileText },
    { label: "Contact", path: "/contact", icon: Mail },
    { label: "Threat Map", path: "/threat-map", icon: Activity },
    { label: "AI", path: "/ai", icon: Bot },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 min-h-16">
          {/* Logo - Fixed width to prevent layout shift */}
          <div className="flex items-center flex-shrink-0 min-w-0">
            <ZwanskiLogo onClick={handleLogoClick} />
          </div>

          {/* Center Navigation - Show all main buttons */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-4">
            <div className="flex items-center space-x-2">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const showItem = !(item as any).authRequired || isAuthenticated;
                
                if (!showItem) return null;
                
                return (
                  <Button
                    key={item.path}
                    variant={isActivePath(item.path) ? "default" : "ghost"}
                    size="sm"
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-1 text-xs"
                  >
                    <Icon className="h-3 w-3" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Right Side - Flexible layout */}
          <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
            {/* Global Search - Responsive width */}
            <div className="hidden md:block w-40 lg:w-48 xl:w-64">
              <GlobalSearchBar placeholder="Search..." compact />
            </div>
            
            {/* Theme Toggle */}
            <div className="flex-shrink-0">
              <ThemeToggle />
            </div>
            
            {/* Language Selector */}
            <div className="flex-shrink-0">
              <LanguageSelector />
            </div>

            {/* Authentication Section */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <NotificationButton unreadCount={unreadNotifications} />

                {/* User Menu */}
                <UserMenu userProfile={userProfile} />
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2 flex-shrink-0">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/auth?tab=signin")}
                  className="text-xs px-3"
                >
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  onClick={() => navigate("/auth?tab=signup")}
                  className="text-xs px-3"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden flex-shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border/50 py-4">
            <div className="flex flex-col space-y-2">
              {/* Mobile Search */}
              <div className="px-4 pb-4 md:hidden">
                <GlobalSearchBar placeholder="Search..." />
              </div>
              
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const showItem = !(item as any).authRequired || isAuthenticated;
                
                if (!showItem) return null;
                
                return (
                  <Button
                    key={item.path}
                    variant={isActivePath(item.path) ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
              
              {!isAuthenticated && (
                <>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      navigate("/auth?tab=signin");
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="justify-start"
                    onClick={() => {
                      navigate("/auth?tab=signup");
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
