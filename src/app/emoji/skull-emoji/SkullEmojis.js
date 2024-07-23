"use client"

import React, { useState, useCallback } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';


const symbols = [
    // Skull emojis and related spooky symbols
    '💀', '☠️', '👽', '👾', '🤖', '🎃', '😈', '👹', '👺', '🤡', '💩', '👻',
    '🦴', '🩻', '🕷️', '🕸️', '🦇', '🧛', '🧛‍♀️', '🧛‍♂️', '🧟', '🧟‍♀️', '🧟‍♂️',
    '🪦', '⚰️', '⚱️', '🏴‍☠️', '🕯️', '🧿', '🪬', '🗿', '🤯', '🫥', '👤', '👥',
    '🦹', '🦹‍♀️', '🦹‍♂️', '🧙', '🧙‍♀️', '🧙‍♂️', '🧚', '🧚‍♀️', '🧚‍♂️',
    '🪓', '🔪', '🗡️', '⚔️', '🛡️', '🪄', '🧨', '💣', '🔮', '🕳️', '💊', '💉',
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

                <Link href="/emoji/home-emoji" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Home Emoji
                </Link>

                <Link href="/emoji/Kaomoji" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Kaomoji
                </Link>

                <Link href="/emoji/mewing-emoji" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Mewing Emoji
                </Link>



                <Link href="/emoji/dot-emoji" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Dot Emoji
                </Link>




            </div>


            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Skull and Spooky emojis</h3>
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
                <h1 className="pt-2 font-semibold text-xl">The Ultimate Guide to Skull Emoji: Meanings, Uses, and Cultural Impact</h1>
                <p className="pt-4">In the ever-evolving world of digital communication, emojis have become an integral part of how we express ourselves online. Among these, the skull emoji (💀) stands out as a versatile and widely used symbol. This comprehensive guide will explore the various aspects of the skull emoji, from its origins to its contemporary uses, and even how to easily copy and paste it into your messages.</p>

                <h1 className="pt-4 font-semibold text-xl">What is the Skull Emoji?</h1>
                <p className="pt-4">The skull emoji (💀) is a graphical representation of a human skull, typically depicted as a white or pale-colored cranium with dark eye sockets. It&apos;s part of the Unicode Standard and is available on most modern devices and platforms, including smartphones, computers, and social media sites.</p>

                <h1 className="pt-4 font-semibold text-xl">Mewing Emoji: Expressing Facial Posture Digitally</h1>
                <p className="pt-4">Mewing emojis are visual representations of the mewing technique, typically showing a face with a pronounced jawline or a tongue pressed against the roof of the mouth. These emojis have become a shorthand way for people to communicate about mewing or to express a strong, defined facial structure.</p>
                <p className="pt-4">Example: 💀 - This is how the skull emoji appears on most platforms.</p>

                <h1 className="pt-4 font-semibold text-xl">Origins and Evolution of the Skull Emoji</h1>
                <p className="pt-4">The skull emoji was approved as part of Unicode 6.0 in 2010 and added to Emoji 1.0 in 2015. Since then, it has become one of the most frequently used emojis across various digital platforms.</p>
                <p className="pt-4">Example: In early versions, the skull emoji was more cartoon-like, but it has evolved to a more realistic representation on many platforms.</p>

                <h1 className="pt-4 font-semibold text-xl">How to Copy and Paste the Skull Emoji</h1>
                <p className="pt-4">For those wondering how to easily use the skull emoji, here&apos;s a simple guide:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>Copy this: 💀</li>
                    <li>Paste it into your desired text field</li>
                </ul>

                <p className="pt-4">Example: &quot;Just finished my workout 💀&quot; - Here, the skull emoji is used to express exhaustion after exercise.</p>

                <h1 className="pt-4 font-semibold text-xl">The Many Meanings of the Skull Emoji</h1>
                <p className="pt-4">The skull emoji is remarkably versatile, with meanings that can vary widely depending on context:</p>

                <p className="pt-4">Death or danger: In its most literal sense, it can represent death or warn of danger.</p>
                <p className="pt-2">Example: &quot;Don&apos;t try this at home 💀&quot; - Warning of a dangerous activity.</p>

                <p className="pt-4">Extreme laughter: Paradoxically, it&apos;s often used to express finding something extremely funny.</p>
                <p className="pt-2">Example: &quot;That joke was hilarious 💀💀💀&quot; - Indicates laughing so hard you&apos;re &quot;dead.&quot;</p>

                <p className="pt-4">Embarrassment or cringe: It can signify feeling mortified or experiencing secondhand embarrassment.</p>
                <p className="pt-2">Example: &quot;I just tripped in front of my crush 💀&quot; - Expressing extreme embarrassment.</p>

                <p className="pt-4">Exhaustion or feeling overwhelmed: Often used to convey feeling extremely tired or stressed.</p>
                <p className="pt-2">Example: &quot;Midterms week 💀&quot; - Indicating feeling overwhelmed by exams.</p>

                <p className="pt-4">Sarcasm or irony: The skull can add a layer of dark humor or sarcasm to a message.</p>
                <p className="pt-2">Example: &quot;Another Monday 💀&quot; - Sarcastically expressing dread about the start of the work week.</p>

                <h1 className="pt-4 font-semibold text-xl">The Skull Emoji in Meme Culture</h1>
                <p className="pt-4">The skull emoji has become a staple in meme culture, often used in combination with text or other emojis to create humorous or relatable content.</p>
                <p className="pt-4">Example: The &quot;I forgor 💀&quot; meme, where &quot;forgor&quot; is a deliberate misspelling of &quot;forgot,&quot; combined with the skull emoji to humorously express forgetfulness.</p>

                <h1 className="pt-4 font-semibold text-xl">Platform Variations of the Skull Emoji</h1>
                <p className="pt-4">While the general design of the skull emoji remains consistent across platforms, there are subtle differences in its appearance:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>Apple: A realistic, off-white skull with deep eye sockets</li>
                    <li>Google: A more stylized, bright white skull with rounder features</li>
                    <li>Microsoft: A cartoon-like skull with larger eye sockets</li>
                    <li>Samsung: A detailed skull with a slightly yellowish tint</li>
                </ul>

                <p className="pt-4">Example: The skull emoji on an iPhone (Apple) might look slightly different from the one on a Samsung Galaxy (Samsung).</p>

                <h1 className="pt-4 font-semibold text-xl">The Skull Emoji on Android Devices</h1>
                <p className="pt-4">Android users have access to the skull emoji, but its appearance can vary depending on the device manufacturer and Android version.</p>
                <p className="pt-4">Example: On a Google Pixel phone, the skull emoji appears as a bright white, symmetrical skull, while on some older Android devices, it might have a more cartoon-like appearance.</p>

                <h1 className="pt-4 font-semibold text-xl">Cultural Impact and Usage Trends</h1>
                <p className="pt-4">The skull emoji has transcended its original meaning to become a cultural phenomenon:</p>

                <h1 className="pt-4 font-semibold text-xl">In social media: It&apos;s widely used on platforms like Twitter, Instagram, and TikTok to add emphasis or humor to posts.</h1>
                <p className="pt-4">Example: A trending tweet: &quot;When your favorite character dies in a TV show 💀&quot;</p>

                <h1 className="pt-4 font-semibold text-xl">In marketing: Some brands use the skull emoji in their social media strategies to appear more relatable or edgy.</h1>
                <p className="pt-4">Example: A sports brand tweeting: &quot;Our new workout plan will leave you 💀 (but in a good way)&quot;</p>

                <h1 className="pt-4 font-semibold text-xl">In fashion: The popularity of the skull emoji has influenced fashion trends, with skull motifs appearing on clothing and accessories.</h1>
                <p className="pt-4">Example: T-shirts featuring the skull emoji alongside humorous text have become popular streetwear items.</p>

                <h1 className="pt-4 font-semibold text-xl">Conclusion</h1>

                <p className="pt-4">The skull emoji (💀) has evolved from a simple representation of death to a multi-faceted symbol in digital communication. Its versatility allows it to convey a wide range of emotions and ideas, from humor to exhaustion, and its popularity in meme culture has cemented its place in modern online discourse. Whether you&apos;re expressing extreme laughter, warning of danger, or simply adding some edge to your message, the skull emoji is a powerful tool in your digital communication arsenal.</p>

                <p className="pt-4">Remember, the key to effective emoji use is context. The skull emoji&apos;s meaning can change dramatically depending on how and where it&apos;s used, so always consider your audience and the tone of your message. With this guide, you&apos;re now equipped to use the skull emoji like a pro, adding depth and nuance to your digital conversations.</p>
            </div>

        </div>
    </>
    );
};

export default SymbolSelector;