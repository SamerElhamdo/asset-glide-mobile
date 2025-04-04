
import { useState } from "react";
import { ArrowRight, ArrowLeft, Shield, Key, Import, Plus, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";

interface OnboardingFlowProps {
  onComplete: () => void;
  onCreateWallet: () => void;
  onImportWallet: () => void;
}

export function OnboardingFlow({ onComplete, onCreateWallet, onImportWallet }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const { toast } = useToast();
  
  const steps = [
    {
      title: "Welcome to AssetGlide",
      description: "Your secure gateway to the web3 world",
      icon: <Shield className="h-12 w-12 text-primary" />,
      hint: "A crypto wallet is your digital identity that lets you store, send, and receive cryptocurrencies and NFTs."
    },
    {
      title: "Choose Your Path",
      description: "Create a new wallet or import an existing one",
      icon: <Key className="h-12 w-12 text-primary" />,
      hint: "New to crypto? Create a fresh wallet. Already have one? Import it using your seed phrase or private key."
    },
    {
      title: "Security First",
      description: "Always keep your seed phrase safe and private",
      icon: <Shield className="h-12 w-12 text-primary" />,
      hint: "Your seed phrase is the master key to your assets. Never share it with anyone and store it securely offline."
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const toggleHint = () => {
    setShowHint(!showHint);
    if (!showHint) {
      toast({
        title: "Pro Tip",
        description: steps[currentStep].hint,
      });
    }
  };
  
  // Fixed handlers to directly call the parent functions
  const handleCreateWallet = () => {
    // First complete the onboarding
    onComplete();
    // Then trigger wallet creation
    setTimeout(() => onCreateWallet(), 100);
  };
  
  const handleImportWallet = () => {
    // First complete the onboarding
    onComplete();
    // Then trigger wallet import
    setTimeout(() => onImportWallet(), 100);
  };
  
  return (
    <motion.div
      key={`onboarding-${currentStep}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-8 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-primary/10 p-6 rounded-full mb-6"
      >
        {steps[currentStep].icon}
      </motion.div>
      
      <h1 className="text-3xl font-bold mb-2">{steps[currentStep].title}</h1>
      <p className="text-muted-foreground mb-8 max-w-xs">
        {steps[currentStep].description}
      </p>
      
      {currentStep === 1 && (
        <div className="grid gap-4 w-full max-w-xs mb-8">
          <Button 
            onClick={handleCreateWallet}
            className="flex items-center justify-start px-4 py-6 h-auto"
            size="lg"
          >
            <div className="bg-primary/20 p-2 rounded-full mr-3">
              <Plus size={18} />
            </div>
            <div className="text-left">
              <div className="font-medium">Create New Wallet</div>
              <div className="text-xs text-muted-foreground">Start fresh with a new wallet</div>
            </div>
          </Button>
          
          <Button 
            onClick={handleImportWallet}
            variant="outline"
            className="flex items-center justify-start px-4 py-6 h-auto"
            size="lg"
          >
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Import size={18} />
            </div>
            <div className="text-left">
              <div className="font-medium">Import Existing Wallet</div>
              <div className="text-xs text-muted-foreground">Use recovery phrase or private key</div>
            </div>
          </Button>
        </div>
      )}
      
      <div className="mt-auto w-full max-w-xs">
        <div className="flex justify-between items-center mb-6">
          {currentStep > 0 ? (
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
          ) : <div />}
          
          <Button variant="ghost" onClick={toggleHint}>
            <Lightbulb size={16} className="mr-2" />
            Hint
          </Button>
        </div>
        
        {currentStep !== 1 && (
          <Button className="w-full" onClick={handleNext}>
            {currentStep < steps.length - 1 ? 'Continue' : 'Get Started'}
            <ArrowRight size={16} className="ml-2" />
          </Button>
        )}
      </div>
      
      <Drawer open={showHint} onOpenChange={setShowHint}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Tip: {steps[currentStep].title}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 py-2 text-muted-foreground">
            {steps[currentStep].hint}
          </div>
          <DrawerFooter>
            <Button onClick={() => setShowHint(false)}>Got it</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </motion.div>
  );
}
