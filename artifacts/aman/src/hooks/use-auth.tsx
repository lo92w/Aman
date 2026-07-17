import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useLogin, useGetMe, getGetMeQueryKey, type UserProfile, type LoginInput } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  login: (variables: { data: LoginInput }) => Promise<UserProfile>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem("aman_auth") === "true"
  );
  
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const { data: user, isLoading: isUserLoading, error } = useGetMe({
    query: {
      queryKey: getGetMeQueryKey(),
      enabled: isAuthenticated,
      retry: false,
    }
  });

  const loginMutation = useLogin();

  useEffect(() => {
    if (error) {
      setIsAuthenticated(false);
      localStorage.removeItem("aman_auth");
      setLocation("/login");
    }
  }, [error, setLocation]);

  const login = async (...args: Parameters<typeof loginMutation.mutateAsync>) => {
    const res = await loginMutation.mutateAsync(...args);
    setIsAuthenticated(true);
    localStorage.setItem("aman_auth", "true");
    queryClient.setQueryData(getGetMeQueryKey(), res);
    return res;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("aman_auth");
    queryClient.clear();
    setLocation("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading: isUserLoading && isAuthenticated,
        user: user || null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
