import fs from "fs/promises";
import handlebars from "handlebars";
import path from "path";

async function extractAll(file: string) {
  const content = await fs.readFile(file, "utf-8");
  const ext = path.extname(file).slice(1);

  return `\`\`\`${ext} file=${file}\n${content}\n\`\`\``;
}

async function extractSnippet(file: string, marker: string) {
  const content = await fs.readFile(file, "utf-8");
  const start = `/** BEGIN_SNIPPET:${marker} */`;
  const end = `/** END_SNIPPET:${marker} */`;

  const lines = content.split("\n");
  const startIndex = lines.findIndex((line) => line.includes(start));
  const endIndex = lines.findIndex((line) => line.includes(end));

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error(`Snippet markers not found for ${marker}`);
  }

  const snippetLines = lines.slice(startIndex + 1, endIndex);

  // Determine minimum indentation
  const indentLengths = snippetLines
    .filter((line) => line.trim() !== "")
    .map((line) => line.match(/^(\s*)/)![0].length);

  const minIndent = Math.min(...indentLengths);

  // Remove from each line
  const normalized = snippetLines.map(
    (line) =>
      line.startsWith(" ".repeat(minIndent))
        ? line.slice(minIndent)
        : line.trimStart(), // fallback if inconsistent
  );

  const ext = path.extname(file).slice(1);
  return `\`\`\`${ext} file=${file}:${startIndex + 1}-${endIndex + 1}\n${normalized.join("\n")}\n\`\`\``;
}

async function main() {
  const env_example = await extractAll(".env.example");
  const team_schema = await extractSnippet(
    "src/server/db/schema.ts",
    "TEAM_SCHEMA",
  );
  const role_enum = await extractSnippet(
    "src/server/db/schema.ts",
    "ROLE_ENUM",
  );
  const interaction_mode_enum = await extractSnippet(
    "src/server/db/schema.ts",
    "INTERACTION_MODE_ENUM",
  );
  const discord_message = await extractSnippet(
    "src/app/(hunt)/puzzle/components/puzzle/guess/actions.ts",
    "DISCORD_MESSAGE",
  );
  const color_config = await extractSnippet(
    "tailwind.config.ts",
    "COLOR_CONFIG",
  );

  const snippets = {
    env_example,
    team_schema,
    role_enum,
    interaction_mode_enum,
    discord_message,
    color_config,
  };

  const files = [
    { template: "README.template.md", output: "README.md" },
    {
      template: "src/app/docs/develop/develop.template.mdx",
      output: "src/app/docs/develop/page.mdx",
    },
    {
      template: "src/app/docs/manage/manage.template.mdx",
      output: "src/app/docs/manage/page.mdx",
    },
  ];

  for (const { template, output } of files) {
    const source = await fs.readFile(template, "utf-8");
    const compiled = handlebars.compile(source);
    const result = compiled(snippets);
    await fs.writeFile(output, result);
    console.log(`${output} created!`);
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
