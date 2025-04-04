
import { useState } from "react";
import { BottomNav } from "@/components/wallet/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Search, Star, Plus } from "lucide-react";

interface DApp {
  id: string;
  name: string;
  icon: string;
  url: string;
  category: string;
}

const popularDApps: DApp[] = [
  {
    id: "1",
    name: "Uniswap",
    icon: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
    url: "https://app.uniswap.org",
    category: "DEX"
  },
  {
    id: "2",
    name: "OpenSea",
    icon: "https://cryptologos.cc/logos/opensea-logo.png",
    url: "https://opensea.io",
    category: "NFT"
  },
  {
    id: "3",
    name: "Aave",
    icon: "https://cryptologos.cc/logos/aave-aave-logo.png",
    url: "https://app.aave.com",
    category: "Lending"
  },
  {
    id: "4",
    name: "Lido",
    icon: "https://cryptologos.cc/logos/lido-dao-ldo-logo.png",
    url: "https://stake.lido.fi",
    category: "Staking"
  }
];

const Browser = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      setIsLoading(true);
      // Simulate loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  
  return (
    <div className="min-h-screen pb-20">
      <header className="bg-background border-b p-4">
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <Button type="button" size="icon" variant="ghost" className="h-9 w-9 shrink-0">
            <ArrowLeft size={20} />
          </Button>
          <Button type="button" size="icon" variant="ghost" className="h-9 w-9 shrink-0">
            <ArrowRight size={20} />
          </Button>
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search or enter DApp URL"
              className="pl-8"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button type="button" size="icon" variant="ghost" className="h-9 w-9 shrink-0">
            <Star size={20} />
          </Button>
        </form>
      </header>
      
      <main className="p-4">
        {!url && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Popular DApps</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {popularDApps.map((dapp) => (
                <Card key={dapp.id} className="text-center">
                  <CardContent className="pt-4">
                    <div className="mb-2 mx-auto w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
                      <img src={dapp.icon} alt={dapp.name} className="w-8 h-8" />
                    </div>
                    <h3 className="font-medium truncate">{dapp.name}</h3>
                    <p className="text-xs text-muted-foreground">{dapp.category}</p>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="text-center border-dashed">
                <CardContent className="pt-4 flex flex-col items-center justify-center h-full">
                  <div className="mb-2 w-12 h-12 rounded-full flex items-center justify-center bg-gray-100">
                    <Plus size={20} className="text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">Add DApp</span>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg font-medium">Recent</h2>
              <p className="text-muted-foreground text-sm">No recent DApps</p>
            </div>
          </div>
        )}
        
        {url && isLoading && (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        )}
        
        {url && !isLoading && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-[60vh] flex items-center justify-center">
            <p className="text-muted-foreground">DApp browser content would appear here</p>
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Browser;
