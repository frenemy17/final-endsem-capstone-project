import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { cn } from "../lib/cn";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-card/50 backdrop-blur-md border-r border-border hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-border">
        <Link to="/" className="flex items-center gap-2.5">
          <ShipWheelIcon className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
            EduConnect
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Button
          variant={currentPath === "/" ? "secondary" : "ghost"}
          className="justify-start w-full gap-3 px-3"
          asChild
        >
          <Link to="/">
            <HomeIcon className="size-5" />
            <span>Home</span>
          </Link>
        </Button>

        <Button
          variant={currentPath === "/friends" ? "secondary" : "ghost"}
          className="justify-start w-full gap-3 px-3"
          asChild
        >
          <Link to="/friends">
            <UsersIcon className="size-5" />
            <span>Friends</span>
          </Link>
        </Button>

        <Button
          variant={currentPath === "/notifications" ? "secondary" : "ghost"}
          className="justify-start w-full gap-3 px-3"
          asChild
        >
          <Link to="/notifications">
            <BellIcon className="size-5" />
            <span>Notifications</span>
          </Link>
        </Button>
      </nav>

      <div className="p-4 border-t border-border mt-auto bg-muted/30">
        <Link to="/profile/edit" className="flex items-center gap-3 hover:bg-muted/50 rounded-lg p-2 -m-2 transition-colors">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src={authUser?.profilePic} alt="User Avatar" />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {authUser?.fullName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <div className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-green-500 inline-block animate-pulse" />
              <Badge variant="outline" className="text-xs px-1 py-0 bg-green-50 text-green-700 border-green-200">
                Online
              </Badge>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
};
export default Sidebar;
