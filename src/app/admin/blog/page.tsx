import { getAllPosts } from "@/lib/data/blog";
import BlogPostsTable from "./BlogPostsTable";

export const maxDuration = 60;

export default async function AdminBlogPage() {
    const posts = await getAllPosts();
    return <BlogPostsTable posts={posts} />;
}
