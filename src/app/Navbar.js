// components/Navbar.js
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="bg-white border-double ring-1 ring-slate-300 mt-auto relative">
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

                    {/* Toggle button on the right */}
                    <div className="absolute left-0 flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Toggle menu</span>
                            {isOpen ? (
                                <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation links */}
            {isOpen && (
                <div className="absolute top-16 left-0 bg-white border border-gray-200 rounded-bl-md shadow-lg z-10">
                    <div className="py-2 w-48">
                        <Link href="/BoldTextStyles" onClick={closeMenu} className="text-gray-700 hover:bg-gray-50 font-bold hover:text-gray-900 block px-4 py-2 text-sm">
                            Bold Text Styles
                        </Link>
                        <Link href="/BoldTextStyles/ItalicTextStyles" onClick={closeMenu} className="text-gray-700 italic hover:bg-gray-50 hover:text-gray-900 block px-4 py-2 text-sm">
                            Italic Text Styles
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}