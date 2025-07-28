import { db } from "@/db/index";
import { faker } from "@faker-js/faker";
import { teams, puzzles } from "@/db/schema";
import bcrypt from "bcryptjs";
import "dotenv/config";

async function seed() {
  console.log("🌱 Seeding started...");

  await db.delete(teams);
  await db.delete(puzzles);

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
    // const phoneNumber = faker.phone.number({ style: "national" });

    return {
      id: username,
      displayName: username
        .split("-")
        .map((w) => w[0]!.toUpperCase() + w.slice(1))
        .join(" "),
      password: hashedPassword,
      role: "user" as "user" | "admin",
      members: JSON.stringify([
        [faker.person.fullName(), "user@gmail.com"],
        [faker.person.fullName(), ""],
      ]),
      interactionMode: inPerson
        ? "in-person"
        : ("remote" as "in-person" | "remote"),
      createTime: faker.date.recent(),
      finishTime: null,
    };
  });

  fakeTeams.push({
    id: "admin123",
    displayName: "Admin",
    // TODO: use common imported hash function
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
    members: JSON.stringify([
      [faker.person.fullName(), "admin@gmail.com"],
      [faker.person.fullName(), ""],
    ]),
    interactionMode: "in-person",
    createTime: faker.date.recent(),
    finishTime: null,
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
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
