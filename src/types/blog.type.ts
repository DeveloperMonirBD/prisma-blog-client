export type BlogStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface Blog {
    id: string;
    title: string;
    content: string;
    thumbnail: string | null;
    isFeatured: boolean;
    status: BlogStatus;
    tags?: string[];
    views: number;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    _count?: {
        comments: number;
    };
}

export interface BlogMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface BlogApiResponse {
    success: boolean;
    message: string;
    meta: BlogMeta;
    data: Blog[];
}
