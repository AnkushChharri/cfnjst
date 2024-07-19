"use client"

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';





const styles = [
    { name: 'Basic', convert: (text) => text },
    {
        name: 'Bold', convert: (text) => text.split('').map(char => {
            const code = char.charCodeAt(0);
            return (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
                ? String.fromCodePoint(char.codePointAt(0) + 120205)
                : char;
        }).join('')
    },
    {
        name: 'Italic', convert: (text) => text.split('').map(char => {
            const code = char.charCodeAt(0);
            return (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
                ? String.fromCodePoint(char.codePointAt(0) + 120263)
                : char;
        }).join('')
    },
    {
        name: 'Script', convert: (text) => text.split('').map(char => {
            const code = char.charCodeAt(0);
            return (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
                ? String.fromCodePoint(char.codePointAt(0) + 119951)
                : char;
        }).join('')
    },
    {
        name: 'Double-struck', convert: (text) => text.split('').map(char => {
            const code = char.charCodeAt(0);
            return (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
                ? String.fromCodePoint(char.codePointAt(0) + 120055)
                : char;
        }).join('')
    },
    {
        name: 'Circled',
        convert: (text) => text.split('').map(char => {
            const code = char.toLowerCase().charCodeAt(0);
            if (code >= 97 && code <= 122) {
                return String.fromCodePoint(code - 97 + 9398);
            } else if (code >= 48 && code <= 57) {
                return String.fromCodePoint(code - 48 + 9312);
            }
            return char;
        }).join('')
    },
    {
        name: 'Square',
        convert: (text) => text.split('').map(char => {
            const code = char.toLowerCase().charCodeAt(0);
            if (code >= 97 && code <= 122) {
                return String.fromCodePoint(code - 97 + 127280);
            }
            return char;
        }).join('')
    },
    {
        name: 'Emoji', convert: (text) => {
            const emojiMap = {
                'a': '🅰️', 'b': '🅱️', 'c': '©️', 'd': '🇩', 'e': '3️⃣', 'f': '🎏', 'g': '🇬', 'h': '♓️', 'i': 'ℹ️',
                'j': '🗾', 'k': '🎋', 'l': '👢', 'm': 'Ⓜ️', 'n': '🇳', 'o': '🅾️', 'p': '🅿️', 'q': '🍳', 'r': '®️',
                's': '💲', 't': '✝️', 'u': '⛎', 'v': '♈️', 'w': '〰️', 'x': '❌', 'y': '💴', 'z': '💤',
                '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣', '4': '4️⃣', '5': '5️⃣', '6': '6️⃣', '7': '7️⃣', '8': '8️⃣', '9': '9️⃣',
                '!': '❗', '?': '❓', '+': '➕', '-': '➖', '*': '✳️', '/': '➗', '$': '💲', '%': '💯'
            };
            return text.toLowerCase().split('').map(char => emojiMap[char] || char).join('');
        }
    },
    {
        name: 'Symbols', convert: (text) => {
            const symbolMap = {
                'a': '♠️', 'b': '♭', 'c': '☾', 'd': '◇', 'e': '€', 'f': '♭', 'g': '♌', 'h': '♓', 'i': '♾️',
                'j': '♃', 'k': '☭', 'l': '£', 'm': '♏', 'n': '♑', 'o': '☮️', 'p': '☧', 'q': '♕', 'r': '☈',
                's': '§', 't': '☦️', 'u': '☋', 'v': '♈', 'w': '☠️', 'x': '☓', 'y': '☯️', 'z': '☬',
                '0': '⓿', '1': '➀', '2': '➁', '3': '➂', '4': '➃', '5': '➄', '6': '➅', '7': '➆', '8': '➇', '9': '➈',
                '!': '‼️', '?': '⁉️', '+': '➕', '-': '➖', '*': '✱', '/': '∕', '$': '💲', '%': '⚆'
            };
            return text.toLowerCase().split('').map(char => symbolMap[char] || char).join('');
        }
    },
    {
        name: 'Bubble', convert: (text) => {
            const bubbleMap = {
                'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ',
                'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ',
                's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
                '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨',
                '!': '❗', '?': '❓', '+': '⊕', '-': '⊖', '*': '⊛', '/': '∕', '$': '💲', '%': '℅'
            };
            return text.toLowerCase().split('').map(char => bubbleMap[char] || char).join('');
        }
    },
    {
        name: 'Inverted', convert: (text) => {
            const inverted = 'ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz';
            return text.toLowerCase().split('').map(char => {
                const index = 'abcdefghijklmnopqrstuvwxyz'.indexOf(char);
                return index !== -1 ? inverted[index] : char;
            }).reverse().join('');
        }
    },
    {
        name: 'Fullwidth', convert: (text) => {
            return text.split('').map(char => {
                const code = char.charCodeAt(0);
                if ((code >= 33 && code <= 126) || (code >= 65281 && code <= 65374)) {
                    return String.fromCharCode(code + 65248);
                }
                return char;
            }).join('');
        }
    },
    {
        name: 'Smallcaps', convert: (text) => {
            const smallcaps = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ';
            return text.toLowerCase().split('').map(char => {
                const index = 'abcdefghijklmnopqrstuvwxyz'.indexOf(char);
                return index !== -1 ? smallcaps[index] : char;
            }).join('');
        }
    },
    {
        name: 'Superscript', convert: (text) => {
            const superscript = '⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ';
            const normal = '0123456789abcdefghijklmnopqrstuvwxyz';
            return text.toLowerCase().split('').map(char => {
                const index = normal.indexOf(char);
                return index !== -1 ? superscript[index] : char;
            }).join('');
        }
    },
    {
        name: 'Subscript', convert: (text) => {
            const subscript = '₀₁₂₃₄₅₆₇₈₉ₐbcdₑfgₕᵢⱼₖₗₘₙₒₚqᵣₛₜᵤᵥwₓyz';
            const normal = '0123456789abcdefghijklmnopqrstuvwxyz';
            return text.toLowerCase().split('').map(char => {
                const index = normal.indexOf(char);
                return index !== -1 ? subscript[index] : char;
            }).join('');
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

    return (
        <div className="max-w-7xl m-auto p-1">
            <textarea
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="rounded-md p-4 w-full focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
            />
            <p className="text-xs font-weight: 500; text-zinc-400">⬆️Search Your Name and Click on Any Style & Copy⬇️</p>


            <div className=" text-center pt-5 pb-3 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>

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


                <Link href="/FancyFont/CoolText" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Cool Text
                </Link>

                <Link href="/FancyFont/CursedTextGenerator" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Cursed Text
                </Link>

                <Link href="/FancyFont/CursiveTextGenerator" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Cursive Text
                </Link>

                <Link href="/FancyFont/FacebookBoldText" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Facebook Bold Text
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
                {renderStyleCard(dummyStyle)}
                {filteredStyles.map(renderStyleCard)}
            </div>
            {copiedStyle && (
                <div className="mt-4 text-green-600 text-center">Copied: {copiedStyle} style</div>
            )}
        </div>

    );
};

export default UnicodeNameConverter;