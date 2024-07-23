"use client"

import React, { useState, useCallback } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';

const symbols = [
    // Dot emojis and Symbols (20+)
    '•', '·', '○', '●', '◌', '◯', '☉', '⊙', '⊚', '◎', '◉', '◍',
    '◐', '◑', '◒', '◓', '◔', '◕', '◖', '◗', '❍', '￮', '✪', '✫', '✬',
    '✭', '✮', '✯', '✰', '⊛', '⊜', '⊝', '⋅', '∘', '∙', '⦁', '⏺', '🔘',
    '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚫', '⚪', '🔹', '🔸',
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

                <Link href="/emoji/skull-emoji" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Skull Emoji
                </Link>






            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Fire, Dot, and Various Symbols</h3>
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

            <div class="max-w-7xl xl:mx-auto text-left mx-4">
                <h1 class="pt-2 font-semibold text-xl">The Ultimate Guide to Dot Emoji: From Red Dots to Easy Copy and Paste</h1>
                <p class="pt-4">Have you ever wondered about those tiny circular symbols popping up in your text messages and social media posts? Welcome to the world of dot emojis! In this comprehensive guide, we&apos;ll explore everything you need to know about dot emojis, with a special focus on the popular red dot emoji and how to easily copy and paste these versatile symbols.</p>

                <h2 class="pt-4 font-semibold text-xl">What Are Dot Emojis?</h2>
                <p class="pt-4">Dot emojis, also known as circle emojis, are simple yet powerful symbols used in digital communication. These small, circular icons come in various colors and serve multiple purposes in our online conversations.</p>
                <p class="pt-2">Example: The basic dot emoji looks like this: ⚫</p>

                <h2 class="pt-4 font-semibold text-xl">The Red Dot Emoji: A Standout Among Dots</h2>
                <p class="pt-4">Among the variety of dot emojis available, the red dot emoji holds a special place. Its vibrant color makes it an eye-catching choice for many users.</p>
                <p class="pt-2">Example: Here&apos;s the red dot emoji: 🔴</p>

                <h2 class="pt-4 font-semibold text-xl">Uses of the Red Dot Emoji</h2>
                <ul class="list-decimal list-inside pl-4">
                    <li>Emphasis: Use it to draw attention to important points in your text.</li>
                    <li>Lists: Create visually appealing bullet points for your lists.</li>
                    <li>Design: Add a pop of color to your digital designs or social media posts.</li>
                </ul>
                <p class="pt-4">Example: &quot;🔴 Don&apos;t forget to bring your passport!&quot;</p>

                <h2 class="pt-4 font-semibold text-xl">How to Copy and Paste Dot Emojis</h2>
                <p class="pt-4">One of the best things about dot emojis is how easy they are to use. Here&apos;s a simple guide to copy and paste these useful symbols:</p>
                <ul class="list-decimal list-inside pl-4">
                    <li>Find a reliable emoji website or use your device&apos;s emoji keyboard.</li>
                    <li>Locate the dot emoji you want to use.</li>
                    <li>Copy the emoji by highlighting it and using Ctrl+C (Windows) or Cmd+C (Mac).</li>
                    <li>Paste the emoji into your desired text field using Ctrl+V (Windows) or Cmd+V (Mac).</li>
                </ul>
                <p class="pt-4">Example: Try copying and pasting this dot emoji: ⚪</p>

                <h2 class="pt-4 font-semibold text-xl">Popular Dot Emojis and Their Meanings</h2>
                <p class="pt-4">Let&apos;s explore some of the most commonly used dot emojis and what they typically represent:</p>
                <ul class="list-decimal list-inside pl-4">
                    <li>⚫ Black Circle: Often used for emphasis or as a bullet point.</li>
                    <li>⚪ White Circle: Can represent purity or simplicity.</li>
                    <li>🔵 Blue Circle: Sometimes used to indicate coldness or calmness.</li>
                    <li>🟢 Green Circle: Often associated with &quot;go&quot; or positivity.</li>
                    <li>🟡 Yellow Circle: Can represent happiness or caution.</li>
                </ul>
                <p class="pt-4">Example: &quot;The traffic light showed 🔴🟡🟢 in sequence.&quot;</p>

                <h2 class="pt-4 font-semibold text-xl">Dot Emojis in Different Contexts</h2>
                <p class="pt-4">Dot emojis are versatile and can be used in various contexts:</p>
                <ul class="list-decimal list-inside pl-4">
                    <li>Business Communication: Use them to create clear, visually appealing lists in presentations or emails.</li>
                    <li>Social Media: Add a pop of color to your posts or stories with strategically placed dot emojis.</li>
                    <li>Personal Messaging: Express emotions or add emphasis to your text messages.</li>
                </ul>
                <p class="pt-4">Example: &quot;Our company values: 🔵 Integrity 🔵 Innovation 🔵 Teamwork&quot;</p>

                <h2 class="pt-4 font-semibold text-xl">Combining Dot Emojis with Other Symbols</h2>
                <p class="pt-4">Get creative by combining dot emojis with other symbols to create unique expressions:</p>
                <ul class="list-decimal list-inside pl-4">
                    <li>🔴💬 Red dot with speech bubble: Urgent message</li>
                    <li>⚫🎵 Black dot with musical note: New song release</li>
                    <li>🟢✅ Green dot with checkmark: Task completed</li>
                </ul>
                <p class="pt-4">Example: &quot;🟢✅ Project finished ahead of schedule!&quot;</p>

                <h2 class="pt-4 font-semibold text-xl">Dot Emoji Trends and Future</h2>
                <p class="pt-4">As emojis continue to evolve, we can expect to see new variations and uses for dot emojis:</p>
                <ul class="list-decimal list-inside pl-4">
                    <li>Customizable Colors: Some platforms now allow users to adjust the color of dot emojis.</li>
                    <li>Animated Dots: Animated versions of dot emojis are becoming popular in GIFs and stickers.</li>
                    <li>3D Dots: With advancements in display technology, we might see more realistic, 3D dot emojis in the future.</li>
                </ul>
                <p class="pt-4">Example: Imagine a pulsating red dot emoji to indicate an urgent notification: [🔴] (Animated)</p>

                <h2 class="pt-4 font-semibold text-xl">Accessibility and Dot Emojis</h2>
                <p class="pt-4">When using dot emojis, it&apos;s important to consider accessibility:</p>
                <ul class="list-decimal list-inside pl-4">
                    <li>Screen Readers: Ensure that your use of dot emojis doesn&apos;t interfere with screen reader functionality.</li>
                    <li>Color Blindness: Be mindful that not all users can distinguish between different colored dots.</li>
                    <li>Alternative Text: When possible, provide alternative text descriptions for dot emojis in your content.</li>
                </ul>
                <p class="pt-4">Example: Instead of just &quot;🔴&quot;, you could write &quot;🔴 (red dot) Important deadline approaching&quot;</p>

                <h2 class="pt-4 font-semibold text-xl">Conclusion: The Power of the Dot Emoji</h2>
                <p class="pt-4">From the striking red dot emoji to the ease of copying and pasting these versatile symbols, dot emojis have become an integral part of our digital communication. Whether you&apos;re emphasizing a point, creating a visually appealing list, or adding a splash of color to your online presence, dot emojis offer a simple yet effective way to enhance your messages.</p>
                <p class="pt-4">Remember, the key to using dot emojis effectively is to keep it simple and relevant. Don&apos;t overuse them, but don&apos;t be afraid to get creative either. With this guide, you&apos;re now equipped to navigate the world of dot emojis like a pro!</p>
                <p class="pt-4">So go ahead, give that red dot emoji a try in your next message and watch how it transforms your digital communication! 🔴</p>
            </div>

        </div>
    </>
    );
};

export default SymbolSelector;