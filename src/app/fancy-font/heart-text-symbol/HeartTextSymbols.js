"use client"

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

// Custom cache implementation
const createCache = (maxSize = 500) => {
    const cache = new Map();
    return {
        get: (key) => cache.get(key),
        set: (key, value) => {
            if (cache.size >= maxSize) {
                const firstKey = cache.keys().next().value;
                cache.delete(firstKey);
            }
            cache.set(key, value);
        }
    };
};

const styles = [
    {
        name: "Heart Embrace",
        convert: (text) => `❤️${text}❤️`
    },
    {
        name: "Heart Pulse",
        convert: (text) => text.split('').join('💓') + '💓'
    },
    {
        name: "Rainbow Hearts",
        convert: (text) => {
            const hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜'];
            return text.split('').map((char, i) => char + hearts[i % hearts.length]).join('');
        }
    },
    {
        name: "Heart Constellation",
        convert: (text) => '✨' + text.split('').join('💫') + '✨'
    },
    {
        name: "Cupid's Arrow",
        convert: (text) => `💘${text}💘`
    },
    {
        name: "Love Explosion",
        convert: (text) => `💥${text.split('').join('💖')}💥`
    },
    {
        name: "Heartbeat Monitor",
        convert: (text) => `📈💓${text}💓📉`
    },
    {
        name: "Heart Balloon",
        convert: (text) => text.split('').map(char => `${char}🎈`).join('')
    },
    {
        name: "Loving Embrace",
        convert: (text) => `🤗${text}🤗`
    },
    {
        name: "Heart Sparkles",
        convert: (text) => text.split('').map(char => `✨${char}✨`).join('💖')
    },
    {
        name: "Love Letter",
        convert: (text) => `💌 ${text} 💌`
    },
    {
        name: "Heart Crown",
        convert: (text) => `👑${text.split('').join('👑')}👑`
    }
];

