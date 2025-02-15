import React, { createContext } from "react";
import { supabase } from "../supabase/supabaseClient";
import { DbUser } from "../shared/types/user.types";
import { useAuth } from "../hooks/useAuth";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  signUp: (
    email: string,
    password: string,
    nickname: string
  ) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  user: DbUser | null;
  setUser: React.Dispatch<React.SetStateAction<DbUser | null>>;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isAuthenticated, isLoading, setIsLoading, user, setUser } = useAuth();

  const signUp = async (email: string, password: string, nickname: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: nickname,
          },
        },
      });

      if (error) {
        console.error("SUPABASE 회원가입 에러: ", error.message);
        return false;
      }
      console.log("회원가입 성공!");
      return true;
    } catch (error) {
      console.error("예상치 못한 에러 발생: ", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log("Supabase 로그인 에러: ", error.message);
        return false;
      }

      return true;
    } catch (error) {
      console.error("예상치 못한 에러 발생", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setUser(null);
      }
      if (error) {
        console.error("Supabase 로그아웃 에러: ", error.message);
        return false;
      }

      return true;
    } catch (error) {
      console.error("예상치 못한 에러 발생: ", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setIsLoading,
        signUp,
        login,
        logout,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
