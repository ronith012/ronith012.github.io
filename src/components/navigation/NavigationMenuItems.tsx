
import NavigationHoverCard from "./NavigationHoverCard";

interface NavigationMenuItemsProps {
  scrollToSection: (id: string) => void;
}

const NavigationMenuItems = ({ scrollToSection }: NavigationMenuItemsProps) => {
  const featuresList = [
    "Perfect Video Synchronization",
    "Built-in Voice Chat",
    "Multi-Platform Support (YouTube, Vimeo, Twitch)",
    "Mobile Optimized Experience",
    "Real-time Chat & Reactions", 
    "Private & Secure Rooms",
    "Global Accessibility",
    "Instant Room Creation",
    "Community Features"
  ];

  const roomFeatures = [
    "Create Private or Public Rooms",
    "Instant Room Generation",
    "Custom Room Names & Descriptions",
    "Room Password Protection",
    "Up to 1000+ Participants",
    "Persistent Room Links",
    "Room Management Controls",
    "Kick/Ban Users (Room Owner)",
    "Real-time User List"
  ];

  const reviewHighlights = [
    "⭐ 4.9/5 Average Rating",
    "🎬 Perfect for Movie Nights",
    "🎮 Great for Gaming Communities",
    "📚 Excellent for Study Groups",
    "💼 Teams Love It for Training",
    "🌍 Works Across Time Zones",
    "📱 Mobile-Friendly Experience",
    "🔒 Privacy & Security Focused",
    "⚡ Lightning Fast Performance"
  ];

  const faqTopics = [
    "❓ How does synchronization work?",
    "💰 Is StreamSync really free?",
    "🎥 Supported video platforms",
    "👥 Room participant limits",
    "🔐 Account requirements",
    "📱 Mobile device compatibility",
    "🛠️ Troubleshooting guide",
    "🔧 Advanced features",
    "📞 Customer support"
  ];

  return (
    <>
      <NavigationHoverCard
        trigger={
          <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-white transition-colors">
            Features
          </button>
        }
        title="🚀 Platform Features"
        items={featuresList}
        bulletColor="bg-electric-blue"
        description="Click to explore detailed features below"
      />
      
      <NavigationHoverCard
        trigger={
          <button onClick={() => scrollToSection('rooms-section')} className="text-gray-300 hover:text-white transition-colors">
            Rooms
          </button>
        }
        title="🏠 Room Capabilities"
        items={roomFeatures}
        bulletColor="bg-cyber-green"
        description="View live rooms and create your own"
      />

      <NavigationHoverCard
        trigger={
          <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-white transition-colors">
            Reviews
          </button>
        }
        title="💬 User Reviews"
        items={reviewHighlights}
        bulletColor="bg-hot-pink"
        description="Read what our community says about us"
      />

      <NavigationHoverCard
        trigger={
          <button onClick={() => scrollToSection('faq')} className="text-gray-300 hover:text-white transition-colors">
            FAQ
          </button>
        }
        title="❓ Common Questions"
        items={faqTopics}
        bulletColor="bg-neon-purple"
        description="Find answers to frequently asked questions"
      />
    </>
  );
};

export default NavigationMenuItems;
