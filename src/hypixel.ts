import { config } from "~/config";
import { Status } from "~/types";
const baseUrl = config.hypixelBaseUrl;
const key = process.env.HYPIXEL_API_KEY!!;

/**
 * Get the online status of a user
 *
 * @param uuid The UUID of the user
 * @returns The online status of the user
 */
export async function getStatus(uuid: string): Promise<Status> {
  const res = await fetch(`${baseUrl}/status?key=${key}&uuid=${uuid}`);

  switch (res.status) {
    case 200:
      break;
    case 403:
      throw new Error("Invalid API key");
    case 429:
      throw new Error("Rate limit exceeded");
    default:
      throw new Error("Unknown error");
  }

  return (await res.json()) as Status;
}
