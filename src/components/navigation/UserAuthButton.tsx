
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@supabase/supabase-js";

interface UserAuthButtonProps {
  user: User | null;
  loading: boolean;
  handleAuthAction: () => void;
}

const UserAuthButton = ({ user, loading, handleAuthAction }: UserAuthButtonProps) => {
  if (loading) return null;

  if (user) {
    return (
      <Button
        onClick={handleAuthAction}
        variant="ghost"
        className="p-2 hover:bg-neon-purple/20 transition-all duration-300"
      >
        <Avatar className="h-8 w-8 ring-2 ring-neon-purple/50">
          <AvatarImage src={user.user_metadata?.avatar_url} />
          <AvatarFallback className="bg-gradient-to-r from-neon-purple to-electric-blue text-white text-sm font-bold">
            {user.user_metadata?.display_name?.charAt(0) || user.email?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAuthAction}
      variant="outline"
      className="border-2 border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-white transition-all duration-300"
    >
      <LogIn className="h-4 w-4 mr-2" />
      Sign In
    </Button>
  );
};

export default UserAuthButton;
