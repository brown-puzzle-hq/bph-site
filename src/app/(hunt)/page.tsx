import Link from "next/link";
export const dynamic = "force-dynamic";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex grow flex-col items-center justify-center">
      <h1>Welcome!</h1>
      {!session?.user?.id && (
        <p className="mt-2">
          New to the hunt?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      )}
    </div>
  );
}
