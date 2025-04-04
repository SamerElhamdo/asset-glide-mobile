
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { BottomNav } from "@/components/wallet/BottomNav";
import { BackButton } from "@/components/wallet/BackButton";
import { SecurityScore } from "@/components/security/SecurityScore";
import { SecuritySettings } from "@/components/security/SecuritySettings";
import { BackupRecovery } from "@/components/security/BackupRecovery";

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
          <BackButton to="/settings" />
          <div>
            <h1 className="text-xl font-bold">Security Center</h1>
            <p className="text-white/70 text-sm">Protect your wallet and assets</p>
          </div>
        </div>
      </header>
      
      <main className="p-4">
        <div className="space-y-6">
          <SecurityScore score={75} />
          
          <SecuritySettings
            biometricAuth={biometricAuth}
            autoLock={autoLock}
            hideBalances={hideBalances}
            transactionSigning={transactionSigning}
            onBiometricChange={handleBiometricToggle}
            onAutoLockChange={setAutoLock}
            onHideBalancesChange={setHideBalances}
            onTransactionSigningChange={setTransactionSigning}
          />
          
          <BackupRecovery onBackupWallet={handleBackupWallet} />
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default SecurityCenter;
