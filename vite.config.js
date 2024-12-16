import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configure the Server to Open The Browser Automatically 
  // and Run From Port 5173
  server: {
    open: true,
    port: 5173,
  },
});
