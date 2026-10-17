'use client';

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
import { Button } from '@base-ui/react';

import { useForm } from '@tanstack/react-form';

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
        onSubmit: async ({ value }) => {
            console.log(value);
        }
    });

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="signin-form"
                    onSubmit={e => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}>
                    <FieldGroup>
                        <form.Field
                            name="name"
                            children={field => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={e => field.handleChange(e.target.value)}
                                        />
                                    </Field>
                                );
                            }}
                        />

                        <form.Field
                            name="email"
                            children={field => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>email</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={e => field.handleChange(e.target.value)}
                                        />
                                    </Field>
                                );
                            }}
                        />

                        <form.Field
                            name="password"
                            children={field => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                        <Input
                                            type="password"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={e => field.handleChange(e.target.value)}
                                        />
                                    </Field>
                                );
                            }}
                        />

                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button form="signin-form" type="submit">
                    Submit
                </Button>
            </CardFooter>
        </Card>
    );
}
