import { db } from "@/db/index";
import { faker } from "@faker-js/faker";
import { teams, puzzles } from "@/db/schema";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import bcrypt from "bcryptjs";
import "dotenv/config";

async function seed() {
  console.log("🌱 Seeding started...");

  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(
    "⚠️  This will OVERWRITE all teams and puzzles. Type 'yes' to continue: ",
  );
  rl.close();

  if (answer !== "yes") {
    throw new Error("Seeding aborted by user.");
  }

  await db.delete(teams);
  await db.delete(puzzles);

  console.log("✅ Database cleared.");

  // Fake puzzles
  const fakePuzzles = Array.from({ length: 5 }).map((_, i) => ({
    id: "example-" + (i + 1),
    name: "Example " + (i + 1),
    answer: "EXAMPLE" + (i + 1),
  }));

  await db.insert(puzzles).values(fakePuzzles);

  // Fake teams
  const fakeTeams = Array.from({ length: 10 }).map(() => {
    const inPerson = faker.datatype.boolean();
    const username = faker.lorem.slug(2);
    // TODO: use common imported hash function
    const hashedPassword = bcrypt.hashSync(username, 10);
    const phoneNumber = faker.phone.number({ style: "national" });

    return {
      id: username,
      displayName: username
        .split("-")
        .map((w) => w[0]!.toUpperCase() + w.slice(1))
        .join(" "),
      password: hashedPassword,
      role: "user" as "user" | "admin",
      primaryEmail: "user@gmail.com",
      members: JSON.stringify([
        [faker.person.firstName(), faker.person.lastName(), "user@gmail.com"],
        [faker.person.firstName(), faker.person.lastName(), "user@gmail.com"],
      ]),
      interactionMode: inPerson
        ? "in-person"
        : ("remote" as "in-person" | "remote"),
      createTime: faker.date.recent(),
      finishTime: null,
      numCommunity: inPerson ? "1" : undefined,
      phoneNumber: inPerson ? phoneNumber : undefined,
      roomNeeded: inPerson ? false : undefined,
      solvingLocation: inPerson ? "" : undefined,
    };
  });

  fakeTeams.push({
    id: "admin123",
    displayName: "Admin",
    // TODO: use common imported hash function
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
    primaryEmail: "admin@gmail.com",
    members: JSON.stringify([
      [faker.person.firstName(), faker.person.lastName(), "admin@gmail.com"],
      [faker.person.firstName(), faker.person.lastName(), "admin@gmail.com"],
    ]),
    interactionMode: "in-person",
    createTime: faker.date.recent(),
    finishTime: null,
    numCommunity: "1",
    phoneNumber: faker.phone.number({ style: "national" }),
    roomNeeded: false,
    solvingLocation: faker.location.city(),
  });

  await db.insert(teams).values(fakeTeams);
}

seed()
  .then(() => {
    console.log("✅ Seeding complete!");
    console.log(
      "📁 Consider running `pnpm seed:folders` if you haven't already.",
    );
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  });
