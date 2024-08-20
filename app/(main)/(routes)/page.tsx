import { ModeToggle } from "@/components/ModeToggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </main>
  );
}
