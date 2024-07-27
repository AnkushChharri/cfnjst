'use client';

import React, { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const DOMAIN_NAME = 'fontscopy.com';

export function AddressBar() {
    const pathname = usePathname();

    // If we're on the home page, don't render anything
    if (!pathname || pathname === '/') {
        return null;
    }

    const renderPathSegments = () => {
        const segments = pathname.split('/').filter(Boolean);
        return segments.map((segment, index) => {
            const path = '/' + segments.slice(0, index + 1).join('/');
            return (
                <React.Fragment key={path}>
                    <span className="text-gray-600">/</span>
                    <Link href={path} className="hover:underline">
                        <span className="animate-[highlight_1s_ease-in-out_1] rounded-full px-1.5 py-0.5 text-gray-100">
                            {segment}
                        </span>
                    </Link>
                    {index === segments.length - 1 && <span className="text-gray-600">/</span>}
                </React.Fragment>
            );
        });
    };

    return (
        <div className="flex items-center gap-x-2 p-3.5 lg:px-5 lg:py-3 bg-gray-800 text-white">
            <div className="text-gray-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <div className="flex gap-x-1 text-sm font-medium">
                <Link href="/" className="text-gray-300 hover:underline">
                    {DOMAIN_NAME}
                </Link>
                {renderPathSegments()}
                <Suspense>
                    <Params />
                </Suspense>
            </div>
        </div>
    );
}

function Params() {
    const searchParams = useSearchParams();
    const params = [];

    searchParams?.forEach((value, key) => {
        params.push(`${key}=${value}`);
    });

    if (params.length === 0) return null;

    return (
        <div className="text-gray-400">
            <span>?</span>
            {params.join('&')}
        </div>
    );
}