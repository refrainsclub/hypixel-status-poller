import { config } from "~/config";
import { Profile } from "~/types";
const baseUrl = config.mojangBaseUrl;

/**
 * Get the profile of a user
 *
 * @param name The name of the user
 * @returns The profile of the user
 */
export async function getProfile(name: string): Promise<Profile> {
  const res = await fetch(`${baseUrl}/users/profiles/minecraft/${name}`);

  if (!res.ok) {
    throw new Error("Failed to get profile");
  }

  return (await res.json()) as Profile;
}
