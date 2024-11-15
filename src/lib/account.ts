import { db } from "@/db";
import { UserEntity, usersTable } from "@/db/schema";
import {
  ApiError,
  CreateUserAccountInput,
  CreateUserAccountResponse,
  LoginUserResponse,
  User,
} from "@/types";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "./hash";
import { setSession } from "./session";

function userEntityToUser(userEntity: UserEntity): User {
  return {
    id: userEntity.id,
    name: userEntity.name,
    email: userEntity.email,
    phone_number: userEntity.phone_number,
    address: userEntity.address,
    city: userEntity.city,
    country: userEntity.country,
  };
}

export async function createUserAccount(
  input: CreateUserAccountInput,
): Promise<CreateUserAccountResponse | ApiError> {
  const existingAccount = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, input.email),
  });

  if (existingAccount) {
    return {
      error: "An account with this email already exists",
    };
  }

  const passwordHash = await hashPassword(input.password);

  const insertedUsers = await db
    .insert(usersTable)
    .values({
      ...input,
      password_hash: passwordHash,
      role: "user",
    })
    .returning();

  const user = userEntityToUser(insertedUsers[0]);

  await setSession({
    user,
  });

  return {
    user,
  };
}

export async function loginUser(
  email: string,
  password: string,
): Promise<LoginUserResponse | ApiError> {
  const userEntity = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });

  if (!userEntity) {
    return {
      error: "Invalid email or password",
    };
  }

  const passwordMatch = await verifyPassword(
    password,
    userEntity.password_hash,
  );

  if (!passwordMatch) {
    return {
      error: "Invalid email or password",
    };
  }

  const user = userEntityToUser(userEntity);

  await setSession({
    user,
  });

  return {
    user,
  };
}
