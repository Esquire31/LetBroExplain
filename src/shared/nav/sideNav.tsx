"use client"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui"

const sidebarData = [
  {
    title: "DSA",
    items: [
      { label: "Arrays", href: "/topics/dsa/arrays" },
      { label: "Linked Lists", href: "/topics/dsa/linked-lists" },
      { label: "Trees", href: "/topics/dsa/trees" },
      { label: "Graphs", href: "/topics/dsa/graphs" },
    ],
  },
  {
    title: "Operating Systems",
    items: [
      { label: "Processes & Threads", href: "/topics/os/processes" },
      { label: "Scheduling", href: "/topics/os/scheduling" },
      { label: "Memory Management", href: "/topics/os/memory" },
    ],
  },
  {
    title: "DBMS",
    items: [
      { label: "Normalization", href: "/topics/dbms/normalization" },
      { label: "Indexing", href: "/topics/dbms/indexing" },
      { label: "Transactions", href: "/topics/dbms/transactions" },
    ],
  },
  {
    title: "Computer Networks",
    items: [
      { label: "OSI Model", href: "/topics/cn/osi" },
      { label: "TCP/IP", href: "/topics/cn/tcp-ip" },
      { label: "Routing", href: "/topics/cn/routing" },
    ],
  },
  {
    title: "OOPs",
    items: [
      { label: "Encapsulation", href: "/topics/oops/encapsulation" },
      { label: "Inheritance", href: "/topics/oops/inheritance" },
      { label: "Polymorphism", href: "/topics/oops/polymorphism" },
    ],
  },
  {
    title: "System Design",
    items: [
      { label: "Scalability", href: "/topics/system-design/scalability" },
      { label: "Caching", href: "/topics/system-design/caching" },
      { label: "Databases", href: "/topics/system-design/databases" },
    ],
  },
]

export default function SiteSidebar() {
  return (
    <aside className="sticky top-[125px] hidden h-[calc(100dvh-125px)] w-64 shrink-0 border-r bg-card p-3 md:block">
      <Accordion type="multiple" className="space-y-2">
        {sidebarData.map((sec) => (
          <AccordionItem key={sec.title} value={sec.title}>
            <AccordionTrigger className="text-foreground">{sec.title}</AccordionTrigger>
            <AccordionContent>
              <nav className="grid gap-1">
                {sec.items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    className="rounded px-2 py-1 text-sm text-foreground hover:bg-sidebar-accent cursor-pointer"
                  >
                    {it.label}
                  </Link>
                ))}
              </nav>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  )
}
