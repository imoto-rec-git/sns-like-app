"use client";

import { followAction } from "@/lib/actions";
import { Button } from "../ui/button";
import { useOptimistic } from "react";

interface FollowButtonProps {
  isCurrentUser: boolean;
  isFollowing: boolean;
  userId: string;
}

export const FollowButton = ({
  isCurrentUser,
  isFollowing,
  userId,
}: FollowButtonProps) => {
  const [optimisticFollow, addOptimisticFollow] = useOptimistic<
    { isFollowing: boolean },
    void
  >(
    {
      isFollowing,
    },
    (currentState) => ({
      isFollowing: !currentState.isFollowing,
    })
  );

  const handleFollowAction = async () => {
    if (isCurrentUser) {
      return;
    }

    try {
      addOptimisticFollow();
      await followAction(userId);
    } catch (error) {
      console.error(error);
    }
  };

  const getButtonContent = () => {
    if (isCurrentUser) {
      return "プロフィール編集";
    }
    if (optimisticFollow.isFollowing) {
      return "フォロー中";
    }
    return "フォローする";
  };
  const getButtonVariant = () => {
    if (isCurrentUser) {
      return "secondary";
    }
    if (optimisticFollow.isFollowing) {
      return "outline";
    }
    return "default";
  };

  return (
    <form action={handleFollowAction}>
      <Button variant={getButtonVariant()} className="w-full">
        {getButtonContent()}
      </Button>
    </form>
  );
};
