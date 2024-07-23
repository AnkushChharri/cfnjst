"use client"

import React, { useState, useCallback } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';


const symbols = [
    // Home and building emojis
    '🏠', '🏡', '🏘️', '🏚️', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨', '🏩', '🏪', '🏫',
    '🏬', '🏭', '🏯', '🏰', '💒', '🗼', '🗽', '⛪', '🕌', '🕍', '⛩️', '🕋', '⛲',
    '⛺', '🏕️', '🏙️', '🌆', '🌇', '🌃', '🌉', '🌁',
    // Household items and furniture
    '🛋️', '🪑', '🚪', '🪟', '🛏️', '🛌', '🧸', '🪆', '🖼️', '🛍️', '🛒', '🧺', '🧴',
    '🧷', '🧹', '🧼', '🪣', '🧽', '🪒', '🧯', '🧲', '🧰', '🗄️', '🗑️', '📦',
    // Home activities and comfort
    '🛀', '🧖', '🧘', '🍽️', '🍴', '🥄', '🔪', '🏺', '🌂', '🧳', '📱', '💻', '🖥️',
    '📺', '🎮', '🕯️', '💡', '🔦', '🧾', '💰', '💳', '🔑', '🗝️',
    // Family and pets
    '👨‍👩‍👧‍👦', '👩‍👩‍👧‍👦', '👨‍👨‍👧‍👦', '👪', '🐕', '🐈', '🐠', '🦜', '🐇'
];

