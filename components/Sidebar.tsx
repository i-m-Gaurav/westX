"use client";

import { Home, Search, Bell, Mail, Bookmark, User, MoreHorizontal, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Logout from '@/components/Logout';

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Explore", href: "/explore" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Mail, label: "Messages", href: "/messages" },
  { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Bell, label: "Interest", href: "/Interests" },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen fixed left-0 border-r border-border p-4">
      <div className="flex flex-col h-full">
        <div className="p-2">
          <Twitter className="h-8 w-8" />
        </div>

        <nav className="mt-4 flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-4 p-3 hover:bg-muted rounded-full text-lg"
            >
              <item.icon className="h-6 w-6" />
              <span>{item.label}</span>
            </Link>
          ))}

          <Button className="mt-4 rounded-full" size="lg">
            Post
          </Button>
        </nav>

        <div className="mt-auto">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-2 p-4 hover:bg-muted rounded-full w-full">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-muted" />
                  <div className="flex flex-col text-left">
                    <span className="font-semibold">John Doe</span>
                    <span className="text-muted-foreground">@johndoe</span>
                  </div>
                </div>
                <MoreHorizontal className="ml-auto" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[200px] bg-background border border-border rounded-lg shadow-lg p-2"
                side="top" // Display the menu above the trigger
                align="end" // Align the menu to the end of the trigger
              >
                <DropdownMenu.Item asChild>
                  <Logout />
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
}