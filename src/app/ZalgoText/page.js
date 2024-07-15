// src/app/textgenerator/page.js

"use client"
import ZalgoTextConverter from './ZalgoTextConverter';

export default function ZalgoTextGenerator() {
    return (
        <div className="p-4 min-h-screen">

            <ZalgoTextConverter />
        </div>
    );
}