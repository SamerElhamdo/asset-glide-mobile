import { useState, useEffect } from "react";
import { Plus, ChevronDown, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WalletCard } from "@/components/wallet/WalletCard";
import { TokenList, Token } from "@/components/wallet/TokenList";
import { TransactionHistory, Transaction } from "@/components/wallet/TransactionHistory";
import { BottomNav } from "@/components/wallet/BottomNav";
import { CreateWalletForm } from "@/components/wallet/CreateWalletForm";
import { ImportWalletForm } from "@/components/wallet/ImportWalletForm";
import { OnboardingFlow } from "@/components/wallet/OnboardingFlow";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const mockTokens: Token[] = [
  {
    id: "1",
    name: "Ethereum",
    symbol: "ETH",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    balance: "1.25",
    value: "3,125.78",
    priceChange: 2.45
  },
  {
    id: "2",
    name: "USD Coin",
    symbol: "USDC",
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    balance: "520.50",
    value: "520.50",
    priceChange: 0.01
  },
  {
    id: "3",
    name: "Solana",
    symbol: "SOL",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
    balance: "12.8",
    value: "1,536.00",
    priceChange: -1.23
  }
];

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "receive",
    title: "Received ETH",
    date: "Today, 10:35 AM",
    amount: "0.25",
    symbol: "ETH",
    status: "completed"
  },
  {
    id: "2",
    type: "send",
    title: "Sent USDC",
    date: "Yesterday, 3:23 PM",
    amount: "125.00",
    symbol: "USDC",
    status: "completed"
  },
  {
    id: "3",
    type: "swap",
    title: "Swapped ETH to SOL",
    date: "Apr 2, 2025",
    amount: "0.1 ETH → 12 SOL",
    symbol: "",
    status: "completed"
  },
  {
    id: "4",
    type: "send",
    title: "Sent to Exchange",
    date: "Mar 25, 2025",
    amount: "0.5",
    symbol: "ETH",
    status: "pending"
  }
];

const Index = () => {
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);
  const [showCreateWallet, setShowCreateWallet] = useState(false);
  const [showImportWallet, setShowImportWallet] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const { toast } = useToast();
  
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

  const handleCreateWallet = () => {
    setShowCreateWallet(true);
    setShowImportWallet(false);
  };
  
  const handleImportWallet = () => {
    setShowImportWallet(true);
    setShowCreateWallet(false);
  };
  
  const handleWalletCreated = () => {
    localStorage.setItem('assetglide_wallet', JSON.stringify({
      created: new Date().toISOString(),
      lastAccess: new Date().toISOString()
    }));
    
    localStorage.setItem('assetglide_onboarding_complete', 'true');
    
    setHasWallet(true);
    setShowCreateWallet(false);
    setShowImportWallet(false);
    
    toast({
      title: "Wallet Ready!",
      description: "Your wallet has been set up and is ready to use.",
    });
  };
  
  const handleOnboardingComplete = () => {
    localStorage.setItem('assetglide_onboarding_complete', 'true');
    setOnboardingComplete(true);
  };

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
    if (isFirstLaunch && !onboardingComplete) {
      return (
        <div className="min-h-screen wallet-gradient text-white">
          <OnboardingFlow 
            onComplete={handleOnboardingComplete} 
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
            <CreateWalletForm onComplete={handleWalletCreated} />
          ) : showImportWallet ? (
            <ImportWalletForm 
              onComplete={handleWalletCreated} 
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

  return (
    <div className="min-h-screen pb-20">
      <header className="wallet-gradient text-white p-4 rounded-b-2xl shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">AssetGlide</h1>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white ml-1 p-1 h-auto rounded-full"
            >
              <ChevronDown size={18} />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white rounded-full hover:bg-white/20"
            >
              <Bell size={20} />
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  className="bg-white/20 hover:bg-white/30 text-white rounded-xl"
                >
                  <Plus size={16} className="mr-1" />
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xs mx-auto rounded-2xl">
                <h3 className="text-lg font-medium mb-4">Add New</h3>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-xl"
                  >
                    Add Token
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-xl"
                  >
                    Connect dApp
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-xl"
                  >
                    Buy Crypto
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <motion.div 
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <WalletCard 
            chain="Ethereum"
            balance="1.25"
            symbol="ETH"
            address="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
            logo="https://cryptologos.cc/logos/ethereum-eth-logo.png"
          />
        </motion.div>
      </header>
      
      <main className="p-4">
        <Tabs defaultValue="tokens" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="tokens" className="flex-1">Tokens</TabsTrigger>
            <TabsTrigger value="nfts" className="flex-1">NFTs</TabsTrigger>
            <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tokens">
            <TokenList tokens={mockTokens} />
          </TabsContent>
          
          <TabsContent value="nfts">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
              <p className="text-muted-foreground">No NFTs found</p>
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <TransactionHistory transactions={mockTransactions} />
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Index;
