import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Dynesis Tech',
  description: 'Read our latest articles on web design, development, and digital transformation.',
}

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: 'The Future of Web Design in 2024',
      excerpt: 'Explore the latest trends and technologies shaping web design this year.',
      author: 'Sarah Johnson',
      date: '2024-05-15',
      category: 'Design',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Building Scalable Web Applications',
      excerpt: 'Best practices for creating applications that grow with your business.',
      author: 'Michael Chen',
      date: '2024-05-12',
      category: 'Development',
      readTime: '8 min read',
    },
    {
      id: 3,
      title: 'Mobile-First Development Strategy',
      excerpt: 'Why mobile-first design is essential in today&apos;s digital landscape.',
      author: 'Emma Rodriguez',
      date: '2024-05-10',
      category: 'Mobile',
      readTime: '6 min read',
    },
    {
      id: 4,
      title: 'The Importance of Web Accessibility',
      excerpt: 'Making your website accessible to everyone is not just ethical, it&apos;s smart business.',
      author: 'David Kim',
      date: '2024-05-08',
      category: 'Accessibility',
      readTime: '7 min read',
    },
    {
      id: 5,
      title: 'Optimizing Website Performance',
      excerpt: 'Simple techniques to dramatically improve your website&apos;s speed and user experience.',
      author: 'Lisa Anderson',
      date: '2024-05-05',
      category: 'Performance',
      readTime: '6 min read',
    },
    {
      id: 6,
      title: 'The Psychology of User Experience',
      excerpt: 'Understanding how users think and feel is key to great design.',
      author: 'James Wilson',
      date: '2024-05-01',
      category: 'UX',
      readTime: '9 min read',
    },
  ]

  const categories = ['Design', 'Development', 'Mobile', 'Accessibility', 'Performance', 'UX']

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our Blog
          </h1>
          <p className="mt-6 text-lg text-foreground/70">
            Insights, tips, and best practices from our team of digital experts
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-primary text-white px-6 py-2 text-sm font-medium hover:bg-primary/90">
              All Articles
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className="rounded-full border border-border text-foreground px-6 py-2 text-sm font-medium hover:border-blue-600 hover:text-primary"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-xl relative">
              <Image
                src="/images/blog-featured.jpg"
                alt="Featured Blog Post"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-primary bg-primary/10">
                  Featured
                </span>
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                {posts[0].title}
              </h2>
              <p className="text-lg text-foreground/70">
                {posts[0].excerpt}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {posts[0].author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(posts[0].date).toLocaleDateString()}
                </span>
                <span>{posts[0].readTime}</span>
              </div>
              <Link href={`/blog/${posts[0].id}`}>
                <Button className="bg-primary hover:bg-primary/90">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground">Latest Articles</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(1).map((post) => (
              <article
                key={post.id}
                className="group rounded-lg border border-border bg-background overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all"
              >
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300" />

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-primary bg-primary/10">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-4">{post.excerpt}</p>

                  {/* Meta */}
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between text-xs text-foreground/70 mb-3">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-sm font-semibold text-primary hover:text-blue-700 inline-flex items-center gap-2"
                    >
                      Read More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-foreground/70 mb-8">
            Get the latest articles and insights delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
