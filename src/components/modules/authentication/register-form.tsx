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
import { checkEmail } from '@/services/user-client.service';

import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import * as z from 'zod';

const registerSchema = z.object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z.email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters')
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },

        validators: {
            onSubmit: registerSchema
        },

        onSubmit: async ({ value }) => {
            const toastId = toast.loading('Checking email...');

            try {
                const email = value.email.trim().toLowerCase();

                // Step 1: Check existing email
                const exists = await checkEmail.checkEmail(email);

                // Step 2: Stop registration if email exists
                if (exists) {
                    toast.error('This email is already registered!', {
                        id: toastId
                    });
                    return;
                }

                // Step 3: Register new user
                toast.loading('Creating your account...', {
                    id: toastId
                });

                const { error } = await authClient.signUp.email({
                    name: value.name.trim(),
                    email,
                    password: value.password
                });

                if (error) {
                    toast.error(error.message || 'Registration failed.', {
                        id: toastId
                    });
                    return;
                }

                toast.success('Account created successfully!', {
                    id: toastId
                });

                form.reset();
            } catch (error) {
                console.error('Registration error:', error);

                toast.error(
                    error instanceof Error
                        ? error.message
                        : 'Something went wrong. Please try again.',
                    { id: toastId }
                );
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
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id="register-form"
                    onSubmit={event => {
                        event.preventDefault();
                        event.stopPropagation();
                        form.handleSubmit();
                    }}>
                    <FieldGroup>
                        <form.Field
                            name="name"
                            children={field => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="text"
                                            placeholder="John Doe"
                                            autoComplete="name"
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
                                            placeholder="At least 8 characters"
                                            autoComplete="new-password"
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
                            form="register-form"
                            type="submit"
                            className="w-full"
                            disabled={!canSubmit || isSubmitting}>
                            {isSubmitting ? 'Creating account...' : 'Register'}
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
