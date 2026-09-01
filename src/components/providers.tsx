"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; import { createContext, useCallback, useContext, useEffect, useState } from "react"; import { authService } from "@/services/auth.service"; import type { User } from "@/types";
type AuthValue = { user: User | null; token: string | null; ready: boolean; signIn: (token: string) => Promise<void>; signOut: () => void };
const AuthContext = createContext<AuthValue | null>(null);
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error("useAuth must be used inside Providers"); return value; }
export default function Providers({ children }: { children: React.ReactNode }) { const [client] = useState(() => new QueryClient()); const [user, setUser] = useState<User | null>(null); const [token, setToken] = useState<string | null>(null); const [ready, setReady] = useState(false);
 const signOut = useCallback(() => { localStorage.removeItem("ijms_token"); setToken(null); setUser(null); }, []);
 const signIn = useCallback(async (value: string) => { localStorage.setItem("ijms_token", value); setToken(value); const profile = await authService.me(value); setUser(profile); }, []);
 useEffect(() => { const saved = localStorage.getItem("ijms_token"); if (!saved) { setReady(true); return; } authService.me(saved).then(profile => { setToken(saved); setUser(profile); }).catch(signOut).finally(() => setReady(true)); }, [signOut]);
 return <QueryClientProvider client={client}><AuthContext.Provider value={{ user, token, ready, signIn, signOut }}>{children}</AuthContext.Provider></QueryClientProvider>; }
