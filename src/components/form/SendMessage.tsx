import { Textarea } from "@headlessui/react";

export default function SendMessage() {
  return (
    <form className="">
      <Textarea className="w-full" placeholder="Mesajınızı yazın..." />
    </form>
  );
}
