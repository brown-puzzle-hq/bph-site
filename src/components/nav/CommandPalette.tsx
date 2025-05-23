"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Trophy,
  Puzzle,
  MessageCircleQuestion,
  House,
  PartyPopper,
  MessageCircleWarning,
  ClipboardPenLine,
  UsersRound,
  Database,
  Waypoints,
} from "lucide-react";

const huntItems = [
  {
    title: "Hunt",
    href: "/",
    icon: <PartyPopper className="text-red-500" />,
  },
  // {
  //   title: "Puzzles",
  //   href: "/puzzle",
  //   icon: <Puzzle className="text-red-500" />,
  // },
  {
    title: "Leaderboard",
    href: "/teams",
    icon: <Trophy className="text-red-500" />,
  },
  // {
  //   title: "Feedback",
  //   href: "/feedback",
  //   icon: <ClipboardPenLine className="text-red-500" />,
  // },
];

const adminItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <House className="text-blue-500" />,
  },
  {
    title: "Puzzles",
    href: "/admin/puzzle",
    icon: <Puzzle className="text-blue-500" />,
  },
  {
    title: "Teams",
    href: "/admin/teams",
    icon: <UsersRound className="text-blue-500" />,
  },
  {
    title: "Hints",
    href: "/admin/hints",
    icon: <MessageCircleQuestion className="text-blue-500" />,
  },
  {
    title: "Errata",
    href: "/admin/errata",
    icon: <MessageCircleWarning className="text-blue-500" />,
  },
  {
    title: "Feedback",
    href: "/admin/feedback",
    icon: <ClipboardPenLine className="text-blue-500" />,
  },
  {
    title: "Graph",
    href: "/admin/graph",
    icon: <Waypoints className="text-blue-500" />,
  },
  {
    title: "Queries",
    href: "/admin/sql",
    icon: <Database className="text-blue-500" />,
  },
];

export function CommandPalette() {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        session.data?.user?.role === "admin" &&
        e.key === "k" &&
        (e.metaKey || e.ctrlKey)
      ) {
        e.preventDefault();
        e.stopPropagation();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Hunt">
          {huntItems.map((item) => (
            <CommandItem
              key={item.title}
              onSelect={() => {
                router.push(item.href);
                setOpen(false);
              }}
            >
              {item.icon}
              <span>{item.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Admin">
          {adminItems.map((item) => (
            <CommandItem
              key={item.title}
              onSelect={() => {
                router.push(item.href);
                setOpen(false);
              }}
            >
              {item.icon}
              <span>{item.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
