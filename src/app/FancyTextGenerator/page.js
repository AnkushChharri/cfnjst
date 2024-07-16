// src/app/textgenerator/page.js


import UnicodeNameConverter from './UnicodeNameConverter';

export default function FancyTextGenerator() {
    return (
        <div className="p-4 bg-stone-100 min-h-screen">

            <UnicodeNameConverter />
        </div>
    );
}