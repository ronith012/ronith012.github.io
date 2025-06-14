
import HeroSection from "@/components/HeroSection";
import InteractiveDemoSection from "@/components/InteractiveDemoSection";
import LiveStatsSection from "@/components/LiveStatsSection";
import CallToActionSection from "@/components/CallToActionSection";
import CommunitiesSection from "@/components/CommunitiesSection";
import UseCasesSection from "@/components/UseCasesSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import RoomsSection from "@/components/RoomsSection";
import Footer from "@/components/Footer";
import { Room } from "@/hooks/useRoomsData";
import { Community } from "@/hooks/useCommunitiesData";

interface PageSectionsProps {
  onCreateRoom: () => void;
  onCreateCommunity: () => void;
  rooms: Room[];
  communities: Community[];
  onJoinRoom: (roomId: string) => void;
  isRoomsLoading?: boolean;
}

const PageSections = ({ onCreateRoom, onCreateCommunity, rooms, communities, onJoinRoom, isRoomsLoading }: PageSectionsProps) => {
  return (
    <div className="pt-20">
      <HeroSection onCreateRoom={onCreateRoom} />
      <InteractiveDemoSection onCreateRoom={onCreateRoom} />
      <LiveStatsSection />
      <UseCasesSection onCreateRoom={onCreateRoom} />
      <FeaturesSection />
      <TestimonialsSection />
      <StatsSection />
      <RoomsSection rooms={rooms} onJoinRoom={onJoinRoom} isLoading={isRoomsLoading} />
      <CommunitiesSection communities={communities} onCreateCommunity={onCreateCommunity} />
      <FAQSection />
      <CallToActionSection onCreateRoom={onCreateRoom} />
      <Footer />
    </div>
  );
};

export default PageSections;
