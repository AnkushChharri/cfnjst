"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';

const decorativeSymbols = [
    "⇢", "˗ˏˋ", "࿐ྂ", "↳", "❝", "[]", "¡!", "❞", "- ͙۪۪̥˚┊", "❛", "❜", "˚ ͙۪۪̥◌",
    "✧˚ · .", "ˏˋ°•*⁀➷", "☆", "◞♡◟", "⏝", "ꕥ", "✿", "❀", "⋆˙⟡", "━━━━", "⋆⭒˚｡⋆",
    "꒰", "꒱", "₊˚", "ᝰ", "✩", "⋆", "⭑", "･", "⁺", "⤾", "⤿", "ˊˎ-", "-ˏˊ", "⌇", "❝❞",
    "⌗", "❨", "❩", "⚘", "✎", "✧", "♡", "ღ", "ᵕ̈", "ꨄ", "⏜", "⏝", "꩜", "✮", "❁",
    "⊹", "˚", "✺", "༉", "⚛", "⋘", "⋙", "⟡", "⟢", "⟣", "❋", "❃", "✾", "⚜", "☼"
];

const DecorativeSymbolSelector = () => {
    const [selectedSymbols, setSelectedSymbols] = useState('');
    const [copiedSymbol, setCopiedSymbol] = useState(null);
    const [isProtected, setIsProtected] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const handleSymbolClick = useCallback((symbol) => {
        if (isProtected) return;

        setIsProtected(true);
        setSelectedSymbols(prev => prev + symbol);
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(symbol)
                .then(() => {
                    setCopiedSymbol(symbol);
                    setTimeout(() => setCopiedSymbol(null), 1000);
                })
                .catch(err => console.error('Failed to copy: ', err))
                .finally(() => {
                    setTimeout(() => setIsProtected(false), 100);
                });
        }
    }, [isProtected]);

    const handleCopy = useCallback(() => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(selectedSymbols)
                .then(() => {
                    setCopiedSymbol('all');
                    setTimeout(() => setCopiedSymbol(null), 1000);
                })
                .catch(err => console.error('Failed to copy: ', err));
        }
    }, [selectedSymbols]);

    const handleClear = useCallback(() => {
        setSelectedSymbols('');
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

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (<>
        <div className="max-w-7xl m-auto p-4">
            <div id="sticky-box" className="mb-4 transition-all duration-300">
                <div className="relative p-4 rounded-md">
                    <textarea
                        value={selectedSymbols}
                        onChange={(e) => setSelectedSymbols(e.target.value)}
                        className="rounded-md p-4 w-full focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
                        placeholder="Click symbols to add or type here"
                    />
                    <div className="absolute top-5 right-5 flex gap-2">
                        <button onClick={handleCopy} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                            <Copy size={16} />
                        </button>
                        <button onClick={handleClear} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                            <X size={16} />
                        </button>
                    </div>
                    {copiedSymbol === 'all' && (
                        <div className={`absolute ${isSticky ? 'bottom-[-2rem]' : 'top-[-2rem]'} left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded z-20`}>
                            Copied all symbols!
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

                <Link href="/Symbols/dot-symbol" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Dot Symbol
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


            </div>



            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Decorative Symbols</h3>
                <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-20 lg:grid-cols-25 gap-2">
                    {decorativeSymbols.map((symbol, index) => (
                        <div
                            key={index}
                            className="relative flex items-center justify-center bg-white p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                            onClick={() => handleSymbolClick(symbol)}
                        >
                            <span className="text-lg">{symbol}</span>
                            {copiedSymbol === symbol && (
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded">
                                    Copied!
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>


            <div className="max-w-7xl xl:mx-auto text-left mx-4">
                <h1 className="pt-2 font-semibold text-xl">Text Symbols: Enhance Your Digital Communication with Easy Copy and Paste</h1>
                <p className="pt-4">In the digital age, text symbols have become an integral part of our online communication. These unique characters add flair, emotion, and clarity to our messages. This comprehensive guide will explore the world of text symbols, showing you how to copy and paste them for various purposes easily.</p>

                <h2 className="pt-4 font-semibold text-xl">What Are Text Symbols?</h2>
                <p className="pt-4">Text symbols, also known as special characters or Unicode symbols, are unique characters that go beyond standard letters and numbers. They include emojis, arrows, mathematical symbols, and more. These symbols enrich our digital communication, making it more expressive and visually appealing.</p>
                <p className="pt-2">Example: ★ (star symbol) can be used to highlight important points in a message.</p>

                <h2 className="pt-4 font-semibold text-xl">Why Use Text Symbols?</h2>
                <p className="pt-4">1. Enhanced Expression: Text symbols allow you to convey emotions and ideas more vividly than plain text.</p>
                <p className="pt-2">Example: Instead of writing &ldquo;I love you,&rdquo; you can use &ldquo;I ♥ you&rdquo; for a more impactful message.</p>

                <p className="pt-4">2. Space-Saving: Some symbols can replace entire words or phrases, saving valuable character space.</p>
                <p className="pt-2">Example: Use &ldquo;→&rdquo; instead of writing &ldquo;leads to&rdquo; or &ldquo;results in.&rdquo;</p>

                <p className="pt-4">3. Visual Appeal: Symbols can make your text more attractive and engaging.</p>
                <p className="pt-2">Example: Decorate a title with ✿ flowers ✿ to create a visually pleasing effect.</p>

                <p className="pt-4">4. Universal Understanding: Many symbols are recognized across languages, facilitating global communication.</p>
                <p className="pt-2">Example: The peace symbol ☮ is universally understood, regardless of language barriers.</p>

                <h2 className="pt-4 font-semibold text-xl">Popular Categories of Text Symbols</h2>
                <h3 className="pt-4 font-semibold">Emojis</h3>
                <p className="pt-4">Emojis are perhaps the most widely used text symbols today. They add emotional context to digital conversations.</p>
                <p className="pt-2">Example: 😊 (smiling face) can convey happiness or agreement in a message.</p>

                <h3 className="pt-4 font-semibold">Arrows</h3>
                <p className="pt-4">Arrows are versatile symbols used for directions, processes, or emphasis.</p>
                <p className="pt-2">Example: Use ⇒ to indicate a logical conclusion or result in a step-by-step guide.</p>

                <h3 className="pt-4 font-semibold">Mathematical Symbols</h3>
                <p className="pt-4">These symbols are crucial for expressing mathematical concepts in digital text.</p>
                <p className="pt-2">Example: ∑ (summation symbol) can be used in mathematical discussions or data analysis contexts.</p>

                <h3 className="pt-4 font-semibold">Currency Symbols</h3>
                <p className="pt-4">Currency symbols are essential for clear communication about financial matters.</p>
                <p className="pt-2">Example: Use € to discuss prices in Euros without spelling out the currency name.</p>

                <h3 className="pt-4 font-semibold">Punctuation and Diacritical Marks</h3>
                <p className="pt-4">These symbols add nuance and correct pronunciation guides to text.</p>
                <p className="pt-2">Example: The é in &ldquo;résumé&rdquo; indicates a specific pronunciation.</p>

                <h2 className="pt-4 font-semibold text-xl">How to Copy and Paste Text Symbols</h2>
                <p className="pt-4">1. Online Symbol Libraries: Websites like Symbl.cc or CopyPasteCharacter.com offer extensive collections of symbols for easy copying.</p>
                <p className="pt-4">2. Built-in OS Tools: Most operating systems have character map utilities for inserting special symbols.</p>
                <p className="pt-2">Example: On Windows, you can use the Character Map app to find and copy symbols.</p>
                <p className="pt-4">3. Keyboard Shortcuts: Learn common shortcuts for frequently used symbols.</p>
                <p className="pt-2">Example: On Mac, Option + 2 produces the ™ symbol.</p>
                <p className="pt-4">4. Mobile Device Methods: Smartphones often have symbol libraries built into their keyboards.</p>
                <p className="pt-2">Example: On iOS, press and hold a letter to see accent options.</p>

                <h2 className="pt-4 font-semibold text-xl">Best Practices for Using Text Symbols</h2>
                <p className="pt-4">1. Context Matters: Use symbols that are appropriate for your audience and platform.</p>
                <p className="pt-2">Example: While 🍻 might be suitable for a casual chat, it&apos;s probably not appropriate for a business email.</p>
                <p className="pt-4">2. Don&apos;t Overuse: Too many symbols can make your text hard to read.</p>
                <p className="pt-2">Example: &ldquo;H€llo👋, h🅾w are ⓨ🅾u❓&rdquo; is difficult to decipher quickly.</p>
                <p className="pt-4">3. Ensure Compatibility: Check that the symbols you use are supported on the recipient&apos;s device or platform.</p>
                <p className="pt-2">Example: Some custom emojis may not display correctly across all devices.</p>
                <p className="pt-4">4. Combine with Text: Use symbols to enhance, not replace, clear written communication.</p>
                <p className="pt-2">Example: &ldquo;Please review the attached document ✍️&rdquo; uses the symbol to reinforce the message.</p>

                <h2 className="pt-4 font-semibold text-xl">Text Symbols in Various Fields</h2>
                <p className="pt-4">1. Social Media: Symbols can make your posts stand out in crowded feeds.</p>
                <p className="pt-2">Example: Use 🔥 to indicate trending topics or hot news.</p>
                <p className="pt-4">2. Academic Writing: Certain symbols are crucial in scientific and mathematical papers.</p>
                <p className="pt-2">Example: ∴ (therefore symbol) is commonly used in logical proofs.</p>
                <p className="pt-4">3. Design and Branding: Unique symbols can become part of a brand&apos;s identity.</p>
                <p className="pt-2">Example: The Apple logo (�) is a recognizable symbol associated with the brand.</p>
                <p className="pt-4">4. Coding and Programming: Many programming languages use symbols as operators.</p>
                <p className="pt-2">Example: != is used in many programming languages to denote &ldquo;not equal to.&rdquo;</p>

                <h2 className="pt-4 font-semibold text-xl">Conclusion</h2>
                <p className="pt-4">Text symbols are powerful tools for enhancing digital communication. By understanding their uses and mastering the art of copy and paste, you can elevate your online presence, express ideas more clearly, and engage more effectively with your audience. Remember to use them judiciously and appropriately to maximize their impact in your digital conversations.</p>
            </div>

        </div>
    </>
    );
};

export default DecorativeSymbolSelector;