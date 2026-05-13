"use client";

import { redirect } from "next/navigation";
import useUser from "../contexts/user.context";
import ChatClientPage from "./components/ChatClientPage";

export default function ChatPage() {
  const user = useUser((state) => state.user);

  if (!user) {
    redirect("/");
  }

  return <ChatClientPage />;
}
