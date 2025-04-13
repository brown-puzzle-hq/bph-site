import Link from "next/link";
import { Alert, AlertDescription } from "~/components/ui/alert";

export default function PostHuntDialog() {
  return (
    <Alert className="mb-6 mt-2 bg-transparent">
      <AlertDescription className="overflow-hidden break-words">
        <strong className="whitespace-normal text-gray-300">
          Post-hunt Warning:
        </strong>
        <p className="whitespace-normal text-gray-300">
          We have made some adjustments to this puzzle to make it solvable for
          users who are not logged in. To get the original hunt experience,
          please{" "}
          <Link
            href="/register"
            className="font-medium text-sky-200 hover:underline"
            prefetch={false}
          >
            register
          </Link>{" "}
          or{" "}
          <Link
            href="/login"
            className="font-medium text-sky-200 hover:underline"
            prefetch={false}
          >
            log in
          </Link>
          .
        </p>
      </AlertDescription>
    </Alert>
  );
}
