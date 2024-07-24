"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';

const dotSymbols = [
    // Expanded heart symbols
    '♥', '♡', '❤', '❥', '❣', '❦', '❧', '🤎', '💔', '💞', '💟',
    '💌', '💑', '💒', '💏', '👩‍❤️‍👨', '👨‍❤️‍👨', '👩‍❤️‍👩',
    '❤️‍🔥', '❣️', '💖', '💗', '💓', '💕', '❤️‍🩹', '💙', '💚', '💛', '🧡', '💜', '🤎', '🖤', '🤍',
    '💘', '💝', '💋', '💯', '💢', '💥',

    '☎', '⌛', '⌚', '☄', '✈', '⚓', '⚡', '☘', '⚘', '⚔', '⚖', '⚰', '⚱', '⚽', '⚾', '⛄', '⛅', '⛈', '⛓',
    '⛔', '⛩', '⛪', '⛰', '⛱', '⛲', '⛳', '⛴', '⛵', '⛷', '⛸', '⛹', '⛺', '⛽', '✨', '⭐',
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

                <Link href="/Symbols/dot-symbol" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Dot Symbol
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

            <div className="text-center pt-4 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>
                <Link href="/DotSymbol" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Dot Symbol
                </Link>

                <Link href="/BulletPointSymbol" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Bullet Point Symbol
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
                <h1 className="pt-2 font-semibold text-xl">Heart Symbol: Text, Copy-Paste, and More</h1>
                <p className="pt-4">The heart symbol ❤️ is one of the most recognizable and widely used symbols in digital communication. This guide will explore various aspects of the heart symbol, including its text representations, how to copy and paste it, and its significance in modern communication.</p>

                <h1 className="pt-4 font-semibold text-xl">What is the Heart Symbol?</h1>
                <p className="pt-4">The heart symbol is a graphical representation of love, affection, and emotion. In digital text, it can be expressed in various ways, from simple ASCII characters to more elaborate emoji.</p>
                <p className="pt-2">Example: ❤️ (Unicode heart emoji)</p>

                <h1 className="pt-4 font-semibold text-xl">Heart Symbol Text Representations</h1>
                <p className="pt-4">There are several ways to represent a heart using text characters:</p>

                <p className="pt-4">1. ASCII Heart: &lt;3</p>
                <p className="pt-2">Example: &quot;I &lt;3 you&quot; means &quot;I love you&quot;</p>

                <p className="pt-4">2. Unicode Heart: ♥</p>
                <p className="pt-2">Example: &quot;♥ Good morning!&quot; adds warmth to a greeting</p>

                <p className="pt-4">3. Emoji Heart: ❤️</p>
                <p className="pt-2">Example: &quot;Thank you ❤️&quot; expresses gratitude with emotion</p>

                <p className="pt-4">4. Variations: ♡, ❣️, 💗, 💓, 💖, 💘</p>
                <p className="pt-2">Example: &quot;Choose your favorite: ♡ ❣️ 💗 💓 💖 💘&quot;</p>

                <h1 className="pt-2 font-semibold text-xl">How to Copy and Paste Heart Symbols</h1>
                <p className="pt-4">Copying and pasting heart symbols is a quick and easy way to use them in your digital communications. Here&apos;s how:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>Find a heart symbol online or in this guide.</li>
                    <li>Highlight the symbol with your cursor.</li>
                    <li>Copy it (Ctrl+C on Windows, Cmd+C on Mac).</li>
                    <li>Paste it where you want to use it (Ctrl+V on Windows, Cmd+V on Mac).</li>
                </ul>

                <p className="pt-4">Example: Copy this heart ❤️ and paste it into a text message to a friend.</p>

                <h1 className="pt-2 font-semibold text-xl">Using Heart Symbols in Different Contexts</h1>
                <p className="pt-4">Heart symbols can be used in various digital contexts:</p>

                <p className="pt-4">1. Social Media</p>
                <p className="pt-2">Example: &quot;Just got engaged! 💍❤️ #LoveWins&quot;</p>

                <p className="pt-4">2. Text Messages</p>
                <p className="pt-2">Example: &quot;Missing you ❤️ Can&apos;t wait to see you!&quot;</p>

                <p className="pt-4">3. Email Signatures</p>
                <p className="pt-2">Example: &quot;Best regards, Jane ❤️&quot;</p>

                <p className="pt-4">4. Usernames</p>
                <p className="pt-2">Example: &quot;❤️_BookLover_❤️&quot;</p>

                <p className="pt-4">5. Passwords (though not recommended for security reasons)</p>
                <p className="pt-2">Example: &quot;ILove2Read❤️&quot; (Note: Use stronger passwords in practice)</p>

                <h1 className="pt-2 font-semibold text-xl">The Significance of Heart Symbols in Digital Communication</h1>
                <p className="pt-4">Heart symbols have become an integral part of online expression:</p>

                <p className="pt-4">1. Conveying Emotion: They add emotional context to text-based communication.</p>
                <p className="pt-2">Example: &quot;Congratulations! ❤️&quot; feels warmer than just &quot;Congratulations!&quot;</p>

                <p className="pt-4">2. Brevity: Heart symbols can replace words, making messages more concise.</p>
                <p className="pt-2">Example: &quot;❤️ you&quot; instead of &quot;I love you&quot;</p>

                <p className="pt-4">3. Universal Language: Heart symbols are understood across different cultures and languages.</p>
                <p className="pt-2">Example: A ❤️ reaction on a social media post is universally recognized as positive.</p>

                <p className="pt-4">4. Brand Identity: Many brands incorporate heart symbols into their logos or slogans.</p>
                <p className="pt-2">Example: &quot;I ❤️ NY&quot; is a famous tourism slogan for New York City.</p>

                <h1 className="pt-2 font-semibold text-xl">Heart Symbol Variations and Their Meanings</h1>
                <p className="pt-4">Different heart symbols can convey subtle variations in meaning:</p>

                <p className="pt-4">1. ❤️ Red Heart: Traditional love and affection</p>
                <p className="pt-2">Example: &quot;I ❤️ my family&quot;</p>

                <p className="pt-4">2. 💔 Broken Heart: Heartbreak or sadness</p>
                <p className="pt-2">Example: &quot;She left me 💔&quot;</p>

                <p className="pt-4">3. 💚 Green Heart: Nature, health, or jealousy</p>
                <p className="pt-2">Example: &quot;Let&apos;s save our planet 💚&quot;</p>

                <p className="pt-4">4. 💙 Blue Heart: Friendship or calmness</p>
                <p className="pt-2">Example: &quot;You&apos;re my best friend 💙&quot;</p>

                <p className="pt-4">5. 🖤 Black Heart: Dark humor or sorrow</p>
                <p className="pt-2">Example: &quot;My coffee, black like my soul 🖤&quot;</p>

                <h1 className="pt-2 font-semibold text-xl">Creating Heart Symbols with Keyboard Shortcuts</h1>
                <p className="pt-4">Some operating systems and applications offer keyboard shortcuts for heart symbols:</p>

                <p className="pt-4">1. On Windows: Alt + 3 (on numeric keypad) = ♥</p>
                <p className="pt-2">Example: Press Alt + 3 to get ♥</p>

                <p className="pt-4">2. On Mac: Option + Shift + K = ❤️</p>
                <p className="pt-2">Example: Press Option + Shift + K to get ❤️</p>

                <p className="pt-4">3. On iPhone: Add a heart emoji to your frequently used emoji list for quick access</p>
                <p className="pt-2">Example: Tap the emoji keyboard and find ❤️ in your frequently used section</p>

                <h1 className="pt-2 font-semibold text-xl">Conclusion</h1>
                <p className="pt-4">Heart symbols have become an essential part of digital communication, allowing us to express emotions quickly and effectively. Whether you&apos;re sending a loving message, reacting to a post, or designing a website, understanding how to use heart symbols can enhance your digital interactions.</p>
                <p className="pt-4">Remember, while heart symbols are fun and expressive, they should complement rather than replace genuine communication. Use them to add warmth and emotion to your digital conversations, but don&apos;t forget the power of words to convey deeper feelings and thoughts.</p>
                <p className="pt-4">Now that you&apos;re equipped with knowledge about heart symbols go forth and spread the love in your digital world! ❤️</p>
            </div>

        </div>
    </>
    );
};

export default DotSymbolSelector;