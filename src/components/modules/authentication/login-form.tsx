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
import { env } from '@/env';
import { authClient } from '@/lib/auth-client';

import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import * as z from 'zod';

const loginSchema = z.object({
    email: z.email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters')
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        },

        validators: {
            onSubmit: loginSchema
        },

        onSubmit: async ({ value }) => {
            const toastId = toast.loading('Logging in...');

            try {
                const { error } = await authClient.signIn.email({
                    email: value.email.trim(),
                    password: value.password
                });

                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }

                toast.success('Logged in successfully!', {
                    id: toastId
                });

                // Better Auth manages the session.
                // Redirect to the dashboard if needed.
            } catch (error) {
                console.error('Login error:', error);

                toast.error('Something went wrong. Please try again.', {
                    id: toastId
                });
            }
        }
    });

    const handleGoogleLogin = async () => {
        try {
            const { error } = await authClient.signIn.social({
                provider: 'google',
                callbackURL: env.NEXT_PUBLIC_APP_URL
            });

            if (error) {
                toast.error(error.message);
            }
        } catch (error) {
            console.error('Google login error:', error);

            toast.error('Google login failed. Please try again.');
        }
    };

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email and password to access your account.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id="login-form"
                    onSubmit={event => {
                        event.preventDefault();
                        event.stopPropagation();
                        form.handleSubmit();
                    }}>
                    <FieldGroup>
                        <form.Field
                            name="email"
                            children={field => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="email"
                                            placeholder="john@example.com"
                                            autoComplete="email"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={event =>
                                                field.handleChange(event.target.value)
                                            }
                                            aria-invalid={isInvalid}
                                        />

                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />

                        <form.Field
                            name="password"
                            children={field => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="password"
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={event =>
                                                field.handleChange(event.target.value)
                                            }
                                            aria-invalid={isInvalid}
                                        />

                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter className="flex flex-col justify-end gap-4">
                <form.Subscribe
                    selector={state => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button
                            form="login-form"
                            type="submit"
                            className="w-full"
                            disabled={!canSubmit || isSubmitting}>
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </Button>
                    )}
                />

                <Button
                    className="w-full"
                    onClick={handleGoogleLogin}
                    variant="outline"
                    type="button">
                    Continue with Google
                </Button>
            </CardFooter>
        </Card>
    );
}
