
import { Bell, Languages, ArrowRightLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { SettingsItem } from "./SettingsItem";
import { useToast } from "@/components/ui/use-toast";

interface PreferencesSectionProps {
  notifications: boolean;
  setNotifications: (checked: boolean) => void;
}

export function PreferencesSection({ 
  notifications, 
  setNotifications 
}: PreferencesSectionProps) {
  const { toast } = useToast();
  
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

  return (
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
  );
}
