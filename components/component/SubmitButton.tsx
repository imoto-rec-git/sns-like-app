import { Button } from "../ui/button";
import { SendIcon } from "./Icons";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  /**
   * MEMO: useForomStatusはフォームの送信状態を管理するためのフック
   * 例：送信中に再度ボタンが押せないようにペンディング状態にするなど
   */
  const { pending } = useFormStatus();

  return (
    <Button variant="ghost" size="icon" disabled={pending}>
      <SendIcon className="h-5 w-5 text-muted-foreground" />
      <span className="sr-only">Tweet</span>
    </Button>
  );
}
