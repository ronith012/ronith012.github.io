
import { Card, CardContent } from "@/components/ui/card";

const StatsSection = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid md:grid-cols-4 gap-8">
        <Card className="cyber-card glow-effect text-center slide-up hover:scale-105 transition-all duration-500">
          <CardContent className="pt-8">
            <div className="text-5xl font-bold gradient-text mb-3 floating-element">10K+</div>
            <p className="text-xl text-gray-200 font-semibold">Active Users</p>
          </CardContent>
        </Card>
        <Card className="cyber-card glow-effect text-center slide-up hover:scale-105 transition-all duration-500" style={{animationDelay: '0.1s'}}>
          <CardContent className="pt-8">
            <div className="text-5xl font-bold gradient-text mb-3 floating-element">500+</div>
            <p className="text-xl text-gray-200 font-semibold">Daily Rooms</p>
          </CardContent>
        </Card>
        <Card className="cyber-card glow-effect text-center slide-up hover:scale-105 transition-all duration-500" style={{animationDelay: '0.2s'}}>
          <CardContent className="pt-8">
            <div className="text-5xl font-bold gradient-text mb-3 floating-element">1M+</div>
            <p className="text-xl text-gray-200 font-semibold">Videos Watched</p>
          </CardContent>
        </Card>
        <Card className="cyber-card glow-effect text-center slide-up hover:scale-105 transition-all duration-500" style={{animationDelay: '0.3s'}}>
          <CardContent className="pt-8">
            <div className="text-5xl font-bold gradient-text mb-3 floating-element">99.9%</div>
            <p className="text-xl text-gray-200 font-semibold">Uptime</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsSection;
