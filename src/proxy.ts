import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { Roles } from './constants/roles';
import { userService } from './services/user.service';

export async function proxy(request: NextRequest) {
    const { data } = await userService.getSession();

    // let isAuthenticated = false;
    // let isAdmin = false;

    const isAuthenticated = Boolean(data?.user);
    const isAdmin = data?.user?.role === Roles.admin;

    const { pathname } = request.nextUrl;

    // User is not authenticated
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Admin dashboard protection
    if (pathname.startsWith('/admin-dashboard') && !isAdmin) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // if (data && data.user) {
    //     isAuthenticated = true;
    //     isAdmin = data.user.role === Roles.admin;
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin-dashboard/:path*']
};
