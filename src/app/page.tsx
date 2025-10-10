import SiteSidebar from "@/shared/nav/sideNav"
import ArticleCard from "@/shared/card/articleCard"
import { Button } from "@/shared/ui"
import Link from "next/link"

export default function HomePage() {
  const featured = [
    { title: "Arrays: The Swiss Army Knife of Data", href: "/articles/arrays-basics", tags: ["DSA", "Beginner"] },
    {
      title: "Processes vs Threads: The Roommates Analogy",
      href: "/articles/os-processes-threads",
      tags: ["OS", "Concepts"],
    },
    { title: "Indexes in DBMS: VIP Pass for Queries", href: "/articles/dbms-indexing", tags: ["DBMS", "Performance"] },
    { title: "OSI Model Explained Like Pizza Delivery", href: "/articles/cn-osi-model", tags: ["Networks"] },
  ]

  const quickTopics = [
    { label: "DSA", href: "/topics/dsa" },
    { label: "System Design", href: "/topics/system-design" },
    { label: "DBMS", href: "/topics/dbms" },
    { label: "Operating Systems", href: "/topics/os" },
    { label: "OOPs", href: "/topics/oops" },
  ]

  return (
    <main className="mx-auto max-w-7xl px-4">
      <div className="flex gap-6">
        <SiteSidebar />

        <section className="w-full py-8">
          {/* Hero */}
          <div className="mb-8 rounded-lg border bg-card p-6">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Coding explained like you’re five (but smarter).
            </h1>
            <p className="mt-2 text-muted-foreground">
              Witty, clear explanations of CS, DSA, and systems — minus the academic headache.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link href="/topics/dsa">
                <Button className="bg-primary text-primary-foreground">Start Learning</Button>
              </Link>
              <Link href="/compiler">
                <Button variant="secondary">Try the Compiler</Button>
              </Link>
            </div>
          </div>

          {/* Quick topics */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-medium text-foreground">Popular Topics</h2>
            <div className="flex flex-wrap gap-2">
              {quickTopics.map((t) => (
                <Link key={t.href} href={t.href}>
                  <Button variant="outline">{t.label}</Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured articles */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-medium text-foreground">Featured Articles</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((f) => (
                <ArticleCard key={f.href} title={f.title} href={f.href} tags={f.tags} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
