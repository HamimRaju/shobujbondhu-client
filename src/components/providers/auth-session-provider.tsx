"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { authClient, authServerConfigured } from "@/lib/auth-client";

type AuthClientSession = ReturnType<typeof authClient.useSession>;

export type AuthSession = AuthClientSession["data"];
export type AuthenticatedUser = NonNullable<AuthSession>["user"];

type AuthSessionState = {
  session: AuthSession;
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isPending: boolean;
  isRefetching: boolean;
  isConfigured: boolean;
  error: AuthClientSession["error"];
  refetch: AuthClientSession["refetch"];
};

const AuthSessionContext = createContext<AuthSessionState | null>(null);

const noAuthConfiguration: AuthSessionState = {
  session: null,
  user: null,
  isAuthenticated: false,
  isPending: false,
  isRefetching: false,
  isConfigured: false,
  error: null,
  refetch: async () => {},
};

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  if (!authServerConfigured) {
    return (
      <AuthSessionContext.Provider value={noAuthConfiguration}>
        {children}
      </AuthSessionContext.Provider>
    );
  }

  return (
    <ConfiguredAuthSessionProvider>
      {children}
    </ConfiguredAuthSessionProvider>
  );
}

function ConfiguredAuthSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session, isPending, isRefetching, error, refetch } =
    authClient.useSession();
  const user = session?.user ?? null;

  return (
    <AuthSessionContext.Provider
      value={{
        session,
        user,
        isAuthenticated: Boolean(session),
        isPending,
        isRefetching,
        isConfigured: true,
        error,
        refetch,
      }}
    >
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession() {
  const state = useContext(AuthSessionContext);
  if (!state) {
    throw new Error(
      "useAuthSession must be used inside an AuthSessionProvider.",
    );
  }
  return state;
}
