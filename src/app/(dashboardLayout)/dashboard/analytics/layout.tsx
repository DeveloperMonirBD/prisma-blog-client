import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div>
                <Button nativeButton={false} render={<Link href="/dashboard/analytics/weekly" />}>
                    Weekly
                </Button>
                <Button nativeButton={false} render={<Link href="/dashboard/analytics/monthly" />}>
                    Monthly
                </Button>
            </div>

            {children}
        </div>
    );
}
