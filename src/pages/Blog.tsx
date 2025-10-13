import type { TBlog } from "@/types/blog";
import { useLoaderData } from "react-router";

const Blog = () => {
  const blog = useLoaderData<TBlog>();
  console.log("blog", blog);
  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.cid}</p>
      <p>{blog.author}</p>
    </div>
  );
};

export default Blog;
