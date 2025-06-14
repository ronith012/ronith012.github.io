
import { Button } from "@/components/ui/button";
import { User, LogIn } from "lucide-react";
import { User as UserType } from "@supabase/supabase-js";

interface MobileMenuProps {
  isOpen: boolean;
  scrollToSection: (id: string) => void;
  handleCreateRoom: () => void;
  handleAuthAction: () => void;
  user: UserType | null;
  loading: boolean;
}

const MobileMenu = ({ isOpen, scrollToSection, handleCreateRoom, handleAuthAction, user, loading }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 pb-4 space-y-4">
      <button onClick={() => scrollToSection('features')} className="block text-gray-300 hover:text-white transition-colors">Features</button>
      <button onClick={() => scrollToSection('rooms-section')} className="block text-gray-300 hover:text-white transition-colors">Rooms</button>
      <button onClick={() => scrollToSection('testimonials')} className="block text-gray-300 hover:text-white transition-colors">Reviews</button>
      <button onClick={() => scrollToSection('faq')} className="block text-gray-300 hover:text-white transition-colors">FAQ</button>
      
      <Button 
        onClick={handleCreateRoom} 
        className="w-full bg-gradient-to-r from-neon-purple to-electric-blue"
      >
        Create Room
      </Button>

      {!loading && (
        <Button
          onClick={handleAuthAction}
          variant="outline"
          className="w-full border-2 border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-white"
        >
          {user ? (
            <>
              <User className="h-4 w-4 mr-2" />
              Profile
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default MobileMenu;
