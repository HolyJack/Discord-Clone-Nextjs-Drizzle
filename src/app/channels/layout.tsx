import { Navigation } from "@/widgets/navigation";
import { ServerBody } from "@/widgets/server-body";

const USER_ID = 1;

export default function DiscordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-row">
      <Navigation />
      <ServerBody>{children}</ServerBody>
    </div>
  );
}
