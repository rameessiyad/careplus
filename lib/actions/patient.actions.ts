/* eslint-disable @typescript-eslint/no-unused-vars */
import { ID, Query } from "node-appwrite";
import { Users } from "../appwrite.config";
import { parseStringify } from "../utils";

//CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    console.log(process.env.NEXT_PUBLIC_PROJECT_ID);
    const newUser = await Users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newUser);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await Users.list([Query.equal("email", [user.email])]);

      return documents?.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await Users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};
