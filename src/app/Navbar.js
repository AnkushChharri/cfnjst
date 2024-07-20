// components/Navbar.js
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white ring-1 ring-slate-200 mt-auto relative">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-center">

                    {/* FontsCopy Logo centered */}
                    <Link href="/" className="flex items-center">
                        <svg xmlns="http://www.w3.org/svg" viewBox="0 0 300 100" className="h-10 w-auto">

                            <text x="10" y="70" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="bold">
                                <tspan fill="#333333">Fonts</tspan><tspan fill="#4a90e2">Copy</tspan>
                            </text>
                            <path d="M250 30 L270 30 L270 70 L290 70" stroke="#4a90e2" strokeWidth="4" fill="none" />

                        </svg>
                    </Link>

                    {/* Just a simple button */}

                </div>
            </div>
        </nav>
    );
}