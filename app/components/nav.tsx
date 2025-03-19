"use client";

import { cn } from "@/lib/utils/styles";
import { SiGithub, SiBluesky } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = {
  "/waypoints": {
    name: "waypoints",
  },
  "/landmarks": {
    name: "landmarks",
  },
  "/pitstops": {
    name: "pitstops",
  },
};

export function Navbar() {
  const path = usePathname();
  const isHome = path === "/";
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row fade md:overflow-auto scroll-pr-6 md:relative justify-between"
          id="nav"
        >
          <div className="flex gap-2">
            <Link
              href="/"
              className={cn(
                "transition-all hover:text-brand flex items-center py-1 px-3",
                {
                  "text-lg font-semibold text-brand": !isHome,
                },
              )}
            >
              {isHome ? "home" : "Joel Kang"}
            </Link>

            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-brand flex items-center py-1 px-2"
                >
                  {name}
                </Link>
              );
            })}
          </div>

          <div className="flex gap-2 items-center">
            <a
              href="https://github.com/joelkang"
              rel="noopener noreferrer"
              className="inline-flex items-baseline hover:text-brand"
            >
              <SiGithub size={20} />
            </a>
            <a
              href="https://bsky.app/profile/joelkang.com"
              rel="noopener noreferrer"
              className="inline-flex items-baseline hover:text-brand"
            >
              <SiBluesky size={20} />
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
}
