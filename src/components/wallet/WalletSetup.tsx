
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateWalletForm } from "@/components/wallet/CreateWalletForm";
import { ImportWalletForm } from "@/components/wallet/ImportWalletForm";
import { OnboardingFlow } from "@/components/wallet/OnboardingFlow";

interface WalletSetupProps {
  isFirstLaunch: boolean;
  onboardingComplete: boolean;
  onWalletCreated: () => void;
  onOnboardingComplete: () => void;
}

export function WalletSetup({ 
  isFirstLaunch, 
  onboardingComplete,
  onWalletCreated,
  onOnboardingComplete
}: WalletSetupProps) {
  const [showCreateWallet, setShowCreateWallet] = useState(false);
  const [showImportWallet, setShowImportWallet] = useState(false);
  
  const handleCreateWallet = () => {
    setShowCreateWallet(true);
    setShowImportWallet(false);
  };
  
  const handleImportWallet = () => {
    setShowImportWallet(true);
    setShowCreateWallet(false);
  };

  if (isFirstLaunch && !onboardingComplete) {
    return (
      <div className="min-h-screen wallet-gradient text-white">
        <OnboardingFlow 
          onComplete={onOnboardingComplete} 
          onCreateWallet={handleCreateWallet}
          onImportWallet={handleImportWallet}
        />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 wallet-gradient text-white">
      <div className="max-w-sm w-full">
        {showCreateWallet ? (
          <CreateWalletForm onComplete={onWalletCreated} />
        ) : showImportWallet ? (
          <ImportWalletForm 
            onComplete={onWalletCreated} 
            onBack={() => setShowImportWallet(false)}
          />
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">AssetGlide</h1>
            <p className="text-white/70 mb-8">
              The ultimate crypto wallet for your digital assets
            </p>
            
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-wallet-teal hover:bg-wallet-teal/90 text-white"
                onClick={handleCreateWallet}
              >
                Create New Wallet
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="w-full text-white border-white/30 hover:bg-white/10"
                onClick={handleImportWallet}
              >
                Import Existing Wallet
              </Button>
            </div>
            
            <p className="mt-8 text-xs text-white/50">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
