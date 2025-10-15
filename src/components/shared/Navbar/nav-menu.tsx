import React from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavMenuProps {
  className?: string; // className props optional
}

export const NavMenu: React.FC<NavMenuProps> = ({ className }) => {
  const pathname = usePathname();
  const primaryColor = "rgb(224, 94, 87)";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact Me" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className="gap-6 font-medium">
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink asChild>
              <Link
                href={link.href}
                style={{
                  backgroundColor: pathname === link.href ? primaryColor : "transparent",
                  color: pathname === link.href ? "white" : undefined,
                }}
                className="px-4 py-2 rounded-full text-sm md:text-base block text-center"
              >
                {link.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
