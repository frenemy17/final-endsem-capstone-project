import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  // const queryClient = useQueryClient();
  // const { mutate: logoutMutation } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-30 h-16 flex items-center shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  EduConnect
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/notifications">
                <BellIcon className="h-6 w-6" />
              </Link>
            </Button>
          </div>

          {/* TODO */}
          <ThemeSelector />

          <Avatar className="h-9 w-9">
            <AvatarImage src={authUser?.profilePic} alt="User Avatar" />
            <AvatarFallback>{authUser?.fullName?.charAt(0)}</AvatarFallback>
          </Avatar>

          <Button variant="ghost" size="icon" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
