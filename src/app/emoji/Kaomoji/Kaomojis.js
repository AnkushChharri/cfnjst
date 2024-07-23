"use client"

import React, { useState, useCallback } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';


const symbols = [
    // Kaomoji (30+)
    '(^_^)', '(>_<)', '(;_;)', '(^o^)', '(^_^;)', '(*_*)', '(T_T)',
    '(╯°□°)╯︵ ┻━┻', '┬─┬ノ( º _ ºノ)', '¯\\_(ツ)_/¯', '(╬ಠ益ಠ)', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',
    '(⌐■_■)', '( ͡° ͜ʖ ͡°)', '(づ｡◕‿‿◕｡)づ', '(ノಠ益ಠ)ノ彡┻━┻', '(｡♥‿♥｡)',
    'ヽ(ヅ)ノ', '(๑•́ ω •̀๑)', '(≧◡≦)', '(◕‿◕✿)', '(⊙_⊙)', '(╯︵╰,)',
    '(っ˘̩╭╮˘̩)っ', '(￣▽￣)ノ', '(〜￣△￣)〜', '(･ω･)つ⊂(･ω･)',
    'ᕦ(ò_óˇ)ᕤ', '(｡◕‿◕｡)', '(✿◠‿◠)', '(◡‿◡✿)', '(≧﹏≦)', '(ㆆ _ ㆆ)'
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
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Fire Emojis and Kaomoji</h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                    {symbols.map((symbol, index) => (
                        <div
                            key={index}
                            className="relative flex items-center justify-center bg-white p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                            onClick={() => handleSymbolClick(symbol)}
                        >
                            <span className="text-lg sm:text-xl">{symbol}</span>
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
                <h1 className="pt-2 font-semibold text-xl">Kaomoji: Expressing Emotions Through Japanese Text Art (◕‿◕)</h1>
                <p className="pt-2">In the vast world of digital communication, Kaomoji stands out as a unique and expressive form of text art. These intricate Japanese emoticons bring a touch of creativity and emotion to our online conversations. This post will explore the world of Kaomoji, from its origins to practical usage, focusing on cute Kaomoji, easy copy-and-paste options, and the ever-popular cat Kaomoji.</p>

                <h2 className="pt-4 font-semibold text-xl">What is Kaomoji? (・∀・)</h2>
                <p className="pt-2">Kaomoji, literally meaning &ldquo;face characters&rdquo; in Japanese, are complex emoticons that use a combination of Japanese characters, punctuation marks, and letters to create expressive faces and figures. Unlike standard Western emoticons that are read sideways, Kaomoji are typically read straight-on.</p>
                <p>Example: Happy Kaomoji: (^_^) vs. Western smiley: :)</p>

                <h2 className="pt-4 font-semibold text-xl">The Origins of Kaomoji: A Brief History ヽ(´▽`)/</h2>
                <p className="pt-2">Kaomoji emerged in Japan during the 1980s, gaining popularity with the rise of internet culture. They offer a more nuanced way to express emotions compared to simple emoticons.</p>

                <p className="pt-4">Example: Evolution of expressing happiness:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>:) (Western emoticon)</li>
                    <li>(^_^) (Basic Kaomoji)</li>
                    <li>ヽ(´▽`)/ (Complex Kaomoji)</li>
                </ul>

                <h2 className="pt-4 font-semibold text-xl">Cute Kaomoji: Adding Adorable Flair to Your Messages (´｡• ᵕ •｡`)</h2>
                <p className="pt-2">Cute Kaomoji, often referred to as &ldquo;kawaii&rdquo; in Japanese, are particularly popular. They often feature round, soft shapes and exaggerated expressions to convey cuteness.</p>
                <p className="pt-2">Some popular cute Kaomoji include:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>(◕‿◕) - Wide-eyed cute face</li>
                    <li>(⁎˃ᴗ˂⁎) - Blushing cuteness</li>
                    <li>ᔦꙬᔨ - Owl-like cute face</li>
                </ul>

                <p className="pt-4">Example: Expressing excitement about cute puppies: &ldquo;Just saw the cutest puppies! (◕‿◕) They were so fluffy!&rdquo;</p>

                <h2 className="pt-4 font-semibold text-xl">Kaomoji Copy and Paste: Easy Ways to Use Kaomoji ☜(ﾟヮﾟ☜)</h2>
                <p className="pt-2">For those who want to quickly use Kaomoji without memorizing complex character combinations, copy and paste is the way to go. Here are some popular Kaomoji you can easily copy and paste:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>Surprise: (°o°)</li>
                    <li>Love: (♡‿♡)</li>
                    <li>Confusion: (⊙_⊙)</li>
                    <li>Sadness: (╥﹏╥)</li>
                    <li>Excitement: \\(^ヮ^)/</li>
                </ul>

                <p className="pt-4">Example: Sharing good news: &ldquo;I got the job! \\(^ヮ^)/ Can&apos;t wait to start!&rdquo;</p>

                <h2 className="pt-4 font-semibold text-xl">Cat Kaomoji: Feline Fun in Text Form (=^･ω･^=)</h2>
                <p className="pt-2">Cat Kaomoji are a beloved subset of these Japanese emoticons. They capture the essence of our feline friends in adorable text art form.</p>

                <p className="pt-4">Popular cat Kaomoji include:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>(=^･ω･^=) - Standard cat face</li>
                    <li>(^・ω・^ ) - Cat with whiskers</li>
                    <li>ฅ^•ﻌ•^ฅ - Paws up cat</li>
                    <li>(ΦωΦ) - Wide-eyed cat</li>
                </ul>

                <p className="pt-4">Example: Talking about your pet: &ldquo;My cat is napping on my lap right now (=^･ω･^=) So cute!&rdquo;</p>

                <h2 className="pt-4 font-semibold text-xl">The Versatility of Kaomoji: Beyond Just Faces ┗(･ω･;)┛</h2>
                <p className="pt-2">While faces are common, Kaomoji can represent a wide range of concepts:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>Actions: _(┐「ε:)_ (Flipping a table)</li>
                    <li>Objects: ✿ (Flower)</li>
                    <li>Animals: ʕ•ᴥ•ʔ (Bear)</li>
                    <li>Situations: ヾ(´￢｀)ﾉ (Waving goodbye)</li>
                </ul>

                <p className="pt-4">Example: Describing your day: &ldquo;Work was tough _(┐「ε:)_ but now I&apos;m relaxing ┐(´∀｀)┌&rdquo;</p>

                <h2 className="pt-4 font-semibold text-xl">Kaomoji in Different Contexts: From Casual to Professional (๑•̀ㅂ•́)و✧</h2>
                <p className="pt-2">While Kaomoji are often used in casual settings, they can add a touch of personality in various contexts:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>Personal messages: &ldquo;Miss you! (っ˘̩╭╮˘̩)っ&rdquo;</li>
                    <li>Social media posts: &ldquo;New profile pic! How does it look? (・∀・)&rdquo;</li>
                    <li>Informal emails: &ldquo;Thanks for your help! (ノ*°▽°*)&rdquo;</li>
                    <li>Blog comments: &ldquo;Great article! Learned a lot (●♡∀♡)&rdquo;</li>
                </ul>

                <p className="pt-4">Example: Ending a friendly work email: &ldquo;Looking forward to the meeting! (๑˃̵ᴗ˂̵)و&rdquo;</p>

                <h2 className="pt-4 font-semibold text-xl">The Psychology Behind Kaomoji: Why We Love Them (⁄ ⁄&gt;⁄ ▽ ⁄&lt;⁄ ⁄)</h2>
                <p className="pt-2">Kaomoji appeal to us for several reasons:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>Visual appeal: They&apos;re more detailed than standard emoticons</li>
                    <li>Emotional nuance: They can express complex emotions</li>
                    <li>Cultural charm: They offer a touch of Japanese pop culture</li>
                    <li>Creativity: They allow for personal expression</li>
                </ul>

                <p className="pt-4">Example: Expressing a mix of emotions: &ldquo;Nervous but excited about my presentation tomorrow (⁄ ⁄&gt;⁄ ▽ ⁄&lt;⁄ ⁄)&rdquo;</p>

                <h2 className="pt-4 font-semibold text-xl">Kaomoji Across Platforms: Compatibility Considerations (;￢_￢)</h2>
                <p className="pt-2">While Kaomoji are widely supported, some platforms may display them differently:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>Mobile devices: Generally good support</li>
                    <li>Social media: Mostly compatible</li>
                    <li>Older systems: May have issues displaying complex Kaomoji</li>
                    <li>Emails: Can vary depending on the client</li>
                </ul>

                <p className="pt-4">Example: Checking compatibility: &ldquo;Can you see this Kaomoji clearly? (;￢_￢) Let me know!&rdquo;</p>

                <h2 className="pt-4 font-semibold text-xl">Creating Your Own Kaomoji: Unleash Your Creativity ᕦ(ò_óˇ)ᕤ</h2>
                <p className="pt-2">While copying and pasting is convenient, creating your own Kaomoji can be fun:</p>

                <ul className="list-decimal list-inside pl-4">
                    <li>Start with basic shapes: ( ) for the face</li>
                    <li>Add eyes: (^_^) or (T_T)</li>
                    <li>Include a mouth: (^_^) or (^o^)</li>
                    <li>Embellish with extras: arms, accessories, etc.</li>
                </ul>

                <p className="pt-4">Example: A custom excited Kaomoji: \\(☆▽☆)/</p>

                <h2 className="pt-4 font-semibold text-xl">Conclusion: Embracing the World of Kaomoji ♪(^∇^*)</h2>

                <p className="pt-2">Kaomoji offer a delightful way to add emotion, creativity, and a touch of Japanese culture to our digital communications. Whether you&apos;re expressing joy with a cute Kaomoji, sharing your love for cats with a feline-inspired design, or simply copying and pasting to quickly convey your feelings, these intricate emoticons have a special place in our online world.</p>

                <p className="pt-2">So why not give Kaomoji a try? Add a splash of creativity to your next message and see how these charming text faces can transform your digital expressions. After all, in the world of online communication, a picture – or in this case, a Kaomoji – is worth a thousand words! (ღ˘⌣˘ღ)</p>
            </div>
        </div>
    </>
    );
};

export default SymbolSelector;