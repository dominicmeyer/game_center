import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'game_center',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
};

export default config;
