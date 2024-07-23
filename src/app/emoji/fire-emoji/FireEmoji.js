"use client"

import React, { useState, useCallback } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';

const symbols = [
    // Fire emojis
    '🔥', '🧯', '🚒', '👨‍🚒', '👩‍🚒', '🚨', '💥', '🌋', '🏔️', '🌡️', '♨️',
    '💢', '💫', '🕯️', '🧨', '🎇', '🎆', '🌠', '☄️', '💞', '❤️‍🔥', '🧡',
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

                <Link href="/emoji/skull-emoji" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Skull Emoji
                </Link>

                <Link href="/emoji/dot-emoji" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Dot Emoji
                </Link>




            </div>



            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Skull, Spooky, and Fire Emojis</h3>
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
                <h1 className="pt-2 font-semibold text-xl">Fire Emoji: Igniting Your Digital Conversations</h1>
                <p className="pt-4">In the ever-evolving world of digital communication, emojis have become an essential tool for expressing emotions and adding flair to our messages. Among these vibrant symbols, the fire emoji stands out as a beacon of intensity, passion, and excitement. This comprehensive guide will explore the various aspects of the fire emoji, from its meaning and usage to practical applications in different contexts.</p>

                <h1 className="pt-4 font-semibold text-xl">Fire Emoji: Meaning and Usage</h1>
                <p className="pt-4">The fire emoji 🔥 is a versatile symbol that can represent a wide range of concepts and emotions. Its usage has evolved beyond its literal meaning of fire, making it a powerful tool in digital conversations.</p>

                <p className="pt-4">1. Excitement and Enthusiasm: Use the fire emoji to express intense excitement or approval.</p>
                <p className="pt-2">Example: &quot;Just got tickets to the sold-out concert! 🔥&quot;</p>

                <p className="pt-4">2. Indicating Popularity: Describe trending topics or viral content.</p>
                <p className="pt-2">Example: &quot;This new song is fire 🔥 Everyone&apos;s talking about it!&quot;</p>

                <p className="pt-4">3. Expressing Attraction: Convey that someone or something is attractive or &quot;hot&quot;.</p>
                <p className="pt-2">Example: &quot;Have you seen the new actor in that movie? Total heartthrob 🔥&quot;</p>

                <p className="pt-4">4. Highlighting Success: Celebrate achievements or impressive feats.</p>
                <p className="pt-2">Example: &quot;Nailed my presentation at work today 🔥 The client loved it!&quot;</p>

                <p className="pt-4">5. Emphasizing Intensity: Add emphasis to a statement or situation.</p>
                <p className="pt-2">Example: &quot;The competition is heating up 🔥 It&apos;s anyone&apos;s game now!&quot;</p>

                <p className="pt-4">By incorporating the fire emoji into your messages, you can add layers of meaning and emotion, making your digital communication more engaging and expressive.</p>

                <h1 className="pt-4 font-semibold text-xl">Fire Emoji Copy and Paste: Quick Access to Heat Up Your Messages</h1>
                <p className="pt-4">For easy access to the fire emoji, you can copy and paste it directly into your messages. Here are some popular variations:</p>

                <p className="pt-4">1. Standard Fire Emoji: 🔥</p>
                <p className="pt-2">Example: &quot;This party is lit 🔥&quot;</p>

                <p className="pt-4">2. Multiple Fire Emojis: 🔥🔥🔥</p>
                <p className="pt-2">Example: &quot;Breaking news: 🔥🔥🔥 Major scientific breakthrough announced!&quot;</p>

                <p className="pt-4">3. Fire Emoji with Other Symbols: 🔥💯</p>
                <p className="pt-2">Example: &quot;New personal best in the gym today 🔥💯&quot;</p>

                <h1 className="pt-4">To use these in your messages, simply copy the emoji and paste it into your text field. Most modern devices and platforms support emoji display, ensuring your fiery expressions come across as intended.</h1>
                <p className="pt-4">Pro Tip: Create a note on your device with frequently used emojis for quick access. This can be a real time-saver when you want to add some fire to your messages on the go!</p>

                <h1 className="pt-4 font-semibold text-xl">Fire Emoji PNG: Visual Impact in Design and Social Media</h1>
                <p className="pt-4">The fire emoji isn&apos;t just for text messages. Its visual appeal makes it a popular choice for graphic design, social media posts, and marketing materials. Here&apos;s how you can leverage fire emoji PNGs:</p>

                <p className="pt-4">1. Social Media Graphics: Incorporate the fire emoji PNG into eye-catching social media posts.</p>
                <p className="pt-2">Example: Create a &quot;Hot Deal! 🔥&quot; graphic for a sale announcement on Instagram.</p>

                <p className="pt-4">2. Website Design: Use the fire emoji to draw attention to important elements on a webpage.</p>
                <p className="pt-2">Example: Add a fire emoji next to a &quot;Trending Products&quot; section on an e-commerce site.</p>

                <p className="pt-4">3. Email Marketing: Spice up your email subject lines with a fire emoji PNG.</p>
                <p className="pt-2">Example: &quot;🔥 Flash Sale: 50% Off Everything for the Next 24 Hours!&quot;</p>

                <p className="pt-4">4. App Design: Integrate the fire emoji into user interfaces for a modern, playful touch.</p>
                <p className="pt-2">Example: Use a fire emoji to indicate &quot;hot topics&quot; in a discussion forum app.</p>

                <p className="pt-4">5. Presentation Slides: Add visual interest to your presentations with strategically placed fire emojis.</p>
                <p className="pt-2">Example: Include a fire emoji in the title slide of a presentation about &quot;Igniting Innovation in the Workplace&quot;.</p>

                <h1 className="pt-4">When using fire emoji PNGs, ensure you&apos;re using high-quality, transparent background images to maintain visual clarity across different platforms and backgrounds.</h1>

                <h1 className="pt-4 font-semibold text-xl">Fire Heart Emoji: Combining Passion and Affection</h1>
                <p className="pt-4">The fire heart emoji 🖤❤️‍🔥 (or ❤️‍🔥 on some platforms) is a powerful symbol that combines the intensity of fire with the affection represented by a heart. This emoji is perfect for expressing passionate love or burning desire.</p>

                <p className="pt-4">1. Romantic Messages: Use the fire heart emoji to add intensity to romantic expressions.</p>
                <p className="pt-2">Example: &quot;Can&apos;t wait for our date tonight ❤️‍🔥&quot;</p>

                <p className="pt-4">2. Expressing Deep Affection: Show strong feelings for friends or family.</p>
                <p className="pt-2">Example: &quot;So proud of my sister&apos;s accomplishments ❤️‍🔥 She&apos;s unstoppable!&quot;</p>

                <p className="pt-4">3. Passionate Interests: Indicate hobbies or interests you&apos;re particularly passionate about.</p>
                <p className="pt-2">Example: &quot;Just finished my latest painting ❤️‍🔥 Art is my true calling!&quot;</p>

                <p className="pt-4">4. Intense Appreciation: Express strong gratitude or admiration.</p>
                <p className="pt-2">Example: &quot;Thank you all for your support during this challenging time ❤️‍🔥 It means the world to me!&quot;</p>

                <p className="pt-4">5. Emphasizing Commitment: Highlight dedication to a cause or goal.</p>
                <p className="pt-2">Example: &quot;Working towards a sustainable future ❤️‍🔥 Every small action counts!&quot;</p>

                <p className="pt-4">The fire heart emoji adds an extra layer of emotion to your messages, making it perfect for times when a regular heart emoji just isn&apos;t enough to convey the intensity of your feelings.</p>

                <h1 className="pt-4 font-semibold text-xl">Optimizing Your Fire Emoji Usage for Maximum Impact</h1>
                <p className="pt-4">To make the most of fire emojis in your digital communication:</p>

                <p className="pt-4">1. Context is Key: Use fire emojis appropriately based on the tone and content of your message.</p>
                <p className="pt-2">Example: A professional email might use fire emojis sparingly, while a casual chat with friends could include more.</p>

                <p className="pt-4">2. Combine with Other Emojis: Create nuanced expressions by pairing fire emojis with complementary symbols.</p>
                <p className="pt-2">Example: &quot;Crushed my workout 🔥💪&quot; combines the intensity of fire with the strength emoji.</p>

                <p className="pt-4">3. Don&apos;t Overuse: While fire emojis are impactful, too many can dilute their effect. Use them strategically for emphasis.</p>
                <p className="pt-2">Example: Instead of &quot;🔥🔥🔥 Great news! 🔥🔥🔥&quot;, try &quot;Great news! 🔥 We&apos;ve reached our fundraising goal!&quot;</p>

                <p className="pt-4">4. Consider Your Audience: Different age groups and cultures may interpret emojis differently. Be mindful of your audience when using fire emojis.</p>
                <p className="pt-2">Example: A younger audience might appreciate more liberal use of fire emojis, while a more formal setting might require more restraint.</p>

                <p className="pt-4">5. Stay Updated: Emoji designs can vary slightly between platforms. Stay aware of how your fire emojis appear across different devices and applications.</p>

                <p className="pt-4">By thoughtfully integrating fire emojis into your digital communication, you can add warmth, intensity, and excitement to your messages. Whether you&apos;re expressing passion, celebrating success, or simply adding some heat to your conversations, these fiery symbols offer a dynamic way to ignite your digital interactions.</p>

                <p className="pt-4">Remember, like a well-tended flame, the art of emoji usage requires balance and care. Use your fire emojis wisely, and watch your digital conversations spark to life with energy and enthusiasm! 🔥✨</p>
            </div>
        </div>
    </>
    );
};

export default SymbolSelector;