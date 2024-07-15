// components/Navbar.js
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white ring-1 ring-slate-200 mt-auto relative">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-center">
                    {/* Logo centered */}
                    <Link href="/" className="flex items-center">
                        <img
                            alt="Your Company"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            className="h-8 w-auto"
                        />
                    </Link>

                    {/* Just a simple button */}

                </div>
            </div>
        </nav>
    );
}
