
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  balance: string;
  value: string;
  priceChange: number;
}

interface TokenListProps {
  tokens: Token[];
}

export function TokenList({ tokens }: TokenListProps) {
  const { toast } = useToast();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Tokens</h2>
      
      {tokens.length === 0 ? (
        <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
          <p className="text-muted-foreground">No tokens found</p>
          <button 
            className="mt-2 text-primary text-sm font-medium"
            onClick={() => {
              toast({
                title: "Coming soon",
                description: "Token import will be available in the next update!",
              });
            }}
          >
            Import tokens
          </button>
        </div>
      ) : (
        <motion.div
          className="space-y-1 rounded-xl overflow-hidden bg-background"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {tokens.map((token) => (
            <motion.div 
              key={token.id}
              className="token-row"
              variants={item}
            >
              <div className="w-10 h-10 rounded-full mr-3 flex-shrink-0 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <img 
                  src={token.logo} 
                  alt={token.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium">{token.name}</h3>
                <p className="text-xs text-muted-foreground">{token.balance} {token.symbol}</p>
              </div>
              
              <div className="text-right">
                <p className="font-medium">${token.value}</p>
                <p className={`text-xs ${token.priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {token.priceChange >= 0 ? '+' : ''}{token.priceChange}%
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
