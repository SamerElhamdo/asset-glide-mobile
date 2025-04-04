
import { ArrowDown, ArrowUp, Repeat } from "lucide-react";
import { motion } from "framer-motion";

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap';
  title: string;
  date: string;
  amount: string;
  symbol: string;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const renderIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'send':
        return (
          <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500">
            <ArrowUp size={16} />
          </div>
        );
      case 'receive':
        return (
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500">
            <ArrowDown size={16} />
          </div>
        );
      case 'swap':
        return (
          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-500">
            <Repeat size={16} />
          </div>
        );
    }
  };
  
  const getStatusStyles = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 animate-pulse-slow';
      case 'failed':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    }
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const item = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
      
      {transactions.length === 0 ? (
        <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
          <p className="text-muted-foreground">No transactions yet</p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-2"
        >
          {transactions.map((tx) => (
            <motion.div 
              key={tx.id}
              variants={item}
              className="flex items-center p-3 bg-background rounded-lg border border-gray-100 dark:border-gray-800"
            >
              {renderIcon(tx.type)}
              
              <div className="ml-3 flex-1">
                <h3 className="font-medium text-sm">{tx.title}</h3>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
              
              <div className="text-right">
                <p className="font-medium text-sm">
                  {tx.type === 'receive' ? '+' : tx.type === 'send' ? '-' : ''}
                  {tx.amount} {tx.symbol}
                </p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusStyles(tx.status)}`}>
                  {tx.status}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
