
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

interface ServiceCardProps {
  service: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    features: string[];
    badge: string;
    color: string;
  };
  index: number;
}

const ServiceCardComponent = ({ service, index }: ServiceCardProps) => {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="card-safe group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/25 hover:-translate-y-4 animate-on-scroll overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Enhanced Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/5 to-red-500/0 group-hover:from-orange-500/10 group-hover:via-orange-500/15 group-hover:to-red-500/10 transition-all duration-500"></div>
      
      {/* Animated glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      </div>
      
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${service.color} group-hover:scale-110 transition-transform duration-300`}>
            <div className="w-full h-full bg-slate-800/90 rounded-xl p-3 group-hover:bg-slate-700/90 transition-colors duration-300">
              <service.icon className="h-8 w-8 text-white group-hover:text-orange-300 transition-colors duration-300" />
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className="text-xs bg-orange-500/20 text-orange-300 border-orange-500/30 group-hover:bg-orange-500/30 group-hover:text-orange-200 transition-all duration-300"
          >
            {service.badge}
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300 mb-2">
          {service.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 relative z-10">
        <CardDescription className="text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
          {service.description}
        </CardDescription>
        
        <div className="space-y-3">
          {service.features.map((feature, featureIndex) => (
            <div 
              key={featureIndex} 
              className="flex items-center text-sm group-hover:translate-x-1 transition-transform duration-300"
              style={{ transitionDelay: `${featureIndex * 50}ms` }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
              <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 font-medium">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 group/btn hover:bg-orange-500/20 text-slate-300 hover:text-orange-300 border border-slate-600 hover:border-orange-500/60 transition-all duration-300 touch-optimized"
            aria-label={`Learn more about ${service.title}`}
          >
            {t("services.learnMore")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="px-3 hover:bg-orange-500/20 text-slate-300 hover:text-orange-300 border border-slate-600 hover:border-orange-500/60 transition-all duration-300 touch-optimized"
            aria-label={`External link for ${service.title}`}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      
      {/* Enhanced floating elements - constrained */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-orange-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-125 pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-red-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-125 pointer-events-none"></div>
      
      {/* Bottom gradient line with animation */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-x-0 group-hover:scale-x-100 origin-center"></div>
    </Card>
  );
};

export default ServiceCardComponent;
