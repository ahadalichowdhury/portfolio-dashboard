"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE_URL } from "@/lib/api-config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BlogPost {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost>({
    title: "",
    excerpt: "",
    content: "",
    tags: [],
  });

  useEffect(() => {
    if (params.id !== "new") {
      fetchPost();
    }
  }, [params.id]);

  const fetchPost = async () => {
    const response = await fetch(`${API_BASE_URL}/api/blogs/${params.id}`);
    const data = await response.json();
    setPost(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url =
      params.id === "new"
        ? `${API_BASE_URL}/api/blog`
        : `${API_BASE_URL}/api/blog/${params.id}`;
    const method = params.id === "new" ? "POST" : "PATCH";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      router.push("/blog");
    } else {
      // Handle error
      console.error("Failed to save post");
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      const response = await fetch(`${API_BASE_URL}/api/blog/${params.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/blog");
      } else {
        // Handle error
        console.error("Failed to delete post");
      }
    }
  };

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
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={post.tags.join(", ")}
          onChange={(e) =>
            setPost({
              ...post,
              tags: e.target.value.split(",").map((tag) => tag.trim()),
            })
          }
        />
      </div>
      <div className="flex justify-between">
        <Button type="submit">Save</Button>
        {params.id !== "new" && (
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
