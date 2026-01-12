import { notFound } from "next/navigation";

// Best solution I could find per https://github.com/vercel/next.js/discussions/50034
export default function NotFoundDummy() {
  notFound();
}
