
import { useState } from "react";
import { Check, Copy, Eye, EyeOff, RefreshCw, Shield, AlertCircle, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface CreateWalletFormProps {
  onComplete: () => void;
}

// Helper function to generate a mock seed phrase
// In a real app, this would use a cryptographic library
const generateSeedPhrase = () => {
  const wordList = [
    "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract", "absurd", "abuse",
    "access", "accident", "account", "accuse", "achieve", "acid", "acoustic", "acquire", "across", "act",
    "action", "actor", "actress", "actual", "adapt", "add", "addict", "address", "adjust", "admit",
    "adult", "advance", "advice", "aerobic", "affair", "afford", "afraid", "again", "age", "agent",
    "agree", "ahead", "aim", "air", "airport", "aisle", "alarm", "album", "alcohol", "alert"
  ];
  
  const result = [];
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    result.push(wordList[randomIndex]);
  }
  
  return result.join(" ");
};

export function CreateWalletForm({ onComplete }: CreateWalletFormProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<'create' | 'backup' | 'verify'>('create');
  const [walletName, setWalletName] = useState('My Wallet');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // This would come from a crypto library in a real implementation
  const [mockSeedPhrase] = useState(generateSeedPhrase());
  const seedPhraseWords = mockSeedPhrase.split(" ");
  
  const [showSeed, setShowSeed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [verificationWords, setVerificationWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [backupAcknowledged, setBackupAcknowledged] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(mockSeedPhrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Seed phrase copied!",
      description: "Keep it in a safe place and never share it with anyone.",
    });
  };
  
  const handleNextStep = async () => {
    if (step === 'create') {
      if (!walletName) {
        toast({
          title: "Enter wallet name",
          description: "Please provide a name for your wallet.",
          variant: "destructive",
        });
        return;
      }
      
      if (password.length < 8) {
        toast({
          title: "Password too short",
          description: "Password must be at least 8 characters long.",
          variant: "destructive",
        });
        return;
      }
      
      if (password !== confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match.",
          variant: "destructive",
        });
        return;
      }
      
      if (!agreedToTerms) {
        toast({
          title: "Terms agreement required",
          description: "Please agree to the terms of service.",
          variant: "destructive",
        });
        return;
      }
      
      setStep('backup');
    } else if (step === 'backup') {
      // In a real app, we'd verify the user has backed up their seed phrase
      // For now, we'll just shuffle the words for verification
      const shuffledWords = [...seedPhraseWords].sort(() => Math.random() - 0.5);
      setVerificationWords(shuffledWords);
      setStep('verify');
    } else if (step === 'verify') {
      // Check if selected words match the original seed phrase
      const isCorrect = selectedWords.join(' ') === mockSeedPhrase;
      
      if (isCorrect) {
        setIsLoading(true);
        
        try {
          // Simulate wallet creation process
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // In a real app, this would initialize the wallet from the seed phrase
          // and store it encrypted with the password
          
          toast({
            title: "Wallet created!",
            description: "Your wallet has been successfully created.",
          });
          
          // Store wallet information (in a real app, this would be encrypted and secured)
          localStorage.setItem('assetglide_wallet_seed', JSON.stringify({
            seedPhrase: mockSeedPhrase, // In a real app, NEVER store the seed phrase unencrypted
            walletName: walletName,
            createdAt: new Date().toISOString()
          }));
          
          onComplete();
        } catch (error) {
          toast({
            title: "Wallet creation failed",
            description: "There was an error creating your wallet. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        toast({
          title: "Incorrect seed phrase",
          description: "Please verify your seed phrase again.",
          variant: "destructive",
        });
        setSelectedWords([]);
      }
    }
  };
  
  const handleWordSelect = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };
  
  const resetVerification = () => {
    setSelectedWords([]);
  };
  
  return (
    <motion.div 
      key={step}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {step === 'create' && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Create New Wallet</h1>
            <p className="text-muted-foreground">Set up your secure blockchain wallet</p>
          </div>
          
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
            <Label htmlFor="password">Password</Label>
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
          
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox 
              id="terms" 
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I understand that AssetGlide cannot recover this password
            </label>
          </div>
          
          <Button className="w-full mt-6" onClick={handleNextStep}>
            Continue
          </Button>
        </div>
      )}
      
      {step === 'backup' && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Backup Seed Phrase</h1>
            <p className="text-muted-foreground">
              Write down these 12 words in order and keep them safe
            </p>
          </div>
          
          <Alert variant="destructive" className="mb-4 border-red-400 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-red-800 dark:text-red-400 font-bold">Critical Security Alert</AlertTitle>
            <AlertDescription className="text-red-700 dark:text-red-300">
              Your seed phrase is the <strong>only way</strong> to recover your wallet. Never share it with anyone and store it offline in multiple secure locations.
            </AlertDescription>
          </Alert>
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center text-yellow-700 dark:text-yellow-500">
                <Shield size={16} className="mr-1" />
                <span className="text-sm font-medium">Secret Recovery Phrase</span>
              </div>
              <button
                className="text-xs flex items-center text-primary"
                onClick={copyToClipboard}
              >
                {copied ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            
            <div 
              className={`bg-gray-100 dark:bg-gray-800 p-3 rounded relative transition-all duration-200 ${showSeed ? '' : 'blur-sm'}`}
              onClick={() => setShowSeed(true)}
            >
              {!showSeed && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="sm" variant="outline">
                    <Eye size={14} className="mr-1" />
                    Tap to reveal
                  </Button>
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-2">
                {seedPhraseWords.map((word, index) => (
                  <div key={index} className="flex">
                    <span className="text-muted-foreground mr-1">{index + 1}.</span>
                    <span className="font-medium">{word}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 p-4 rounded-lg text-sm mt-4">
            <p className="font-medium">Never share your seed phrase!</p>
            <p className="mt-1">
              Anyone with this phrase can steal your assets. Never share it with anyone or store it digitally.
            </p>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="backup-confirm" 
                checked={backupAcknowledged}
                onCheckedChange={(checked) => setBackupAcknowledged(!!checked)}
              />
              <label
                htmlFor="backup-confirm"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have written down my seed phrase and stored it securely
              </label>
            </div>
          </div>
          
          <Button 
            className="w-full mt-4" 
            onClick={handleNextStep}
            disabled={!showSeed || !backupAcknowledged}
          >
            I've written it down
          </Button>
        </div>
      )}
      
      {step === 'verify' && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Verify Seed Phrase</h1>
            <p className="text-muted-foreground">
              Select the words in the correct order
            </p>
          </div>
          
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg min-h-[100px] flex flex-wrap gap-2 mb-4">
            {selectedWords.length === 0 ? (
              <div className="w-full text-center text-muted-foreground py-6">
                Select your seed phrase in order
              </div>
            ) : (
              <>
                {selectedWords.map((word, i) => (
                  <div 
                    key={`selected-${i}`}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center"
                    onClick={() => handleWordSelect(word)}
                  >
                    <span className="text-xs text-primary/70 mr-1">{i+1}.</span>
                    {word}
                  </div>
                ))}
              </>
            )}
          </div>
          
          <div className="flex justify-end mb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs flex items-center h-7"
              onClick={resetVerification}
            >
              <RefreshCw size={12} className="mr-1" />
              Reset
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {verificationWords.map((word, i) => (
              <button
                key={`word-${i}`}
                className={`px-3 py-1 rounded-full text-sm
                  ${selectedWords.includes(word)
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                onClick={() => handleWordSelect(word)}
                disabled={selectedWords.includes(word) || isLoading}
              >
                {word}
              </button>
            ))}
          </div>
          
          {selectedWords.length === seedPhraseWords.length && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
              <div className="flex items-start">
                <CheckCircle className="text-green-600 dark:text-green-400 mr-3 mt-0.5" size={18} />
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">
                    All words selected
                  </p>
                  <p className="text-xs mt-1 text-green-700 dark:text-green-400">
                    Verify that your words are in the correct order before proceeding.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <Button 
            className="w-full mt-6" 
            onClick={handleNextStep}
            disabled={selectedWords.length !== seedPhraseWords.length || isLoading}
          >
            {isLoading ? 'Creating Wallet...' : 'Verify & Create Wallet'}
            {!isLoading && <ArrowRight size={16} className="ml-2" />}
          </Button>
        </div>
      )}
    </motion.div>
  );
}
