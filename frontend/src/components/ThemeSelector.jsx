import { useTheme } from "./theme-provider";
import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";
import { Button } from "./ui/button";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <SunIcon className="h-5 w-5" />;
      case "dark":
        return <MoonIcon className="h-5 w-5" />;
      default:
        return <MonitorIcon className="h-5 w-5" />;
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="transition-all duration-200 hover:scale-105"
    >
      {getIcon()}
    </Button>
  );
};

export default ThemeSelector;
