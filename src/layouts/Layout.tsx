import { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="max-w-[600px] mx-auto shadow-lg shadow-gray-200">
      <Header />
      <div className="p-[15px] md:p-[30px] min-h-[calc(100vh-100px)]">
        {children}
      </div>
      <footer className="h-[50px] text-center text-sm text-gray-400">
        © 2024 News. All rights reserved.
      </footer>
    </div>
  );
};
