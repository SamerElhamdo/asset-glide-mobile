
import { Home, Layers, Globe, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function BottomNav() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const tabs = [
    {
      name: "Wallet",
      path: "/",
      icon: Home
    },
    {
      name: "Assets",
      path: "/assets",
      icon: Layers
    },
    {
      name: "Browser",
      path: "/browser",
      icon: Globe
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings
    }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-200 dark:border-gray-800 px-2 flex justify-around">
      {tabs.map((tab) => (
        <Link 
          to={tab.path} 
          key={tab.name}
          className={`bottom-tab ${isActive(tab.path) ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <tab.icon size={20} />
          <span className="text-xs mt-1">{tab.name}</span>
        </Link>
      ))}
    </div>
  );
}
