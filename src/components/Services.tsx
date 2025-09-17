
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Award, Zap, Shield, X, MessageCircle, Phone, Clock, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import ServiceHero from "./services/ServiceHero";
import ServiceStats from "./services/ServiceStats";
import ServiceCardComponent from "./services/ServiceCardComponent";
import { getServicesData } from "@/utils/serviceData";
import { useState } from "react";

const Services = () => {
  const { language, t } = useLanguage();
  const currentServices = getServicesData(language);
  const [selectedService, setSelectedService] = useState(null);

  const achievements = [
    { 
      icon: Star, 
      title: "5-Star Rating", 
      description: "Consistently rated by clients"
    },
    { 
      icon: Award, 
      title: "Industry Recognition", 
      description: "Certified IT professionals"
    },
    { 
      icon: Zap, 
      title: "Fast Delivery", 
      description: "24-48 hour turnaround"
    },
    { 
      icon: Shield, 
      title: "Secure Solutions", 
      description: "Enterprise-grade security"
    }
  ];

  return (
    <section className="min-h-screen py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional IT solutions designed to help your business thrive in the digital age. 
            From development to security, we've got you covered.
          </p>
        </div>
        
        {/* Achievement Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-card border border-border rounded-lg lg:rounded-xl p-4 lg:p-6 text-center hover:shadow-md transition-all duration-200 touch-feedback">
              <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-lg lg:rounded-xl mb-3 lg:mb-4">
                <achievement.icon className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
              </div>
              <h4 className="text-sm lg:text-base font-semibold mb-2">{achievement.title}</h4>
              <p className="text-xs lg:text-sm text-muted-foreground">{achievement.description}</p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 lg:mb-16">
          {currentServices.map((service, index) => (
            <div
              key={index}
              onClick={() => setSelectedService(service)}
              className="group cursor-pointer touch-manipulation"
            >
              <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border/50 hover:border-primary/20 hover:bg-card/80 transition-all duration-500 ease-out h-full hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 active:scale-[0.98] min-h-[280px] sm:min-h-[320px]">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content container */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header with icon and badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                      <service.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                    </div>
                    {service.badge && (
                      <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full border border-primary/20">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  
                  {/* Title and description */}
                  <div className="flex-1 mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Features tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="text-xs font-medium bg-secondary/60 text-secondary-foreground px-3 py-1.5 rounded-lg border border-secondary-foreground/10"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <span className="text-sm font-semibold text-primary">Explore Service</span>
                    <div className="flex items-center gap-2 text-primary">
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Service Modal - No Scrolling */}
        {selectedService && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={() => setSelectedService(null)}
          >
            <div 
              className="bg-background rounded-2xl w-full max-w-md sm:max-w-lg lg:max-w-2xl shadow-2xl border border-border/20 animate-scale-in overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Compact Header */}
              <div className={`bg-gradient-to-r ${selectedService.color} relative px-6 py-8`}>
                {/* Close button */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200 touch-manipulation"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
                
                {/* Header content */}
                <div className="flex items-center gap-4 text-white">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <selectedService.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedService.title}</h2>
                    {selectedService.badge && (
                      <span className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-lg mt-2">
                        {selectedService.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Content - No Scrolling */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {selectedService.description}
                </p>

                {/* Key Features - Compact */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedService.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 py-4 bg-secondary/20 rounded-xl">
                  <div className="text-center">
                    <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="text-xs font-medium">24-48h</div>
                  </div>
                  <div className="text-center">
                    <Star className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="text-xs font-medium">Premium</div>
                  </div>
                  <div className="text-center">
                    <Shield className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="text-xs font-medium">Secure</div>
                  </div>
                </div>

                {/* CTA - Compact */}
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/21694934141?text=Hi! I'm interested in your ${selectedService.title} service.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] touch-manipulation"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Get Quote on WhatsApp
                  </a>
                  <p className="text-center text-xs text-muted-foreground">
                    Free consultation • Quick response • No commitment
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-card border border-border rounded-xl p-8 lg:p-12">
          <div className="max-w-2xl mx-auto mb-6 lg:mb-8">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Digital Future?
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 lg:mb-8">
              Join hundreds of satisfied clients who trust Zwanski Tech for their digital transformation needs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto touch-feedback" asChild>
              <Link to="/services">
                {t("services.getStartedToday")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="w-full sm:w-auto touch-feedback">
              View Portfolio
              <Star className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
