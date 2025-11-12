/**
 * MEMO: 注意点
 * ここに use client 書くと子コンポーネントにも use clientが適応されるので注意。
 * 基本的に親コンポーネントは　サーバーコンポーネントにして子コンポーネントで use clientで運用するのがベター。（予期せぬことで動かなくなる可能性があるため）
 */

import PostForm from "./PostForm";
import PostList from "./PostList";

export default function MainContent() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-6">
      <PostForm />
      <PostList />
    </div>
  );
}
