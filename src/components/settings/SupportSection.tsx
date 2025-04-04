
import { HelpCircle, DoorOpen, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SettingsItem } from "./SettingsItem";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export function SupportSection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleHelpCenter = () => {
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
    <section>
      <h2 className="text-lg font-medium mb-2">Support</h2>
      <div className="space-y-2 rounded-2xl bg-card overflow-hidden">
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
  );
}
