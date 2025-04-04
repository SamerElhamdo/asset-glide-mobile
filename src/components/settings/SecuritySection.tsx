
import { Shield, WalletCards, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SettingsItem } from "./SettingsItem";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export function SecuritySection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSecurityCenter = () => {
    navigate("/security-center");
  };
  
  const handleWalletConnect = () => {
    toast({
      title: "Wallet Connect",
      description: "Connect to DApps using WalletConnect protocol.",
    });
  };

  return (
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
  );
}
