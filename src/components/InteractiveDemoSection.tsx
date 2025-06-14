import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Users, MessageCircle, Mic, MicOff } from "lucide-react";
interface InteractiveDemoSectionProps {
  onCreateRoom: () => void;
}
const InteractiveDemoSection = ({
  onCreateRoom
}: InteractiveDemoSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<"youtube" | "vimeo" | "twitch">("youtube");
  const platforms = [{
    id: "youtube",
    name: "YouTube",
    color: "bg-red-500"
  }, {
    id: "vimeo",
    name: "Vimeo",
    color: "bg-blue-500"
  }, {
    id: "twitch",
    name: "Twitch",
    color: "bg-purple-500"
  }];
  return <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-5xl font-bold gradient-text">
            Try the Experience
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            See how StreamSync works across platforms with voice chat integration
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Platform Selection */}
            

            {/* Voice Features */}
            <Card className="cyber-card p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Mic className="h-5 w-5 text-hot-pink" />
                Voice Features
              </h3>
              <div className="space-y-4">
                <button onClick={() => setIsMicOn(!isMicOn)} className={`w-full p-3 rounded-lg border-2 transition-all duration-300 ${isMicOn ? "border-hot-pink bg-hot-pink/20" : "border-gray-600 hover:border-gray-500"}`}>
                  <div className="flex items-center gap-3">
                    {isMicOn ? <Mic className="h-5 w-5 text-hot-pink" /> : <MicOff className="h-5 w-5 text-gray-400" />}
                    <span className="text-white font-medium">
                      {isMicOn ? "Voice Chat On" : "Voice Chat Off"}
                    </span>
                  </div>
                </button>
                
                <div className="text-sm text-gray-300 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
                    <span>Crystal clear audio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                    <span>Push-to-talk option</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hot-pink rounded-full"></div>
                    <span>Background noise reduction</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Demo Video Player */}
          <Card className="cyber-card mt-8 glow-effect">
            <CardContent className="p-0">
              <div className="aspect-video bg-black rounded-t-lg flex items-center justify-center relative overflow-hidden">
                <div className="text-center space-y-6 p-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-neon-purple via-electric-blue to-cyber-green rounded-full flex items-center justify-center mx-auto floating-element">
                    {isPlaying ? <Pause className="h-10 w-10 text-white" /> : <Play className="h-10 w-10 text-white" />}
                  </div>
                  <div className="space-y-3">
                    <h3 className="gradient-text text-2xl font-bold">Interactive Demo</h3>
                    <p className="text-gray-300 text-lg">
                      Streaming from {platforms.find(p => p.id === selectedPlatform)?.name}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <Badge className="bg-gradient-to-r from-neon-purple to-electric-blue text-white">
                        <Users className="h-4 w-4 mr-1" />
                        5 viewers
                      </Badge>
                      <Badge className="bg-gradient-to-r from-electric-blue to-cyber-green text-white">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Live chat
                      </Badge>
                      {isMicOn && <Badge className="bg-gradient-to-r from-cyber-green to-hot-pink text-white">
                          <Mic className="h-4 w-4 mr-1" />
                          Voice active
                        </Badge>}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-midnight via-steel to-midnight border-t-2 border-neon-purple/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button onClick={() => setIsPlaying(!isPlaying)} className="bg-gradient-to-r from-neon-purple to-electric-blue hover:from-neon-purple/80 hover:to-electric-blue/80 text-white font-bold transition-all duration-300 hover:scale-110">
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    <div className="text-cyber-green font-medium">
                      Perfect sync across all devices
                    </div>
                  </div>
                  <Button onClick={onCreateRoom} className="bg-gradient-to-r from-hot-pink to-neon-purple hover:from-hot-pink/80 hover:to-neon-purple/80 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105">
                    Try It Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default InteractiveDemoSection;