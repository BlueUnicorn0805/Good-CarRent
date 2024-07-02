import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",

  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    /* -----------------------------------------------------------------------------------------------
     * Node.js Environment
     * -----------------------------------------------------------------------------------------------*/

    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    /* -----------------------------------------------------------------------------------------------
     * Kinde Auth
     * -----------------------------------------------------------------------------------------------*/

    KINDE_CLIENT_ID: z.string(),
    KINDE_CLIENT_SECRET: z.string(),
    KINDE_ISSUER_URL: z.string().url(),
    KINDE_SITE_URL: z.string().default("http://localhost:3000"),
    KINDE_POST_LOGOUT_REDIRECT_URL: z.string().default("http://localhost:3000"),
    KINDE_POST_LOGIN_REDIRECT_URL: z.string().default("http://localhost:3000"),

    /* -----------------------------------------------------------------------------------------------
     * Google OAuth
     * -----------------------------------------------------------------------------------------------*/

    GOOGLE_CLIENT_ID: z
      .string()
      .min(1, { message: "Google Client ID is invalid or missing" }),
    GOOGLE_CLIENT_SECRET: z
      .string()
      .min(1, { message: "Google Client Secret is invalid or missing" }),

    /* -----------------------------------------------------------------------------------------------
     * Github OAuth
     * -----------------------------------------------------------------------------------------------*/

    GITHUB_CLIENT_ID: z
      .string()
      .min(1, { message: "Github Client ID is invalid or missing" }),
    GITHUB_CLIENT_SECRET: z
      .string()
      .min(1, { message: "Github Client Secret is invalid or missing" }),
    GITHUB_ACCESS_TOKEN: z
      .string()
      .min(1, { message: "Github Access Token is invalid or missing" }),

    /* -----------------------------------------------------------------------------------------------
     * Discord OAuth
     * -----------------------------------------------------------------------------------------------*/

    // DISCORD_CLIENT_ID: z
    //   .string()
    //   .min(1, { message: "Discord Client ID is invalid or missing" }),
    // DISCORD_CLIENT_SECRET: z
    //   .string()
    //   .min(1, { message: "Discord Client Secret is invalid or missing" }),

    /* -----------------------------------------------------------------------------------------------
     * Database URL
     * -----------------------------------------------------------------------------------------------*/

    DATABASE_URL: z
      .string()
      .min(1, { message: "Database URL is invalid or missing" }),

    /* -----------------------------------------------------------------------------------------------
     * Upstash Rate Limiting (Redis)
     * -----------------------------------------------------------------------------------------------*/

    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
    ENABLE_RATE_LIMITING: z.coerce.boolean().default(false),
    RATE_LIMITING_REQUESTS_PER_SECOND: z.coerce.number().default(50),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   * For Next.js >= 13.4.4, you only need to destructure client variables (Only valid for `experimental__runtimeEnv`)
   */
  experimental__runtimeEnv: {
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },

  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
