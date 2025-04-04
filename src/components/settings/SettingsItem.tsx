
import { ReactNode } from "react";

interface SettingsItemProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  action?: ReactNode;
  titleClass?: string;
  onClick?: () => void;
}

export function SettingsItem({ 
  icon, 
  title, 
  subtitle, 
  action, 
  titleClass, 
  onClick 
}: SettingsItemProps) {
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
}
