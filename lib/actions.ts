"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

type State = {
  error?: string | undefined;
  success: boolean;
};

/**
 * MEMO: サーバーアクションでは基本的に function関数で記述がベターかもしれない。
 * 理由：アロー関数で記述するとシリアライズが発生する可能性があるため。
 *
 * Next.jsにおけるシリアライズとは？
 * → クライアントとサーバー間で関数を呼び出す際、関数を参照可能な形式に変換すること。
 *    function 宣言は名前付き関数として効率的に識別され、
 *    アロー関数より最適化されたシリアライズが行われる。
 */
export async function addPostAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "ユーザーが存在しません",
        success: false,
      };
    }

    const postText = formData.get("post") as string;
    const postTextSchema = z
      .string()
      .min(1, "ポスト内容を入力してください")
      .max(140, "ポスト内容は140文字以内にしてください");

    const validatedPostText = postTextSchema.parse(postText);

    await prisma.post.create({
      data: {
        content: validatedPostText,
        authorId: userId,
      },
    });

    // MEMO: revalidatePathを使用することで、ページを再描画することができる。
    revalidatePath("/");

    return {
      error: "",
      success: true,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: error.errors.map((e) => e.message).join(", "),
        success: false,
      };
    } else if (error instanceof Error) {
      return {
        error: error.message,
        success: false,
      };
    } else {
      return {
        error: "予期せぬエラーが発生しました。",
        success: false,
      };
    }
  }
}

export const likeAction = async (postId: string) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("ユーザーが存在しません");
  }
  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    }

    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};
