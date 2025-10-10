import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui"
import { Badge } from "@/shared/ui"

type ArticleCardProps = {
  title: string
  href: string
  tags: string[]
  imageAlt?: string
}

export default function ArticleCard({ title, href, tags, imageAlt = "Article preview" }: ArticleCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full transition hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-pretty text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Image
            src="/code-education-article-cover.jpg"
            alt={imageAlt}
            width={320}
            height={160}
            className="h-40 w-full rounded-md object-cover"
          />
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Badge key={t} variant="secondary" className="text-xs">
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
