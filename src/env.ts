import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
    server: {
        DATABASE_URL: z.url(),
        OPEN_AI_API_KEY: z.string().min(1)
    },

    client: {
        NEXT_PUBLIC_APP_URL: z.url(),
        NEXT_PUBLIC_API_URL: z.url(),
        NEXT_PUBLIC_AUTH_URL: z.url(),
        NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1)
    },

    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,

        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
        NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY
    }
});
