import { db, server } from "@/shared/lib/db";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { eq } from "drizzle-orm";
import Link from "next/link";

function ServerMenu({
  name,
  serverId,
  channels,
}: {
  name?: string;
  serverId: string;
  channels?: { id: number; name: string | null }[];
}) {
  const channelList = channels?.map(({ id, name }) => (
    <li key={id}>
      <Link
        href={`/channels/${serverId}/${id}`}
        className="cursor-pointer truncate rounded-md px-2 py-0.5
              text-sm text-gray-200 hover:bg-white/10 hover:text-gray-100"
      >
        <FontAwesomeIcon icon={faHashtag} />
        {name}
      </Link>
    </li>
  ));
  return (
    <div className="flex h-full w-[240px] min-w-[240px] flex-col bg-gray-700">
      <div className="h-10 w-full border-b border-gray-900 px-2 py-2 hover:bg-white/10">
        <h1 className="truncate font-semibold text-white">{name}</h1>
      </div>
      <div className="flex h-[calc(100%-120px)] flex-col gap-1">
        <ul className="scrollbar-hide relative flex h-full flex-col overflow-hidden overflow-y-scroll px-1 py-1">
          {channelList}
          {channelList}
          {channelList}
          {channelList}
        </ul>
      </div>
      <div className="h-20 border-t bg-gray-700"></div>
    </div>
  );
}

function ServerMain({ children }: React.PropsWithChildren) {
  return <div className="h-full flex-grow bg-gray-500">{children}</div>;
}

export default async function ServerLayout({
  children,
  params,
}: React.PropsWithChildren & { params: { "server-id": string } }) {
  const { "server-id": serverId } = params;

  let serverData = undefined;
  if (serverId.trim() !== "%40me")
    serverData = await db.query.server.findFirst({
      where: eq(server.id, Number(serverId)),
      columns: { name: true },
      with: { channels: { columns: { id: true, name: true } } },
    });

  return (
    <>
      <ServerMenu
        name={serverData?.name ? serverData.name : undefined}
        serverId={serverId}
        channels={serverData?.channels ? serverData.channels : undefined}
      />
      <ServerMain>{children}</ServerMain>
    </>
  );
}
