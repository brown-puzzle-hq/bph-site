/** DO NOT PUT SENSITIVE INFORMATION IN THIS FILE */
import { string, z } from "zod";
import parsePhoneNumberFromString from "libphonenumber-js";

export type Member = {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
};

export function serializeMembers(members: Member[]): string {
  return JSON.stringify(
    members
      .filter((person) => person.firstName || person.lastName || person.email)
      .map((person) => [person.firstName, person.lastName, person.email]),
  );
}

export function deserializeMembers(memberString: string): Member[] {
  if (!memberString) return [];
  return JSON.parse(memberString).map(
    ([firstName, lastName, email]: [string, string, string]) => ({
      firstName,
      lastName,
      email,
    }),
  );
}

export function extractEmails(memberString: string): string[] {
  return JSON.parse(memberString)
    .map(([_f, _l, email]: [string, string, string]) => email)
    .filter(Boolean);
}

export function extractNames(memberString: string): string {
  return JSON.parse(memberString)
    .map(
      ([first, last, email]: [string, string, string]) =>
        first + "\t" + last + "\t" + email,
    )
    .join("\n");
}

export const zPhone = z.string().transform((arg, ctx) => {
  if (!arg) return "";

  const phone = parsePhoneNumberFromString(arg, {
    defaultCountry: "US",
    extract: false,
  });

  if (phone && phone.isValid()) {
    return phone.number;
  }

  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: "Invalid number",
  });
  return z.NEVER;
});

export function formatPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) return "";

  const parsed = parsePhoneNumberFromString(phoneNumber);
  if (parsed && parsed.country === "US") {
    return parsed.formatNational();
  }
  if (parsed) {
    return parsed.formatInternational();
  }

  return phoneNumber;
}

export const memberSchema = z
  .object({
    firstName: z.string().trim(),
    lastName: z.string().trim(),
    email: z.string().trim().email().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const { firstName, lastName, email } = data;
    const filledCount = [firstName, lastName, email].filter(Boolean).length;

    // Either all blank or all filled is valid
    if (filledCount === 0 || filledCount === 3) return;

    // Otherwise, mark blank fields as errors
    if (!firstName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["firstName"],
      });
    }

    if (!lastName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["lastName"],
      });
    }

    if (!email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["email"],
      });
    }
  });
