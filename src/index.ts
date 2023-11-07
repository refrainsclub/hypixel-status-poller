/**
 * This program polls the Hypixel API for updates to the users' online status.
 * It will post updates to Discord when a user's online status changes.
 */
import { config } from "~/config";
import { postMessage } from "~/discord";
import { getStatus } from "~/hypixel";
import { Session, User } from "~/types";
import { users } from "~/users";

/**
 * Polls the Hypixel API for updates to the users' online status.
 * This function is called recursively.
 */
async function poll() {
  const updates: User[] = [];

  for (const user of users) {
    const status = await getStatus(user.id);
    const newSession = status.session;
    const oldSession = user.session;
    const notEqual = !oldSession || !sessionsAreEqual(newSession, oldSession);

    if (notEqual) {
      updates.push({ ...user, session: status.session });
      user.session = status.session;
    }
  }

  postUpdates(updates);
  setTimeout(poll, config.interval);
}

/**
 * Checks if two sessions are equal.
 *
 * @param a The first session.
 * @param b The second session.
 * @returns Whether the sessions are equal.
 */
const sessionsAreEqual = (a: Session, b: Session) => {
  return a.online === b.online && a.gameType === b.gameType;
};

/**
 * Posts updates to Discord.
 * If there are no updates, nothing will be posted.
 * This will also log the number of updates posted.
 *
 * @param updates The users that have updated.
 */
function postUpdates(updates: User[]) {
  if (updates.length > 0) {
    const message = updates.map((u) => getMessage(u, u.session!!)).join("\n");
    postMessage(message);
  }

  console.log(`Posted ${updates.length} update(s)`);
}

/**
 * Gets the message to post to Discord.
 *
 * @param user The user to get the message for.
 * @param session The session of the user.
 * @returns The message to post to Discord.
 */
const getMessage = (user: User, session: Session) => {
  const { online, gameType } = session;

  if (online) {
    return `\`${user.name}\` is now playing \`${gameType}\` :green_circle:`;
  }

  return `\`${user.name}\` is now offline :red_circle:`;
};

// This will recursively call poll() every config.interval milliseconds.
poll();
