'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { API_BASE_URL } from '@/lib/api-config'

interface Project {
  _id?: string
  title: string
  description: string
  githubLink: string
  liveUrl: string
  shape: string
  image: string
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<Project>({
    title: '',
    description: '',
    githubLink: '',
    liveUrl: '',
    shape: 'box',
    image: ''
  })

  useEffect(() => {
    if (params.id !== 'new') {
      fetchProject()
    }
  }, [params.id])

  const fetchProject = async () => {
    const response = await fetch(`${API_BASE_URL}/api/projects/${params.id}`)
    const data = await response.json()
    setProject(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = params.id === 'new' ? `${API_BASE_URL}/api/projects` : `${API_BASE_URL}/api/projects/${params.id}`
    const method = params.id === 'new' ? 'POST' : 'PATCH'
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })

    if (response.ok) {
      router.push('/projects')
    } else {
      // Handle error
      console.error('Failed to save project')
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this project?')) {
      const response = await fetch(`${API_BASE_URL}/api/projects/${params.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/projects')
      } else {
        // Handle error
        console.error('Failed to delete project')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={project.description}
          onChange={(e) => setProject({ ...project, description: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="githubLink">GitHub Link</Label>
        <Input
          id="githubLink"
          value={project.githubLink}
          onChange={(e) => setProject({ ...project, githubLink: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="liveUrl">Live URL</Label>
        <Input
          id="liveUrl"
          value={project.liveUrl}
          onChange={(e) => setProject({ ...project, liveUrl: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="shape">Shape</Label>
        <Select
          value={project.shape}
          onValueChange={(value) => setProject({ ...project, shape: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a shape" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="box">Box</SelectItem>
            <SelectItem value="sphere">Sphere</SelectItem>
            <SelectItem value="torus">Torus</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={project.image}
          onChange={(e) => setProject({ ...project, image: e.target.value })}
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

