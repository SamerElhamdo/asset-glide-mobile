
import { useState } from "react";
import { ChevronDown, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { WalletCard } from "@/components/wallet/WalletCard";

interface HeaderProps {
  walletData: {
    chain: string;
    balance: string;
    symbol: string;
    address: string;
    logo: string;
  };
}

export function WalletHeader({ walletData }: HeaderProps) {
  return (
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
          chain={walletData.chain}
          balance={walletData.balance}
          symbol={walletData.symbol}
          address={walletData.address}
          logo={walletData.logo}
        />
      </motion.div>
    </header>
  );
}
