// components/Layout.tsx
import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {/* Persistent Navbar */}
      <Navbar />

      {/* Outlet equivalent */}
      <main className="bg-black overflow-x-hidden selection:bg-red-500/30 selection:text-white">
        {children}
      </main>
    </>
  );
};

export default Layout;
