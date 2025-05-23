"use client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AutosizeTextarea } from "~/components/ui/autosize-textarea";
import { EnlargedImage } from "~/components/ui/enlarged-component";

import { queryDatabase } from "./actions";
import CopyButton from "../puzzle/CopyButton";
import { extractEmails } from "~/lib/comms";

export default function Page() {
  const [activeTab, setActiveTab] = useState("emails");
  const [query, setQuery] = useState(
    "SELECT * FROM bph_site_team\nWHERE interaction_type = 'remote'\nAND role = 'user';",
  );
  const [result, setResult] = useState<any>(null);

  async function executeQuery() {
    try {
      const res = await queryDatabase(query);
      setResult(res);
    } catch (error) {
      console.error("SQL Execution Error:", error);
      setResult({ error: "Failed to execute query." });
    }
  }

  const getContent = () => {
    if (activeTab === "raw") {
      return typeof result === "string"
        ? result
        : result?.error || "No query yet.";
    } else {
      try {
        const parsedResult = JSON.parse(result);
        if (parsedResult?.rows?.[0]?.members) {
          return parsedResult.rows
            .flatMap((row: any) => extractEmails(row.members))
            .join("\n");
        }
        return "No emails found.";
      } catch (error) {
        return "SQL error";
      }
    }
  };

  return (
    <div className="mx-auto mb-4 w-full max-w-3xl px-4 md:mb-12">
      <h1 className="text-2xl font-bold">SQL Editor</h1>
      <p className="mb-4 text-gray-600">
        Enter an SQL query below to execute it against the database.
      </p>

      <div className="mb-4 flex justify-center">
        <EnlargedImage
          props={{
            src: "/sql/schema.svg",
            alt: "Database Schema",
            width: 600,
            height: 600,
          }}
        />
      </div>

      {/* SQL Query Input Box */}
      <pre>
        <AutosizeTextarea
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded border bg-gray-50 p-2 text-gray-800"
          rows={4}
          placeholder="Write your SQL query here..."
        />
      </pre>

      {/* Execute Button */}
      <Button
        onClick={executeQuery}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-500 hover:opacity-90"
      >
        Execute SQL
      </Button>

      <div className="mt-4 w-full rounded border">
        <Tabs defaultValue="emails" onValueChange={setActiveTab}>
          <TabsList className="mt-2 w-full justify-between bg-inherit">
            <div>
              <TabsTrigger
                value="emails"
                className="rounded-lg data-[state=active]:bg-inherit data-[state=active]:text-inherit data-[state=active]:underline data-[state=active]:decoration-blue-500 data-[state=active]:decoration-2 data-[state=active]:shadow-none"
              >
                Emails
              </TabsTrigger>
              <TabsTrigger
                value="raw"
                className="rounded-lg data-[state=active]:bg-inherit data-[state=active]:text-inherit data-[state=active]:underline data-[state=active]:decoration-blue-500 data-[state=active]:decoration-2 data-[state=active]:shadow-none"
              >
                Raw SQL
              </TabsTrigger>
            </div>
            <div className="pr-1.5 hover:opacity-75">
              <CopyButton copyText={getContent()} />
            </div>
          </TabsList>

          {/* Raw SQL*/}
          <TabsContent value="raw" className="w-full">
            <div className="bg-gray-100 p-4">
              <pre className="text-wrap text-sm text-gray-800">
                {getContent()}
              </pre>
            </div>
          </TabsContent>

          {/* Display Emails Result */}
          <TabsContent value="emails">
            <div className="p-4">
              <pre className="text-wrap text-sm text-gray-800">
                {getContent()}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
