
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8f03f097c1e443d0b559f36a04a905dd',
  appName: 'asset-glide-mobile',
  webDir: 'dist',
  server: {
    url: 'https://8f03f097-c1e4-43d0-b559-f36a04a905dd.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: "#0A2540",
      showSpinner: true,
      spinnerColor: "#00BFFF"
    }
  }
};

export default config;
