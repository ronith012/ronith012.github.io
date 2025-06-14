
import { Button } from "@/components/ui/button";
import { Plus, Globe, Users, Video, Sparkles, Mic, Smartphone, Play } from "lucide-react";

interface HeroSectionProps {
  onCreateRoom: () => void;
}

const HeroSection = ({ onCreateRoom }: HeroSectionProps) => {
  return (
    <div className="relative container mx-auto px-6 py-20">
      <div className="text-center space-y-12">
        <div className="space-y-8">
          <div className="relative">
            <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-electric-blue to-cyber-green">
              StreamSync
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-neon-purple/20 via-electric-blue/20 to-cyber-green/20 blur-xl -z-10"></div>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-3xl font-bold text-white">
              Watch videos together with voice chat across all platforms
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              The ultimate synchronized viewing experience with built-in voice communication, 
              multi-platform support, and perfect mobile optimization. Connect with friends 
              anywhere, anytime, on any device.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 bg-gradient-to-r from-neon-purple/20 to-electric-blue/20 p-4 rounded-xl border border-neon-purple/30">
              <Mic className="h-8 w-8 text-electric-blue floating-element" />
              <div className="text-left">
                <p className="font-bold text-white">Voice Chat</p>
                <p className="text-sm text-gray-300">Crystal clear audio</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-gradient-to-r from-electric-blue/20 to-cyber-green/20 p-4 rounded-xl border border-electric-blue/30">
              <Play className="h-8 w-8 text-cyber-green floating-element" />
              <div className="text-left">
                <p className="font-bold text-white">Multi-Platform</p>
                <p className="text-sm text-gray-300">YouTube, Vimeo & more</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-gradient-to-r from-cyber-green/20 to-hot-pink/20 p-4 rounded-xl border border-cyber-green/30">
              <Smartphone className="h-8 w-8 text-hot-pink floating-element" />
              <div className="text-left">
                <p className="font-bold text-white">Mobile Ready</p>
                <p className="text-sm text-gray-300">Optimized for all devices</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gradient-to-r from-hot-pink/20 to-neon-purple/20 p-4 rounded-xl border border-hot-pink/30">
              <Sparkles className="h-8 w-8 text-neon-purple floating-element" />
              <div className="text-left">
                <p className="font-bold text-white">Perfect Sync</p>
                <p className="text-sm text-gray-300">Frame-perfect timing</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 pt-8">
          <Button 
            onClick={onCreateRoom}
            className="bg-gradient-to-r from-hot-pink via-neon-purple to-electric-blue hover:from-hot-pink/80 hover:via-neon-purple/80 hover:to-electric-blue/80 text-white px-12 py-6 text-2xl font-bold rounded-full transition-all duration-500 glow-effect hover:scale-110 shadow-2xl shadow-neon-purple/50"
          >
            <Plus className="mr-4 h-8 w-8" />
            Create Room
          </Button>
          <Button 
            variant="outline" 
            className="border-4 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white px-12 py-6 text-2xl font-bold rounded-full transition-all duration-500 hover:scale-110 shadow-2xl shadow-electric-blue/30"
            onClick={() => document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Globe className="mr-4 h-8 w-8" />
            Explore Rooms
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
