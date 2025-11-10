import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {showSidebar && <Sidebar />}

        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-background to-muted/20">
            <div className="animate-fade-in">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default Layout;
