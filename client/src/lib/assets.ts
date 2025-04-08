// Import all assets centrally
// For Vite, we need to use relative paths or an alias for assets
import profilePic from "../assets/admin-profile.jpg";
import { APP_INFO } from "./constants";

// Export assets with descriptive names for consistent usage across components
export const assets = {
  // Profile pictures
  profile: {
    admin: profilePic,
  },
  
  // App branding
  branding: {
    logo: null, // Replace with actual logo when available
    appName: APP_INFO.name,
  }
};