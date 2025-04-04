
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/wallet/BackButton";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-wallet-dark to-wallet-blue p-6">
      <div className="text-center text-white">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
            <AlertTriangle size={32} className="text-wallet-teal" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-white/70 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center space-x-3">
          <BackButton />
          <Button 
            onClick={() => navigate("/")}
            className="bg-white/20 hover:bg-white/30 text-white"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
