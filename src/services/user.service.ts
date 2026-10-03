import { env } from '@/env';
import { cookies } from 'next/headers';

// const AUTH_URL = process.env.AUTH_URL;
const AUTH_URL = env.AUTH_URL;

export const userService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();

            if (!AUTH_URL) {
                throw new Error('NEXT_PUBLIC_AUTH_URL is not configured.');
            }

            const response = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString()
                },
                cache: 'no-store'
            });

            if (!response.ok) {
                return {
                    data: null,
                    error: {
                        message: 'Unable to get session.'
                    }
                };
            }

            const session = await response.json();

            if (!session?.user) {
                return {
                    data: null,
                    error: {
                        message: 'User is not authenticated.'
                    }
                };
            }

            return {
                data: session,
                error: null
            };
        } catch (error) {
            console.error('Get session error:', error);

            return {
                data: null,
                error: {
                    message: 'Something went wrong!'
                }
            };
        }
    }
};
