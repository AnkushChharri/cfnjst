"use client"

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

const styles = [
    { name: 'Basic', convert: (text) => text },
    // ... (other existing styles)
    {
        name: 'Arrow', convert: (text) => {
            const arrowMap = {
                'a': '➔', 'b': '➘', 'c': '➙', 'd': '➞', 'e': '➝', 'f': '➛', 'g': '➝', 'h': '➙', 'i': '↑',
                'j': '↓', 'k': '↗', 'l': '←', 'm': '↔', 'n': '↕', 'o': '⇆', 'p': '↳', 'q': '↰', 'r': '↱',
                's': '↴', 't': '↥', 'u': '↦', 'v': '↧', 'w': '↭', 'x': '↶', 'y': '↷', 'z': '↯',
                '0': '⇒', '1': '⇐', '2': '⇑', '3': '⇓', '4': '⇔', '5': '⇕', '6': '⇖', '7': '⇗', '8': '⇘', '9': '⇙',
                '!': '↚', '?': '↛', '+': '⇄', '-': '⇌', '*': '⇅', '/': '⇵', '$': '↝', '%': '↜'
            };
            return text.toLowerCase().split('').map(char => arrowMap[char] || char).join('');
        }
    },
    {
        name: 'Double Arrow', convert: (text) => {
            const doubleArrowMap = {
                'a': '⇒', 'b': '⇓', 'c': '⇔', 'd': '⇕', 'e': '⇖', 'f': '⇗', 'g': '⇘', 'h': '⇙', 'i': '⇚',
                'j': '⇛', 'k': '⇜', 'l': '⇝', 'm': '⇞', 'n': '⇟', 'o': '⇠', 'p': '⇡', 'q': '⇢', 'r': '⇣',
                's': '⇤', 't': '⇥', 'u': '⇦', 'v': '⇧', 'w': '⇨', 'x': '⇩', 'y': '⇪', 'z': '⇫'
            };
            return text.toLowerCase().split('').map(char => doubleArrowMap[char] || char).join('');
        }
    },
    {
        name: 'Curved Arrow', convert: (text) => {
            const curvedArrowMap = {
                'a': '↺', 'b': '↻', 'c': '↼', 'd': '↽', 'e': '↾', 'f': '↿', 'g': '⇀', 'h': '⇁', 'i': '⇂',
                'j': '⇃', 'k': '⇄', 'l': '⇅', 'm': '⇆', 'n': '⇇', 'o': '⇈', 'p': '⇉', 'q': '⇊', 'r': '⇋',
                's': '⇌', 't': '⇍', 'u': '⇎', 'v': '⇏', 'w': '⇐', 'x': '⇑', 'y': '⇒', 'z': '⇓'
            };
            return text.toLowerCase().split('').map(char => curvedArrowMap[char] || char).join('');
        }
    },
    {
        name: 'Circled Arrow', convert: (text) => {
            const circledArrowMap = {
                'a': '↶', 'b': '↷', 'c': '↺', 'd': '↻', 'e': '⟲', 'f': '⟳', 'g': '⥀', 'h': '⥁', 'i': '⟳',
                'j': '⟲', 'k': '↶', 'l': '↷', 'm': '↺', 'n': '↻', 'o': '⟲', 'p': '⟳', 'q': '⥀', 'r': '⥁',
                's': '↶', 't': '↷', 'u': '↺', 'v': '↻', 'w': '⟲', 'x': '⟳', 'y': '⥀', 'z': '⥁'
            };
            return text.toLowerCase().split('').map(char => circledArrowMap[char] || char).join('');
        }
    },
    {
        name: 'Harpoon Arrow', convert: (text) => {
            const harpoonArrowMap = {
                'a': '↼', 'b': '↽', 'c': '↾', 'd': '↿', 'e': '⇀', 'f': '⇁', 'g': '⇂', 'h': '⇃', 'i': '⇋',
                'j': '⇌', 'k': '⥊', 'l': '⥋', 'm': '⥌', 'n': '⥍', 'o': '⥎', 'p': '⥏', 'q': '⥐', 'r': '⥑',
                's': '⥒', 't': '⥓', 'u': '⥔', 'v': '⥕', 'w': '⥖', 'x': '⥗', 'y': '⥘', 'z': '⥙'
            };
            return text.toLowerCase().split('').map(char => harpoonArrowMap[char] || char).join('');
        }
    },
    {
        name: 'Long Arrow', convert: (text) => {
            const longArrowMap = {
                'a': '⟵', 'b': '⟶', 'c': '⟷', 'd': '⟸', 'e': '⟹', 'f': '⟺', 'g': '⟻', 'h': '⟼', 'i': '⟽',
                'j': '⟾', 'k': '⟿', 'l': '⤀', 'm': '⤁', 'n': '⤂', 'o': '⤃', 'p': '⤄', 'q': '⤅', 'r': '⤆',
                's': '⤇', 't': '⤈', 'u': '⤉', 'v': '⤊', 'w': '⤋', 'x': '⤌', 'y': '⤍', 'z': '⤎'
            };
            return text.toLowerCase().split('').map(char => longArrowMap[char] || char).join('');
        }
    },
];

