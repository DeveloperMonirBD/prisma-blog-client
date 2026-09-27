import { Route } from "@/types";

export const userRoutes: Route[] = [
    {
        title: 'Blog Management',
        items: [
            {
                title: 'User Dashboard',
                url: '/user-dashboard'
            },
            {
                title: 'Write Blog',
                url: '/dashboard/write-blog'
            }
        ]
    }
];
