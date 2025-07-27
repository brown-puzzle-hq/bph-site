"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

  router.push("/admin/hints");
  return null;
}
