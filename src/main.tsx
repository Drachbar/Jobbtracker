import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import App from "./App.tsx";
import { Toaster } from "./components/ui/toaster";
import "./index.css";
import { ColorModeProvider } from "./components/ui/color-mode";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
        <App />
        <Toaster />
      </ColorModeProvider>
    </ChakraProvider>
  </StrictMode>
);
