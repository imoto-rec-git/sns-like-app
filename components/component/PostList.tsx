// components/PostList.tsx
import { auth } from "@clerk/nextjs/server";
import { postDataFetcher } from "@/lib/postDataFetcher";
import { Post } from "./Post";

export default async function PostList() {
  const { userId } = auth();

  if (!userId) return;

  const posts = await postDataFetcher(userId);

  return (
    <div className="space-y-4">
      {posts.length ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <div className="text-center text-muted-foreground">
          ポストがみつかりません。
        </div>
      )}
    </div>
  );
}
