
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does video synchronization work?",
      answer: "StreamSync uses advanced real-time synchronization technology to ensure all viewers see the exact same frame at the exact same time. Our servers continuously monitor playback status and automatically adjust for any network delays."
    },
    {
      question: "Is StreamSync really free?",
      answer: "Yes! StreamSync is completely free to use. You can create unlimited rooms, invite unlimited friends, and watch as many videos as you want. We believe in making shared experiences accessible to everyone."
    },
    {
      question: "What video platforms are supported?",
      answer: "Currently, StreamSync supports YouTube videos. We're working on adding support for more platforms including Vimeo, Twitch, and custom video uploads in future updates."
    },
    {
      question: "How many people can join a room?",
      answer: "There's no limit! Whether you're watching with 2 friends or hosting a community event with hundreds of viewers, StreamSync can handle rooms of any size while maintaining perfect synchronization."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account required! You can create and join rooms instantly without any registration. However, creating an account lets you save your favorite rooms and access additional features."
    },
    {
      question: "Can I use StreamSync on mobile devices?",
      answer: "Absolutely! StreamSync is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. The mobile experience is optimized for touch navigation and smaller screens."
    }
  ];

  return (
    <div id="faq" className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold gradient-text mb-6">Frequently Asked Questions</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Everything you need to know about StreamSync
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="cyber-card">
            <CardContent className="p-0">
              <button
                className="w-full p-6 text-left flex items-center justify-between hover:bg-neon-purple/10 transition-colors"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <h3 className="text-xl font-bold text-white">{faq.question}</h3>
                {openFAQ === index ? (
                  <ChevronUp className="h-6 w-6 text-neon-purple" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-neon-purple" />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-300 text-lg leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
