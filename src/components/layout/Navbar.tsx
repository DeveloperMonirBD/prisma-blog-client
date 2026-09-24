'use client';

import { cn } from 'cn';
import { Menu } from 'lucide-react';

import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface Navbar1Props {
    className?: string;
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
        className?: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: {
            title: string;
            url: string;
        };
        signup: {
            title: string;
            url: string;
        };
    };
}

const Navbar = ({
    logo = {
        url: 'https://www.shadcnblocks.com',
        src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg',
        alt: 'logo',
        title: 'Shadcnblocks.com'
    },
    menu = [
        {
            title: 'Home',
            url: '/'
        },
        {
            title: 'Blogs',
            url: '/blogs'
        },
        {
            title: 'About',
            url: '/about'
        }
    ],
    auth = {
        login: { title: 'Login', url: '/login' },
        signup: { title: 'Register', url: '/register' }
    },
    className
}: Navbar1Props) => {
    return (
        <section className={cn('py-4', className)}>
            <div className="container mx-auto px-4">
                {/* Desktop Menu */}
                <nav className="hidden items-center justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <Link href={logo.url} className="flex items-center gap-2">
                            <Image
                                src={logo.src}
                                width={32}
                                height={32}
                                className="max-h-8 dark:invert"
                                alt={logo.alt}
                            />
                            <span className="text-lg font-semibold tracking-tighter">
                                {logo.title}
                            </span>
                        </Link>
                        <div className="flex items-center">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {menu.map(item => renderMenuItem(item))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            render={<Link href={auth.login.url} />}
                            nativeButton={false}>
                            {auth.login.title}
                        </Button>
                        <Button
                            size="sm"
                            render={<Link href={auth.signup.url} />}
                            nativeButton={false}>
                            {auth.signup.title}
                        </Button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href={logo.url} className="flex items-center gap-2">
                            <Image
                                src={logo.src}
                                width={32}
                                height={32}
                                className="max-h-8 dark:invert"
                                alt={logo.alt}
                            />
                        </Link>
                        <Sheet>
                            <SheetTrigger render={<Button variant="outline" size="icon" />}>
                                <Menu className="size-4" />
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <Link href={logo.url} className="flex items-center gap-2">
                                            <Image
                                                src={logo.src}
                                                width={32}
                                                height={32}
                                                className="max-h-8 dark:invert"
                                                alt={logo.alt}
                                            />
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 p-4">
                                    <Accordion className="flex w-full flex-col gap-4">
                                        {menu.map(item => renderMobileMenuItem(item))}
                                    </Accordion>

                                    <div className="flex flex-col gap-3">
                                        <Button
                                            variant="outline"
                                            render={<Link href={auth.login.url} />}
                                            nativeButton={false}>
                                            {auth.login.title}
                                        </Button>
                                        <Button
                                            render={<Link href={auth.signup.url} />}
                                            nativeButton={false}>
                                            {auth.signup.title}
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};

const renderMenuItem = (item: MenuItem) => {
    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                render={<Link href={item.url} />}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground">
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    return (
        <Link key={item.title} href={item.url} className="text-md font-semibold">
            {item.title}
        </Link>
    );
};

export { Navbar };
