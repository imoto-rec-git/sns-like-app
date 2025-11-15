import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env");
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    try {
      const userData = JSON.parse(body).data;

      // usernameがnullの場合、代替値を生成
      let username = userData.username;
      if (!username) {
        // first_nameとlast_nameがある場合はそれを使用、なければユーザーIDの一部を使用
        if (userData.first_name && userData.last_name) {
          username = `${userData.first_name.toLowerCase()}_${userData.last_name.toLowerCase()}`;
        } else if (userData.first_name) {
          username = userData.first_name.toLowerCase();
        } else {
          // ユーザーIDの最後の8文字を使用
          username = `user_${evt.data.id.slice(-8)}`;
        }
      }

      await prisma.user.create({
        data: {
          id: evt.data.id,
          clerkId: evt.data.id,
          username: username,
          name:
            userData.first_name && userData.last_name
              ? `${userData.first_name} ${userData.last_name}`
              : userData.first_name || null,
          image: userData.image_url || null,
        },
      });

      return new Response("ユーザー作成に成功しました。", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("ユーザー作成に失敗しました。", {
        status: 500,
      });
    }
  }

  if (eventType === "user.updated") {
    try {
      const userData = JSON.parse(body).data;

      // usernameがnullの場合、既存のusernameを保持するため更新しない
      const updateData: {
        clerkId: string;
        username?: string;
        name?: string | null;
        image?: string | null;
      } = {
        clerkId: evt.data.id,
      };

      if (userData.username) {
        updateData.username = userData.username;
      }

      if (userData.first_name && userData.last_name) {
        updateData.name = `${userData.first_name} ${userData.last_name}`;
      } else if (userData.first_name) {
        updateData.name = userData.first_name;
      }

      if (userData.image_url) {
        updateData.image = userData.image_url;
      }

      await prisma.user.update({
        where: {
          id: evt.data.id,
        },
        data: updateData,
      });

      return new Response("ユーザー更新に成功しました。", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("ユーザー更新に失敗しました。", {
        status: 500,
      });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
