import { env } from '@/env';
import { Blog, BlogApiResponse, BlogMeta } from '@/types';

type BlogServiceResult = {
    data: Blog[] | null;
    meta: BlogMeta | null;
    error: { message: string } | null;
};

export const blogService = {
    getBlogs: async function (): Promise<BlogServiceResult> {
        try {
            const response = await fetch(`${env.API_URL}/posts`, {
                cache: 'no-store'
            });

            if (!response.ok) {
                return {
                    data: null,
                    meta: null,
                    error: {
                        message: `Failed to fetch posts. Status: ${response.status}`
                    }
                };
            }

            const result: BlogApiResponse = await response.json();

            return {
                data: result.data,
                meta: result.meta,
                error: null
            };
        } catch (error) {
            console.error('Get posts error:', error);

            return {
                data: null,
                meta: null,
                error: {
                    message: error instanceof Error ? error.message : 'Something went wrong!'
                }
            };
        }
    }
};
