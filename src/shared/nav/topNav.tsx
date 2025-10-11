"use client"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/shared/ui"
import { Button } from "@/shared/ui"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/shared/ui"
import ThemeToggle from "@/shared/themeToggle/themeToggle"
import { cn } from "@/lib/utils"

const topics = [
  { label: "DSA", href: "/topics/dsa" },
  { label: "Operating Systems", href: "/topics/os" },
  { label: "DBMS", href: "/topics/dbms" },
  { label: "Computer Networks", href: "/topics/cn" },
  { label: "OOPs", href: "/topics/oops" },
  { label: "System Design", href: "/topics/system-design" },
]

export default function SiteNavbar() {
  const [query, setQuery] = useState("")

  return (
    <header className="container-fluid sticky top-0 z-50 w-full border-b-3 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full px-8 py-3 border-b-3">
            <nav className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2" aria-label="LetBroExplain Home">
                    <span className={cn("text-xl font-semibold text-primary")}>LetBroExplain</span>
                </Link>

                <div className="ml-auto flex items-center gap-2">
                    <div className="float-right hidden gap-2 md:flex">
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search articles..."
                            aria-label="Search articles"
                            className="w-50"
                        />
                        <Button type="button" variant="default" className="bg-primary text-primary-foreground">
                            Search
                        </Button>
                    </div>
                    <Link href="/about">
                        <Button variant="ghost" className="text-foreground">
                            About
                        </Button>
                    </Link>
                    <ThemeToggle />
                    <Link href="/admin/login" aria-label="Admin login">
                        <Button className="bg-primary text-primary-foreground">Admin</Button>
                    </Link>
                </div>
            </nav>
        </div>
        <div className="flex w-full justify-around px-8 py-3">
            <nav className="flex items-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-foreground">
                        Topics
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Main Categories</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {topics.map((t) => (
                        <DropdownMenuItem key={t.href} asChild>
                        <Link href={t.href}>{t.label}</Link>
                        </DropdownMenuItem>
                    ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="ml-auto flex items-center gap-2">
                    <Link href="/compiler">
                        <Button variant="ghost" className="text-foreground">
                            Compiler
                        </Button>
                    </Link>
                </div>
            </nav>
        </div>
    </header>
  )
}
