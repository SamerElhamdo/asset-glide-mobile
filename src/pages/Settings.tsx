
import { useState } from "react";
import { BottomNav } from "@/components/wallet/BottomNav";
import { BackButton } from "@/components/wallet/BackButton";
import { SecuritySection } from "@/components/settings/SecuritySection";
import { PreferencesSection } from "@/components/settings/PreferencesSection";
import { SupportSection } from "@/components/settings/SupportSection";

const Settings = () => {
  // State for toggleable settings
  const [notifications, setNotifications] = useState(true);
  
  return (
    <div className="min-h-screen pb-20">
      <header className="wallet-gradient text-white rounded-b-2xl p-4">
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
          <SecuritySection />
          
          <PreferencesSection 
            notifications={notifications}
            setNotifications={setNotifications}
          />
          
          <SupportSection />
          
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

export default Settings;
