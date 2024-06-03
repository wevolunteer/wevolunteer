import { Session, useStorageState } from "@/hooks/useStorageState";
import { RequestCodeData, VerifyCodeData } from "@/types/data";
import { Middleware } from "openapi-fetch";
import React from "react";
import { useNetwork } from "./network";

const AuthContext = React.createContext<{
  requestAuthCode: (data: RequestCodeData) => Promise<boolean>;
  verifyAuthCode: (data: VerifyCodeData) => Promise<boolean>;
  signOut: () => void;
  session?: Session | null;
  isLoading: boolean;
}>({
  requestAuthCode: () => Promise.resolve(false),
  verifyAuthCode: () => Promise.resolve(false),
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const { client } = useNetwork();

  const tokenMiddleware: Middleware = {
    async onRequest(req, options) {
      if (session?.token?.accessToken) {
        req.headers.set("Authorization", `Bearer ${session.token.accessToken}`);
      }
      return req;
    },
  };

  client.use(tokenMiddleware);

  return (
    <AuthContext.Provider
      value={{
        requestAuthCode: async (data) => {
          const response = await client.POST("/auth/request-code", {
            body: data,
          });

          if (response.error) {
            console.error("request code error:", response.error);
            return false;
          }

          return true;
        },
        verifyAuthCode: async (data) => {
          const response = await client.POST("/auth/verify-code", {
            body: data,
          });

          if (response.data?.access_token) {
            const data = await client.GET("/auth/user", {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`,
              },
            });

            if (data?.data) {
              setSession({
                user: data.data,
                token: {
                  accessToken: response.data.access_token,
                  refreshToken: response.data.refresh_token,
                },
              });

              return true;
            }
          }

          return false;
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
