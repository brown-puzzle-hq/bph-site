import createMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGFM from "remark-gfm";
import rehypeSnippetLink from "./scripts/rehype-snippet-link.js";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/teams",
        destination: "/team",
        permanent: true,
      },
      {
        source: "/teams/:path*",
        destination: "/team/:path*",
        permanent: true,
      },
      {
        source: "/puzzles",
        destination: "/puzzle",
        permanent: true,
      },
      {
        source: "/puzzles/:path*",
        destination: "/puzzle/:path*",
        permanent: true,
      },
      {
        source: "/admin/teams",
        destination: "/admin/team",
        permanent: true,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TODO: Quick bug fix
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGFM],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
        },
      ],
      [
        rehypeSnippetLink,
        {
          repoUrl: "https://github.com/brown-puzzle-hq/bph-site",
          branch: "main",
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
