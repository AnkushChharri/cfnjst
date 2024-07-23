"use client"


import React, { useState, useCallback } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';


const starSymbols = [
    // New circle symbols
    '✛', '✜', '✝', '✞', '✟', '✠', '✡', '✢', '✣', '✤', '✥',
    '✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '✰', '✱',
    '✲', '✳', '✴', '✵', '✶', '✷', '✸', '✹', '✺', '✻', '✼',
    '✽', '✾', '✿', '❀', '❁', '❂', '❃', '❄', '❆', '❇',
    '❈', '❉', '⁕', '⁑', '⁎', '⁜', '⁂', '☆',
    '★', '☀', '☼', '⚝', '⚹', '❋', '❊', '❅'
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
                <h1 className="pt-2 font-semibold text-xl">The Cross Symbol: A Powerful Icon of Faith and Culture</h1>
                <p className="pt-4">The cross symbol ✝️ is one of the most recognizable and meaningful icons in human history. Whether you&apos;re looking for a cross symbol to copy and paste or seeking to understand its deep significance, this post will explore the rich history and various uses of this enduring emblem. From its origins as a Christian cross symbol to its widespread cultural impact, let&apos;s delve into the world of the cross symbol.</p>

                <h1 className="pt-4 font-semibold text-xl">What is the Cross Symbol?</h1>
                <p className="pt-4">The cross symbol is a simple geometric shape consisting of two intersecting lines or bars, typically perpendicular to each other. While it has become predominantly associated with Christianity, the cross has been used in various cultures and contexts throughout history.</p>
                <p className="pt-2">Example: The most common form of the cross symbol looks like this: ✝️</p>

                <h1 className="pt-4 font-semibold text-xl">The Christian Cross Symbol: Origins and Meaning</h1>
                <p className="pt-4">For Christians worldwide, the cross symbol holds profound religious significance. It represents the crucifixion of Jesus Christ and serves as a reminder of his sacrifice and the promise of salvation.</p>
                <p className="pt-2">Example: The Christian cross is often seen atop church steeples, worn as jewelry, or displayed in homes and places of worship.</p>

                <h1 className="pt-4 font-semibold text-xl">Types of Cross Symbols</h1>
                <p className="pt-4">There are numerous variations of the cross symbol, each with its history and meaning:</p>
                <ul className="list-decimal list-inside pl-4">
                    <li>Latin Cross: The most common form, with a longer vertical beam intersected by a shorter horizontal beam.</li>
                    <li>Greek Cross: Features four equal-length arms.</li>
                    <li>Tau Cross: Shaped like the Greek letter tau (T).</li>
                    <li>Celtic Cross: A Latin cross with a circle surrounding the intersection.</li>
                    <li>Orthodox Cross: Similar to the Latin cross but with an additional smaller horizontal beam.</li>
                </ul>

                <p className="pt-4">Example: The Celtic Cross ☘️ combines Christian symbolism with ancient Celtic designs, often featuring intricate knotwork patterns.</p>

                <h1 className="pt-4 font-semibold text-xl">Cross Symbol in Different Cultures</h1>
                <p className="pt-4">While strongly associated with Christianity, the cross symbol has appeared in various cultures and belief systems:</p>

                <ul className="list-disc list-inside pl-4">
                    <li>Ancient Egypt: The ankh symbol ☥ resembles a cross with a loop at the top and represents life.</li>
                    <li>Norse mythology: Thor&apos;s hammer was often depicted as a cross-like symbol.</li>
                    <li>Native American cultures: The four directions cross symbolizes the four cardinal directions and balance in nature.</li>
                </ul>

                <p className="pt-4">Example: In Aztec culture, the cross symbol represented the meeting of the terrestrial and celestial planes, often depicted in their artwork and architecture.</p>

                <h1 className="pt-4 font-semibold text-xl">How to Use the Cross Symbol in Digital Communication</h1>
                <p className="pt-4">In today&apos;s digital age, you might want to use the cross symbol in your online communications. Here&apos;s how you can easily copy and paste cross symbols:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>Unicode cross symbol: ✝️ (U+271D)</li>
                    <li>Latin cross: † (U+2020)</li>
                    <li>Greek cross: ✚ (U+271A)</li>
                    <li>Maltese cross: ✠ (U+2720)</li>
                </ul>

                <p className="pt-4">Example: To share a message of faith, you could write: &quot;Wishing you peace and blessings ✝️&quot; using the Unicode cross symbol.</p>

                <h1 className="pt-4 font-semibold text-xl">The Cross Symbol in Art and Design</h1>
                <p className="pt-4">Throughout history, artists and designers have incorporated the cross symbol into their work, both for religious and aesthetic purposes:</p>

                <ul className="list-disc list-inside pl-4">
                    <li>Architecture: Crosses are prominent in church design, from floor plans to decorative elements.</li>
                    <li>Painting: Many renowned artworks feature the cross, such as Salvador Dalí&apos;s &quot;Christ of Saint John of the Cross.&quot;</li>
                    <li>Fashion: The cross has been used in jewelry design and as a motif in clothing.</li>
                    <li>Tattoos: Cross tattoos are popular, often symbolizing faith or personal beliefs.</li>
                </ul>

                <p className="pt-4">Example: The famous painting &quot;The Yellow Christ&quot; by Paul Gauguin features a striking yellow crucifixion scene set in the Breton countryside.</p>

                <h1 className="pt-4 font-semibold text-xl">The Cross Symbol in Popular Culture</h1>
                <p className="pt-4">The cross symbol has transcended its religious origins to become a widely recognized cultural icon:</p>

                <ul className="list-disc list-inside pl-4">
                    <li>Music: Many musicians use the cross in album artwork or stage designs.</li>
                    <li>Film and TV: Crosses often appear as plot devices or symbolic elements in various genres.</li>
                    <li>Literature: The cross symbol is prominently featured in classic and contemporary literature.</li>
                    <li>Branding: Some companies incorporate crosses into their logos or marketing materials.</li>
                </ul>

                <p className="pt-4">Example: The Red Cross organization uses a red cross on a white background as its internationally recognized symbol of humanitarian aid.</p>

                <h1 className="pt-4 font-semibold text-xl">Controversy and Sensitivity Surrounding the Cross Symbol</h1>
                <p className="pt-4">While the cross symbol holds deep meaning for many, it&apos;s important to be aware of its potential sensitivity in certain contexts:</p>

                <ul className="list-disc list-inside pl-4">
                    <li>Religious diversity: In multi-faith settings, prominent displays of the cross may be seen as exclusionary.</li>
                    <li>Historical associations: In some regions, the cross may evoke memories of colonialism or forced conversions.</li>
                    <li>Secular spaces: The use of religious symbols in public institutions can be a subject of debate.</li>
                </ul>

                <p className="pt-4">Example: Some European countries have grappled with whether to display crosses in public school classrooms, balancing cultural heritage with religious neutrality.</p>

                <h1 className="pt-4 font-semibold text-xl">Conclusion: The Enduring Power of the Cross Symbol</h1>
                <p className="pt-4">From its ancient origins to its modern-day applications, the cross symbol continues to hold significant meaning for millions of people worldwide. Whether you&apos;re using it as an expression of faith, a design element, or simply as a Unicode character to copy and paste, the cross symbol&apos;s impact on human culture is undeniable.</p>
                <p className="pt-4">As we&apos;ve explored in this post, the cross transcends its religious roots, appearing in art, design, and popular culture. Its simple yet powerful form has allowed it to adapt and persist through centuries of human history, making it one of the most recognizable symbols on Earth.</p>
                <p className="pt-4">Whether you&apos;re a believer seeking to display your faith, a designer looking to incorporate this timeless shape into your work, or simply someone interested in the rich tapestry of human symbolism, the cross symbol offers a wealth of meaning and possibilities to explore.</p>
            </div>

        </div>
    </>
    );
};

export default StarSymbolSelector;