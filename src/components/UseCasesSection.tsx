
import { Button } from "@/components/ui/button";
import { Video, Music, Gamepad2, Coffee, Users, Mic, Smartphone, Globe } from "lucide-react";

interface UseCasesSectionProps {
  onCreateRoom: () => void;
}

const UseCasesSection = ({ onCreateRoom }: UseCasesSectionProps) => {
  const useCases = [
    {
      icon: Video,
      title: "Movie Nights",
      description: "Watch films together with friends and family, complete with voice chat and synchronized playback.",
      features: ["Voice chat enabled", "Mobile-friendly", "Multi-platform support"],
      gradient: "from-purple-500 to-pink-500",
      participants: "12-50 people"
    },
    {
      icon: Music,
      title: "Music Discovery",
      description: "Share music videos and discover new artists together from YouTube, Vimeo, and other platforms.",
      features: ["Cross-platform streaming", "Voice discussions", "Mobile optimized"],
      gradient: "from-green-500 to-blue-500", 
      participants: "5-25 people"
    },
    {
      icon: Gamepad2,
      title: "Gaming Streams",
      description: "Watch live gaming content together with real-time voice commentary and mobile support.",
      features: ["Twitch integration", "Voice chat", "Mobile viewing"],
      gradient: "from-red-500 to-orange-500",
      participants: "20-100 people"
    },
    {
      icon: Coffee,
      title: "Study Sessions",
      description: "Educational content viewing with voice collaboration features, perfect for mobile learners.",
      features: ["Educational platforms", "Voice study groups", "Mobile accessibility"],
      gradient: "from-indigo-500 to-cyan-500",
      participants: "8-30 people"
    },
    {
      icon: Users,
      title: "Team Building",
      description: "Corporate watch parties with professional voice chat and multi-device support for remote teams.",
      features: ["Professional voice quality", "Cross-device sync", "Enterprise security"],
      gradient: "from-teal-500 to-purple-500",
      participants: "10-75 people"
    },
    {
      icon: Globe,
      title: "Global Communities",
      description: "Connect viewers worldwide with multi-language support, voice translation, and mobile optimization.",
      features: ["Multi-language voice", "Global streaming", "Mobile-first design"],
      gradient: "from-pink-500 to-yellow-500",
      participants: "50-200 people"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-midnight/30 to-steel/30 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-5xl font-bold gradient-text">
            Perfect for Every Occasion
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            From movie nights to global communities, StreamSync adapts to your needs with voice chat, 
            multi-platform support, and mobile optimization
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="cyber-card p-8 hover:scale-105 transition-all duration-300 glow-effect slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${useCase.gradient} flex items-center justify-center mb-6 floating-element`}>
                <useCase.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{useCase.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">{useCase.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Typical group size:</span>
                  <span className="text-cyber-green font-semibold">{useCase.participants}</span>
                </div>
                
                <div className="space-y-2">
                  <span className="text-sm text-gray-400">Key features:</span>
                  {useCase.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={onCreateRoom}
            className="bg-gradient-to-r from-hot-pink via-neon-purple to-electric-blue hover:from-hot-pink/80 hover:via-neon-purple/80 hover:to-electric-blue/80 text-white px-12 py-6 text-xl font-bold rounded-full transition-all duration-500 glow-effect hover:scale-110"
          >
            Start Your Watch Party
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
