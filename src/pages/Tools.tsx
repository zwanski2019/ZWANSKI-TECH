import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IMEIChecker from "@/components/IMEIChecker";
import GPTAssistant from "@/components/GPTAssistant";
import ApiExplorer from "@/components/api-explorer/ApiExplorer";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Smartphone,
  Wrench,
  Zap,
  Globe,
  Shield,
  Code,
  FileText,
  Clock,
  Image,
  Bot
} from "lucide-react";

const Tools = () => {
  console.log("Tools component is loading successfully");
  const { t } = useLanguage();

  const featuredTools = [
    {
      id: "imei-checker",
      title: t("nav.freeImeiCheck"),
      description: t("imei.description"),
      icon: Smartphone,
      component: <IMEIChecker />,
      featured: true
    },
    {
      id: "gpt-assistant",
      title: "AI Assistant",
      description: "Get help with tasks using AI-powered tools including chatbot, resume enhancer, blog generator, and code explainer",
      icon: Bot,
      component: <GPTAssistant />,
      featured: true
    },
    {
      id: "public-api-explorer",
      title: "Public API Explorer",
      description: "Search and explore free public APIs",
      icon: Globe,
      component: <ApiExplorer />,
      featured: true
    }
  ];

  const comingSoonTools = [
    {
      id: "password-generator",
      title: "Password Generator",
      description: "Generate secure, random passwords with customizable options",
      icon: Shield,
      comingSoon: true
    },
    {
      id: "qr-generator", 
      title: "QR Code Generator",
      description: "Create QR codes for URLs, text, and other data",
      icon: Code,
      comingSoon: true
    },
    {
      id: "url-shortener",
      title: "URL Shortener", 
      description: "Shorten long URLs for easier sharing",
      icon: Globe,
      comingSoon: true
    },
    {
      id: "color-picker",
      title: "Color Picker & Palette Generator",
      description: "Pick colors and generate beautiful color palettes",
      icon: Zap,
      comingSoon: true
    },
    {
      id: "json-formatter",
      title: "JSON Formatter",
      description: "Easily format and validate JSON data",
      icon: FileText,
      comingSoon: true
    },
    {
      id: "timezone-converter",
      title: "Time Zone Converter",
      description: "Quickly convert times between different zones",
      icon: Clock,
      comingSoon: true
    },
    {
      id: "image-compressor",
      title: "Image Compressor",
      description: "Reduce image file size without losing quality",
      icon: Image,
      comingSoon: true
    }
  ];

  return (
    <>
      <Helmet>
        <title>Free Tools - ZWANSKI TECH</title>
        <meta name="description" content="Free online tools including IMEI checker, password generator, QR code generator and more. Professional utility tools for developers and users." />
        <meta name="keywords" content="free tools, IMEI checker, password generator, QR code, online tools, utilities" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Wrench className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold">
                    Free <span className="text-gradient">Tools</span>
                  </h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Professional-grade utilities and tools to help you work more efficiently. 
                  All tools are free to use and privacy-focused.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Tools Section */}
          <section className="py-16 space-y-16">
            <div className="container mx-auto px-4">
              {featuredTools.map((tool, index) => (
                <div key={tool.id} className={`${index > 0 ? 'border-t border-border pt-16' : ''}`}>
                  <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <tool.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                        {tool.title}
                      </h2>
                    </div>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                      {tool.description}
                    </p>
                  </div>
                  
                  <div className="max-w-4xl mx-auto px-4">
                    {tool.component}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Coming Soon Tools */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  More Tools <span className="text-gradient">Coming Soon</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We're constantly developing new tools to help you be more productive. 
                  Here's what's coming next.
                </p>
              </div>

              <div className="responsive-grid responsive-grid-3 gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
                {comingSoonTools.map((tool) => (
                  <Card key={tool.id} className="relative overflow-hidden">
                    <div className="absolute top-2 right-2 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                      Coming Soon
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <tool.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {tool.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-4">
                  Have a suggestion for a tool? Let us know!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/support" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Suggest a Tool
                  </a>
                  <a 
                    href="/newsletter" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    Get Notified of New Tools
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Tools;