const SymbolSelector = () => {
    const [selectedSymbols, setSelectedSymbols] = useState('');
    const [copiedSymbol, setCopiedSymbol] = useState(null);

    const handleSymbolClick = useCallback((symbol) => {
        setSelectedSymbols(prev => prev + symbol);
        navigator.clipboard.writeText(symbol)
            .then(() => {
                setCopiedSymbol(symbol);
                setTimeout(() => setCopiedSymbol(null), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    }, []);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(selectedSymbols)
            .then(() => {
                setCopiedSymbol('all');
                setTimeout(() => setCopiedSymbol(null), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    }, [selectedSymbols]);

    const handleClear = useCallback(() => {
        setSelectedSymbols('');
    }, []);

    return (<>
        <div className="max-w-4xl m-auto p-4">
            <div className="mb-4">
                <div className="relative p-4 rounded-md">
                    <textarea
                        value={selectedSymbols}
                        onChange={(e) => setSelectedSymbols(e.target.value)}
                        className="rounded-md p-4 w-full h-24 focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
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
                        <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded z-20">
                            Copied all symbols!
                        </div>
                    )}
                </div>
            </div>

            <div className="text-center pb-1 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>

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

                <Link href="/emoji/arrow-emoji" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Arrow Emoji
                </Link>



                <Link href="/emoji/moon-emoji" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Moon Emoji
                </Link>

                <Link href="/emoji/fire-emoji" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Fire Emoji
                </Link>

                <Link href="/emoji/heart-emoji" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Heart Emoji
                </Link>



                <Link href="/emoji/Kaomoji" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Kaomoji
                </Link>

                <Link href="/emoji/mewing-emoji" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Mewing Emoji
                </Link>

                <Link href="/emoji/skull-emoji" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Skull Emoji
                </Link>

                <Link href="/emoji/dot-emoji" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Dot Emoji
                </Link>




            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Home and Household Emojis</h3>
                <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-2">
                    {symbols.map((symbol, index) => (
                        <div
                            key={index}
                            className="relative flex items-center justify-center bg-white p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                            onClick={() => handleSymbolClick(symbol)}
                        >
                            <span className="text-2xl">{symbol}</span>
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
                <h1 className="pt-2 font-semibold text-xl">Home Emoji: Your Digital Welcome Mat 🏠</h1>
                <p className="pt-4">In our increasingly digital world, emojis have become a universal language. Among these tiny icons, the home emoji stands out as a symbol of comfort, belonging, and shelter. This post will explore everything you need to know about the home emoji, from its meaning to its various uses and how to easily copy and paste it into your messages.</p>

                <h2 className="pt-4 font-semibold text-xl">What is the Home Emoji? 🏡</h2>
                <p className="pt-4">The home emoji, typically depicted as a simple house with a triangular roof and rectangular base, represents a dwelling place. It&apos;s a digital icon that conveys the concept of home, shelter, or residence in a single, easily recognizable symbol.</p>
                <p className="pt-2">Example: When telling a friend you&apos;ve arrived safely after a trip, you might text: &quot;Finally made it 🏠&quot;</p>

                <h2 className="pt-2 font-semibold text-xl">The Many Faces of the Home Emoji 🏘️</h2>
                <p className="pt-4">While the basic house emoji 🏠 is the most common, there are several variations:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>House with Garden 🏡</li>
                    <li>House Buildings 🏘️</li>
                    <li>Derelict House 🏚️</li>
                    <li>Classical Building 🏛️</li>
                </ul>

                <p className="pt-4">Example: Describing your neighborhood: &quot;Our street has a mix of homes 🏠🏡🏘️&quot;</p>

                <h2 className="pt-4 font-semibold text-xl">Welcome Home Emoji: Creating a Warm Digital Greeting 👋🏠</h2>
                <p className="pt-4">Combining the home emoji with other icons can create a warm, welcoming message. The &quot;welcome home&quot; emoji combination typically uses the waving hand emoji alongside the house.</p>
                <p className="pt-2">Example: Greeting someone returning from a trip: &quot;👋🏠 Welcome back! Hope you had a great vacation!&quot;</p>

                <h2 className="pt-2 font-semibold text-xl">Home Emoji Copy and Paste: Quick and Easy Usage 📋🏠</h2>
                <p className="pt-4">For those looking to quickly use the home emoji, here&apos;s how you can copy and paste it:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>House: 🏠</li>
                    <li>House with Garden: 🏡</li>
                    <li>Houses: 🏘️</li>
                    <li>Derelict House: 🏚️</li>
                    <li>Classical Building: 🏛️</li>
                </ul>

                <p className="pt-4">Simply highlight the emoji you want, copy it, and paste it into your desired text field.</p>
                <p className="pt-4">Example: Sharing your new address: &quot;Just moved! My new place 🏠 is at 123 Oak Street.&quot;</p>

                <h2 className="pt-2 font-semibold text-xl">The Versatility of the Home Emoji: Beyond Just Houses 🌐🏠</h2>
                <p className="pt-4">The home emoji isn&apos;t just for literal houses. It can represent various concepts related to home and belonging:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>Hometown: &quot;Back to my roots 🏠&quot;</li>
                    <li>Comfort zone: &quot;Reading is my 🏠&quot;</li>
                    <li>Website homepage: &quot;Check our 🏠 page for updates&quot;</li>
                    <li>Family: &quot;Nothing beats 🏠 for the holidays&quot;</li>
                </ul>

                <p className="pt-4">Example: Expressing homesickness: &quot;Missing my 🏠 and family while traveling 🧳&quot;</p>

                <h2 className="pt-2 font-semibold text-xl">Home Emoji in Different Contexts: From Personal to Professional 💼🏠</h2>
                <p className="pt-4">The home emoji finds its place in various settings:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>Personal messages: &quot;Can&apos;t wait to get 🏠 and relax&quot;</li>
                    <li>Real estate: &quot;New listings 🏠🏡 available now!&quot;</li>
                    <li>Travel: &quot;🏠➡️🏨 Off on a business trip&quot;</li>
                    <li>Work-from-home culture: &quot;Another day at the 🏠 office&quot;</li>
                </ul>

                <p className="pt-4">Example: In a work context: &quot;Team meeting at 3 PM. Join from 🏠 or office.&quot;</p>

                <h2 className="pt-2 font-semibold text-xl">The Psychology Behind the Home Emoji: Why We Love It ❤️🏠</h2>
                <p className="pt-4">The home emoji resonates with many because it taps into our fundamental need for shelter and belonging. It evokes feelings of:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>Safety</li>
                    <li>Comfort</li>
                    <li>Family</li>
                    <li>Identity</li>
                    <li>Roots</li>
                </ul>

                <p className="pt-4">Example: Expressing contentment: &quot;Nothing beats the feeling of being 🏠 sweet 🏠&quot;</p>

                <h2 className="pt-2 font-semibold text-xl">Home Emoji Across Platforms: A Universal Symbol 🌐🏠</h2>
                <p className="pt-4">While the basic concept remains the same, the home emoji may appear slightly different across various platforms and devices:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>Apple: A simple, cartoon-style house</li>
                    <li>Google: A more detailed, colorful house</li>
                    <li>Microsoft: A basic house with blue roof</li>
                    <li>Samsung: A house with a chimney</li>
                </ul>

                <p className="pt-4">Despite these slight variations, the message remains clear across all platforms.</p>
                <p className="pt-2">Example: &quot;No matter what device you&apos;re on, 🏠 always means home!&quot;</p>

                <h2 className="pt-2 font-semibold text-xl">Creative Uses of the Home Emoji: Beyond the Obvious 🎨🏠</h2>
                <p className="pt-4">Get creative with the home emoji in your digital communications:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>As a verb: &quot;Let&apos;s 🏠 this project&quot; (meaning to complete or settle)</li>
                    <li>In idioms: &quot;🏠 is where the ❤️ is&quot;</li>
                    <li>For emphasis: &quot;I&apos;m staying 🏠🏠🏠 this weekend&quot;</li>
                    <li>In visual puns: &quot;🏠🎵&quot; (house music)</li>
                </ul>

                <p className="pt-4">Example: Planning a housewarming: &quot;🎉🏠 Party at my new place this Saturday!&quot;</p>

                <h2 className="pt-2 font-semibold text-xl">Conclusion: The Home Emoji - Small Icon, Big Impact 🌟🏠</h2>

                <p className="pt-4">From a simple representation of a house to a symbol of comfort, belonging, and identity, the home emoji has secured its place in our digital vocabulary. Whether you&apos;re welcoming someone back, discussing real estate, or simply expressing your love for home, this tiny icon packs a powerful punch.</p>

                <p className="pt-4">Remember, in the vast landscape of digital communication, the home emoji stands as a beacon of warmth and familiarity. So the next time you want to add a touch of homeliness to your message, don&apos;t forget to include this charming little house 🏠. After all, there&apos;s no place like home – even in the digital world!</p>
            </div>

        </div>

    </>
    );
};

export default SymbolSelector;