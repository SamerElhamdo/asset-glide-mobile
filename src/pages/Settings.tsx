
import { useState } from "react";
import { BottomNav } from "@/components/wallet/BottomNav";
import { BackButton } from "@/components/wallet/BackButton";
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
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for toggleable settings
  const [notifications, setNotifications] = useState(true);
  
  // Handler functions for settings actions
  const handleSecurityCenter = () => {
    navigate("/security-center");
  };
  
  const handleWalletConnect = () => {
    toast({
      title: "Wallet Connect",
      description: "Connect to DApps using WalletConnect protocol.",
    });
  };
  
  const handleNotificationsToggle = (checked: boolean) => {
    setNotifications(checked);
    toast({
      title: `Notifications ${checked ? 'Enabled' : 'Disabled'}`,
      description: `You will ${checked ? 'now' : 'no longer'} receive transaction and price alerts.`,
    });
  };
  
  const handleLanguageChange = () => {
    toast({
      title: "Language Settings",
      description: "Language options will be available soon.",
    });
  };
  
  const handleNetworkChange = () => {
    toast({
      title: "Network Selection",
      description: "Network selection options will be available soon.",
    });
  };
  
  const handleHelpCenter = () => {
    // Navigate to help center or open external link
    toast({
      title: "Help Center",
      description: "Navigating to Help Center resources.",
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been securely logged out.",
      variant: "destructive",
    });
    
    // Simulate logout by navigating to home after a delay
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen pb-20">
      <header className="wallet-gradient text-white p-4">
        <div className="flex items-center">
          <BackButton to="/" />
          <div>
            <h1 className="text-xl font-bold">Settings</h1>
            <p className="text-white/70 text-sm">Configure your wallet</p>
          </div>
        </div>
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
                onClick={handleSecurityCenter}
                action={<ChevronRight size={18} className="text-muted-foreground" />}
              />
              <Separator />
              <SettingsItem
                icon={<WalletCards size={20} />}
                title="Wallet Connect"
                subtitle="Manage connected DApps"
                onClick={handleWalletConnect}
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
                action={
                  <Switch 
                    checked={notifications} 
                    onCheckedChange={handleNotificationsToggle} 
                  />
                }
              />
              <Separator />
              <SettingsItem
                icon={<Languages size={20} />}
                title="Language"
                subtitle="English"
                onClick={handleLanguageChange}
                action={<ChevronRight size={18} className="text-muted-foreground" />}
              />
              <Separator />
              <SettingsItem
                icon={<ArrowRightLeft size={20} />}
                title="Default Network"
                subtitle="Ethereum"
                onClick={handleNetworkChange}
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
                onClick={handleHelpCenter}
                action={<ChevronRight size={18} className="text-muted-foreground" />}
              />
              <Separator />
              <SettingsItem
                icon={<DoorOpen size={20} className="text-destructive" />}
                title="Log Out"
                subtitle="Secure your wallet"
                titleClass="text-destructive"
                onClick={handleLogout}
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
  onClick?: () => void;
}

const SettingsItem = ({ icon, title, subtitle, action, titleClass, onClick }: SettingsItemProps) => {
  return (
    <div 
      className={`flex items-center justify-between p-4 ${onClick ? 'cursor-pointer active:bg-muted/50' : ''}`}
      onClick={onClick}
    >
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
