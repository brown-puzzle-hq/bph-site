"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// TODO: this component is repeated in multiple places
// Might not be necessary to have it as a separate component

export default function Toast({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const router = useRouter();

  toast(title, {
    description: description,
  });

  router.push("/teams");
  return null;
}
