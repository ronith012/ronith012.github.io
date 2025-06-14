
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, Star, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const PremiumUpgrade = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const premiumFeatures = [
    "Unlimited room creation",
    "AI-powered room summaries",
    "Priority customer support",
    "Advanced analytics",
    "Custom room themes",
    "Extended video history",
    "Voice chat enhancements",
    "Mobile app access"
  ];

  const handleUpgrade = async () => {
    if (!user) {
      toast.error('Please sign in to upgrade');
      return;
    }

    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: {
          userId: user.id,
          amount: 9.99,
          description: 'StreamSync Premium Monthly Subscription'
        }
      });

      if (error) throw error;

      toast.success('Payment initiated! Complete the payment to activate premium features.');
      console.log('Payment data:', data);
      
      // In a real app, you would integrate with Stripe Elements here
      // For demo purposes, we'll show a success message
      
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Failed to process payment');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Crown className="h-12 w-12 text-yellow-500" />
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-4">
          Upgrade to Premium
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Unlock advanced features and take your streaming experience to the next level
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <Zap className="h-6 w-6 text-cyber-green" />
              Free Plan
              <Badge className="bg-cyber-green/20 text-cyber-green">Current</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-white mb-4">
              $0<span className="text-lg text-gray-400">/month</span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="h-4 w-4 text-cyber-green" />
                Basic room creation
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="h-4 w-4 text-cyber-green" />
                Voice chat access
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="h-4 w-4 text-cyber-green" />
                Standard support
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="h-4 w-4 text-cyber-green" />
                Basic platform support
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Premium Plan */}
        <Card className="cyber-card glow-effect border-yellow-500/50">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <Crown className="h-6 w-6 text-yellow-500" />
              Premium Plan
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                <Star className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-white mb-4">
              $9.99<span className="text-lg text-gray-400">/month</span>
            </div>
            <ul className="space-y-3">
              {premiumFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300">
                  <Check className="h-4 w-4 text-yellow-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              onClick={handleUpgrade}
              disabled={isProcessing || !user}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 mt-6"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade Now
                </>
              )}
            </Button>
            {!user && (
              <p className="text-sm text-gray-400 text-center mt-2">
                Please sign in to upgrade to premium
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PremiumUpgrade;
