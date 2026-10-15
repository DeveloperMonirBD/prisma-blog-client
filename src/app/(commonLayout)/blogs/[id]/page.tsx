//! This can be used only in client components
// import { useParams } from 'next/navigation';

import { blogService } from '@/services/blog.service';
import { ArrowLeft, CalendarDays, Eye, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Controls whether dynamic routes not returned by generateStaticParams()
// are allowed to be rendered on demand.
export const dynamicParams = true;

// Generates static parameters for the first 3 blog posts at build time.
// These blog pages can be pre-rendered during the production build.
export async function generateStaticParams(): Promise<{ id: string }[]> {
    const { data } = await blogService.getBlogs();

    return (
        data?.slice(0, 3).map((blog: { id: string }) => ({
            id: blog.id
        })) ?? []
    );
}

// Server Component: fetches the blog post using the ID from the URL.
// In Next.js 16, params is a Promise, so we await it before accessing ID.
export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
    // const { id } = useParams(); // client component hook

    const { id } = await params;

    // Fetches the selected blog post from the backend API.
    const { data, error } = await blogService.getBlogById(id);

    // Displays a fallback UI if the blog post is missing or the request fails.
    if (error || !data) {
        return (
            <main className="container mx-auto px-4 py-16">
                <div className="mx-auto max-w-xl rounded-xl border p-8 text-center">
                    <h1 className="text-2xl font-bold">Blog Not Found</h1>
                    <p className="mt-3 text-muted-foreground">
                        The blog post you are looking for does not exist or could not be loaded.
                    </p>

                    {/* Allows users to navigate back to the blog listing page. */}
                    <Link
                        href="/"
                        className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
                        <ArrowLeft className="size-4" />
                        Back to Blogs
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="container mx-auto max-w-4xl px-4 py-10">
            {/* Provides navigation back to the blog listing page. */}
            <Link
                href="/"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                <ArrowLeft className="size-4" />
                Back to Blogs
            </Link>

            <article>
                {/* Displays the blog thumbnail when an image is available. */}
                {data.thumbnail && (
                    <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl bg-muted">
                        <Image
                            src={data.thumbnail}
                            alt={data.title}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 896px"
                            className="object-cover"
                        />
                    </div>
                )}

                <header>
                    {/* Highlights featured blog posts. */}
                    {data.isFeatured && (
                        <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                            Featured
                        </span>
                    )}

                    {/* Renders blog tags when at least one tag exists. */}
                    {data.tags && data.tags.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                            {data.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Displays the blog post title. */}
                    <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{data.title}</h1>

                    {/* Displays publication date, view count, and comment count. */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-b pb-6 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-2">
                            <CalendarDays className="size-4" />
                            {new Date(data.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>

                        <span className="inline-flex items-center gap-2" title="Views">
                            <Eye className="size-4" />
                            {data.views}
                        </span>

                        <span className="inline-flex items-center gap-2" title="Comments">
                            <MessageCircle className="size-4" />
                            {data._count?.comments ?? 0}
                        </span>
                    </div>
                </header>

                {/* Preserves line breaks and spacing in the blog content. */}
                <div className="py-8">
                    <p className="whitespace-pre-wrap text-base leading-8 text-foreground/90 md:text-lg">
                        {data.content}
                    </p>
                </div>
            </article>
        </main>
    );
}
