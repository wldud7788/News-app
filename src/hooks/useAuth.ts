import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { DbUser } from "../shared/types/user.types";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<DbUser | null>(null);

  const checkSession = async (session: Session | null) => {
    try {
      if (!session) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Supabase 데이터 조회 에러:", error.message);
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("예상치 못한 오류 발생: ", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 초기 세션 체크
    supabase.auth.getSession().then((res) => {
      checkSession(res.data.session);
    });

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      checkSession(session);
    });

    // 클린업
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return { isAuthenticated, isLoading, setIsLoading, user, setUser };
};
