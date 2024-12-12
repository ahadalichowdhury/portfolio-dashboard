'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { API_BASE_URL } from '@/lib/api-config'

interface Project {
  _id: string
  title: string
  description: string
  shape: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const response = await fetch(`${API_BASE_URL}/api/projects`)
    const data = await response.json()
    setProjects(data)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button asChild>
          <Link href="/projects/new">New Project</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project._id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="line-clamp-2">{project.title}</CardTitle>
              <CardDescription className="line-clamp-3">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="mb-4">Shape: {project.shape}</p>
              <Button asChild className="w-full">
                <Link href={`/projects/${project._id}`}>Edit</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

