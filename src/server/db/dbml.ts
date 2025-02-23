import * as schema from "./schema";
import { pgGenerate } from "drizzle-dbml-generator";

const out = "./src/server/db/schema.dbml";
const relational = true;

pgGenerate({ schema, out, relational });
