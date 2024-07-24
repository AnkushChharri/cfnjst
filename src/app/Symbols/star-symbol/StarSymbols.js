"use client"

import React, { useState, useCallback } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';


const starSymbols = [
    // Basic stars
    '⭐',
    // Outlined and filled stars
    '⁂', '⁎', '⁑',
    // Religious and cultural stars
    '☪', '✴', '✵', '✡', '᯾',
    // Decorative and special stars
    '❋', '❊', '❉', '❈', '❇', '❆', '❅', '❄',
    // Geometric stars
    '✻', '✼', '✽', '✾', '✿', '❀', '❁',
    // Star-related emojis
    '🌟', '💫', '🔯', '🌠', '🌃', '🌌', '🚀',
    // Sparkles and star-like symbols
    '✨', '🎇', '🎆',
    // Additional unicode stars
    '🟊', '🟋', '⯪', '⯫', '⯬', '⯭', '⛤', '⛥', '⛦', '⛧',
    // Circled stars
    '✪', '✫', '✬', '✭', '✮', '✯', '✰',
    // Black stars
    '★', '✶', '✷', '✸', '✹', '✺',
    // White stars
    '☆', '✧', '✦', '✥', '✤', '✣', '✢',
    // Rotated stars
    '⋉', '⋊', '⋋', '⋌', '⍟', '⎈',
    // Mathematical stars
    '⋆', '∗'
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



                <Link href="/Symbols/straight-lines-symbol" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Straight Line Symbol
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
                <h1 className="pt-2 font-semibold text-xl">Star Symbol: Everything You Need to Know</h1>
                <p className="pt-4">Are you looking for the perfect star symbol to add a touch of sparkle to your text? Look no further! This comprehensive guide will walk you through everything you need to know about star symbols, including how to copy and paste them, their various uses, and where to find them. Whether you&apos;re a social media enthusiast, a writer, or just someone who loves adding a little pizzazz to your messages, this post has got you covered.</p>

                <h1 className="pt-4 font-semibold text-xl">What is a Star Symbol?</h1>
                <p className="pt-4">A star symbol is a typographic character that represents the shape of a star. It&apos;s widely used in various contexts, from rating systems to decorative elements in text. The most common star symbol is the five-pointed star (★), but there are many variations available.</p>
                <p className="pt-2">Example: The basic star symbol (★) is often used in product reviews, like this: &quot;This product deserves a solid ★★★★★ rating!&quot;</p>

                <h1 className="pt-4 font-semibold text-xl">Star Symbol Copy and Paste</h1>
                <p className="pt-4">One of the easiest ways to use star symbols is by copying and pasting them. Here&apos;s a collection of popular star symbols you can use:</p>

                <ol className="list-disc list-inside pl-4">
                    <li>★ (Black Star)</li>
                    <li>☆ (White Star)</li>
                    <li>✦ (Black Four Pointed Star)</li>
                    <li>✧ (White Four Pointed Star)</li>
                    <li>✯ (Pinwheel Star)</li>
                    <li>✰ (Shadowed White Star)</li>
                </ol>

                <p className="pt-4">Example: To create a festive header for a party invitation, you could use: &quot;✰✰✰ Join Us for a Night Under the Stars! ✰✰✰&quot;</p>

                <h1 className="pt-4 font-semibold text-xl">Uses of Star Symbols in Various Contexts</h1>
                <p className="pt-4">Star symbols have a wide range of applications across different fields:</p>

                <p className="pt-4">1. Ratings and Reviews: The five-star rating system is ubiquitous in product and service reviews.</p>
                <p className="pt-2">Example: &quot;Our hotel received a ★★★★☆ rating on TripAdvisor.&quot;</p>

                <p className="pt-4">2. Astronomy and Astrology: Star symbols are used to represent celestial bodies and constellations.</p>
                <p className="pt-2">Example: &quot;The Big Dipper constellation contains seven bright stars: ★★★★★★★&quot;</p>

                <p className="pt-4">3. Military and Law Enforcement: Stars often denote rank or achievement.</p>
                <p className="pt-2">Example: &quot;The police chief wore a badge with five gold stars: ★★★★★&quot;</p>

                <p className="pt-4">4. Text Decoration: Stars add visual interest to text in various forms of communication.</p>
                <p className="pt-2">Example: &quot;✧✧✧ Breaking News ✧✧✧&quot; might be used as a header in a newsletter.</p>

                <p className="pt-4">5. Mathematics: In some contexts, stars are used as operators or to denote special properties.</p>
                <p className="pt-2">Example: &quot;In linear algebra, A* represents the conjugate transpose of matrix A.&quot;</p>

                <h1 className="pt-4 font-semibold text-xl">Star Text Symbols in Digital Communication</h1>
                <p className="pt-4">In the age of digital communication, star symbols have found new life in texting, social media, and online content:</p>

                <p className="pt-4">1. Emphasis: Stars can draw attention to important information.</p>
                <p className="pt-2">Example: &quot;✰ Don&apos;t forget to RSVP by Friday! ✰&quot;</p>

                <p className="pt-4">2. Bullet Points: Stars make for eye-catching list markers.</p>
                <p className="pt-2">Example:</p>
                <p className="pt-2">&quot;★ Buy groceries</p>
                <p className="pt-2">★ Schedule dentist appointment</p>
                <p className="pt-2">★ Call mom&quot;</p>

                <p className="pt-4">3. Hashtags: Adding star symbols to hashtags can make them stand out.</p>
                <p className="pt-2">Example: &quot;#★StarGazing&quot; or &quot;#NightSky✰&quot;</p>

                <p className="pt-4">4. Emojis: While not technically text symbols, star emojis are widely used and easily accessible.</p>
                <p className="pt-2">Example: &quot;Just saw a shooting star! 🌠 Make a wish!&quot;</p>

                <h1 className="pt-4 font-semibold text-xl">Finding and Using Star Symbols Online</h1>
                <p className="pt-4">There are several resources available for finding and using star symbols:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>Unicode Charts: The official Unicode website provides a comprehensive list of star symbols.</li>
                    <li>Symbol Libraries: Websites like Coolsymbol.com or Symbl.cc offers easy copy-paste functionality for various symbols, including stars.</li>
                    <li>Keyboard Apps: Many mobile keyboard apps include symbol libraries for quick access to stars and other special characters.</li>
                </ul>

                <p className="pt-4">Example: &quot;I found this cool star symbol ✵ on Coolsymbol.com and used it in my brand logo!&quot;</p>

                <h1 className="pt-4 font-semibold text-xl">Conclusion</h1>
                <p className="pt-4">Star symbols are versatile, visually appealing, and can add a special touch to your text in various contexts. Whether you&apos;re rating a product, decorating a message, or simply expressing your love for the cosmos, there&apos;s a star symbol perfect for your needs. Remember, the key to effective use of star symbols is moderation – a few well-placed stars can enhance your text, but overuse might make it hard to read.</p>
                <p className="pt-4">Now that you&apos;re equipped with this knowledge go forth and sprinkle some stardust into your digital communications! ✨</p>
            </div>

        </div>
    </>
    );
};

export default StarSymbolSelector;