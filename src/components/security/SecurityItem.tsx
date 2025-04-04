import { ReactNode } from "react";
interface SecurityItemProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  action?: ReactNode;
}
export function SecurityItem({
  icon,
  title,
  subtitle,
  action
}: SecurityItemProps) {
  return <div className="flex items-center justify-between p-4 rounded-xl">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {action}
    </div>;
}