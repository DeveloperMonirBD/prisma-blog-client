import { env } from '@/env';

const API_URL = env.NEXT_PUBLIC_APP_URL;

export const checkEmail = {
    async checkEmail(email: string): Promise<boolean> {
        const response = await fetch(`${API_URL}/users/check-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.trim().toLowerCase()
            })
        });

        const responseText = await response.text();

        if (!response.ok) {
            throw new Error(`Email check failed: HTTP ${response.status} - ${responseText}`);
        }

        const result = JSON.parse(responseText);

        return result.data.exists;
    }
};