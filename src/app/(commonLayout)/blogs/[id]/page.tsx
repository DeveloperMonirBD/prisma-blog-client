//! This can be used only in client components
// import { useParams } from 'next/navigation';

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
    // const { id } = useParams(); // client component hook

    const { id } = await params;
    return <div>This is a dynamic blog page: {id}</div>;
}
