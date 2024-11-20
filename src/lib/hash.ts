import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  // Hashing + Salting
  const saltRound = 10;
  return bcrypt.hash(password, saltRound);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
