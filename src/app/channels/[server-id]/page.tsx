import { db, channel } from "@/shared/lib/db";
import { asc, eq } from "drizzle-orm";

type TServerPageProps = {
  params: { "server-id": string };
};

export default async function ServerPage(props: TServerPageProps) {
  const { "server-id": serverId } = props.params;

  if (serverId.trim() == "%40me") return <div>Me page</div>;

  const defaultChannel = await db.query.channel.findFirst({
    columns: { name: true },
    where: eq(channel.serverId, Number(serverId)),
    orderBy: [asc(channel.id)],
  });

  return <div>{defaultChannel?.name}</div>;
}
