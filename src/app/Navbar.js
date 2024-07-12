// components/Navbar.js
"use client";

import React from 'react';

export default function Navbar() {
    return (
        <nav className="bg-white border-double ring-1 ring-slate-300 mt-auto">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-center">
                    <div className="flex flex-shrink-0 items-center">
                        <a href="/" className="flex items-center justify-center">
                            <img
                                alt="Your Company"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                className="h-8 w-auto"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}