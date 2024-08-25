import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeader from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}

export default async function ServerSidebar({ serverId }: ServerSidebarProps) {
  const profile = await currentProfile();

  if (!profile) return redirect("/");

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) return redirect("/");

  const textChannels = server?.channels?.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels?.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels?.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server?.members?.filter(
    (member) => member.profleId !== profile.id
  );

  const role = server.members.find(
    (member) => member.profleId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full w-full text-primary dark:bg-neutral-800 bg-neutral-200">
      <ServerHeader server={server} role={role} />
    </div>
  );
}
