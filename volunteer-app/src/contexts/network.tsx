import { getApiUrl } from "@/config/network";
import type { paths } from "@/types/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import createClient, { Middleware } from "openapi-fetch";
import React, { ReactNode, createContext, useContext } from "react";

const queryClient = new QueryClient();

interface NetworkContextType {
  client: ReturnType<typeof createClient<paths>>;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

interface NetworkProviderProps {
  children: ReactNode;
}

const loggerMiddleware: Middleware = {
  async onRequest({ request }) {
    console.log("request", request, null, 2);
    return request;
  },
  async onResponse({ response }) {
    console.log("response", response, null, 2);
    return response;
  },
};

export const NetworkProvider: React.FC<NetworkProviderProps> = ({ children }) => {
  const client = createClient<paths>({ baseUrl: getApiUrl(), cache: "no-cache" });

  if (__DEV__) {
    client.use(loggerMiddleware);
  }

  return (
    <NetworkContext.Provider value={{ client }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NetworkContext.Provider>
  );
};

export const useNetwork = (): NetworkContextType => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }
  return context;
};
