import { redirect } from "next/navigation";

export default function DiscordPage() {
  redirect("channels/@me");
}
