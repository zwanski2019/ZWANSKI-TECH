
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import { ThemeProvider } from "@/context/ThemeContext";

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const allServices = [
    {
      id: "web-development",
      title: "Web Development",
      description: "Custom website development using React, PHP, WordPress, or other technologies based on your needs.",
      price: "From $500",
      icon: "Monitor" as const,
      category: "development"
    },
    {
      id: "it-support",
      title: "IT Support",
      description: "Technical support, troubleshooting, and maintenance for your computers, phones, and other devices.",
      price: "$50/hour",
      icon: "LifeBuoy" as const,
      category: "support"
    },
    {
      id: "wordpress",
      title: "WordPress Development",
      description: "Custom WordPress themes, plugins, and site optimization for better performance.",
      price: "From $300",
      icon: "Layout" as const,
      category: "development"
    },
    {
      id: "seo",
      title: "SEO Optimization",
      description: "Improve your website's search engine ranking with technical SEO and content optimization.",
      price: "From $200",
      icon: "Search" as const,
      category: "marketing"
    },
    {
      id: "system-security",
      title: "System Security",
      description: "Implementation of security measures, including Wazuh installation and security audits.",
      price: "From $400",
      icon: "Shield" as const,
      category: "security"
    },
    {
      id: "custom-tools",
      title: "Custom Tools Development",
      description: "Development of custom tools and automation scripts to optimize your workflow.",
      price: "From $300",
      icon: "Code" as const,
      category: "development"
    },
    {
      id: "imei-frp-remote",
      title: "IMEI, FRP & Remote",
      description: "Unlock devices, bypass FRP, and utilize remote tools with our fast, secure, and reliable delivery system.",
      price: "Contact Us",
      icon: "Shield" as const,
      category: "mobile"
    },
    {
      id: "server-cards-games",
      title: "Server, Cards & Games",
      description: "Gain access to a wide array of servers, digital credits, and essential tools for various online services and gaming.",
      price: "Variable",
      icon: "Shield" as const,
      category: "digital"
    },
    {
      id: "expert-support",
      title: "Expert Support",
      description: "Our dedicated professionals provide expert support to ensure your operations run smoothly and efficiently at all times.",
      price: "24/7 Available",
      icon: "Shield" as const,
      category: "support"
    }
  ];

  const categories = [
    { id: "all", name: "All Services", count: allServices.length },
    { id: "development", name: "Development", count: allServices.filter(s => s.category === "development").length },
    { id: "support", name: "Support", count: allServices.filter(s => s.category === "support").length },
    { id: "security", name: "Security", count: allServices.filter(s => s.category === "security").length },
    { id: "mobile", name: "Mobile", count: allServices.filter(s => s.category === "mobile").length },
    { id: "digital", name: "Digital", count: allServices.filter(s => s.category === "digital").length }
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const filteredServices = activeCategory === "all" 
    ? allServices 
    : allServices.filter(service => service.category === activeCategory);
  
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            <div className="section-container">
              <div className="text-center mb-12 animate-on-scroll">
                <h1 className="text-5xl font-bold mb-6">
                  Professional <span className="text-gradient bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">Services</span>
                </h1>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                  Comprehensive IT solutions from web development to advanced device repair and cybersecurity. 
                  Your trusted partner for all technical needs.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg px-6 py-3">
                    <div className="text-2xl font-bold text-orange-400">300+</div>
                    <div className="text-sm text-slate-300">Devices Repaired</div>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg px-6 py-3">
                    <div className="text-2xl font-bold text-orange-400">24/7</div>
                    <div className="text-sm text-slate-300">Expert Support</div>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg px-6 py-3">
                    <div className="text-2xl font-bold text-orange-400">100%</div>
                    <div className="text-sm text-slate-300">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 bg-gradient-to-b from-background to-muted/20">
            <div className="section-container">
              {/* Category Filter */}
              <div className="mb-12 animate-on-scroll">
                <div className="flex flex-wrap justify-center gap-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        activeCategory === category.id
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {filteredServices.map((service) => (
                  <ServiceCard 
                    key={service.id}
                    id={service.id}
                    title={service.title}
                    description={service.description}
                    price={service.price}
                    icon={service.icon}
                    onSelect={() => setSelectedService(service.title)}
                  />
                ))}
              </div>
              
              {/* Features Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div className="text-center p-6 bg-card rounded-xl border animate-on-scroll">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="font-bold mb-2">Attractive Prices</h3>
                  <p className="text-sm text-muted-foreground">Competitive and affordable solutions for all budgets</p>
                </div>
                <div className="text-center p-6 bg-card rounded-xl border animate-on-scroll">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h3 className="font-bold mb-2">Trusted & Secure</h3>
                  <p className="text-sm text-muted-foreground">Advanced security measures to protect your data</p>
                </div>
                <div className="text-center p-6 bg-card rounded-xl border animate-on-scroll">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">↩️</span>
                  </div>
                  <h3 className="font-bold mb-2">Money Back Guarantee</h3>
                  <p className="text-sm text-muted-foreground">Full refund if not completely satisfied</p>
                </div>
                <div className="text-center p-6 bg-card rounded-xl border animate-on-scroll">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-bold mb-2">User-Friendly</h3>
                  <p className="text-sm text-muted-foreground">Intuitive interface for seamless experience</p>
                </div>
              </div>
              
              <ServiceRequestForm selectedService={selectedService} />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Services;
