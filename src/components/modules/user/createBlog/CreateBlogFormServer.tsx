import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { env } from '@/env';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = env.API_URL;

export default function CreateBlogFormServer() {
    const createBlog = async (formData: FormData) => {
        'use server';

        const title = formData.get('title')?.toString().trim() ?? '';
        const content = formData.get('content')?.toString().trim() ?? '';
        const tags = formData.get('tags')?.toString() ?? '';

        if (title.length < 3) {
            throw new Error('Title must be at least 3 characters long');
        }

        if (content.length < 10) {
            throw new Error('Content must be at least 10 characters long');
        }

        const blogData = {
            title,
            content,
            tags: tags
                .split(',')
                .map(item => item.trim())
                .filter(item => item !== '')
        };

        const cookieStore = await cookies();

        const res = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify(blogData)
        });

        // Check whether the API request succeeded
        if (!res.ok) {
            const errorText = await res.text();
            console.error('Create blog failed:', res.status, errorText);
            throw new Error(`Failed to create blog. Status: ${res.status}`);
        }

        if (res.ok) {
            revalidateTag('blogData', 'max');
            // updateTag("blogData");
        }

        // Redirect only after a successful response
        redirect('/dashboard/create-blog?success');
    };;
    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle> Create Blog</CardTitle>
                <CardDescription>You can write your blog here</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="blog-form" action={createBlog}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="title">Title</FieldLabel>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Blog Title"
                                required
                                minLength={3}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="content">Content</FieldLabel>
                            <Input
                                id="content"
                                name="content"
                                placeholder="Write your blog content (at least 10 characters)"
                                required
                                minLength={10}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="tags">Tags (comma seperated)</FieldLabel>
                            <Input id="tags" name="tags" placeholder="nextjs, web" />
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Button form="blog-form" type="submit" className="w-full">
                    Submit
                </Button>
            </CardFooter>
        </Card>
    );
}
