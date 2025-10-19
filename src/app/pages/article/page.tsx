"use client"
import { useState } from "react"
import { Button } from "@/shared/ui"
import { Input } from "@/shared/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui"
import { Badge } from "@/shared/ui"
import Link from "next/link"

export default function ArticleCreator() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [tags, setTags] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [isPublishing, setIsPublishing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [showMetadata, setShowMetadata] = useState(true)

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value))
    }
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)
    
    const article = {
      title,
      slug,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      content,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    // Here you would save to your database/local storage
    setTimeout(() => {
      setIsSaving(false)
      alert("Draft saved successfully!")
    }, 800)
  }

  const handlePublish = async () => {
    setIsPublishing(true)
    
    const article = {
      title,
      slug,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      content,
      status: 'published',
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }
    
    setTimeout(() => {
      setIsPublishing(false)
      alert("Article published successfully!")
    }, 1000)
  }

  const renderMarkdownPreview = (markdown: string) => {
    // Enhanced markdown to HTML conversion
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-6">$1</h1>')
      
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre class="bg-gray-800 text-green-400 p-4 rounded-md my-4 overflow-x-auto"><code>$2</code></pre>')
      
      // Inline code
      .replace(/`([^`]+)`/gim, '<code class="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm">$1</code>')
      
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-blue-400 hover:underline">$1</a>')
      
      // Lists
      .replace(/^\* (.*$)/gim, '<li class="ml-4">• $1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-4">• $1</li>')
      
      // Line breaks
      .replace(/\n\n/gim, '</p><p class="mb-4">')
      .replace(/\n/gim, '<br>')

    return `<div class="prose prose-invert max-w-none"><p class="mb-4">${html}</p></div>`
  }

  const categories = ["DSA", "Operating Systems", "DBMS", "Computer Networks", "OOPs", "System Design", "Web Development"]

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Article Creator</h1>
            <p className="text-muted-foreground mt-1">Write and publish articles in Markdown</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin">
              <Button variant="outline">← Admin Panel</Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">← Home</Button>
            </Link>
          </div>
        </div>

        {/* Metadata Section */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Article Metadata</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMetadata(!showMetadata)}
              >
                {showMetadata ? "Hide" : "Show"}
              </Button>
            </div>
          </CardHeader>
          {showMetadata && (
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Article Title *
                </label>
                <Input
                  id="title"
                  placeholder="Enter article title..."
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium mb-2">
                  URL Slug *
                </label>
                <Input
                  id="slug"
                  placeholder="article-url-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL: /articles/{slug || "your-slug"}
                </p>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full p-2 border rounded-md bg-card text-card-foreground"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-2">
                  Tags
                </label>
                <Input
                  id="tags"
                  placeholder="DSA, Beginner, Arrays (comma separated)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                {tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tags.split(',').map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Editor and Preview */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Editor Side */}
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Markdown Editor</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewMode(!previewMode)}
                  >
                    {previewMode ? "Hide Preview" : "Show Preview"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full h-96 p-4 border rounded-md bg-card text-card-foreground resize-none font-mono text-sm leading-relaxed"
                placeholder="Write your article content here using **Markdown**...
                
                **Pro tip:** Use the preview to see how your article will look!"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={handleSaveDraft}
                  variant="outline"
                  disabled={!title || !content || isSaving}
                >
                  {isSaving ? "Saving..." : "Save Draft"}
                </Button>
                <Button
                  onClick={handlePublish}
                  disabled={!title || !content || !slug || isPublishing}
                  className="bg-primary text-primary-foreground"
                >
                  {isPublishing ? "Publishing..." : "Publish Article"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Side */}
          {previewMode && (
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4 bg-card min-h-96">
                  {title && (
                    <div className="mb-6">
                      <h1 className="text-3xl font-bold mb-2">{title}</h1>
                      {category && (
                        <Badge variant="outline" className="mb-2">{category}</Badge>
                      )}
                      {tags && (
                        <div className="flex flex-wrap gap-2">
                          {tags.split(',').map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: content 
                        ? renderMarkdownPreview(content) 
                        : "<p class='text-muted-foreground italic'>Start writing to see preview...</p>"
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Help Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Markdown Quick Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Headers</h4>
                <code className="block text-xs bg-gray-800 p-2 rounded">
                  # H1<br/>
                  ## H2<br/>
                  ### H3
                </code>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Text Formatting</h4>
                <code className="block text-xs bg-gray-800 p-2 rounded">
                  **Bold Text**<br/>
                  *Italic Text*<br/>
                  `Inline Code`
                </code>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Lists</h4>
                <code className="block text-xs bg-gray-800 p-2 rounded">
                  - Item 1<br/>
                  - Item 2<br/>
                  * Also works
                </code>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Links</h4>
                <code className="block text-xs bg-gray-800 p-2 rounded">
                  [Link Text](URL)
                </code>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Code Blocks</h4>
                <code className="block text-xs bg-gray-800 p-2 rounded">
                  ```javascript<br/>
                  code here<br/>
                  ```
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}