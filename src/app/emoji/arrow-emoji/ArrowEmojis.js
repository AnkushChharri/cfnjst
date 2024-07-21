"use client"

import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';

const symbols = [
    '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️', '↔️', '↩️', '↪️',
    '⤴️', '⤵️', '🔄', '🔃', '🔂', '🔁', '🔀', '🔼', '🔽', '⏫', '⏬', '⏩', '⏪',
    '🔚', '🔙', '🔛', '🔝', '🔜', '☑️', '✅', '✔️', '❇️', '✳️', '➿', '➰', '〽️',
    '✴️', '❎', '✖️', '➕', '➖', '➗', '❌', '💠', '🔘', '🔳', '🔲', '◻️', '◼️',
    '◽', '◾', '▫️', '▪️'
];

const SymbolSelector = () => {
    const [selectedSymbols, setSelectedSymbols] = useState('');
    const [copiedSymbol, setCopiedSymbol] = useState(null);
    const textareaRef = useRef(null);

    const memoizedSymbols = useMemo(() => symbols, []);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.ctrlKey && event.key === 'v') {
                navigator.clipboard.readText().then(
                    clipText => setSelectedSymbols(prev => prev + clipText)
                );
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

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
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    return (<>
        <div className="max-w-4xl m-auto p-4">
            <div className="mb-4">
                <div className="relative p-4 rounded-md">
                    <textarea
                        ref={textareaRef}
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
                    Discord Emoji
                </Link>
                <Link href="/bullet-point-symbol" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Bullet Point Symbol
                </Link>
                <Link href="/zalgo-text" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Zalgo Text
                </Link>
            </div>

            <div className="text-center ring-cyan-300 pb-4 pt-3 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>
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
                <Link href="/emoji/dot-emoji" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Dot Emoji
                </Link>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Comprehensive Symbols</h3>
                <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-2">
                    {memoizedSymbols.map((symbol, index) => (
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
        </div>
        <div className="max-w-7xl xl:mx-auto text-left mx-4">
            <h1 className="pt-2 font-semibold text-xl">Arrow Emojis: Navigating Digital Communication with Style</h1>
            <p className="pt-1">In the vast digital communication landscape, arrow emojis are essential for guiding attention, indicating direction, and adding visual flair to our messages. These versatile symbols have become integral to expressing ourselves online, whether in casual chats, professional emails, or social media posts. Let&apos;s explore the world of arrow emojis, exploring their various types and applications.</p>

            <h2 className="pt-2 font-semibold text-lg">1. The Classic Directional Arrows: North, South, East, and West</h2>
            <p className="pt-1">The foundation of arrow emojis lies in the four cardinal directions. These simple yet effective symbols perfectly provide clear directional instructions or emphasize movement.</p>
            <p className="pt-2">Example:</p>
            <ol className="list-decimal list-inside pl-4">
                <li>⬆️ (Up Arrow): &quot;Prices are going ⬆️ this quarter.&quot;</li>
                <li>⬇️ (Down Arrow): &quot;Please scroll ⬇️ for more information.&quot;</li>
                <li>➡️ (Right Arrow): &quot;Next step ➡️ confirm your order.&quot;</li>
                <li>⬅️ (Left Arrow): &quot;⬅️ Click here to return to the homepage.&quot;</li>
            </ol>

            <h2 className="pt-2 font-semibold text-lg">2. Diagonal Arrows: Adding Depth to Your Messages</h2>
            <p className="pt-1">Diagonal arrows offer more nuanced directions, perfect for indicating specific corners or creating a sense of movement across both axes.</p>
            <p className="pt-2">Examples:</p>
            <ul className="list-disc list-inside pl-4">
                <li>↗️ (North East Arrow): &quot;Our company&apos;s growth is trending ↗️&quot;</li>
                <li>↘️ (South East Arrow): &quot;Temperatures will be dropping ↘️ overnight.&quot;</li>
                <li>↙️ (South West Arrow): &quot;Find the hidden treasure in the ↙️ corner of the map.&quot;</li>
                <li>↖️ (North West Arrow): &quot;The storm is moving ↖️ away from the coast.&quot;</li>
            </ul>

            <h2 className="pt-2 font-semibold text-lg">3. Curved Arrows: Suggesting Flow and Continuity</h2>
            <p className="pt-1">Curved arrows add a sense of fluidity to your messages, which are ideal for indicating processes, cycles, or gentle redirections.</p>
            <p className="pt-2">Example:</p>
            <ul className="list-disc list-inside pl-4">
                <li>↩️ (Leftwards Curved Arrow): &quot;↩️ Undo your last action&quot;</li>
                <li>↪️ (Rightwards Curved Arrow): &quot;Click here to ↪️ forward this email.&quot;</li>
                <li>🔄 (Clockwise Vertical Arrows): &quot;🔄 Refresh the page to see updates&quot;</li>
            </ul>

            <h2 className="pt-2 font-semibold text-lg">4. Double Arrows: Emphasizing Strong Movement or Fast Action</h2>
            <p className="pt-1">Double arrows are your go-to symbols when you need to convey a sense of speed, urgency, or significant movement.</p>
            <p className="pt-2">Examples:</p>
            <ul className="list-disc list-inside pl-4">
                <li>⏩ (Fast-Forward Button): &quot;Let&apos;s ⏩ to the important part of the meeting.&quot;</li>
                <li>⏪ (Fast Reverse Button): &quot;⏪ Rewind to the beginning of the video.&quot;</li>
                <li>⏫ (Fast Up Button): &quot;Productivity has shot ⏫ since implementing the new system.&quot;</li>
                <li>⏬ (Fast Down Button): &quot;Download speeds may be ⏬ during peak hours.&quot;</li>
            </ul>

            <h2 className="pt-2 font-semibold text-lg">5. Twisted Arrows: Indicating Exchange or Transformation</h2>
            <p className="pt-1">Twisted arrows represent exchanges, trades, or transformations in your digital communications.</p>
            <p className="pt-2">Example:</p>
            <ul className="list-disc list-inside pl-4">
                <li>🔀 (Shuffle Tracks Button): &quot;🔀 Mix up your playlist for a fresh listening experience.&quot;</li>
                <li>🔁 (Repeat Button): &quot;🔁 This process will repeat until completion.&quot;</li>
                <li>🔂 (Repeat Single Button): &quot;🔂 Click to loop this track.&quot;</li>
            </ul>

            <h2 className="pt-2 font-semibold text-lg">6. Decorative Arrows: Adding Style to Your Messages</h2>
            <p className="pt-1">Some arrow emojis are designed more for aesthetic appeal than functional direction, perfect for adding a touch of style to your text.</p>
            <p className="pt-2">Example:</p>
            <ul className="list-disc list-inside pl-4">
                <li>➰ (Curly Loop): &quot;Sign up now for our newsletter ➰ Get exclusive offers!&quot;</li>
                <li>➿ (Double Curly Loop): &quot;➿ Infinite possibilities await in our new game!&quot;</li>
                <li>✳️ (Eight Spoked Asterisk): &quot;✳️ New product alert! Check it out now!&quot;</li>
            </ul>

            <h2 className="pt-2 font-semibold text-lg">7. Specialized Arrow Symbols: Conveying Specific Actions</h2>
            <p className="pt-1">Some arrow emojis are designed for specific contexts or actions, adding precision to your communication.</p>
            <p className="pt-1">Example:</p>
            <ul className="list-disc list-inside pl-4">
                <li>🔼 (Upwards Button): &quot;🔼 Vote up this post if you found it helpful.&quot;</li>
                <li>🔽 (Downwards Button): &quot;🔽 Expand this section for more details.&quot;</li>
                <li>⤴️ (Right Arrow Curving Up): &quot;Sales have taken a sharp turn ⤴️ this month.&quot;</li>
                <li>⤵️ (Right Arrow Curving Down): &quot;Please deposit your forms in the box ⤵️&quot;</li>
            </ul>

            <p className="pt-3">Enhancing Your Digital Communication with Arrow Emojis</p>
            <p className="pt-1">Arrow emojis serve multiple purposes in our online interactions:</p>
            <ol className="list-decimal list-inside pl-4">
                <li>Clarity: They provide clear, visual directions that transcend language barriers.</li>
                <li>Emphasis: Arrows can highlight important points or calls to action.</li>
                <li>Efficiency: A single arrow can often replace several words, streamlining communication.</li>
                <li>Engagement: Visual elements like arrows can make your messages more eye-catching and memorable.</li>
            </ol>

            <p className="pt-3">To make the most of arrow emojis in your digital communication:</p>
            <ol className="list-decimal list-inside pl-4">
                <li>Context is Key: Choose arrows that match the tone and purpose of your message.</li>
                <li>Don&apos;t Overuse: While helpful, too many arrows can clutter your text. Use them judiciously.</li>
                <li>Combine with Text: Use arrows with written instructions for maximum clarity.</li>
                <li>Consider Accessibility: Remember that not all devices render emojis the same way. When in doubt, provide text alternatives.</li>
            </ol>

            <p className="pt-3">Conclusion: Pointing the Way Forward in Digital Communication</p>
            <p className="pt-1">Arrow emojis have become indispensable to our digital vocabulary, offering a visual shorthand for direction, movement, and emphasis. From simple directional indicators to stylized symbols, these versatile emojis enhance our ability to communicate clearly and engagingly in the digital realm.</p>
            <p className="pt-2">As you navigate the world of online interaction, remember that arrow emojis are powerful tools for guiding your audience, highlighting key points, and adding visual interest to your messages. Whether crafting a professional email, designing a user interface, or simply chatting with friends, the right arrow emoji can help point your communication in the right direction.</p>
            <p className="pt-2">So explore the diverse array of arrow emojis available, and watch as your digital conversations take on new life and clarity. With these dynamic symbols at your fingertips, you&apos;re well-equipped to navigate the ever-evolving digital communication landscape. Happy messaging! 🚀➡️</p>
        </div>
    </>
    );
};

export default SymbolSelector;