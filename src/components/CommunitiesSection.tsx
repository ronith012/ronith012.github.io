
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, TrendingUp } from "lucide-react";

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  icon: any;
  color: string;
  category: string;
}

interface CommunitiesSectionProps {
  communities: Community[];
  onCreateCommunity: () => void;
}

const CommunitiesSection = ({ communities, onCreateCommunity }: CommunitiesSectionProps) => {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-hot-pink via-neon-purple to-electric-blue mb-6">
            Discover Communities
          </h2>
          <p className="text-2xl text-gray-200 max-w-4xl mx-auto font-medium leading-relaxed mb-8">
            Connect with like-minded people and discover new content together. Join existing communities 
            or create your own around your favorite topics, genres, and interests.
          </p>
          
          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-3 bg-gradient-to-r from-neon-purple/20 to-electric-blue/20 p-4 rounded-xl border border-neon-purple/30">
              <TrendingUp className="h-6 w-6 text-electric-blue" />
              <div className="text-left">
                <p className="font-bold text-white">Growing Fast</p>
                <p className="text-sm text-gray-300">New members daily</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-gradient-to-r from-electric-blue/20 to-cyber-green/20 p-4 rounded-xl border border-electric-blue/30">
              <Users className="h-6 w-6 text-cyber-green" />
              <div className="text-left">
                <p className="font-bold text-white">Active Discussions</p>
                <p className="text-sm text-gray-300">24/7 engagement</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {communities.map((community, index) => (
            <Card key={community.id} className="cyber-card glow-effect hover:scale-110 transition-all duration-700 cursor-pointer group" style={{animationDelay: `${index * 0.1}s`}}>
              <CardHeader className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${community.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-500`}>
                  <community.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl font-bold group-hover:bg-gradient-to-r group-hover:from-hot-pink group-hover:to-neon-purple group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {community.name}
                </CardTitle>
                <CardDescription className="text-gray-300 font-medium text-base leading-relaxed">
                  {community.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center gap-2 glass-effect px-4 py-3 rounded-full border border-cyber-green/30">
                  <Users className="h-5 w-5 text-cyber-green" />
                  <span className="text-white font-semibold text-lg">{community.members.toLocaleString()}</span>
                  <span className="text-gray-300">members</span>
                </div>
                <Badge className={`w-full justify-center bg-gradient-to-r ${community.color} text-white font-bold py-2 text-sm`}>
                  {community.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-midnight/50 to-steel/50 p-8 rounded-2xl border-2 border-cyber-green/30 mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Want to Start Your Own Community?</h3>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Create a space for your interests, build a following around your favorite content, 
              and connect with people who share your passions.
            </p>
          </div>
          
          <Button 
            onClick={onCreateCommunity}
            className="bg-gradient-to-r from-cyber-green via-electric-blue to-neon-purple hover:from-cyber-green/80 hover:via-electric-blue/80 hover:to-neon-purple/80 text-white px-12 py-6 text-xl font-bold rounded-full transition-all duration-500 glow-effect hover:scale-110 shadow-2xl shadow-cyber-green/50"
          >
            <Plus className="mr-4 h-6 w-6" />
            Create Your Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunitiesSection;
