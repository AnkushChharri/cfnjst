"use client"

import React, { useState, useCallback } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';


const starSymbols = [
    // Various straight line symbols
    '─', '━', '│', '┃', '┄', '┅', '┆', '┇', '┈', '┉', '┊', '┋', '╌', '╍', '╎', '╏',
    '═', '║', '╒', '╓', '╔', '╕', '╖', '╗', '╘', '╙', '╚', '╛', '╜', '╝', '╞', '╟',
    '╠', '╡', '╢', '╣', '╤', '╥', '╦', '╧', '╨', '╩', '╪', '╫', '╬', '—', '–', '‐',
    '⎯', '⏤', '‖', '‗', '‾', '⁠', '⁃', '⁔', '⌒', '⌜', '⌝', '⌞', '⌟', '⎰', '⎱',
];

const StarSymbolSelector = () => {
    const [selectedStars, setSelectedStars] = useState('');
    const [copiedStar, setCopiedStar] = useState(null);

    const handleStarClick = useCallback((star) => {
        setSelectedStars(prev => prev + star);
        navigator.clipboard.writeText(star)
            .then(() => {
                setCopiedStar(star);
                setTimeout(() => setCopiedStar(null), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    }, []);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(selectedStars)
            .then(() => {
                setCopiedStar('all');
                setTimeout(() => setCopiedStar(null), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    }, [selectedStars]);

    const handleClear = useCallback(() => {
        setSelectedStars('');
    }, []);

    return (<>
        <div className="max-w-4xl m-auto p-4">
            <div className="mb-4">
                <div className="relative p-4 rounded-md">
                    <textarea
                        value={selectedStars}
                        onChange={(e) => setSelectedStars(e.target.value)}
                        className="rounded-md p-4 w-full h-24 focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
                        placeholder="Click stars to add or type here"
                    />
                    <div className="absolute top-5 right-5 flex gap-2">
                        <button onClick={handleCopy} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                            <Copy size={16} />
                        </button>
                        <button onClick={handleClear} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                            <X size={16} />
                        </button>
                    </div>
                    {copiedStar === 'all' && (
                        <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded z-20">
                            Copied all stars!
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



                <Link href="/Symbols/text-symbol" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Text Symbol
                </Link>








            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Comprehensive Star Symbols</h3>
                <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-2">
                    {starSymbols.map((star, index) => (
                        <div
                            key={index}
                            className="relative flex items-center justify-center bg-white p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                            onClick={() => handleStarClick(star)}
                        >
                            <span className="text-2xl">{star}</span>
                            {copiedStar === star && (
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded">
                                    Copied!
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl xl:mx-auto text-left mx-4">
                <h1 className="pt-2 font-semibold text-xl">Straight Line Symbol: A Comprehensive Guide</h1>
                <p className="pt-4">Are you looking for information on the straight-line symbol? Whether you&apos;re a student, designer, or just curious about typography, this guide will cover everything you need to know about this versatile punctuation mark. From its various uses to how to type it on different devices, we&apos;ve got you covered.</p>

                <h2 className="pt-4 font-semibold text-xl">What is the Straight Line Symbol?</h2>
                <p className="pt-4">The straight line symbol, also known as the vertical bar or pipe symbol, is a character that looks like this: |. It&apos;s a vertical line that extends from top to bottom, typically with the same height as other text characters.</p>
                <p className="pt-2">Example: Here&apos;s the straight line symbol in action: A | B</p>

                <h2 className="pt-4 font-semibold text-xl">Uses of the Straight Line Symbol</h2>
                <p className="pt-4">The straight line symbol has several applications across various fields:</p>

                <h3 className="pt-4 font-semibold">1. Programming and Coding</h3>
                <p className="pt-4">In many programming languages, the straight line symbol represents the &quot;OR&quot; operator in logical operations.</p>
                <p className="pt-2">Example: In Python, you might see: `if x == 1 | y == 2:`</p>

                <h3 className="pt-4 font-semibold">2. Mathematics</h3>
                <p className="pt-4">Mathematicians use the straight line symbol to denote absolute value or to separate parts of an equation.</p>
                <p className="pt-2">Example: |x| represents the absolute value of x.</p>

                <h3 className="pt-4 font-semibold">3. Linguistics</h3>
                <p className="pt-4">In linguistics, it&apos;s used to separate phonetic transcriptions or to indicate a pause in speech.</p>
                <p className="pt-2">Example: The phonetic transcription of &quot;cat&quot; might look like this: /kæt|/.</p>

                <h3 className="pt-4 font-semibold">4. Data Formatting</h3>
                <p className="pt-4">The symbol is often used to separate data fields in CSV (Comma-Separated Values) files.</p>
                <p className="pt-2">Example: A CSV file might contain: `Name|Age|City.`</p>

                <h3 className="pt-4 font-semibold">5. Typography</h3>
                <p className="pt-4">In typography, it can be used as a divider between text elements.</p>
                <p className="pt-2">Example: You might see it in a menu like this: Appetizers | Main Courses | Desserts</p>

                <h2 className="pt-4 font-semibold text-xl">Conclusion</h2>
                <p className="pt-4">The straight line symbol, despite its simple appearance, plays a crucial role in various fields, from programming to literature. By understanding its uses and how to type it, you can enhance your communication in both digital and print media. Whether you&apos;re coding, writing, or designing, the straight line symbol is a versatile tool in your typography toolkit.</p>
                <p className="pt-4">Remember, context is key when using the straight-line symbol. What works in a programming context might not be appropriate in a literary one. As with all punctuation, use it judiciously to enhance, not hinder, your communication.</p>
                <p className="pt-4">Now that you&apos;re equipped with this knowledge, you can confidently use the straight line symbol in your work. Happy typing!</p>
            </div>
        </div>
    </>
    );
};

export default StarSymbolSelector;