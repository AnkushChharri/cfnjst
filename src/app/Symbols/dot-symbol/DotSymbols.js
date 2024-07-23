"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';

const dotSymbols = [
    // Basic dots
    '•', '·', '∙', '⋅', '‧', '⦁',
    // Geometric shapes
    '○', '◌', '◍', '◎', '●', '◐', '◑', '◒', '◓', '◔', '◕', '◦', '◯',
    // Small geometric shapes
    '▪', '▫', '▴', '▵', '▸', '▹', '▾', '▿', '◂', '◃', '◊', '◦',
    // Bullet variations
    '⁃', '‣', '⁌', '⁍',
    // Mathematical symbols
    '∘', '⨀', '⦿', '⊙', '⊚', '⊛', '⊝', '◉',
    // Dingbats
    '✶', '✱', '✲', '✳', '✴', '✵', '✶', '✷', '✸', '✹', '✺', '❉', '❋', '☸',
    // Miscellaneous symbols
    '☉', '⊗', '⊜', '⍟', '⎊', '⎉',
    // Braille patterns
    '⠁', '⠂', '⠃', '⠄', '⠅',
    // Enclosed alphanumerics
    '⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩',
    '⓿', '❶', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾', '❿',
    // Emoji
    '🔴', '🔵', '⚪', '⚫', '🟣', '🟢', '🟡', '🟠', '🟤',
    // Supplemental arrows
    '◄', '►', '◅', '▻', '◈', '◇', '◆',
    // Miscellaneous technical
    '⌾', '⍎', '⍕', '⎕',
    // Geometric shapes extended
    '🞆', '🞈', '🞉', '🞊',
    // Misc symbols and arrows
    '⯃', '⯂', '⯁', '⯀',
    // Mathematical alphanumeric symbols
    '𝟎', '𝟏', '𝟐', '𝟑', '𝟒', '𝟓', '𝟔', '𝟕', '𝟖', '𝟗'
];

