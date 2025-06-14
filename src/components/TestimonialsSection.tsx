
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Movie Enthusiast",
      avatar: "🎭",
      rating: 5,
      text: "StreamSync has revolutionized our weekly movie nights! No more 'wait, let me catch up' - everything is perfectly synchronized. Our friend group loves it!"
    },
    {
      name: "Marcus Rodriguez",
      role: "Content Creator",
      avatar: "🎮",
      rating: 5,
      text: "As a streamer, I use StreamSync to watch videos with my community. The chat integration is seamless and the sync is flawless. Highly recommended!"
    },
    {
      name: "Emily Watson",
      role: "Student",
      avatar: "📚",
      rating: 5,
      text: "Perfect for study groups! We watch educational videos together and discuss in real-time. It's made online learning so much more engaging."
    },
    {
      name: "David Kim",
      role: "Remote Worker",
      avatar: "💼",
      rating: 5,
      text: "Our team uses StreamSync for training videos and presentations. The quality is outstanding and it works perfectly across different time zones."
    }
  ];

  return (
    <div id="testimonials" className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold gradient-text mb-6">What Our Users Say</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Join thousands of happy users who have transformed their viewing experience
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="cyber-card hover:scale-105 transition-all duration-500">
            <CardContent className="p-8">
              <div className="space-y-6">
                <Quote className="h-8 w-8 text-neon-purple" />
                <p className="text-gray-200 text-lg leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-electric-blue rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                    <p className="text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