const HeartTextSymbolConverter = () => {
    const [name, setName] = useState('Love');
    const [copiedStyle, setCopiedStyle] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const cacheRef = useRef(createCache());
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleCopy = useCallback((text, styleName) => {
        navigator.clipboard.writeText(text);
        setCopiedStyle(styleName);
        setTimeout(() => setCopiedStyle(''), 1500);
    }, []);

    const filteredStyles = useMemo(() =>
        styles.filter(style =>
            style.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [searchTerm]
    );

    const convertedNames = useMemo(() => {
        if (!isClient) return {};
        return filteredStyles.reduce((acc, style) => {
            const cacheKey = `${style.name}:${name}`;
            let convertedName = cacheRef.current.get(cacheKey);
            if (!convertedName) {
                convertedName = style.convert(name);
                cacheRef.current.set(cacheKey, convertedName);
            }
            acc[style.name] = convertedName;
            return acc;
        }, {});
    }, [name, filteredStyles, isClient]);

    const renderStyleCard = useCallback((style) => (
        <div
            key={style.name}
            className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => handleCopy(convertedNames[style.name], style.name)}
        >
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{style.name}</h3>
                {isClient && (
                    <p className="text-xl break-all">
                        {convertedNames[style.name]}
                    </p>
                )}
            </div>
            <div
                className={`absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 transform transition-all duration-300 ${copiedStyle === style.name ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
            >
                <Check size={16} />
            </div>
        </div>
    ), [convertedNames, copiedStyle, handleCopy, isClient]);

    return (<>
        <div className="max-w-7xl mx-auto p-4">
            <textarea
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your text"
                className="w-full p-4 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                rows="3"
            />

            <p className="text-sm text-gray-600 mb-6">⬆️ Enter your text above, then click on any heart style to copy ⬇️</p>

            <div className="text-center pb-6 pt-2 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>

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

            <div className="text-center ring-cyan-300 pb-5 pt-3 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>


                <Link href="/fancy-font/arrow-text" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Arrow Text
                </Link>

                <Link href="/fancy-font/cool-text" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Cool Text
                </Link>

                <Link href="/fancy-font/cursed-text-generator" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Cursed Text
                </Link>

                <Link href="/fancy-font/cursive-text-generator" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Cursive Text
                </Link>

                <Link href="/fancy-font/facebook-bold-text" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Facebook Bold Text
                </Link>

                <Link href="/fancy-font/fancy-text-generator" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Fancy Text
                </Link>

                <Link href="/fancy-font/glitch-text-generator" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Glitch Text
                </Link>



                <Link href="/fancy-font/italic-text-styles" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Italic Text
                </Link>

                <Link href="/fancy-font/small-text-generator" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Small Text
                </Link>


                <Link href="/fancy-font/bold-text-styles" className="text-white bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-violet-300 dark:focus:ring-violet-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Bold Text
                </Link>





            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredStyles.map(renderStyleCard)}
            </div>
            <div className="max-w-7xl xl:mx-auto text-left mx-4">
                <h1 className="pt-2 font-semibold text-xl">Heart Text Symbol: Love at Your Fingertips</h1>
                <p className="pt-1">In the digital age, expressing emotions through text has become an art form. Among the myriad of symbols available, the heart text symbol stands out as a universal icon of love, affection, and care. This guide will explore the heart shape symbol text, how to use it, and provide easy copy-and-paste options for various platforms.</p>

                <h2 className="pt-2 font-semibold text-lg">What is a Heart Text Symbol?</h2>
                <p className="pt-1">The heart text symbol, often represented as ♥ or &lt;3, is a typographic character used to convey love, affection, or appreciation in digital communication. It&apos;s a versatile symbol that can enhance your messages, social media posts, and even website content.</p>
                <p className="pt-2">Example: &quot;I ♥ New York&quot; is a famous slogan that effectively uses the heart text symbol.</p>
                <p className="pt-2">Heart Shape Symbol Text: Variations and Uses</p>
                <p className="pt-1">Heart text symbols come in various forms, each with its unique charm and application. Here are some popular variations:</p>
                <p className="pt-2">1. Classic Heart: ♥</p>
                <p className="pt-1">Example: &quot;Sending ♥ to all my friends!&quot;</p>
                <p className="pt-2">2. Less-Than Three: &lt;3</p>
                <p className="pt-1">Example: &quot;Thanks for your support &lt;3&quot;</p>
                <p className="pt-2">3. Hollow Heart: ♡</p>
                <p className="pt-1">Example: &quot;You&apos;re the best ♡&quot;</p>
                <p className="pt-2">4. Heavy Black Heart: ❤</p>
                <p className="pt-1">Example: &quot;Family ❤ Forever&quot;</p>
                <p className="pt-2">5. Two Hearts: 💕</p>
                <p className="pt-1">Example: &quot;Me and you 💕&quot;</p>
                <p className="pt-2">6. Sparkling Heart: 💖</p>
                <p className="pt-1">Example: &quot;Feeling blessed 💖&quot;</p>

                <h2 className="pt-2 font-semibold text-lg">These variations allow you to express different shades of affection and add visual interest to your text.</h2>
                <p className="pt-1">How to Use Heart Text Symbols</p>
                <p className="pt-2">Incorporating heart text symbols into your digital communication is easy and can significantly enhance your message&apos;s emotional impact. Here are some tips:</p>
                <p className="pt-2">1. Social Media Posts: Use heart symbols to emphasize positive emotions in your updates.</p>
                <p className="pt-1">Example: &quot;Just got my dream job! ❤️❤️❤️&quot;</p>
                <p className="pt-2">2. Text Messages: Add a personal touch to your messages with a heart symbol.</p>
                <p className="pt-1">Example: &quot;Goodnight, sleep tight ♥&quot;</p>
                <p className="pt-2">3. Email Signatures: Include a heart symbol in your email signature for a friendly touch.</p>
                <p className="pt-1">Example: &quot;Best regards, Jane ♡&quot;</p>
                <p className="pt-2">4. Blog Posts: Use heart symbols to highlight important points or express enthusiasm.</p>
                <p className="pt-1">Example: &quot;5 Reasons Why I ♥ Blogging&quot;</p>
                <p className="pt-2">5. Comments and Reactions: Respond to content with heart symbols to show appreciation.</p>
                <p className="pt-1">Example: &quot;Great article! ♥&quot;</p>

                <h2 className="pt-2 font-semibold text-lg">Enhancing Your Online Presence with Heart Text Symbols</h2>
                <p className="pt-1">Incorporating heart text symbols into your online content can have several benefits:</p>
                <p className="pt-2">1. Improved Engagement: Heart symbols can make your content more visually appealing and engaging.</p>
                <p className="pt-1">Example: &quot;Double tap if you ♥ this post!&quot;</p>
                <p className="pt-2">2. Emotional Connection: They help convey emotions more effectively in text-based communication.</p>
                <p className="pt-1">Example: &quot;We&apos;re thrilled to announce our new product line ♥&quot;</p>
                <p className="pt-2">3. Brand Personality: Using heart symbols can contribute to a friendly, approachable brand image.</p>
                <p className="pt-1">Example: &quot;At XYZ Company, we ♥ our customers&quot;</p>
                <p className="pt-2">4. Concise Expression: Heart symbols can replace words, making your messages more concise.</p>
                <p className="pt-2">Example: &quot;♥ this idea!&quot; instead of &quot;I love this idea!&quot;</p>
                <p className="pt-1">5. Cross-Cultural Communication: Heart symbols are universally understood, transcending language barriers.</p>
                <p className="pt-2">Example: A simple &quot;♥&quot; as a response can be understood globally.</p>

                <h2 className="pt-2 font-semibold text-lg">Conclusion</h2>
                <p className="pt-2">Heart text symbols are powerful tools for digital communication, allowing us to infuse our messages with emotion and personality. Whether you&apos;re crafting a social media post, sending a loving text, or adding a friendly touch to your website, these symbols can enhance your message and connect with your audience on a more personal level.</p>
                <p className="pt-2">Remember to use heart text symbols thoughtfully and in moderation. When used effectively, they can make your content more engaging, expressive, and memorable. So go ahead, spread the love, and let your heart speak through your text! ♥</p>
            </div>

        </div>
    </>
    );
};

export default HeartTextSymbolConverter;