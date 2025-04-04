import { Fingerprint, Lock, Eye, KeyRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { SecurityItem } from "./SecurityItem";
interface SecuritySettingsProps {
  biometricAuth: boolean;
  autoLock: boolean;
  hideBalances: boolean;
  transactionSigning: boolean;
  onBiometricChange: (checked: boolean) => void;
  onAutoLockChange: (checked: boolean) => void;
  onHideBalancesChange: (checked: boolean) => void;
  onTransactionSigningChange: (checked: boolean) => void;
}
export function SecuritySettings({
  biometricAuth,
  autoLock,
  hideBalances,
  transactionSigning,
  onBiometricChange,
  onAutoLockChange,
  onHideBalancesChange,
  onTransactionSigningChange
}: SecuritySettingsProps) {
  return <section>
      <h2 className="text-lg font-medium mb-2">Security Settings</h2>
      <div className="space-y-2 overflow-hidden rounded-xl bg-slate-900">
        <SecurityItem icon={<Fingerprint size={20} />} title="Biometric Authentication" subtitle="Unlock wallet using fingerprint or face ID" action={<Switch checked={biometricAuth} onCheckedChange={onBiometricChange} />} />
        <Separator />
        <SecurityItem icon={<Lock size={20} />} title="Auto-Lock" subtitle="Lock wallet after 5 minutes of inactivity" action={<Switch checked={autoLock} onCheckedChange={onAutoLockChange} />} />
        <Separator />
        <SecurityItem icon={<Eye size={20} />} title="Hide Balances" subtitle="Hide wallet balances from main screen" action={<Switch checked={hideBalances} onCheckedChange={onHideBalancesChange} />} />
        <Separator />
        <SecurityItem icon={<KeyRound size={20} />} title="Transaction Signing" subtitle="Require authentication for all transactions" action={<Switch checked={transactionSigning} onCheckedChange={onTransactionSigningChange} />} />
      </div>
    </section>;
}