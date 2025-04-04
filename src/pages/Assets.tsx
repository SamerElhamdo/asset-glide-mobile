
import { BottomNav } from "@/components/wallet/BottomNav";
import { BackButton } from "@/components/wallet/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Coins, Tag } from "lucide-react";

interface AssetItem {
  id: string;
  name: string;
  symbol: string;
  type: 'token' | 'nft';
  logo: string;
  balance: string;
  value: string;
}

const mockAssets: AssetItem[] = [
  {
    id: "1",
    name: "Ethereum",
    symbol: "ETH",
    type: "token",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    balance: "1.25",
    value: "3,125.78"
  },
  {
    id: "2",
    name: "USD Coin",
    symbol: "USDC",
    type: "token",
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    balance: "520.50",
    value: "520.50"
  },
  {
    id: "3",
    name: "CryptoPunk #7804",
    symbol: "PUNK",
    type: "nft",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    balance: "1",
    value: "85,207.00"
  }
];

const Assets = () => {
  return (
    <div className="min-h-screen pb-20">
      <header className="wallet-gradient text-white rounded-b-2xl p-4">
        <div className="flex items-center">
          <BackButton to="/" />
          <div>
            <h1 className="text-xl font-bold">Assets</h1>
            <p className="text-white/70 text-sm">Manage your tokens and NFTs</p>
          </div>
        </div>
      </header>
      
      <main className="p-4">
        <div className="space-y-4">
          {mockAssets.map((asset) => (
            <Card key={asset.id} className="overflow-hidden rounded-2xl">
              <CardContent className="p-0">
                <div className="flex items-center p-4">
                  <div className="flex-shrink-0 w-10 h-10 mr-3 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {asset.type === 'token' ? (
                      <img src={asset.logo} alt={asset.name} className="w-6 h-6" />
                    ) : (
                      <Tag className="text-gray-400" size={20} />
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{asset.name}</h3>
                      <span className="font-medium">${asset.value}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground text-sm">
                      <div className="flex items-center">
                        <span>{asset.symbol}</span>
                        {asset.type === 'nft' && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded-full">
                            NFT
                          </span>
                        )}
                      </div>
                      <span>{asset.balance} {asset.type === 'token' && asset.symbol}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Assets;
