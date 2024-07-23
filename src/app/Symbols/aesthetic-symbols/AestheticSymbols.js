"use client"

import React, { useState, useCallback } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';

const aestheticSymbols = [
    // Additional Aesthetic Symbols
    '✦', '✧', '★', '☆', '✯', '✭', '✮', '✩', '✪', '✫', '✬', '✰', '⋆', '❋', '✿', '❀',
    '❃', '❁', '✾', '✽', '✼', '✻', '✺', '✹', '✸', '✷', '✶', '✵', '✴', '❄', '❅', '❆', '☀',
    '☼', '☾', '☽', '◌', '◍', '◉', '◎', '●', '○', '◯', '❂', '☢', '☣', '⚛', '⚜', '☸',
    '✙', '✚', '✛', '✜', '✝', '✞', '✟', '†', '✠', '✡', '☥', '☦', '☧', '☨', '☩', '☫', '☬',
    '☭', '☮', '☯', '☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷', '♔', '♕', '♖', '♗', '♘', '♙',
    '♚', '♛', '♜', '♝', '♞', '♟', '♤', '♠', '♧', '♣', '♡', '♥', '♢', '♦', '♩', '♪', '♫', '♬',
    '♭', '♮', '♯', '°', '✓', '✔', '✕', '✖', '✗', '✘', '∫', '∮', '∞', '∆', '∏', '∑', '√',
    '∂', '∇', '≡', '≠', '≈', '∼', '∽', '⊕', '⊗', '⊘', '⊞', '⊟',
    '⊠', '⊡', '⋄', '⋅', '⋇', '⋈', '⋉', '⋊', '⋋', '⋌', '⋍', '⋎', '⋏', '⋐', '⋑', '⋒', '⋓',
    '⋔', '⋕', '⌘', '␣', '⎋', '⌫', '⌦', '⌧', '⌨', '⌥', '⌅', '⌆', '⌇', '⌗', '⌚', '⌛', '⌡', '⌠',
    '⟀', '⟁', '⟂', '⟃', '⟄', '⟇', '⟈', '⟉', '⟊', '⟐', '⟑', '⟒', '⟓', '⟔', '⟕', '⟖', '⟗', '⟘',
    '⟙', '⟚', '⟛', '⟜', '⟝', '⟞', '⟟', '⟠', '⟡', '⟢', '⟣', '⟤', '⟥', '⟦', '⟧', '⟨', '⟩', '⟪', '⟫'
];

