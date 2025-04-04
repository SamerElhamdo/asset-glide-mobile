
import { useWalletStatus } from "@/hooks/useWalletStatus";
import { WalletSetup } from "@/components/wallet/WalletSetup";
import { WalletHeader } from "@/components/wallet/Header";
import { WalletContent } from "@/components/wallet/WalletContent";
import { BottomNav } from "@/components/wallet/BottomNav";
import { mockTokens, mockTransactions, mockWalletData } from "@/data/walletMockData";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { 
    hasWallet, 
    isFirstLaunch, 
    onboardingComplete,
    handleWalletCreated,
    handleOnboardingComplete
  } = useWalletStatus();
  
  const { toast } = useToast();
  
  if (hasWallet === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 wallet-gradient">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-20 w-20 bg-white/20 rounded-full mb-4"></div>
          <div className="h-6 w-40 bg-white/20 rounded mb-2"></div>
          <div className="h-4 w-60 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  if (!hasWallet) {
    return (
      <WalletSetup 
        isFirstLaunch={isFirstLaunch}
        onboardingComplete={onboardingComplete}
        onWalletCreated={() => {
          handleWalletCreated();
          toast({
            title: "Wallet Ready!",
            description: "Your wallet has been set up and is ready to use.",
          });
        }}
        onOnboardingComplete={handleOnboardingComplete}
      />
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <WalletHeader walletData={mockWalletData} />
      <WalletContent tokens={mockTokens} transactions={mockTransactions} />
      <BottomNav />
    </div>
  );
};

export default Index;
