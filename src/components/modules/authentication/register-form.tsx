'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
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
            console.log('Submit Clicked');
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
                        console.log('Submit Clicked');
                    }}>
                    
                    <FieldGroup>

                    </FieldGroup>

                    </form>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button form='signin-form' type="submit">Submit</Button>
            </CardFooter>
        </Card>
    );
}
