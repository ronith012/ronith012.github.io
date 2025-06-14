
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile = ({ onClose }: UserProfileProps) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="rainbow-border max-w-md w-full mx-4 bounce-in">
        <Card className="cyber-card">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-4">
              <Avatar className="h-20 w-20 ring-2 ring-neon-purple/50">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-gradient-to-r from-neon-purple to-electric-blue text-white text-xl font-bold">
                  {user.user_metadata?.display_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="gradient-text text-2xl">
              {user.user_metadata?.display_name || 'User'}
            </CardTitle>
            <div className="flex items-center justify-center gap-2">
              <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30">
                @{user.user_metadata?.username || 'user'}
              </Badge>
              <Badge className="bg-electric-blue/20 text-electric-blue border-electric-blue/30">
                Member
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-neon-purple/20">
                <User className="h-4 w-4 text-neon-purple" />
                <span className="text-white text-sm">{user.email}</span>
              </div>
              
              <div className="text-center text-gray-400 text-sm">
                Member since {new Date(user.created_at).toLocaleDateString()}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-neon-purple/50 text-neon-purple hover:bg-neon-purple hover:text-white transition-all duration-300"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="flex-1 border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>

            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-cyber-green to-electric-blue hover:from-cyber-green/80 hover:to-electric-blue/80 text-white font-bold transition-all duration-300"
            >
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
