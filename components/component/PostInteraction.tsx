"use client";

import { Button } from "../ui/button";
import { HeartIcon, MessageCircleIcon, Share2Icon } from "./Icons";
import { useOptimistic } from "react";
import { likeAction } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";

interface LikeState {
  likeCount: number;
  isLiked: boolean;
}

type Props = {
  postId: string;
  initialLikes: string[];
  commentNumber: number;
};

export const PostInteraction = ({
  postId,
  initialLikes,
  commentNumber,
}: Props) => {
  const { userId } = useAuth();

  const initialState = {
    likeCount: initialLikes.length,
    isLiked: userId ? initialLikes.includes(userId) : false,
  };
  /**
   * MEMO: 楽観的UI更新
   * → ユーザーの操作に対して、即座に反映されるUIを提供することで、より快適なユーザーエクスペリエンスを提供する。
   * → 例：いいねボタンを押した際に、即座にいいね数が増えるようにする。
   */
  const [optimisticLike, addOptimisticLike] = useOptimistic<LikeState, void>(
    initialState,
    (currentState) => ({
      likeCount: currentState.isLiked
        ? currentState.likeCount - 1
        : currentState.likeCount + 1,
      isLiked: !currentState.isLiked,
    })
  );

  const handleLikeSubmit = async () => {
    try {
      addOptimisticLike();
      await likeAction(postId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center">
      <form action={handleLikeSubmit}>
        <Button variant="ghost" size="icon">
          <HeartIcon
            className={`h-5 w-5 ${
              optimisticLike.isLiked
                ? "text-destructive"
                : "text-muted-foreground"
            }`}
          />
        </Button>
      </form>
      <span
        className={`-ml-1 ${optimisticLike.isLiked ? "text-destructive" : ""}`}
      >
        {optimisticLike.likeCount}
      </span>
      <Button variant="ghost" size="icon">
        <MessageCircleIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
      <span className="-ml-1">{commentNumber}</span>
      <Button variant="ghost" size="icon">
        <Share2Icon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </div>
  );
};
