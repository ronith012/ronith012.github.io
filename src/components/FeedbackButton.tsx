
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import FeedbackForm from "./FeedbackForm";

const FeedbackButton = () => {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowFeedback(true)}
        className="fixed bottom-6 right-6 bg-cyber-green hover:bg-cyber-green/80 text-black font-semibold shadow-lg z-40"
        size="lg"
      >
        <MessageSquare className="h-5 w-5 mr-2" />
        Feedback
      </Button>
      
      <FeedbackForm 
        isOpen={showFeedback} 
        onClose={() => setShowFeedback(false)} 
      />
    </>
  );
};

export default FeedbackButton;
