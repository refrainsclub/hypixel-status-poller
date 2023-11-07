import { config } from "~/config";
import { getProfile } from "~/mojang";
import { User } from "~/types";

export const users: User[] = await Promise.all(
  config.users.map(async (name) => await getProfile(name))
);
