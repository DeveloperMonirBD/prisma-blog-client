'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import { z } from 'zod';

const blogSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, 'Title must be at least 3 characters')
        .max(200, 'Title must be less than 200 characters'),
    content: z
        .string()
        .trim()
        .min(10, 'Content must be at least 10 characters')
        .max(5000, 'Content must be less than 5000 characters'),
    tags: z.string()
});

export default function CreateBlogFormClient() {
    const form = useForm({
        defaultValues: {
            title: '',
            content: '',
            tags: ''
        },
        validators: {
            onSubmit: blogSchema
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading('Creating blog...');

            try {
                const blogData = {
                    title: value.title.trim(),
                    content: value.content.trim(),
                    tags: [
                        ...new Set(
                            value.tags
                                .split(',')
                                .map(tag => tag.trim())
                                .filter(Boolean)
                        )
                    ]
                };

                console.log(blogData);

                // TODO: Send blogData to your API

                toast.success('Blog created successfully!', {
                    id: toastId
                });
            } catch {
                toast.error('Something went wrong!', {
                    id: toastId
                });
            }
        }
    });

    return (
        <Card className="mx-auto w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Create Blog</CardTitle>
                <CardDescription>Write and publish your blog here.</CardDescription>
            </CardHeader>

            <form
                id="blog-form"
                onSubmit={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}>
                <CardContent>
                    <FieldGroup>
                        {/* Title */}
                        <form.Field
                            name="title"
                            children={field => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Title</FieldLabel>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="Enter blog title"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={e => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                        />

                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />

                        {/* Content */}
                        <form.Field
                            name="content"
                            children={field => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Content</FieldLabel>

                                        <Textarea
                                            id={field.name}
                                            name={field.name}
                                            placeholder="Write your blog content (at least 10 characters)"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={e => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            rows={8}
                                            className="min-h-48 resize-y"
                                        />

                                        <p className="text-xs text-muted-foreground">
                                            {field.state.value.length}/5000 characters
                                        </p>

                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />

                        {/* Tags */}
                        <form.Field
                            name="tags"
                            children={field => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Tags</FieldLabel>

                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        placeholder="nextjs, typescript, web development"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={e => field.handleChange(e.target.value)}
                                    />

                                    <p className="text-xs text-muted-foreground">
                                        Separate tags with commas.
                                    </p>
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </CardContent>

                <CardFooter className="mt-4">
                    <Button type="submit" className="w-full" disabled={form.state.isSubmitting}>
                        {form.state.isSubmitting ? 'Creating...' : 'Create Blog'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