const AestheticSymbolSelector = () => {
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
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Aesthetic Symbols</h3>
                <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-2">
                    {aestheticSymbols.map((symbol, index) => (
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
                <h1 className="pt-2 font-semibold text-xl">Aesthetic Symbols: Enhancing Visual Communication</h1>
                <p className="pt-4">In today&apos;s digital age, aesthetic symbols have become an integral part of our online communication. These visually appealing characters and icons add depth and nuance to our messages, allowing us to express ourselves more creatively. This comprehensive guide explores various types of aesthetic symbols, their meanings, and how to use them effectively in your digital communications.</p>

                <h2 className="pt-4 font-semibold text-xl">Aesthetic Symbols: Copy and Paste</h2>
                <p className="pt-4">One of the easiest ways to incorporate aesthetic symbols into your text is through the copy-and-paste method. Here&apos;s a collection of popular aesthetic symbols you can use:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>☾ (crescent moon)</li>
                    <li>✧ (sparkle)</li>
                    <li>♡ (heart)</li>
                    <li>☆ (star)</li>
                    <li>⚘ (flower)</li>
                    <li>◌ (dotted circle)</li>
                    <li>☁ (cloud)</li>
                </ul>

                <p className="pt-4">Example: &quot;Good night, sweet dreams ☾ ✧&quot;</p>
                <p className="pt-4">These symbols can be easily copied and pasted into your social media posts, messages, or bio sections to add a touch of visual interest.</p>

                <h2 className="pt-4 font-semibold text-xl">Aesthetic Buddhist Symbols</h2>
                <p className="pt-4">Buddhist symbols carry deep spiritual meanings and can add a sense of tranquility and mindfulness to your text. Some popular aesthetic Buddhist symbols include:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>☸ (Dharma Wheel): Represents the Buddha&apos;s teachings and the eightfold path.</li>
                    <li>☯ (Yin Yang): Symbolizes balance and harmony in life.</li>
                    <li>☮ (Peace Symbol): While not exclusively Buddhist, it&apos;s often associated with Buddhist principles of non-violence.</li>
                    <li>✿ (Lotus Flower): Represents purity, enlightenment, and rebirth.</li>
                </ul>

                <p className="pt-4">Example: &quot;Find your inner peace ☮ and strive for balance ☯ in all aspects of life.&quot;</p>

                <h2 className="pt-4 font-semibold text-xl">Creating Aesthetic Text</h2>
                <p className="pt-4">Aesthetic text goes beyond individual symbols, often incorporating unique fonts and characters to create a visually striking appearance. Here are some techniques:</p>

                <p className="pt-4">1. Use Unicode characters:</p>
                <p className="pt-2">Normal: &quot;Aesthetic&quot;</p>
                <p className="pt-2">Aesthetic: &quot;𝔸𝕖𝕤𝕥𝕙𝕖𝕥𝕚𝕔&quot;</p>

                <p className="pt-4">2. Combine symbols with text:</p>
                <p className="pt-2">&quot;⋆｡°✩ 𝒜𝑒𝓈𝓉𝒽𝑒𝓉𝒾𝒸 ✩°｡⋆&quot;</p>

                <p className="pt-4">3. Utilize spacing for effect:</p>
                <p className="pt-2">&quot;A E S T H E T I C&quot;</p>

                <p className="pt-4">Example: &quot;Welcome to my ⋆｡°✩ 𝒜𝑒𝓈𝓉𝒽𝑒𝓉𝒾𝒸 ✩°｡⋆ world!&quot;</p>

                <h2 className="pt-4 font-semibold text-xl">Meaning Behind Popular Aesthetic Symbols</h2>
                <p className="pt-4">Understanding the meaning behind aesthetic symbols can help you use them more effectively:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>☽ (Crescent Moon): Often represents night, dreams, or mysticism.</li>
                    <li>☀ (Sun): Symbolizes day, energy, or positivity.</li>
                    <li>⚘ (Flower): Can represent growth, beauty, or femininity.</li>
                    <li>☁ (Cloud): Often used to convey dreamy or whimsical thoughts.</li>
                    <li>✦ (Star): Symbolizes wishes, dreams, or aspirations.</li>
                </ul>

                <p className="pt-4">Example: &quot;Chase your dreams ✦ and embrace new beginnings ⚘&quot;</p>

                <h2 className="pt-4 font-semibold text-xl">Incorporating Aesthetic Symbols in Different Contexts</h2>
                <p className="pt-4">Aesthetic symbols can be used in various digital contexts:</p>

                <p className="pt-4">1. Social Media Bios:</p>
                <p className="pt-2">&quot;✧ Dream chaser | Star gazer ☆ | Nature lover ⚘&quot;</p>

                <p className="pt-4">2. Message Signatures:</p>
                <p className="pt-2">&quot;Best wishes,</p>
                <p className="pt-2">Sarah ☾&quot;</p>

                <p className="pt-4">3. Art and Design:</p>
                <p className="pt-2">Use symbols as design elements in digital art or graphics.</p>

                <p className="pt-4">4. Journaling:</p>
                <p className="pt-2">&quot;Today&apos;s mood: ☁ with a chance of ☀&quot;</p>

                <p className="pt-4">Example: Create a minimalist poster design using the symbols ☽ ☀ ☆ to represent day and night.</p>

                <h2 className="pt-4 font-semibold text-xl">Tips for Using Aesthetic Symbols Effectively</h2>
                <ul className="list-decimal list-inside pl-4">
                    <li>Don&apos;t overuse: Too many symbols can make text hard to read.</li>
                    <li>Ensure compatibility: Some symbols may not display correctly on all devices.</li>
                    <li>Consider context: Use symbols that match the tone of your message.</li>
                    <li>Be consistent: Develop a personal style with your chosen symbols.</li>
                    <li>Respect cultural meanings: Be aware of any cultural significance behind symbols.</li>
                </ul>

                <p className="pt-4">Example: Instead of &quot;H☽w are y☽u t☽day?&quot;, opt for a more readable &quot;How are you today? ☽&quot;</p>

                <h2 className="pt-4 font-semibold text-xl">Creating Custom Aesthetic Symbols</h2>
                <p className="pt-4">For those looking to create unique aesthetic symbols:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>Combine existing symbols: ◍◠◉</li>
                    <li>Use online tools to generate custom text styles.</li>
                    <li>Explore lesser-known Unicode characters for unique options.</li>
                </ul>

                <p className="pt-4">Example: Combine ◡ and ◠ to create a custom smiley face: ◡◠◡</p>

                <h2 className="pt-4 font-semibold text-xl">Conclusion</h2>
                <p className="pt-4">Aesthetic symbols offer a creative way to enhance your digital communication, adding depth and visual interest to your text. Whether you&apos;re using them in social media posts, personal messages, or design projects, these symbols can help you express yourself more vividly and engagingly. Remember to use them thoughtfully and in moderation for the best effect. Experiment with different combinations and contexts to develop your unique aesthetic style, and watch as your digital communications come to life with these visually appealing characters.</p>
            </div>
        </div>
    </>
    );
};

export default AestheticSymbolSelector;