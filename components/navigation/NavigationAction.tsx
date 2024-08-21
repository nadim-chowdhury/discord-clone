"use client";

import { Plus } from "lucide-react";
import ActionTooltip from "../ActionTooltip";
import { useModal } from "@/hooks/use-modal-store";

export default function NavigationAction() {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button
          onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <div className="flex mx-3 w-12 h-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={24}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
}
