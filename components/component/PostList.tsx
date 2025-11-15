// components/PostList.tsx
import { auth } from "@clerk/nextjs/server";
import { postDataFetcher } from "@/lib/postDataFetcher";
import { Post } from "./Post";

export default async function PostList({ username }: { username: string }) {
  const { userId } = auth();

  if (!userId) return;

  /**
   * MEMO:
   * 直接prismaでフェッチするか、api経由でフェッチするかはケースバイケース
   * 小規模であれば直接prismaでフェッチする方が良いが、大規模であればapi経由でフェッチする方が後々の管理や拡張性が高いように思える
   * ベストプラクティスは現状は不明
   *  */
  const posts = await postDataFetcher(userId, username);

  return (
    <div className="space-y-4">
      {posts ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <div className="text-center text-muted-foreground">
          ポストがみつかりません。
        </div>
      )}
    </div>
  );
}
