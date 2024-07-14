// src/app/textgenerator/page.js

"use client"
import ZalgoTextConverter from './ZalgoTextConverter';

export default function ZalgoTextGenerator() {
    return (
        <div className="rounded-md p-4 w-full focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-stone-100 shadow-zinc-600 h-screen">

            <ZalgoTextConverter />
        </div>
    );
}