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

    return (
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
                <Link href="/BulletPointSymbol" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Bullet Point Symbol
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredStyles.map(renderStyleCard)}
            </div>
        </div>
    );
};

export default HeartTextSymbolConverter;