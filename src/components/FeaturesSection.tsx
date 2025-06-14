
import { Video, Users, Shield, Smartphone, Mic, Play, Globe, Zap, Heart, MessageCircle } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Video,
      title: "Perfect Synchronization",
      description: "Frame-perfect video sync ensures everyone watches together in real-time, no matter where they are.",
      gradient: "from-neon-purple to-electric-blue"
    },
    {
      icon: Mic,
      title: "Voice Chat Integration",
      description: "Crystal-clear voice communication built right in. Talk with friends while watching without any external apps.",
      gradient: "from-electric-blue to-cyber-green"
    },
    {
      icon: Play,
      title: "Multiple Video Platforms",
      description: "Support for YouTube, Vimeo, Twitch, and more. Stream content from your favorite platforms seamlessly.",
      gradient: "from-cyber-green to-hot-pink"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Full mobile experience with touch controls, responsive design, and native mobile app performance.",
      gradient: "from-hot-pink to-neon-purple"
    },
    {
      icon: Users,
      title: "Live Chat & Reactions",
      description: "Real-time messaging with emoji reactions, GIFs, and interactive features to enhance your watch party.",
      gradient: "from-neon-purple via-electric-blue to-cyber-green"
    },
    {
      icon: Shield,
      title: "Private & Secure",
      description: "End-to-end encryption for private rooms, customizable privacy settings, and secure user authentication.",
      gradient: "from-electric-blue to-hot-pink"
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Multi-language support, accessibility features, and optimized performance for users worldwide.",
      gradient: "from-cyber-green to-neon-purple"
    },
    {
      icon: Zap,
      title: "Instant Room Creation",
      description: "Create and join rooms in seconds. No downloads, no setup - just click and start watching together.",
      gradient: "from-hot-pink via-neon-purple to-electric-blue"
    },
    {
      icon: Heart,
      title: "Community Features",
      description: "Build communities around your interests, create recurring events, and discover new content with friends.",
      gradient: "from-neon-purple to-cyber-green"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-5xl font-bold neon-text">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need for the perfect watch party experience, from voice chat to multi-platform support
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="cyber-card p-8 hover:scale-105 transition-all duration-300 glow-effect slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 floating-element`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