const DotSymbolSelector = () => {
    const [selectedDots, setSelectedDots] = useState('');
    const [copiedDot, setCopiedDot] = useState(null);
    const [isProtected, setIsProtected] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const handleDotClick = useCallback((dot) => {
        if (isProtected) return;

        setIsProtected(true);
        setSelectedDots(prev => prev + dot);
        navigator.clipboard.writeText(dot)
            .then(() => {
                setCopiedDot(dot);
                setTimeout(() => setCopiedDot(null), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err))
            .finally(() => {
                setTimeout(() => setIsProtected(false), 100);
            });
    }, [isProtected]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(selectedDots)
            .then(() => {
                setCopiedDot('all');
                setTimeout(() => setCopiedDot(null), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    }, [selectedDots]);

    const handleClear = useCallback(() => {
        setSelectedDots('');
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const stickyBox = document.getElementById('sticky-box');
            if (stickyBox) {
                if (window.pageYOffset > 100) {
                    stickyBox.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'z-10');
                    setIsSticky(true);
                } else {
                    stickyBox.classList.remove('fixed', 'top-0', 'left-0', 'right-0', 'z-10');
                    setIsSticky(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (<>
        <div className="max-w-7xl m-auto p-4">
            <div id="sticky-box" className="mb-4 transition-all duration-300">
                <div className="relative p-4 rounded-md">
                    <textarea
                        value={selectedDots}
                        onChange={(e) => setSelectedDots(e.target.value)}
                        className="rounded-md p-4 w-full focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
                        placeholder="Click dots to add or type here"
                    />
                    <div className="absolute top-5 right-5 flex gap-2">
                        <button onClick={handleCopy} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                            <Copy size={16} />
                        </button>
                        <button onClick={handleClear} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                            <X size={16} />
                        </button>
                    </div>
                    {copiedDot === 'all' && (
                        <div className={`absolute ${isSticky ? 'bottom-[-2rem]' : 'top-[-2rem]'} left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded z-20`}>
                            Copied all dots!
                        </div>
                    )}
                </div>
            </div>

            <div className="text-center pt-4 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>

                <Link href="/" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Fancy Font
                </Link>

                <Link href="/discord-emoji" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Discord Emojis
                </Link>

                <Link href="/emoji/arrow-emoji" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Arrow Emoji
                </Link>

                <Link href="/bullet-point-symbol" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Bullet Point Symbol
                </Link>

                <Link href="/zalgo-text" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Zalgo Text
                </Link>

            </div>

            <div className="text-center ring-cyan-300 pb-4 pt-3 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>

                <Link href="/Symbols/aesthetic-symbols" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Aesthetic Symbols
                </Link>



                <Link href="/bullet-point-symbol" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Bullet Point Symbol
                </Link>



                <Link href="/Symbols/circle-symbol" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Circle Symbol
                </Link>

                <Link href="/Symbols/cross-symbol" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Cross Symbol
                </Link>



                <Link href="/Symbols/heart-symbol" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Heart Symbol
                </Link>

                <Link href="/Symbols/star-symbol" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Star Symbol
                </Link>

                <Link href="/Symbols/straight-lines-symbol" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Straight Line Symbol
                </Link>

                <Link href="/Symbols/text-symbol" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Text Symbol
                </Link>








            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Comprehensive Dot Symbols</h3>
                <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-20 lg:grid-cols-25 gap-2">
                    {dotSymbols.map((dot, index) => (
                        <div
                            key={index}
                            className="relative flex items-center justify-center bg-white p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                            onClick={() => handleDotClick(dot)}
                        >
                            <span className="text-lg">{dot}</span>
                            {copiedDot === dot && (
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded">
                                    Copied!
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="max-w-7xl xl:mx-auto text-left mx-4">
                <h1 className="pt-2 font-semibold text-xl">The Dot Symbol: A Tiny Mark with Massive Impact</h1>
                <p className="pt-4">The dot symbol, also known as a period or full stop, is a small yet powerful punctuation mark used in various contexts. This humble character plays a crucial role in written communication, digital technology, and even mathematics. In this comprehensive guide, we&apos;ll explore the many uses of the dot symbol, how to copy and paste it, and its significance across different fields.</p>

                <h2 className="pt-4 font-semibold text-xl">What is a Dot Symbol?</h2>
                <p className="pt-4">A dot symbol is a small, circular mark typically used in writing and various other applications. It&apos;s one of the most basic and versatile punctuation marks in the English language and many other writing systems.</p>
                <p className="pt-2">Example: The dot at the end of this sentence is a dot symbol.</p>

                <h2 className="pt-4 font-semibold text-xl">How to Type a Dot Symbol</h2>
                <p className="pt-4">Typing a dot symbol is straightforward on most devices:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>On a standard keyboard, press the period (.) key.</li>
                    <li>On mobile devices, tap the period (.) button on the on-screen keyboard.</li>
                </ul>

                <p className="pt-4">Example: To type &quot;www.example.com,&quot; you would press the period key three times.</p>

                <h2 className="pt-4 font-semibold text-xl">Dot Symbol Copy and Paste</h2>
                <p className="pt-4">For situations where you need to insert a dot symbol quickly, here are some options to copy and paste:</p>

                <ol className="list-disc list-inside pl-4">
                    <li>Standard dot: .</li>
                    <li>Middle dot: ·</li>
                    <li>Bullet point: •</li>
                </ol>

                <p className="pt-4">Example: Copy this middle dot · and paste it into your document for a distinctive separator.</p>

                <h2 className="pt-4 font-semibold text-xl">Uses of the Dot Symbol in Writing</h2>
                <h3 className="pt-4 font-semibold">1. End of Sentence</h3>
                <p className="pt-4">The primary use of a dot symbol in writing is to mark the end of a sentence.</p>
                <p className="pt-2">Example: The sun is shining. Birds are singing.</p>

                <h3 className="pt-4 font-semibold">2. Abbreviations</h3>
                <p className="pt-4">Dots are used in many abbreviations, especially in titles and names.</p>
                <p className="pt-4">Example: Dr. Smith visited Mr. Johnson at 3 p.m.</p>

                <h3 className="pt-4 font-semibold">3. Ellipsis</h3>
                <p className="pt-4">Three consecutive dots form an ellipsis, indicating an omission or pause.</p>
                <p className="pt-4">Example: She thought about it and then said, &quot;Well...&quot;</p>

                <h2 className="pt-4 font-semibold text-xl">The Dot Symbol in Mathematics</h2>
                <p className="pt-4">In mathematics, the dot symbol serves several important functions:</p>

                <h3 className="pt-4 font-semibold">1. Decimal Point</h3>
                <p className="pt-4">It separates the integer part from the fractional part of a number.</p>
                <p className="pt-4">Example: The value of pi to two decimal places is 3.14.</p>

                <h3 className="pt-4 font-semibold">2. Multiplication</h3>
                <p className="pt-4">A dot between numbers or variables can indicate multiplication.</p>
                <p className="pt-4">Example: 3 · 4 = 12</p>

                <h3 className="pt-4 font-semibold">3. Dot Product</h3>
                <p className="pt-4">In vector algebra, a dot between vectors represents the dot product operation.</p>
                <p className="pt-4">Example: If a = (1, 2, 3) and b = (4, 5, 6), then a · b = 1(4) + 2(5) + 3(6) = 32</p>

                <h2 className="pt-4 font-semibold text-xl">Conclusion</h2>
                <p className="pt-4">The dot symbol, despite its small size, plays an enormous role in our written and digital lives. From ending sentences to separating domain names, from mathematical operations to cultural symbols, the dot is truly a versatile character. Understanding its various uses can help improve communication and appreciation for this tiny but mighty symbol.</p>
                <p className="pt-4">Remember, whether you&apos;re writing an email, solving a math problem, or designing a website, the humble dot is there to help clarify and structure your work. So, the next time you see or use a dot, take a moment to appreciate its significance in our complex world of symbols and communication.</p>
            </div>

        </div>
    </>
    );
};

export default DotSymbolSelector;