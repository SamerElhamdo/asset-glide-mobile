
import { useState } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface ImportWalletFormProps {
  onComplete: () => void;
  onBack: () => void;
}

export function ImportWalletForm({ onComplete, onBack }: ImportWalletFormProps) {
  const { toast } = useToast();
  const [walletName, setWalletName] = useState('My Wallet');
  const [seedPhrase, setSeedPhrase] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [importMethod, setImportMethod] = useState<'seed' | 'private'>('seed');
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, this would validate BIP39 phrases or hex private keys
  const validateInput = () => {
    if (importMethod === 'seed') {
      const words = seedPhrase.trim().split(/\s+/);
      if (words.length !== 12 && words.length !== 24) {
        toast({
          title: "Invalid seed phrase",
          description: "Seed phrase must be 12 or 24 words long.",
          variant: "destructive",
        });
        return false;
      }
    } else {
      // Simple validation for private key (hex string)
      if (!/^(0x)?[0-9a-fA-F]{64}$/.test(privateKey)) {
        toast({
          title: "Invalid private key",
          description: "Private key must be a valid hex string.",
          variant: "destructive",
        });
        return false;
      }
    }
    
    if (!walletName) {
      toast({
        title: "Enter wallet name",
        description: "Please provide a name for your wallet.",
        variant: "destructive",
      });
      return false;
    }
    
    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return false;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const handleImport = async () => {
    if (!validateInput()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate wallet import process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would initialize the wallet from the seed/key
      // and store it encrypted with the password
      
      toast({
        title: "Wallet imported!",
        description: "Your wallet has been successfully imported.",
      });
      
      onComplete();
    } catch (error) {
      toast({
        title: "Import failed",
        description: "There was an error importing your wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 p-4"
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Import Wallet</h1>
        <p className="text-muted-foreground">Securely restore your existing wallet</p>
      </div>
      
      <Tabs defaultValue="seed" className="w-full" onValueChange={(v) => setImportMethod(v as 'seed' | 'private')}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="seed">Seed Phrase</TabsTrigger>
          <TabsTrigger value="private">Private Key</TabsTrigger>
        </TabsList>
        
        <TabsContent value="seed" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seed-phrase">Recovery Seed Phrase</Label>
            <Textarea
              id="seed-phrase"
              placeholder="Enter your 12 or 24 word recovery phrase"
              value={seedPhrase}
              onChange={(e) => setSeedPhrase(e.target.value)}
              rows={4}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Typically 12 or 24 words separated by spaces
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="private" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="private-key">Private Key</Label>
            <Textarea
              id="private-key"
              placeholder="Enter your private key"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              A 64 character hex string, with or without 0x prefix
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="space-y-2">
        <Label htmlFor="wallet-name">Wallet Name</Label>
        <Input 
          id="wallet-name"
          placeholder="My Wallet"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Wallet Password</Label>
        <div className="relative">
          <Input 
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          This password encrypts your wallet on this device only
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input 
          id="confirm-password"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-6">
        <div className="flex items-start">
          <AlertCircle className="text-amber-600 dark:text-amber-400 mr-3 mt-0.5" size={18} />
          <div>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              Security Notice
            </p>
            <p className="text-xs mt-1 text-amber-700 dark:text-amber-400">
              Make sure you're in a private location and no one is watching your screen when entering sensitive information.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4 pt-4">
        <Button variant="outline" className="flex-1" onClick={onBack} disabled={isLoading}>
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        <Button 
          className="flex-1" 
          onClick={handleImport} 
          disabled={isLoading}
        >
          {isLoading ? 'Importing...' : 'Import Wallet'}
          {!isLoading && <ArrowRight size={16} className="ml-2" />}
        </Button>
      </div>
    </motion.div>
  );
}
