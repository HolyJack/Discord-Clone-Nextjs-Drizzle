import { db, user } from "@/shared/lib/db";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

export function MenuIcon({ children }: React.PropsWithChildren) {
  return (
    <li className="group relative">
      <div
        className="absolute left-0 top-0 flex h-[48px] flex-col
        justify-center"
      >
        <span
          className="translate-x-[-8px] rounded-r-xl border-[4px] transition-all
          duration-300 group-hover:h-[26px] group-hover:translate-x-[-4px]"
        />
      </div>
      <div
        className="mx-auto flex aspect-square w-[48px] transform
        cursor-pointer items-center  justify-center  overflow-hidden
        rounded-[24px] bg-gray-500 shadow-md transition-all
        duration-300 group-hover:rounded-[14px] group-hover:bg-sky-500"
        draggable
      >
        {children}
      </div>
    </li>
  );
}

const USER_ID = 1;

export async function Navigation() {
  const userData = await db.query.user.findFirst({
    where: eq(user.id, USER_ID),
    with: {
      usersToServers: {
        with: {
          server: {
            columns: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  const serverList = userData?.usersToServers.map(
    ({ server: { id, name } }) => (
      <MenuIcon key={id}>
        <Link
          className="flex h-full w-full items-center justify-center"
          href={`/channels/${id}`}
        >
          <Image
            src="/discord-mark-white.svg"
            alt={name ? name : "wow"}
            width="28"
            height="28"
          />
        </Link>
      </MenuIcon>
    ),
  );

  const mePage = (
    <MenuIcon>
      <Link href="/channels/@me">
        <Image
          src="/discord-mark-white.svg"
          alt="discord-clone"
          width="28"
          height="28"
        />
      </Link>
    </MenuIcon>
  );

  const addServer = (
    <MenuIcon>
      <div
        className="flex h-full w-full items-center justify-center text-green-500
        group-hover:bg-green-500 group-hover:text-white"
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </MenuIcon>
  );

  return (
    <section className="h-full min-w-[72px] bg-gray-800">
      <nav className="relative flex flex-col">
        <ul
          className="scrollbar-hide relative flex h-screen flex-col gap-2
          overflow-hidden overflow-y-scroll py-3"
        >
          {mePage}
          <li className="mx-auto w-6 rounded-full border border-gray-500" />
          {serverList}
          {addServer}
        </ul>
      </nav>
    </section>
  );
}
