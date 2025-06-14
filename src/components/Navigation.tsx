
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserProfile from "./UserProfile";
import NavigationMenuItems from "./navigation/NavigationMenuItems";
import MobileMenu from "./navigation/MobileMenu";
import UserAuthButton from "./navigation/UserAuthButton";
import ThemeToggle from "./ThemeToggle";

interface NavigationProps {
  onCreateRoom: () => void;
}

const Navigation = ({ onCreateRoom }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleCreateRoom = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    onCreateRoom();
  };

  const handleAuthAction = () => {
    if (user) {
      setShowProfile(true);
    } else {
      navigate('/auth');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight/90 backdrop-blur-lg border-b border-neon-purple/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="text-2xl font-bold gradient-text cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate('/')}
            >
              StreamSync
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavigationMenuItems scrollToSection={scrollToSection} />
              
              <Button 
                onClick={handleCreateRoom} 
                className="bg-gradient-to-r from-neon-purple to-electric-blue hover:scale-105 transition-all"
              >
                Create Room
              </Button>

              <ThemeToggle />

              <UserAuthButton 
                user={user} 
                loading={loading} 
                handleAuthAction={handleAuthAction} 
              />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button 
                className="text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          <MobileMenu 
            isOpen={isOpen}
            scrollToSection={scrollToSection}
            handleCreateRoom={handleCreateRoom}
            handleAuthAction={handleAuthAction}
            user={user}
            loading={loading}
          />
        </div>
      </nav>

      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
    </>
  );
};

export default Navigation;
