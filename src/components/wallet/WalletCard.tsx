
import { ArrowUpDown, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface WalletCardProps {
  chain: string;
  balance: string;
  symbol: string;
  address: string;
  logo: string;
}

export function WalletCard({ chain, balance, symbol, address, logo }: WalletCardProps) {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied!",
      description: "Wallet address copied to clipboard",
    });
  };

  return (
    <motion.div 
      className="wallet-card wallet-gradient text-white relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="absolute top-0 right-0 p-3">
        <img src={logo} alt={chain} className="w-8 h-8 rounded-full" />
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-white/70">{chain}</h3>
        <div className="flex items-baseline">
          <h2 className="text-2xl font-bold">{balance}</h2>
          <span className="ml-1 text-sm text-white/70">{symbol}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-xs">
        <span className="bg-white/20 px-2 py-1 rounded-md">{shortAddress}</span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            copyToClipboard();
          }}
          className="p-1 rounded-full bg-white/10 hover:bg-white/20"
        >
          <Copy size={12} />
        </button>
      </div>
      
      <motion.div 
        className="mt-4 flex justify-between gap-2"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
      >
        <Button 
          size="sm" 
          variant="secondary"
          className="flex-1 text-xs py-1 h-8"
          onClick={(e) => {
            e.stopPropagation();
            // Handle Send
          }}
        >
          Send
        </Button>
        <Button 
          size="sm" 
          variant="secondary"
          className="flex-1 text-xs py-1 h-8"
          onClick={(e) => {
            e.stopPropagation();
            // Handle Receive
          }}
        >
          Receive
        </Button>
        <Button 
          size="sm" 
          variant="secondary"
          className="flex-1 text-xs py-1 h-8"
          onClick={(e) => {
            e.stopPropagation();
            // Handle Swap
          }}
        >
          <ArrowUpDown size={12} className="mr-1" />
          Swap
        </Button>
      </motion.div>
    </motion.div>
  );
}
