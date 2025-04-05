export type Member = {
  id?: number;
  name: string | undefined;
  email: string | undefined;
};

export function serializeMembers(members: Member[]): string {
  return JSON.stringify(
    members
      .filter((person) => person.name || person.email)
      .map((person) => [person.name, person.email]),
  );
}

export function deserializeMembers(memberString: string): Member[] {
  if (!memberString) return [];
  return JSON.parse(memberString).map(([name, email]: [string, string]) => ({
    id: undefined,
    name,
    email,
  }));
}
