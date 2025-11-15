"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { addPostAction } from "@/lib/actions";
import { useRef } from "react";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";

export default function PostForm() {
  const initialState = {
    error: undefined,
    success: false,
  };
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(addPostAction, initialState);

  if (state.success && formRef.current) {
    formRef.current.reset();
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <form
          ref={formRef}
          /**
           * MEMO: server actionsについての解説
           * サーバーアクションを使用すると、クライアントでAPIを叩かずにサーバー側の処理を直接実行できる。
           * ここでは送信処理時にサーバーアクションを使って、データベースに投稿内容を送信している。
           */
          action={formAction}
          className="flex items-center gap-4 w-full"
        >
          <Input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 rounded-full bg-muted px-4 py-2"
            name="post"
          />
          <SubmitButton />
        </form>
      </div>
      {state.error && <p className="text-destructive ml-14">{state.error}</p>}
    </div>
  );
}
