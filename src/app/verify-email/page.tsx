'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [message, setMessage] = useState('Verifying your email...');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function verifyEmail() {
            if (!token) {
                setMessage('Verification token is missing.');
                setLoading(false);
                return;
            }

            try {
                const { error } = await authClient.verifyEmail({
                    query: { token }
                });

                if (error) {
                    setMessage(error.message || 'Email verification failed. Please try again.');
                } else {
                    setMessage('Your email has been verified successfully!');
                }
            } catch {
                setMessage('Something went wrong. Please try again.');
            } finally {
                setLoading(false);
            }
        }

        void verifyEmail();
    }, [token]);

    return (
        <main className="flex min-h-screen items-center justify-center p-6">
            <div className="w-full max-w-md rounded-xl border p-8 text-center">
                <h1 className="mb-4 text-2xl font-bold">Email Verification</h1>

                <p>{message}</p>

                {loading && <p className="mt-3 text-sm text-muted-foreground">Please wait...</p>}
            </div>
        </main>
    );
}
