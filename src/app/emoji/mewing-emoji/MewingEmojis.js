"use client"

import React, { useState, useCallback } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';


const symbols = [

    // Cat emojis (20+)
    '🐱', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🐈', '🐈‍⬛',
    '🐾', '🐅', '🐆', '🦁', '🐯', '🦒', '🦝', '🦊', '🦁‍⬛', '🐱‍👤', '🐱‍🚀', '🐱‍🐉', '🐱‍👓', '🐱‍💻',
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



                <Link href="/emoji/skull-emoji" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Skull Emoji
                </Link>

                <Link href="/emoji/dot-emoji" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Dot Emoji
                </Link>




            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Fire and Extensive Cat emojis</h3>
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
                <h1 className="pt-2 font-semibold text-xl">Mewing Emoji: Exploring Facial Expression Trends</h1>
                <p className="pt-4">In the ever-evolving world of digital communication, emojis have become an integral part of how we express ourselves online. One particular trend that has caught the attention of internet users is the &ldquo;mewing emoji.&rdquo; This article will delve into the fascinating world of mewing emojis, including their use in popular platforms like Roblox and how to easily copy and paste them for your own use.</p>

                <h2 className="pt-4 font-semibold text-xl">What is Mewing?</h2>
                <p className="pt-4">Before we dive into mewing emojis, it&apos;s essential to understand what mewing actually is. Mewing is a technique named after British orthodontist Dr. John Mew, which involves proper tongue posture to potentially improve facial structure and breathing. The practice has gained popularity on social media platforms, leading to the creation of mewing-related emojis.</p>

                <h2 className="pt-4 font-semibold text-xl">Mewing Emoji: Expressing Facial Posture Digitally</h2>
                <p className="pt-4">Mewing emojis are visual representations of the mewing technique, typically showing a face with a pronounced jawline or a tongue pressed against the roof of the mouth. These emojis have become a shorthand way for people to communicate about mewing or to express a strong, defined facial structure.</p>
                <p className="pt-2">Example of a textual mewing emoji: ( ͡° ͜ʖ ͡°)</p>
                <p className="pt-4">This emoji, known as the &ldquo;Lenny Face,&rdquo; is often used to represent a mewing expression due to its pronounced jawline.</p>

                <h2 className="pt-4 font-semibold text-xl">Mewing Roblox Emojis: Expressing Yourself in the Gaming World</h2>
                <p className="pt-4">Roblox, the popular online gaming platform, has embraced the mewing trend with its own set of emojis. These Roblox-specific mewing emojis allow players to express themselves in-game and in chat in a way that resonates with the mewing community.</p>
                <p className="pt-4">Example of a Roblox mewing emoji description:</p>
                <p className="pt-2">:mew: - This emoji might show a Roblox character with an exaggerated jawline or performing the mewing technique.</p>
                <p className="pt-4">While Roblox doesn&apos;t have an official mewing emoji, players often use custom emotes or chat symbols to convey the mewing expression.</p>

                <h2 className="pt-4 font-semibold text-xl">Mewing Emoji Copy and Paste: Easy Sharing Across Platforms</h2>
                <p className="pt-4">For those who want to use mewing emojis across various platforms, copy and paste options are available. These allow you to quickly add mewing expressions to your messages without the need for special keyboards or emoji packs.</p>
                <p className="pt-4">Examples of mewing emojis you can copy and paste:</p>
                <ul className="list-decimal list-inside pl-4 pt-2">
                    <li>ᕦ( ˘ ³˘)ᕤ - Representing strength and a defined jawline</li>
                    <li>(づ￣ ³￣)づ - Showing the tongue position in mewing</li>
                    <li>ᕙ(⇀‸↼‶)ᕗ - Emphasizing facial muscles</li>
                </ul>
                <p className="pt-4">To use these, simply copy the emoji and paste it into your desired platform or message.</p>

                <h2 className="pt-4 font-semibold text-xl">The Rise of Mewing Emojis in Digital Culture</h2>
                <p className="pt-4">Mewing emojis have gained traction across various social media platforms, becoming a part of internet slang and meme culture. They&apos;re often used in discussions about facial aesthetics, fitness, and self-improvement communities.</p>
                <p className="pt-4">The popularity of these emojis reflects a broader trend of health and wellness discussions moving into digital spaces. Users employ mewing emojis to:</p>
                <ul className="list-decimal list-inside pl-4 pt-2">
                    <li>Share progress in their mewing journey</li>
                    <li>Offer encouragement to others practicing mewing</li>
                    <li>Express admiration for defined facial features</li>
                    <li>Participate in mewing-related memes and jokes</li>
                </ul>

                <h2 className="pt-4 font-semibold text-xl">Creating Your Own Mewing Emojis</h2>
                <p className="pt-4">For the creatively inclined, making custom mewing emojis can be a fun way to express your unique take on the trend. Many platforms allow users to create and submit custom emojis, which can then be used within that platform&apos;s community.</p>
                <p className="pt-4">Steps to create a custom mewing emoji:</p>
                <ul className="list-decimal list-inside pl-4 pt-2">
                    <li>Sketch your mewing emoji design</li>
                    <li>Digitize the sketch using graphic design software</li>
                    <li>Ensure the design meets the platform&apos;s size and format requirements</li>
                    <li>Submit your emoji for approval (if required by the platform)</li>
                </ul>

                <h2 className="pt-4 font-semibold text-xl">The Impact of Mewing Emojis on Online Communication</h2>
                <p className="pt-4">Mewing emojis have added a new dimension to how we communicate about facial aesthetics and health practices online. They serve as a quick, visual way to convey complex ideas about facial structure and tongue posture.</p>
                <p className="pt-4">Benefits of using mewing emojis in online communication:</p>
                <ul className="list-decimal list-inside pl-4 pt-2">
                    <li>Simplify explanations of the mewing technique</li>
                    <li>Create a sense of community among mewing practitioners</li>
                    <li>Add humor and lightheartedness to discussions about facial aesthetics</li>
                    <li>Bridge language barriers in international mewing communities</li>
                </ul>

                <h2 className="pt-4 font-semibold text-xl">The Future of Mewing Emojis</h2>
                <p className="pt-4">As the mewing trend continues to evolve, we can expect to see more sophisticated and diverse mewing emojis emerging. Future developments might include:</p>
                <ul className="list-decimal list-inside pl-4 pt-2">
                    <li>Animated mewing emojis showing the technique in action</li>
                    <li>Personalized mewing emojis based on user facial scans</li>
                    <li>Integration of mewing emojis into health and fitness apps</li>
                    <li>AI-generated mewing emojis that adapt to individual users&apos; progress</li>
                </ul>

                <h2 className="pt-4 font-semibold text-xl">Conclusion: Embracing the Mewing Emoji Trend</h2>
                <p className="pt-4">Mewing emojis have become more than just a passing internet fad. They represent a unique intersection of health trends, digital communication, and internet culture. Whether you&apos;re a dedicated mewing practitioner or simply curious about the trend, these expressive little symbols offer a fun and engaging way to participate in the conversation.</p>
                <p className="pt-4">As we continue to navigate the ever-changing landscape of online communication, mewing emojis serve as a reminder of how our digital expressions are constantly evolving. So the next time you want to show off your jawline gains or encourage a friend in their mewing journey, remember – there&apos;s an emoji for that!</p>
            </div>

        </div>
    </>
    );
};

export default SymbolSelector;