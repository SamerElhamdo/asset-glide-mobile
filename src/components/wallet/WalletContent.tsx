
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenList, Token } from "@/components/wallet/TokenList";
import { TransactionHistory, Transaction } from "@/components/wallet/TransactionHistory";

interface WalletContentProps {
  tokens: Token[];
  transactions: Transaction[];
}

export function WalletContent({ tokens, transactions }: WalletContentProps) {
  return (
    <main className="p-4">
      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="w-full mb-4 rounded-xl">
          <TabsTrigger value="tokens" className="flex-1 rounded-xl">Tokens</TabsTrigger>
          <TabsTrigger value="nfts" className="flex-1 rounded-xl">NFTs</TabsTrigger>
          <TabsTrigger value="activity" className="flex-1 rounded-xl">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tokens">
          <TokenList tokens={tokens} />
        </TabsContent>
        
        <TabsContent value="nfts">
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
            <p className="text-muted-foreground">No NFTs found</p>
          </div>
        </TabsContent>
        
        <TabsContent value="activity">
          <TransactionHistory transactions={transactions} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
