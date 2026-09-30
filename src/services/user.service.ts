import { cookies } from 'next/headers';

export const userService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();

            const API_URL = process.env.NEXT_PUBLIC_API_URL;

            if (!API_URL) {
                throw new Error('NEXT_PUBLIC_API_URL is not configured.');
            }

            const response = await fetch(`${API_URL}/api/auth/get-session`, {
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
