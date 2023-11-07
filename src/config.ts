import { Config } from "~/types";

export const config: Config = {
  users: ["username"], // users must have their online status public. keep this array short
  interval: 1000 * 60 * 5, // milliseconds. do not set this too low
  hypixelBaseUrl: "https://api.hypixel.net", // do not change
  mojangBaseUrl: "https://api.mojang.com", // do not change
};
