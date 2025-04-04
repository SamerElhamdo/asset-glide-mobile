
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  label?: string;
}

export function BackButton({ to, label }: BackButtonProps) {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="mr-2 text-inherit" 
      onClick={handleBack}
      aria-label="Go back"
    >
      <ArrowLeft size={20} />
      {label && <span className="ml-1">{label}</span>}
    </Button>
  );
}
