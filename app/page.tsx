import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">Welcome to Blog and Projects</h1>
      <p className="text-xl text-muted-foreground max-w-2xl">Manage your blog posts and projects with ease. Explore our intuitive interface designed for both small and large screens.</p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Button asChild size="lg">
          <Link href="/blog">View Blog</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/projects">View Projects</Link>
        </Button>
      </div>
    </div>
  )
}

