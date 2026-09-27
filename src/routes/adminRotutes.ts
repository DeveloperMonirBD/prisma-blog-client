import { Route } from "@/types";

export const adminRoutes: Route[] = [
    {
        title: 'User Management',
        items: [
            {
                title: 'Admin Dashboard',
                url: '/admin-dashboard'
            },
            {
                title: 'Analytics',
                url: '/dashboard/analytics'
            }
        ]
    }
];
