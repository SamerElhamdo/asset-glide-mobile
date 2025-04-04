
import { BottomNav } from "@/components/wallet/BottomNav";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  WalletCards, 
  Languages, 
  Bell, 
  ArrowRightLeft, 
  HelpCircle,
  DoorOpen,
  ChevronRight
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <div className="min-h-screen pb-20">
      <header className="wallet-gradient text-white p-4">
        <h1 className="text-xl font-bold">Settings</h1>
        <p className="text-white/70 text-sm">Configure your wallet</p>
      </header>
      
      <main className="p-4">
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-medium mb-2">Security</h2>
            <div className="space-y-2 rounded-lg border bg-card overflow-hidden">
              <SettingsItem
                icon={<Shield size={20} />}
                title="Security Center"
                subtitle="Protect your assets"
                action={<ChevronRight size={18} className="text-muted-foreground" />}
              />
              <Separator />
              <SettingsItem
                icon={<WalletCards size={20} />}
                title="Wallet Connect"
                subtitle="Manage connected DApps"
                action={<ChevronRight size={18} className="text-muted-foreground" />}
              />
            </div>
          </section>
          
          <section>
            <h2 className="text-lg font-medium mb-2">Preferences</h2>
            <div className="space-y-2 rounded-lg border bg-card overflow-hidden">
              <SettingsItem
                icon={<Bell size={20} />}
                title="Notifications"
                subtitle="Transaction and price alerts"
                action={<Switch />}
              />
              <Separator />
              <SettingsItem
                icon={<Languages size={20} />}
                title="Language"
                subtitle="English"
                action={<ChevronRight size={18} className="text-muted-foreground" />}
              />
              <Separator />
              <SettingsItem
                icon={<ArrowRightLeft size={20} />}
                title="Default Network"
                subtitle="Ethereum"
                action={<ChevronRight size={18} className="text-muted-foreground" />}
              />
            </div>
          </section>
          
          <section>
            <h2 className="text-lg font-medium mb-2">Support</h2>
            <div className="space-y-2 rounded-lg border bg-card overflow-hidden">
              <SettingsItem
                icon={<HelpCircle size={20} />}
                title="Help Center"
                subtitle="FAQs and tutorials"
                action={<ChevronRight size={18} className="text-muted-foreground" />}
              />
              <Separator />
              <SettingsItem
                icon={<DoorOpen size={20} className="text-destructive" />}
                title="Log Out"
                subtitle="Secure your wallet"
                titleClass="text-destructive"
              />
            </div>
          </section>
          
          <div className="text-center text-xs text-muted-foreground mt-8">
            <p>AssetGlide Wallet v1.0.0</p>
            <p className="mt-1">© 2025 AssetGlide. All rights reserved.</p>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  titleClass?: string;
}

const SettingsItem = ({ icon, title, subtitle, action, titleClass }: SettingsItemProps) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
          {icon}
        </div>
        <div>
          <h3 className={`font-medium ${titleClass || ''}`}>{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {action}
    </div>
  );
};

export default Settings;
