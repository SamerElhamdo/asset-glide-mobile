
import { BottomNav } from "@/components/wallet/BottomNav";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Shield, Fingerprint, Lock, Eye, KeyRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const SecurityCenter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Security settings states
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [autoLock, setAutoLock] = useState(true);
  const [transactionSigning, setTransactionSigning] = useState(true);
  const [hideBalances, setHideBalances] = useState(false);
  
  const handleBiometricToggle = (checked: boolean) => {
    setBiometricAuth(checked);
    toast({
      title: `Biometric Authentication ${checked ? 'Enabled' : 'Disabled'}`,
      description: `You can ${checked ? 'now' : 'no longer'} use biometrics to unlock your wallet.`,
    });
  };
  
  const handleBackupWallet = () => {
    toast({
      title: "Backup Wallet",
      description: "This feature will be available in the next update.",
    });
  };
  
  return (
    <div className="min-h-screen pb-20">
      <header className="wallet-gradient text-white p-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2 text-white" 
            onClick={() => navigate('/settings')}
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Security Center</h1>
            <p className="text-white/70 text-sm">Protect your wallet and assets</p>
          </div>
        </div>
      </header>
      
      <main className="p-4">
        <div className="space-y-6">
          <SecurityScore score={75} />
          
          <section>
            <h2 className="text-lg font-medium mb-2">Security Settings</h2>
            <div className="space-y-2 rounded-lg border bg-card overflow-hidden">
              <SecurityItem
                icon={<Fingerprint size={20} />}
                title="Biometric Authentication"
                subtitle="Unlock wallet using fingerprint or face ID"
                action={
                  <Switch 
                    checked={biometricAuth} 
                    onCheckedChange={handleBiometricToggle} 
                  />
                }
              />
              <Separator />
              <SecurityItem
                icon={<Lock size={20} />}
                title="Auto-Lock"
                subtitle="Lock wallet after 5 minutes of inactivity"
                action={
                  <Switch 
                    checked={autoLock} 
                    onCheckedChange={setAutoLock} 
                  />
                }
              />
              <Separator />
              <SecurityItem
                icon={<Eye size={20} />}
                title="Hide Balances"
                subtitle="Hide wallet balances from main screen"
                action={
                  <Switch 
                    checked={hideBalances} 
                    onCheckedChange={setHideBalances} 
                  />
                }
              />
              <Separator />
              <SecurityItem
                icon={<KeyRound size={20} />}
                title="Transaction Signing"
                subtitle="Require authentication for all transactions"
                action={
                  <Switch 
                    checked={transactionSigning} 
                    onCheckedChange={setTransactionSigning} 
                  />
                }
              />
            </div>
          </section>
          
          <section>
            <h2 className="text-lg font-medium mb-2">Backup & Recovery</h2>
            <div className="rounded-lg border bg-card overflow-hidden">
              <div className="p-4">
                <Button 
                  className="w-full"
                  onClick={handleBackupWallet}
                >
                  Backup Wallet Now
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Last backup: Never
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

interface SecurityItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

const SecurityItem = ({ icon, title, subtitle, action }: SecurityItemProps) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {action}
    </div>
  );
};

const SecurityScore = ({ score }: { score: number }) => {
  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  return (
    <div className="p-4 rounded-lg border bg-card">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Security Score</h3>
        <span className="font-bold">{score}/100</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${getScoreColor()}`} 
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="mt-3 text-sm">
        <div className="flex items-center">
          <Checkbox id="recovery" className="mr-2" checked disabled />
          <label htmlFor="recovery" className="text-muted-foreground">Recovery phrase backed up</label>
        </div>
        <div className="flex items-center mt-1">
          <Checkbox id="auth" className="mr-2" checked={false} disabled />
          <label htmlFor="auth" className="text-muted-foreground">2FA enabled</label>
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;
