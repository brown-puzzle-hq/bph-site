import path from "path";

export default function rehypeSnippetLink(options) {
  const { repoUrl, branch } = options;

  return async (tree) => {
    const { visit } = await import("unist-util-visit");

    visit(tree, "element", (node, index, parent) => {
      if (!parent || node.data?.snippetHeaderInserted) return;

      if (node.tagName === "pre" && node.children?.[0]?.tagName === "code") {
        const meta = node.children[0].data?.meta || "";
        const match = meta.match(/file=([^\s:]+)([^\s]*)/);
        if (!match) return;

        const filePath = match[1];
        const filename = path.basename(filePath);
        const githubLink = match[2]
          ? `${repoUrl}/blob/${branch}/${filePath}#L${match[2].slice(1).replace("-", "-L")}`
          : `${repoUrl}/blob/${branch}/${filePath}`;

        const headerNode = {
          type: "element",
          tagName: "div",
          properties: { className: ["snippet-header"] },
          children: [
            {
              type: "element",
              tagName: "span",
              properties: { className: ["filename"] },
              children: [{ type: "text", value: filename }],
            },
            {
              type: "element",
              tagName: "a",
              properties: {
                href: githubLink,
                target: "_blank",
                rel: "noopener noreferrer",
                className: ["github-link"],
                "aria-label": "View on GitHub",
              },
              children: [
                {
                  type: "element",
                  tagName: "svg",
                  properties: {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    width: "20",
                    height: "20",
                  },
                  children: [
                    {
                      type: "element",
                      tagName: "path",
                      properties: {
                        d: "M12 0C5.37 0 0 5.373 0 12a12 12 0 008.208 11.387c.6.111.82-.26.82-.577 0-.285-.011-1.04-.017-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.204.085 1.838 1.237 1.838 1.237 1.07 1.833 2.809 1.303 3.494.996.108-.775.418-1.303.76-1.602-2.665-.305-5.466-1.333-5.466-5.931 0-1.31.469-2.381 1.237-3.221-.125-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.47 11.47 0 013.004-.404c1.02.005 2.048.138 3.004.404 2.289-1.552 3.295-1.23 3.295-1.23.655 1.652.244 2.873.12 3.176.77.84 1.237 1.911 1.237 3.221 0 4.61-2.804 5.624-5.475 5.921.43.37.814 1.102.814 2.222 0 1.604-.015 2.898-.015 3.293 0 .319.216.694.825.576A12 12 0 0024 12c0-6.627-5.373-12-12-12z",
                      },
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        };

        parent.children.splice(index, 0, headerNode);
        node.data = { ...(node.data || {}), snippetHeaderInserted: true };
        node.properties = {
          ...(node.properties || {}),
          className: [...(node.properties?.className || []), "snippet-code"],
        };
      }
    });
  };
}
