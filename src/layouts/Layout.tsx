import { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="max-w-[600px] mx-auto shadow-lg shadow-gray-200">
      <Header />
      <div className="p-[30px] min-h-[calc(100vh-100px)]">{children}</div>
      <footer className="h-[50px] text-center">푸터</footer>
    </div>
  );
};
