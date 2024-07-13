// src/app/textgenerator/page.js

"use client"
import UnicodeNameConverter from './UnicodeNameConverter';

export default function FancyTextGenerator() {
    return (
        <div className="rounded-md p-4 w-full focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600">

            <UnicodeNameConverter />
        </div>
    );
}