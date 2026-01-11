import { Menu, X, Moon, Sun } from "lucide-react";
import * as React from "react"; 
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";   
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { AppTab } from "@/types";

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 4);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: AppTab.DASHBOARD, label: 'Dashboard' },
    { id: AppTab.STORY_TO_PROFILE, label: 'Story Translator' },
    { id: AppTab.VOICE_APPLY, label: 'Voice Apply' },
    { id: AppTab.MATCHES, label: 'Matches' },
    { id: AppTab.RECRUITER_PREVIEW, label: 'Recruiter' },
    { id: AppTab.ARCHITECTURE, label: 'Architecture' },
    { id: AppTab.ETHICS, label: 'Ethics' },
    { id: AppTab.IMPACT, label: 'Impact' }
  ];

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className={cn(
          "fixed z-50 w-full px-3 md:px-4 transition-colors duration-300",
          isScrolled ? "border-transparent" : "border-b border-white/10"
        )}
      >
        <div
          className={cn(
            "mx-auto mt-2 transition-all duration-300",
            isScrolled &&
              "bg-black/80 dark:bg-black/80 max-w-5xl rounded-2xl border border-white/10 backdrop-blur-xl px-3"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-3 py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <button
                onClick={() => setActiveTab(AppTab.DASHBOARD)}
                aria-label="home"
                className="flex gap-2 items-center"
              >
                <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-base">B</span>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-teal-400">
                  BridgeAI
                </span>
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                  className="relative z-20 pr-4 block cursor-pointer p-2.5 lg:hidden text-white"
                >
                  <Menu className="in-data-[state=active]:rotate-180 scale-120 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto duration-200" size={20} />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-120 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-5 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>
            </div>

            <div className="absolute inset-0 m-auto hidden lg:block size-fit">
              <Menus activeTab={activeTab} setActiveTab={setActiveTab} menuItems={menuItems} />
            </div>

            <div className="in-data-[state=active]:block border border-white/10 backdrop-blur-2xl lg:in-data-[state=active]:flex hidden w-full flex-wrap items-center justify-end space-y-8 rounded-sm p-3 shadow-3xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden block p-3">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveTab(item.id);
                          setMenuState(false);
                        }}
                        className={cn(
                          "text-base block duration-150 w-full text-left py-2",
                          activeTab === item.id ? "text-indigo-400 font-bold" : "text-neutral-400 hover:text-white"
                        )}
                      >
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

interface MenusProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  menuItems: { id: AppTab; label: string }[];
}

export function Menus({ activeTab, setActiveTab, menuItems }: MenusProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">
        {menuItems.slice(0, 5).map((item) => (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(), 
                "bg-transparent text-sm font-bold cursor-pointer px-5",
                activeTab === item.id ? "text-indigo-400" : "text-neutral-300 hover:text-white"
              )}
            >
              <button onClick={() => setActiveTab(item.id)}>{item.label}</button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-sm font-bold text-neutral-300 hover:text-white px-5">
            More
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-2 bg-black/95 dark:bg-black/95 border-white/10">
            <ul className="grid gap-3 md:grid-cols-1 min-w-[250px]">
              {menuItems.slice(5).map((item) => (
                <ListItem
                  key={item.id}
                  title={item.label}
                  onClick={() => setActiveTab(item.id)}
                  isActive={activeTab === item.id}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  onClick,
  isActive,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { onClick: () => void; isActive?: boolean }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <button 
          className={cn(
            "p-4 w-full text-left rounded-md transition-colors",
            isActive ? "bg-indigo-600/20" : "hover:bg-white/5"
          )} 
          onClick={onClick}
        >
          <div className={cn(
            "text-base leading-none font-medium",
            isActive ? "text-indigo-400" : "text-white"
          )}>
            {title}
          </div>
        </button>
      </NavigationMenuLink>
    </li>
  );
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="flex flex-col justify-center">
      <div>
        <Toggle
          className="group bg-white/5 dark:bg-white/5 data-[state=on]:hover:bg-white/10 cursor-pointer size-9 data-[state=on]:bg-transparent border border-white/10"
          pressed={theme === "dark"}
          onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <Moon
            size={16}
            className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100 text-white"
            aria-hidden="true"
          />
          <Sun
            size={16}
            className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0 text-white"
            aria-hidden="true"
          />
        </Toggle>
      </div>
    </div>
  );
}

export { Header };
