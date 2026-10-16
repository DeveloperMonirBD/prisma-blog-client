'use client';

import { getBlogs } from '@/actions/blog.action';
import { Blog } from '@/types';
import { useEffect, useState } from 'react';

export default function AboutPage() {
    const [data, setData] = useState<Blog[] | null>(null);
    const [error, setError] = useState<Error | null>(null);

    console.log(data);

    useEffect(() => {
        (async () => {
            try {
                const { data }: { data: Blog[] | null } = await getBlogs();

                setData(data);
            } catch (err) {
                setError(err as Error);
            }
        })();
    }, []);
    return (
        <div>
            <h1>This is about page Component...</h1>
            {error && <p className="text-red-500">{error.message}</p>}
        </div>
    );
}
