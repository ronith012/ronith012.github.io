
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Users, Globe, Heart } from "lucide-react";

interface CallToActionSectionProps {
  onCreateRoom: () => void;
}

const CallToActionSection = ({ onCreateRoom }: CallToActionSectionProps) => {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="rainbow-border">
        <Card className="cyber-card text-center">
          <CardContent className="p-20">
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-hot-pink via-neon-purple to-electric-blue">
                  Ready to Start Watching Together?
                </h2>
                <p className="text-2xl text-gray-200 max-w-4xl mx-auto font-medium leading-relaxed">
                  Join thousands of users who have already discovered the joy of synchronized video watching. 
                  Create your first room in seconds and invite friends to your personal cinema.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-r from-hot-pink to-neon-purple rounded-full flex items-center justify-center mx-auto">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <p className="font-bold text-white">Invite Friends</p>
                    <p className="text-sm text-gray-300">Share your room link instantly</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-r from-neon-purple to-electric-blue rounded-full flex items-center justify-center mx-auto">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <p className="font-bold text-white">Pick Content</p>
                    <p className="text-sm text-gray-300">Any YouTube video works</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-r from-electric-blue to-cyber-green rounded-full flex items-center justify-center mx-auto">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <p className="font-bold text-white">Watch Together</p>
                    <p className="text-sm text-gray-300">Perfect sync guaranteed</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={onCreateRoom}
                className="bg-gradient-to-r from-hot-pink via-neon-purple to-electric-blue hover:from-hot-pink/80 hover:via-neon-purple/80 hover:to-electric-blue/80 text-white px-16 py-8 text-3xl font-bold rounded-full transition-all duration-500 glow-effect hover:scale-125 shadow-2xl shadow-neon-purple/50"
              >
                <Sparkles className="mr-4 h-10 w-10" />
                Create Your Room Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CallToActionSection;
