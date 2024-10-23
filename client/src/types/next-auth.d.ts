/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    access_token: string;
    refresh_token: string;
    email?: string | null | undefined;
    username?: string;
    role: string;
  }
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: {
      email?: string | null | undefined;
      username?: string;
      accessToken: string;
      role: string;
    };
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    accessToken: string;
    refreshToken: string;
    user: {
      email?: string | null | undefined;
      username?: string;
      role: string;
    };
    provider?: string;
  }
}
