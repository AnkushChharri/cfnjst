"use client"

import React, { useState, useCallback } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';

const symbols = [
    // Moon emojis
    '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌙', '🌚', '🌛', '🌜', '🌝',
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

                <Link href="/emoji/skull-emoji" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Skull Emoji
                </Link>

                <Link href="/emoji/dot-emoji" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Dot Emoji
                </Link>




            </div>


            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Comprehensive Symbols</h3>
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
                <h1 className="pt-2 font-semibold text-xl">Moon Emoji: Lunar Phases, Full Moon, and Moon Face Emojis</h1>
                <p className="pt-4">In the vast universe of digital communication, emojis have become our celestial bodies, guiding us through conversations with their expressive charm. Among these stellar symbols, the moon emoji shines brightly, casting its gentle glow across our messages. This comprehensive guide will explore the various moon emojis, from the serene crescent to the enigmatic moon face, illuminating their meanings and optimal uses.</p>

                <h2 className="pt-4 font-semibold text-xl">Moon Phase Emojis: A Lunar Cycle in Your Messages</h2>
                <p className="pt-4">The moon phase emojis offer a unique way to express the passage of time, mood changes, or simply add a touch of nocturnal beauty to your digital conversations. Let&apos;s wax poetic about each phase:</p>

                <h3 className="pt-4 font-semibold">1. 🌑 New Moon: The journey begins with darkness, symbolizing new beginnings or the unknown.</h3>
                <p className="pt-2">Example: &quot;Starting my new diet today 🌑 Wish me luck!&quot;</p>

                <h3 className="pt-4 font-semibold">2. 🌒 Waxing Crescent Moon: A sliver of hope emerges, perfect for expressing growing optimism.</h3>
                <p className="pt-2">Example: &quot;My startup is slowly gaining traction 🌒 Things are looking up!&quot;</p>

                <h3 className="pt-4 font-semibold">3. 🌓 First Quarter Moon: Half-illuminated, this emoji represents balance or being at a crossroads.</h3>
                <p className="pt-2">Example: &quot;Halfway through the semester 🌓 Time to buckle down and study!&quot;</p>

                <h3 className="pt-4 font-semibold">4. 🌔 Waxing Gibbous Moon: Almost full, it&apos;s ideal for conveying anticipation or nearing a goal.</h3>
                <p className="pt-2">Example: &quot;Almost finished with my novel 🌔 Can&apos;t wait to share it with the world!&quot;</p>

                <h3 className="pt-4 font-semibold">5. 🌕 Full Moon: The pinnacle of lunar beauty, perfect for celebrating achievements or expressing completeness.</h3>
                <p className="pt-2">Example: &quot;Finally got my degree 🌕 Years of hard work have paid off!&quot;</p>

                <h3 className="pt-4 font-semibold">6. 🌖 Waning Gibbous Moon: Symbolizes reflection or the start of a decline.</h3>
                <p className="pt-2">Example: &quot;The party&apos;s winding down 🌖 But what a night it&apos;s been!&quot;</p>

                <h3 className="pt-4 font-semibold">7. 🌗 Last Quarter Moon: Another half-moon, but now decreasing, ideal for expressing mixed feelings.</h3>
                <p className="pt-2">Example: &quot;Bittersweet feelings as I pack for my move 🌗 Excited but gonna miss this place.&quot;</p>

                <h3 className="pt-4 font-semibold">8. 🌘 Waning Crescent Moon: The cycle nears its end, perfect for goodbyes or conclusions.</h3>
                <p className="pt-2">Example: &quot;Wrapping up this chapter of my life 🌘 Ready for what comes next.&quot;</p>

                <p className="pt-4">By incorporating these moon phase emojis into your messages, you can add depth and nuance to your digital communication, making your texts more engaging and expressive.</p>

                <h2 className="pt-4 font-semibold text-xl">Full Moon Emoji: When Your Message Needs to Shine Bright</h2>
                <p className="pt-4">The full moon emoji 🌕 deserves special attention for its versatility and visual impact. This radiant circle carries a wealth of meanings and can elevate your messages in various contexts:</p>

                <h3 className="pt-4 font-semibold">1. Completion and Achievement: Use it to highlight major accomplishments or milestones.</h3>
                <p className="pt-2">Example: &quot;After months of training, I finished my first marathon today! 🌕&quot;</p>

                <h3 className="pt-4 font-semibold">2. Beauty and Perfection: Emphasize the aesthetic appeal or flawlessness of something.</h3>
                <p className="pt-2">Example: &quot;Just saw the Taj Mahal by moonlight 🌕 Absolutely breathtaking!&quot;</p>

                <h3 className="pt-4 font-semibold">3. Clarity and Illumination: Indicate moments of realization or when things become clear.</h3>
                <p className="pt-2">Example: &quot;Finally understood that complex math problem 🌕 It all makes sense now!&quot;</p>

                <h3 className="pt-4 font-semibold">4. Emotional Intensity: Express strong feelings or heightened states of mind.</h3>
                <p className="pt-2">Example: &quot;Our first kiss under the full moon 🌕 Magical doesn&apos;t even begin to describe it.&quot;</p>

                <h3 className="pt-4 font-semibold">5. Natural Cycles and Timing: Reference lunar cycles or perfect timing.</h3>
                <p className="pt-2">Example: &quot;Planting my garden by the full moon 🌕 Here&apos;s to a bountiful harvest!&quot;</p>

                <p className="pt-4">The full moon emoji&apos;s bold, circular shape makes it stand out in text, drawing the reader&apos;s eye and adding emphasis to your message. Its association with nighttime and celestial beauty also makes it a popular choice for creating a romantic or mysterious atmosphere in your digital conversations.</p>

                <h2 className="pt-4 font-semibold text-xl">Moon Face Emoji: Adding Character to Your Lunar Expressions</h2>
                <p className="pt-4">While the standard moon emojis represent the celestial body itself, the moon face emojis infuse personality into your lunar references. These anthropomorphic moons can add humor, emotion, or whimsy to your messages:</p>

                <h3 className="pt-4 font-semibold">1. 🌚 New Moon Face: Often used playfully to suggest mischief or sly humor.</h3>
                <p className="pt-2">Example: &quot;I may have eaten the last cookie 🌚 Don&apos;t tell anyone!&quot;</p>

                <h3 className="pt-4 font-semibold">2. 🌝 Full Moon Face: Typically represents a cheerful or sometimes smugly content expression.</h3>
                <p className="pt-2">Example: &quot;Aced all my exams this semester 🌝 Feeling pretty good about myself!&quot;</p>

                <h3 className="pt-4 font-semibold">3. 🌛 First Quarter Moon Face: Can be used to express a dreamy or sleepy state.</h3>
                <p className="pt-2">Example: &quot;Staying up late to watch the meteor shower 🌛 So worth the lost sleep!&quot;</p>

                <h3 className="pt-4 font-semibold">4. 🌜 Last Quarter Moon Face: Often used to convey a sense of winding down or tiredness.</h3>
                <p className="pt-2">Example: &quot;It&apos;s been a long day, time to hit the hay 🌜 Goodnight, everyone!&quot;</p>

                <p className="pt-4">These moon face emojis allow you to personify the moon, making your messages more relatable and emotionally resonant. They&apos;re particularly useful in casual conversation, adding a touch of playfulness to your digital interactions.</p>

                <h2 className="pt-4 font-semibold text-xl">Optimizing Your Lunar Emoji Usage for Maximum Impact</h2>
                <p className="pt-4">To make the most of moon emojis in your digital communication:</p>

                <h3 className="pt-4 font-semibold">1. Context is Key: Choose the appropriate moon phase or face to match the tone and content of your message.</h3>
                <p className="pt-2">Example: Use 🌒 when talking about gradual progress, or 🌝 when sharing good news.</p>

                <h3 className="pt-4 font-semibold">2. Combine with Other Emojis: Create mini-stories or set scenes by pairing moon emojis with related symbols.</h3>
                <p className="pt-2">Example: &quot;Camping under the stars tonight ⛺🌕🏞️&quot; paints a vivid picture.</p>

                <h3 className="pt-4 font-semibold">3. Use in Sequences: Show progression or the passage of time with a series of moon phases.</h3>
                <p className="pt-2">Example: &quot;My fitness journey this year: 🌑➡️🌓➡️🌕 From couch potato to marathon runner!&quot;</p>

                <h3 className="pt-4 font-semibold">4. Enhance Text-Based Art: Incorporate moon emojis into ASCII art or emoji patterns for visual appeal.</h3>
                <p className="pt-2">Example: &quot;•*¨*•.¸¸🌕 Sweet dreams! ¸¸.•*¨*•&quot;</p>

                <h3 className="pt-4 font-semibold">5. Cultural Sensitivity: Be aware that moon symbolism varies across cultures. What&apos;s positive in one context might not be in another.</h3>

                <p className="pt-4">By thoughtfully integrating moon emojis into your digital communication, you can add layers of meaning, emotion, and visual interest to your messages. Whether you&apos;re expressing the cycles of life, the beauty of nature, or simply adding a touch of nighttime magic to your texts, these lunar symbols offer a universe of possibilities for creative and engaging online interactions.</p>
                <p className="pt-4">Remember, like the ever-changing moon itself, the world of emojis is constantly evolving. Stay curious, experiment with different combinations, and let your creativity shine as brightly as the full moon in a clear night sky. Happy messaging! 🌙✨</p>
            </div>
        </div>
    </>
    );
};

export default SymbolSelector;