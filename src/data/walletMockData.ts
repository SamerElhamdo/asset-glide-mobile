
import { Token } from "@/components/wallet/TokenList";
import { Transaction } from "@/components/wallet/TransactionHistory";

export const mockTokens: Token[] = [
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

export const mockTransactions: Transaction[] = [
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

export const mockWalletData = {
  chain: "Ethereum",
  balance: "1.25",
  symbol: "ETH",
  address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
};
