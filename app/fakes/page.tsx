"use client"
import * as React from "react";
import { useGetPosts, usePostPost } from "@/hooks/useFake";
import { postTypes } from "@/types";

export default function page() {
    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");

  const { data: posts, isLoading: LoadingPosts, refetch } = useGetPosts();
  const { mutate: createPost } = usePostPost(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost({title, body}, {onSuccess: () => refetch() })
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
        <header>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center max-w-lg bg-amber-50">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea name="" id="" placeholder="Description" value={body} onChange={(e) => setBody(e.target.value)} />
                <button type="submit" className="bg-gradient-to-b to-yellow-400 from-yellow-500 px-2 py-1.5">Create post</button>
            </form>
        </header>
      {LoadingPosts ? (
        <p>Loading...</p>
      ) : (
        <>
          {posts?.map((p: postTypes) => (
            <div key={p.id} className="text-center">
              <p>{p.title}</p>
              <span>{p.body}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
