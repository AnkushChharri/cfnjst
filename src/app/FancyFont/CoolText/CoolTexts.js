"use client"

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

const styles = [
    { name: 'Vaporwave', convert: (text) => text.split('').join(' ').toUpperCase() },
    { name: 'Glitch', convert: (text) => text.split('').map(char => char + (Math.random() > 0.5 ? '̸' : '̷')).join('') },
    { name: 'Sparkles', convert: (text) => '✨' + text.split('').join('✨') + '✨' },
    { name: 'Retro Game', convert: (text) => text.toUpperCase().split('').map(char => String.fromCodePoint(char.charCodeAt(0) + 127344)).join('') },
    { name: 'Wavy', convert: (text) => text.split('').map((char, i) => char + (i % 2 === 0 ? '᷼' : '᷽')).join('') },
    { name: 'Neon', convert: (text) => '【' + text.split('').join('】【') + '】' },
    { name: 'Cyberpunk', convert: (text) => text.split('').map(char => char + '̾').join('') },
    {
        name: 'Medieval', convert: (text) => text.split('').map(char => {
            const code = char.toLowerCase().charCodeAt(0);
            return (code >= 97 && code <= 122) ? String.fromCodePoint(code + 119977) : char;
        }).join('')
    },
    { name: 'Matrix', convert: (text) => text.split('').map(char => char + '̣̠').join('') },
    { name: 'Cosmic', convert: (text) => '✧' + text.split('').join('⋆') + '✧' },
    { name: 'Graffiti', convert: (text) => text.split('').map(char => char + '͏').join('') },
    { name: 'Pixel', convert: (text) => text.split('').map(char => char + '̗̀').join('') },
    { name: 'Cursed', convert: (text) => text.split('').map(char => char + '̶̷').join('') },
    { name: 'Steampunk', convert: (text) => text.split('').map(char => char + '҉').join('') },
    { name: 'Synthwave', convert: (text) => text.toUpperCase().split('').join('═') },
    { name: 'Bubble', convert: (text) => text.split('').map(char => char + '̊').join('') },
    { name: 'Circuit', convert: (text) => text.split('').map(char => char + '̤').join('') },
    { name: 'Magical', convert: (text) => '✦' + text.split('').join('°') + '✦' },
    { name: 'Radioactive', convert: (text) => text.split('').map(char => char + '☢️').join('') },
    { name: 'Starry', convert: (text) => text.split('').map(char => char + '✰').join('') },
    { name: 'Retro Wave', convert: (text) => text.toUpperCase().split('').join('▀▄') },
    { name: 'Holographic', convert: (text) => text.split('').map(char => char + '⃝').join('') },
    { name: 'Glowing', convert: (text) => text.split('').map(char => char + '҈').join('') },
    { name: 'Futuristic', convert: (text) => text.split('').map(char => char + '⃠').join('') },
    { name: 'Enchanted', convert: (text) => '✴' + text.split('').join('❈') + '✴' },
    // New styles added below
    { name: 'Neon Glow', convert: (text) => text.split('').map(char => char + '̐').join('') },
    { name: 'Underwater', convert: (text) => text.split('').map(char => char + '͜').join('') },
    { name: 'Alien Language', convert: (text) => text.split('').map(char => char + '҇').join('') },
    { name: 'Constellation', convert: (text) => '⋆' + text.split('').join('⋆') + '⋆' },
    { name: 'Quantum', convert: (text) => text.split('').map(char => char + '̬').join('') },
    { name: 'Corrupted Data', convert: (text) => text.split('').map(char => char + '̺̺̠̺').join('') },
    { name: 'Plasma', convert: (text) => text.split('').map(char => char + '҉̨').join('') },
    { name: 'Echoed', convert: (text) => text.split('').map(char => char + char.toLowerCase()).join('') },
    { name: 'Crystalline', convert: (text) => '❄' + text.split('').join('❅') + '❄' },
    { name: 'Runic', convert: (text) => text.split('').map(char => char + '᛫').join('') },
    { name: 'Psychedelic', convert: (text) => text.split('').map(char => char + '҆').join('') },
    { name: 'Gravity Distortion', convert: (text) => text.split('').map(char => char + '҃').join('') },
    { name: 'Nanotech', convert: (text) => text.split('').map(char => char + '̂').join('') },
    { name: 'Mystic Runes', convert: (text) => text.split('').map(char => char + '҄').join('') },
    { name: 'Electromagnetic', convert: (text) => text.split('').map(char => char + '҅').join('') },
    { name: 'Binary Code', convert: (text) => text.split('').map(char => char.charCodeAt(0).toString(2)).join(' ') },
    {
        name: 'Morse Code', convert: (text) => text.split('').map(char => {
            const morse = {
                'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
                'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
                'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
                'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
                'Y': '-.--', 'Z': '--..', ' ': '/'
            };
            return morse[char.toUpperCase()] || char;
        }).join(' ')
    },
    {
        name: 'Hieroglyphics', convert: (text) => text.split('').map(char => {
            const hieroglyphs = '𓀀𓀁𓀂𓀃𓀄𓀅𓀆𓀇𓀈𓀉𓀊𓀋𓀌𓀍𓀎𓀏𓀐𓀑𓀒𓀓𓀔𓀕𓀖𓀗𓀘𓀙𓀚𓀛𓀜𓀝';
            return hieroglyphs[char.charCodeAt(0) % hieroglyphs.length];
        }).join('')
    },
    {
        name: 'Wingdings', convert: (text) => text.split('').map(char => {
            const wingdings = '♠♣♥♦♤♧♡♢☎☏✆✇♿⚽⚾♀♂';
            return wingdings[char.charCodeAt(0) % wingdings.length];
        }).join('')
    },
    { name: 'Matrix Rain', convert: (text) => text.split('').map(char => char + '̴̵̶̷̸̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼͇͈͉͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̽̾̿̀́͂̓̈́͆͊͋͌̕̚͘͜͟͢͝͞͠͡').join('') }
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

                <Link href="/DiscordEmoji" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Discord Emojis
                </Link>

                <Link href="/ArrowEmoji" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Arrow Emoji
                </Link>

                <Link href="/BulletPointSymbol" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Bullet Point Symbol
                </Link>

                <Link href="/ZalgoText" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Zalgo Text
                </Link>

            </div>


            <div className="text-center ring-cyan-300 pb-5 pt-3 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>

                <Link href="/FancyFont/CursedTextGenerator" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Cursed Text
                </Link>

                <Link href="/FancyFont/CursiveTextGenerator" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Cursive Text
                </Link>

                <Link href="/FancyFont/FacebookBoldText" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Facebook Bold Text
                </Link>

                <Link href="/FancyFont/FancyTextGenerator" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Fancy Text
                </Link>

                <Link href="/FancyFont/GlitchTextGenerator" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Glitch Text
                </Link>

                <Link href="/FancyFont/HeartTextSymbol" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Heart Text Symbol
                </Link>

                <Link href="/FancyFont/ItalicTextStyles" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Italic Text
                </Link>

                <Link href="/FancyFont/SmallTextGenerator" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Small Text
                </Link>



                <Link href="/FancyFont/BoldTextStyles" className="text-white bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-violet-300 dark:focus:ring-violet-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
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