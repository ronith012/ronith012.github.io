
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface NavigationHoverCardProps {
  trigger: React.ReactNode;
  title: string;
  items: string[];
  bulletColor: string;
  description: string;
}

const NavigationHoverCard = ({ trigger, title, items, bulletColor, description }: NavigationHoverCardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {trigger}
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-midnight/95 backdrop-blur-lg border border-neon-purple/30 p-6">
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-white gradient-text">{title}</h4>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <div className={`w-2 h-2 ${bulletColor} rounded-full mt-1.5 flex-shrink-0`}></div>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-neon-purple/20">
            <p className="text-xs text-gray-400">{description}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default NavigationHoverCard;
