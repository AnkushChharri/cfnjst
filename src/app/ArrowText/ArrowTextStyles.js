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

                <Link href="/BulletPointSymbol" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Bullet Point Symbol
                </Link>


                <Link href="/" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Stylish Text
                </Link>
                <Link href="/BoldTextStyles" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Bold Text
                </Link>
                <Link href="/ItalicTextStyles" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Italic Text
                </Link>
                <Link href="/ZalgoText" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Zalgo Text
                </Link>
                <Link href="/FancyTextGenerator" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Fancy Text
                </Link>

                <Link href="/FacebookBoldText" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Facebook Bold Text
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