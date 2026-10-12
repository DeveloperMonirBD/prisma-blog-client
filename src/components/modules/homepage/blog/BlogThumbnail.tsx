'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BlogThumbnailProps {
    src: string | null;
    alt: string;
}

export default function BlogThumbnail({ src, alt }: BlogThumbnailProps) {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return null;
    }

    return (
        <div className="relative aspect-video overflow-hidden bg-muted">
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setHasError(true)}
            />
        </div>
    );
}
