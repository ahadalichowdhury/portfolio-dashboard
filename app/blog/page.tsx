"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/lib/api-config";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  tags: string[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, [page, search, tag]);

  const fetchPosts = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/blogs?page=${page}&search=${search}&tag=${tag}`
    );
    const data = await response.json();
    setPosts(data.posts);
    setTotalPages(data.totalPages);
  };

  const fetchTags = async () => {
    const response = await fetch(`${API_BASE_URL}/api/blog/tags`);
    const data = await response.json();
    setTags(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button asChild>
          <Link href="/blog/new">New Post</Link>
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64"
        />
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full sm:w-auto border rounded p-2"
        >
          <option value="">All Tags</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post._id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button asChild className="w-full">
                <Link href={`/blog/${post._id}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center space-x-4">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
