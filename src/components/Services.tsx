
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {currentServices.map((service, index) => (
            <div
              key={index}
              onClick={() => setSelectedService(service)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 touch-feedback"
            >
              <div className="bg-card rounded-xl p-4 sm:p-6 border border-border hover:border-primary/30 hover:shadow-xl h-full">
                <div className="relative overflow-hidden mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                    <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  {service.badge && (
                    <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      {service.badge}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-2">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.slice(0, 2).map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary font-medium">Learn More</span>
                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Service Detail Modal */}
        {selectedService && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-fade-in"
            onClick={() => setSelectedService(null)}
          >
            <div 
              className="bg-background rounded-2xl w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl border border-border/50 animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile-friendly header with close button */}
              <div className="sticky top-0 z-10">
                <div className={`bg-gradient-to-r ${selectedService.color} relative overflow-hidden`}>
                  {/* Animated background effects */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                  
                  {/* Close button - prominent on mobile */}
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:bg-white/20 rounded-full p-2 sm:p-2.5 transition-all duration-200 hover:scale-110 z-20"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  
                  {/* Header content */}
                  <div className="relative z-10 p-4 sm:p-6 text-white">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <selectedService.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-2">{selectedService.title}</h2>
                        {selectedService.badge && (
                          <span className="inline-block bg-white/20 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/30">
                            {selectedService.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(95vh-200px)]">
                <div className="p-4 sm:p-6 lg:p-8">
                  {/* Description */}
                  <div className="mb-8">
                    <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                      {selectedService.description}
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                      What's Included
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {selectedService.features.map((feature, index) => (
                        <div 
                          key={index} 
                          className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors duration-200 group"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-125 transition-transform duration-200" />
                          <span className="text-sm sm:text-base leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service Highlights */}
                  <div className="mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 sm:p-6 bg-gradient-to-br from-secondary/30 to-secondary/50 rounded-xl border border-border/50">
                      <div className="text-center group hover:scale-105 transition-transform duration-200">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                          <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <div className="font-semibold text-sm sm:text-base">Quick Response</div>
                        <div className="text-xs sm:text-sm text-muted-foreground mt-1">24-48 hours</div>
                      </div>
                      <div className="text-center group hover:scale-105 transition-transform duration-200">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                          <Star className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <div className="font-semibold text-sm sm:text-base">Quality Assured</div>
                        <div className="text-xs sm:text-sm text-muted-foreground mt-1">100% Guaranteed</div>
                      </div>
                      <div className="text-center group hover:scale-105 transition-transform duration-200">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                          <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <div className="font-semibold text-sm sm:text-base">24/7 Support</div>
                        <div className="text-xs sm:text-sm text-muted-foreground mt-1">Always Available</div>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 sm:p-8 border border-primary/20">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 text-primary">Ready to get started?</h3>
                    <p className="text-muted-foreground mb-6 text-sm sm:text-base max-w-md mx-auto">
                      Contact us on WhatsApp for a free consultation and personalized quote.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <a
                        href={`https://wa.me/21694934141?text=Hi! I'm interested in your ${selectedService.title} service. Can you provide more details?`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
                      >
                        <MessageCircle className="h-5 w-5" />
                        Chat on WhatsApp
                      </a>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>Or call: <span className="font-semibold text-foreground">+216 94 934 141</span></span>
                      </div>
                    </div>
                  </div>
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
