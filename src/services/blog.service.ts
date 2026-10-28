import { env } from '@/env';
import { Blog, BlogApiResponse, BlogMeta, GetBlogsParams, ServiceOptions } from '@/types';

type BlogServiceResult = {
    data: Blog[] | null;
    meta: BlogMeta | null;
    error: { message: string } | null;
};

//* No Dynamic and No {cache: 'no-store'} : SSG -> Statistic Page Generation
//* Dynamic and {cache: 'no-store'} : SSR -> Server Side Rendering(Dynamic Page Generation)
//* next: { revalidate: 60 } : ISR -> Mixed Static and Server Side Rendering (Incremental Static Regeneration)

export const blogService = {
    // Get all blogs with optional filters and service options
    getBlogs: async function (
        params?: GetBlogsParams,
        options?: ServiceOptions
    ): Promise<BlogServiceResult> {
        try {
            const url = new URL(`${env.API_URL}/posts`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== '') {
                        url.searchParams.append(key, String(value));
                    }
                });
            }

            const config: RequestInit = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            if (options?.cache) {
                config.cache = options.cache;
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate };
            }

            config.next = { ...config.next, tags: ['blogPosts'] };

            // const response = await fetch(url.toString(), {
            //     next: {
            //         tags: ["blogPosts"],
            //     }
            // });

            const response = await fetch(url.toString(), config);

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
    },

    // Get a single blog by ID
    getBlogById: async function (id: string): Promise<{
        data: Blog | null;
        error: { message: string } | null;
    }> {
        try {
            const url = new URL(`${env.API_URL}/posts/${id}`);

            const config: RequestInit = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const response = await fetch(url.toString(), config);

            if (!response.ok) {
                return {
                    data: null,
                    error: {
                        message: `Failed to fetch blog. Status: ${response.status}`
                    }
                };
            }

            const result = await response.json();

            return {
                data: result.data,
                error: null
            };
        } catch (error) {
            console.error('Get blog by ID error:', error);

            return {
                data: null,
                error: {
                    message: error instanceof Error ? error.message : 'Something went wrong!'
                }
            };
        }
    }
};
