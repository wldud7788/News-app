import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";

export const Header = () => {
  const { isAuthenticated, logout } = useAuthContext();
  const nav = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout();
      nav("/");
    }
  };
  return (
    <div>
      <header className="flex justify-between items-center h-[50px] border-b-2 px-8">
        <h1>
          <Link to="/">News</Link>
        </h1>
        <nav className="flex gap-4">
          {isAuthenticated ? (
            <>
              <button onClick={handleLogout}>Logout</button>
              <Link to="mypage">Mypage</Link>
            </>
          ) : (
            <>
              <Link to="login">Login</Link>
              <Link to="signup">Signup</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};
