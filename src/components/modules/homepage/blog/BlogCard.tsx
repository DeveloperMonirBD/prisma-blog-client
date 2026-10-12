import { blogService } from '@/services/blog.service';

export default async function BlogCard() {
    const {
        data: posts,
        meta,
        error
    } = await blogService.getBlogs(
        {
            isFeatured: true,
            search: 'fafa'
        },
        {
            revalidate: 60
        }
    );

    if (error) {
        return (
            <section className="container mx-auto px-4 py-10">
                <div className="rounded-xl border p-8 text-center">
                    <h2 className="text-2xl font-semibold">Something went wrong!</h2>

                    <p className="mt-2 text-muted-foreground">{error.message}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="container mx-auto px-4 py-10">
            {/* Header */}
            <div className="mb-8">
                <p className="mb-2 text-sm font-medium text-primary">Our Blog</p>

                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Latest Blog Posts</h1>

                <p className="mt-3 max-w-2xl text-muted-foreground">
                    Explore our latest articles, tutorials, and insights about modern web
                    development and technology.
                </p>

                {meta && (
                    <p className="mt-4 text-sm text-muted-foreground">
                        Showing {posts?.length ?? 0} of {meta.total} posts
                    </p>
                )}
            </div>

            {/* Empty State */}
            {!posts?.length ? (
                <div className="rounded-xl border px-6 py-16 text-center">
                    <h2 className="text-xl font-semibold">No posts found</h2>

                    <p className="mt-2 text-muted-foreground">
                        There are no blog posts available right now.
                    </p>
                </div>
            ) : (
                /* Blog Cards */
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map(post => (
                        <article
                            key={post.id}
                            className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg">
                            {/* Thumbnail */}
                            {post.thumbnail && (
                                <div className="relative aspect-video overflow-hidden bg-muted">
                                    {/* <Image
                                        src={post.thumbnail}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    /> */}
                                </div>
                            )}

                            {/* Content */}
                            <div className="flex flex-1 flex-col p-5">
                                {/* Featured Badge */}
                                {post.isFeatured && (
                                    <span className="mb-3 w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                        Featured
                                    </span>
                                )}

                                {/* Tags */}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {post.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Title */}
                                <h2 className="line-clamp-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                                    {post.title}
                                </h2>

                                {/* Description */}
                                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                                    {post.content}
                                </p>

                                {/* Footer */}
                                <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4 text-sm text-muted-foreground">
                                    <span className="inline-flex items-center gap-1.5">
                                        <span>{post.views}</span>
                                        <span>views</span>
                                    </span>

                                    <span className="inline-flex items-center gap-1.5">
                                        <span>{post._count?.comments ?? 0}</span>
                                        <span>comments</span>
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