const dummyStyle = {
    name: 'Dummy',
    convert: (text) => {
        return text.split('').map(char => char + '̨̥̬̩̪̬').join('');
    }
};

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

const UnicodeNameConverter = () => {
    const [name, setName] = useState('Stylish');
    const [copiedStyle, setCopiedStyle] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const cacheRef = useRef(createCache());

    const handleCopy = useCallback((text, styleName) => {
        navigator.clipboard.writeText(text);
        setCopiedStyle(styleName);
        setTimeout(() => setCopiedStyle(''), 2000);
    }, []);

    const filteredStyles = useMemo(() =>
        styles.filter(style =>
            style.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [searchTerm]
    );

    const convertedNames = useMemo(() => {
        const allStyles = [dummyStyle, ...filteredStyles];
        return allStyles.reduce((acc, style) => {
            const cacheKey = `${style.name}:${name}`;
            let convertedName = cacheRef.current.get(cacheKey);
            if (!convertedName) {
                convertedName = style.convert(name);
                cacheRef.current.set(cacheKey, convertedName);
            }
            acc[style.name] = convertedName;
            return acc;
        }, {});
    }, [name, filteredStyles]);

    const renderStyleCard = useCallback((style) => (
        <div
            key={style.name}
            className="flex flex-col items-center bg-white p-4 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200 relative"
            onClick={() => handleCopy(convertedNames[style.name], style.name)}
        >
            <span className="font-serif text-sm mb-2">{style.name}</span>
            <span className="text-xl">{convertedNames[style.name]}</span>
            {copiedStyle === style.name && (
                <div className="absolute top-2 right-2 text-green-600">
                    <Check size={20} />
                </div>
            )}
        </div>
    ), [convertedNames, copiedStyle, handleCopy]);

    return (<>
        <div className="max-w-7xl m-auto p-1">
            <textarea
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="rounded-md p-4 w-full focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
            />
            <p className="text-xs font-weight: 500; text-zinc-400">⬆️Search Your Name and Click on Any Style & Copy⬇️</p>



            <div className="text-center pb-1 pt-3 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>

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

                <Link href="/fancy-font/heart-text-symbol" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Heart Text Symbol
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

            <div className="space-y-4 mt-4">
                {renderStyleCard(dummyStyle)}
                {filteredStyles.map(renderStyleCard)}
            </div>
            {copiedStyle && (
                <div className="mt-4 text-green-600 text-center">Copied: {copiedStyle} style</div>
            )}
            <div className="max-w-7xl xl:mx-auto text-left mx-4">
                <h1 className="pt-2 font-semibold text-xl">Arrow Text: A Comprehensive Guide to Arrow Icons, Symbols, and Text Arrows</h1>
                <p className="pt-1">In the digital age, communication has evolved beyond mere words. We now have a rich tapestry of symbols and icons at our fingertips, ready to enhance our messages with visual flair. Among these, arrow text stands out as a versatile and powerful tool. Whether you&apos;re looking to add direction to your social media posts, spice up your emails, or create eye-catching designs, understanding arrow text is key. This guide will walk you through everything you need to know about arrow text, arrow icons, arrow symbols, text arrows, and even down arrow text. Let&apos;s dive in!</p>

                <h2 className="pt-2 font-semibold text-lg">1. Arrow Text: The Basics</h2>
                <p className="pt-1">Arrow text refers to the use of characters or combinations of characters to create arrow-like shapes within text. These can range from simple ASCII arrows to more complex Unicode symbols.</p>
                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Simple arrow text: --&gt; or &lt;--</li>
                    <li>■ (Black Square): Ideal for a more modern, geometric look.</li>
                    <li>Unicode arrow text: → or ←</li>
                </ul>

                <p className="pt-2">Using arrow text can:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Draw attention to important information</li>
                    <li>Indicate direction or flow</li>
                    <li>Create visual interest in plain text environments</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">2. Arrow Icon Text: Adding Visual Elements</h2>
                <p className="pt-1">Arrow icon text takes the concept a step further by incorporating graphical elements that resemble arrows. These can be standalone icons or part of a larger set of symbols.</p>

                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>➡️ (Right arrow icon)</li>
                    <li>⬅️ (Left arrow icon)</li>
                    <li>⬆️ (Up arrow icon)</li>
                </ul>

                <p className="pt-2">Arrow icons are perfect for:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Creating clear call-to-action buttons</li>
                    <li>Enhancing navigation menus</li>
                    <li>Illustrating step-by-step instructions</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">3. Arrow Symbol Text: Exploring Unicode</h2>
                <p className="pt-1">Arrow symbol text utilizes the vast array of arrow symbols available in Unicode. These symbols offer a wide range of styles and directions, allowing for more nuanced communication.</p>

                <p className="pt-2">Examples:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>↗️ (North East Arrow)</li>
                    <li>↘️ (South East Arrow)</li>
                    <li>☯ (Yin Yang): Perfect for lists about balance or opposing concepts.</li>
                    <li>↔️ (Left Right Arrow)</li>
                </ul>

                <p className="pt-2">Arrow symbols can be used to:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Indicate trends in data visualization</li>
                    <li>Show relationships between concepts</li>
                    <li>Create unique bullet points in lists</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">4. Text Arrow: Crafting Arrows from Text</h2>
                <p className="pt-1">Text arrows are creative combinations of standard characters to form arrow-like shapes. They&apos;re especially useful in environments where Unicode support is limited.</p>

                <p className="pt-2">Examples:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>==&gt; (Double line arrow)</li>
                    <li>&lt;&lt;&lt; (Triple left arrow)</li>
                    <li>&gt;--&gt; (Arrow with shaft)</li>
                </ul>

                <p className="pt-2">Text arrows are great for:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Adding personality to plain text messages</li>
                    <li>Creating ASCII art</li>
                    <li>Emphasizing points in code comments</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">5. Down Arrow Text: Pointing Downwards</h2>
                <p className="pt-1">Down arrow text specifically refers to symbols and text combinations that point downward. These are particularly useful for certain types of communication.</p>

                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>⬇️ (Downwards Black Arrow)</li>
                    <li>↓ (Downwards Arrow)</li>
                    <li>V or v (Simple text down arrow)</li>
                </ul>

                <p className="pt-2">Down arrows are perfect for:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Indicating downloads</li>
                    <li>Showing decreases or declines</li>
                    <li>Directing attention to the content below</li>
                </ul>

                <p className="pt-1">Conclusion</p>
                <p className="pt-2">Arrow text, in its various forms, is a powerful tool for enhancing digital communication. From simple text arrows to complex Unicode symbols, these visual elements can significantly improve the clarity and appeal of your messages. By understanding the different types of arrow text and how to use them effectively, you can elevate your digital content, improve user experience, and potentially boost your SEO efforts.</p>
                <p className="pt-2">Remember, the key to the successful use of arrow text lies in balance and relevance. Use these symbols to complement your content, guide your readers, and add visual interest, but avoid overuse that could distract from your main message. With practice and creativity, you&apos;ll find countless ways to incorporate arrow text into your digital communication strategy.</p>
                <p className="pt-2">Whether you&apos;re crafting emails, designing websites, or creating social media content, mastering the art of arrow text will give you a valuable tool in your communication toolkit. So go ahead, experiment with different arrow styles, and watch as your content takes on new life and direction!</p>
            </div>

        </div>
    </>
    );
};

export default UnicodeNameConverter;