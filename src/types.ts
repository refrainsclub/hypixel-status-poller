export interface Config {
  users: string[];
  interval: number;
  hypixelBaseUrl: string;
  mojangBaseUrl: string;
}

export interface Profile {
  name: string;
  id: string;
}

export interface User {
  name: string;
  id: string;
  session?: Session;
}

export interface Status {
  success: boolean;
  uuid: string;
  session: Session;
}

export interface Session {
  online: boolean;
  gameType?: string;
}
