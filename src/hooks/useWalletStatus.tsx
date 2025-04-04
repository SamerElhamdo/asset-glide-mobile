
import { useState, useEffect } from "react";

export interface WalletStatus {
  hasWallet: boolean | null;
  isFirstLaunch: boolean;
  onboardingComplete: boolean;
  handleWalletCreated: () => void;
  handleOnboardingComplete: () => void;
}

export function useWalletStatus(): WalletStatus {
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  
  useEffect(() => {
    const checkWalletStatus = async () => {
      try {
        setTimeout(() => {
          const walletData = localStorage.getItem('assetglide_wallet');
          setHasWallet(!!walletData);
          
          const hasCompletedOnboarding = localStorage.getItem('assetglide_onboarding_complete');
          setIsFirstLaunch(!hasCompletedOnboarding);
          setOnboardingComplete(!!hasCompletedOnboarding);
        }, 500);
      } catch (error) {
        console.error("Error checking wallet status:", error);
        setHasWallet(false);
        setIsFirstLaunch(true);
      }
    };
    
    checkWalletStatus();
  }, []);

  const handleWalletCreated = () => {
    localStorage.setItem('assetglide_wallet', JSON.stringify({
      created: new Date().toISOString(),
      lastAccess: new Date().toISOString()
    }));
    
    localStorage.setItem('assetglide_onboarding_complete', 'true');
    
    setHasWallet(true);
  };
  
  const handleOnboardingComplete = () => {
    localStorage.setItem('assetglide_onboarding_complete', 'true');
    setOnboardingComplete(true);
  };

  return {
    hasWallet,
    isFirstLaunch,
    onboardingComplete,
    handleWalletCreated,
    handleOnboardingComplete
  };
}
