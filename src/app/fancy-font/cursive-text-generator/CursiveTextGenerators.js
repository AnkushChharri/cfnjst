"use client"

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

const styles = [
    {
        name: "Cursive",
        convert: (text) => {
            const cursiveMap = {
                A: "𝓐",
                B: "𝓑",
                C: "𝓒",
                D: "𝓓",
                E: "𝓔",
                F: "𝓕",
                G: "𝓖",
                H: "𝓗",
                I: "𝓘",
                J: "𝓙",
                K: "𝓚",
                L: "𝓛",
                M: "𝓜",
                N: "𝓝",
                O: "𝓞",
                P: "𝓟",
                Q: "𝓠",
                R: "𝓡",
                S: "𝓢",
                T: "𝓣",
                U: "𝓤",
                V: "𝓥",
                W: "𝓦",
                X: "𝓧",
                Y: "𝓨",
                Z: "𝓩",
                a: "𝓪",
                b: "𝓫",
                c: "𝓬",
                d: "𝓭",
                e: "𝓮",
                f: "𝓯",
                g: "𝓰",
                h: "𝓱",
                i: "𝓲",
                j: "𝓳",
                k: "𝓴",
                l: "𝓵",
                m: "𝓶",
                n: "𝓷",
                o: "𝓸",
                p: "𝓹",
                q: "𝓺",
                r: "𝓻",
                s: "𝓼",
                t: "𝓽",
                u: "𝓾",
                v: "𝓿",
                w: "𝔀",
                x: "𝔁",
                y: "𝔂",
                z: "𝔃",
            };
            return text
                .split("")
                .map((char) => cursiveMap[char] || char)
                .join("");
        },
    },
    {
        name: "Bold",
        convert: (text) => {
            const boldMap = {
                A: "𝗔",
                B: "𝗕",
                C: "𝗖",
                D: "𝗗",
                E: "𝗘",
                F: "𝗙",
                G: "𝗚",
                H: "𝗛",
                I: "𝗜",
                J: "𝗝",
                K: "𝗞",
                L: "𝗟",
                M: "𝗠",
                N: "𝗡",
                O: "𝗢",
                P: "𝗣",
                Q: "𝗤",
                R: "𝗥",
                S: "𝗦",
                T: "𝗧",
                U: "𝗨",
                V: "𝗩",
                W: "𝗪",
                X: "𝗫",
                Y: "𝗬",
                Z: "𝗭",
                a: "𝗮",
                b: "𝗯",
                c: "𝗰",
                d: "𝗱",
                e: "𝗲",
                f: "𝗳",
                g: "𝗴",
                h: "𝗵",
                i: "𝗶",
                j: "𝗷",
                k: "𝗸",
                l: "𝗹",
                m: "𝗺",
                n: "𝗻",
                o: "𝗼",
                p: "𝗽",
                q: "𝗾",
                r: "𝗿",
                s: "𝘀",
                t: "𝘁",
                u: "𝘂",
                v: "𝘃",
                w: "𝘄",
                x: "𝘅",
                y: "𝘆",
                z: "𝘇",
            };
            return text
                .split("")
                .map((char) => boldMap[char] || char)
                .join("");
        },
    },
    {
        name: "Italic",
        convert: (text) => {
            const italicMap = {
                A: "𝐴",
                B: "𝐵",
                C: "𝐶",
                D: "𝐷",
                E: "𝐸",
                F: "𝐹",
                G: "𝐺",
                H: "𝐻",
                I: "𝐼",
                J: "𝐽",
                K: "𝐾",
                L: "𝐿",
                M: "𝑀",
                N: "𝑁",
                O: "𝑂",
                P: "𝑃",
                Q: "𝑄",
                R: "𝑅",
                S: "𝑆",
                T: "𝑇",
                U: "𝑈",
                V: "𝑉",
                W: "𝑊",
                X: "𝑋",
                Y: "𝑌",
                Z: "𝑍",
                a: "𝑎",
                b: "𝑏",
                c: "𝑐",
                d: "𝑑",
                e: "𝑒",
                f: "𝑓",
                g: "𝑔",
                h: "ℎ",
                i: "𝑖",
                j: "𝑗",
                k: "𝑘",
                l: "𝑙",
                m: "𝑚",
                n: "𝑛",
                o: "𝑜",
                p: "𝑝",
                q: "𝑞",
                r: "𝑟",
                s: "𝑠",
                t: "𝑡",
                u: "𝑢",
                v: "𝑣",
                w: "𝑤",
                x: "𝑥",
                y: "𝑦",
                z: "𝑧",
            };
            return text
                .split("")
                .map((char) => italicMap[char] || char)
                .join("");
        },
    },
    {
        name: "Bold Italic",
        convert: (text) => {
            const boldItalicMap = {
                A: "𝑨",
                B: "𝑩",
                C: "𝑪",
                D: "𝑫",
                E: "𝑬",
                F: "𝑭",
                G: "𝑮",
                H: "𝑯",
                I: "𝑰",
                J: "𝑱",
                K: "𝑲",
                L: "𝑳",
                M: "𝑴",
                N: "𝑵",
                O: "𝑶",
                P: "𝑷",
                Q: "𝑸",
                R: "𝑹",
                S: "𝑺",
                T: "𝑻",
                U: "𝑼",
                V: "𝑽",
                W: "𝑾",
                X: "𝑿",
                Y: "𝒀",
                Z: "𝒁",
                a: "𝒂",
                b: "𝒃",
                c: "𝒄",
                d: "𝒅",
                e: "𝒆",
                f: "𝒇",
                g: "𝒈",
                h: "𝒉",
                i: "𝒊",
                j: "𝒋",
                k: "𝒌",
                l: "𝒍",
                m: "𝒎",
                n: "𝒏",
                o: "𝒐",
                p: "𝒑",
                q: "𝒒",
                r: "𝒓",
                s: "𝒔",
                t: "𝒕",
                u: "𝒖",
                v: "𝒗",
                w: "𝒘",
                x: "𝒙",
                y: "𝒚",
                z: "𝒛",
            };
            return text
                .split("")
                .map((char) => boldItalicMap[char] || char)
                .join("");
        },
    },
    {
        name: "Sans-Serif",
        convert: (text) => {
            const sansSerifMap = {
                A: "𝖠",
                B: "𝖡",
                C: "𝖢",
                D: "𝖣",
                E: "𝖤",
                F: "𝖥",
                G: "𝖦",
                H: "𝖧",
                I: "𝖨",
                J: "𝖩",
                K: "𝖪",
                L: "𝖫",
                M: "𝖬",
                N: "𝖭",
                O: "𝖮",
                P: "𝖯",
                Q: "𝖰",
                R: "𝖱",
                S: "𝖲",
                T: "𝖳",
                U: "𝖴",
                V: "𝖵",
                W: "𝖶",
                X: "𝖷",
                Y: "𝖸",
                Z: "𝖹",
                a: "𝖺",
                b: "𝖻",
                c: "𝖼",
                d: "𝖽",
                e: "𝖾",
                f: "𝖿",
                g: "𝗀",
                h: "𝗁",
                i: "𝗂",
                j: "𝗃",
                k: "𝗄",
                l: "𝗅",
                m: "𝗆",
                n: "𝗇",
                o: "𝗈",
                p: "𝗉",
                q: "𝗊",
                r: "𝗋",
                s: "𝗌",
                t: "𝗍",
                u: "𝗎",
                v: "𝗏",
                w: "𝗐",
                x: "𝗑",
                y: "𝗒",
                z: "𝗓",
            };
            return text
                .split("")
                .map((char) => sansSerifMap[char] || char)
                .join("");
        },
    },
    {
        name: "Sans-Serif Bold",
        convert: (text) => {
            const sansSerifBoldMap = {
                A: "𝗔",
                B: "𝗕",
                C: "𝗖",
                D: "𝗗",
                E: "𝗘",
                F: "𝗙",
                G: "𝗚",
                H: "𝗛",
                I: "𝗜",
                J: "𝗝",
                K: "𝗞",
                L: "𝗟",
                M: "𝗠",
                N: "𝗡",
                O: "𝗢",
                P: "𝗣",
                Q: "𝗤",
                R: "𝗥",
                S: "𝗦",
                T: "𝗧",
                U: "𝗨",
                V: "𝗩",
                W: "𝗪",
                X: "𝗫",
                Y: "𝗬",
                Z: "𝗭",
                a: "𝗮",
                b: "𝗯",
                c: "𝗰",
                d: "𝗱",
                e: "𝗲",
                f: "𝗳",
                g: "𝗴",
                h: "𝗵",
                i: "𝗶",
                j: "𝗷",
                k: "𝗸",
                l: "𝗹",
                m: "𝗺",
                n: "𝗻",
                o: "𝗼",
                p: "𝗽",
                q: "𝗾",
                r: "𝗿",
                s: "𝘀",
                t: "𝘁",
                u: "𝘂",
                v: "𝘃",
                w: "𝘄",
                x: "𝘅",
                y: "𝘆",
                z: "𝘇",
            };
            return text
                .split("")
                .map((char) => sansSerifBoldMap[char] || char)
                .join("");
        },
    },
    {
        name: "Sans-Serif Italic",
        convert: (text) => {
            const sansSerifItalicMap = {
                A: "𝘈",
                B: "𝘉",
                C: "𝘊",
                D: "𝘋",
                E: "𝘌",
                F: "𝘍",
                G: "𝘎",
                H: "𝘏",
                I: "𝘐",
                J: "𝘑",
                K: "𝘒",
                L: "𝘓",
                M: "𝘔",
                N: "𝘕",
                O: "𝘖",
                P: "𝘗",
                Q: "𝘘",
                R: "𝘙",
                S: "𝘚",
                T: "𝘛",
                U: "𝘜",
                V: "𝘝",
                W: "𝘞",
                X: "𝘟",
                Y: "𝘠",
                Z: "𝘡",
                a: "𝘢",
                b: "𝘣",
                c: "𝘤",
                d: "𝘥",
                e: "𝘦",
                f: "𝘧",
                g: "𝘨",
                h: "𝘩",
                i: "𝘪",
                j: "𝘫",
                k: "𝘬",
                l: "𝘭",
                m: "𝘮",
                n: "𝘯",
                o: "𝘰",
                p: "𝘱",
                q: "𝘲",
                r: "𝘳",
                s: "𝘴",
                t: "𝘵",
                u: "𝘶",
                v: "𝘷",
                w: "𝘸",
                x: "𝘹",
                y: "𝘺",
                z: "𝘻",
            };
            return text
                .split("")
                .map((char) => sansSerifItalicMap[char] || char)
                .join("");
        },
    },
];

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
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleCopy = useCallback((text, styleName) => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                setCopiedStyle(styleName);
                setTimeout(() => setCopiedStyle(''), 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
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
            className="flex flex-col items-center bg-white p-4 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200 relative"
            onClick={() => handleCopy(convertedNames[style.name], style.name)}
        >
            <span className="font-serif text-sm mb-2">{style.name}</span>
            {isClient && (
                <span className="text-xl">{convertedNames[style.name]}</span>
            )}
            <div
                className={`absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 transform transition-all duration-300 ${copiedStyle === style.name ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
            >
                <Check size={16} />
            </div>
        </div>
    ), [convertedNames, copiedStyle, handleCopy, isClient]);

    return (
        <div className="max-w-7xl m-auto p-1">
            <textarea
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="rounded-md p-4 w-full focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
            />
            <p className="text-xs font-weight: 500; text-zinc-400">⬆️Search Your Name and Click on Any Style & Copy⬇️</p>

            <div className="text-center pt-5 pb-3 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>

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
                {filteredStyles.map(renderStyleCard)}
            </div>
        </div>
    );
};

export default UnicodeNameConverter;