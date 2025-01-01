"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const trends = [
  { topic: "Technology", tweets: "125K" },
  { topic: "Programming", tweets: "85K" },
  { topic: "Next.js", tweets: "45K" },
  { topic: "TypeScript", tweets: "32K" },
];

const suggestions = [
  {
    name: "Sarah Johnson",
    handle: "@sarahj",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    name: "Mike Wilson",
    handle: "@mikew",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
];

export default function RightSidebar() {
  return (
    <div className="w-80 pl-8 py-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search"
          className="pl-10 bg-muted border-none rounded-full"
        />
      </div>

      <div className="mt-6 bg-muted rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4">Trends for you</h2>
        {trends.map((trend) => (
          <div
            key={trend.topic}
            className="py-3 hover:bg-background/50 rounded-lg cursor-pointer px-2"
          >
            <p className="font-semibold">{trend.topic}</p>
            <p className="text-sm text-muted-foreground">{trend.tweets} posts</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-muted rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4">Who to follow</h2>
        {suggestions.map((user) => (
          <div
            key={user.handle}
            className="flex items-center gap-4 py-3 hover:bg-background/50 rounded-lg cursor-pointer px-2"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-grow">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.handle}</p>
            </div>
            <Button variant="outline" className="rounded-full">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}