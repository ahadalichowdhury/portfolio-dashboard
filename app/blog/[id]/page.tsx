'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { API_BASE_URL } from '@/lib/api-config'
import MDEditor from '@uiw/react-md-editor'
import { Textarea } from "@/components/ui/textarea"

interface BlogPost {
  _id?: string
  title: string
  excerpt: string
  content: string
  tags: string[]
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost>({
    title: '',
    excerpt: '',
    content: '',
    tags: []
  })

  const fetchPost = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs/${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch post')
      }
      const data = await response.json()
      setPost(data)
    } catch (error) {
      console.error('Error fetching post:', error)
    }
  }, [params.id])

  useEffect(() => {
    if (params.id !== 'new') {
      void fetchPost()
    }
  }, [params.id, fetchPost])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = params.id === 'new' ? `${API_BASE_URL}/api/blogs` : `${API_BASE_URL}/api/blogs/${params.id}`
      const method = params.id === 'new' ? 'POST' : 'PATCH'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      })

      if (!response.ok) {
        throw new Error('Failed to save post')
      }

      router.push('/blog')
    } catch (error) {
      console.error('Error saving post:', error)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs/${params.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete post')
      }

      router.push('/blog')
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={post.excerpt}
          onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
          required
        />
      </div>
      <div data-color-mode="light">
        <Label htmlFor="content">Content</Label>
        <MDEditor
          value={post.content}
          onChange={(value) => setPost({ ...post, content: value || '' })}
          height={400}
          preview="edit"
        />
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={post.tags.join(', ')}
          onChange={(e) => setPost({ ...post, tags: e.target.value.split(',').map(tag => tag.trim()) })}
        />
      </div>
      <div className="flex justify-between">
        <Button type="submit">Save</Button>
        {params.id !== 'new' && (
          <Button type="button" variant="destructive" onClick={handleDelete}>Delete</Button>
        )}
      </div>
    </form>
  )
}
