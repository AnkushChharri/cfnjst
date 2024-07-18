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
    { name: 'Synthwave', convert: (text) => text.toUpperCase().split('').join('═') }
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
                <Link href="/BulletPointSymbol" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Bullet Point Symbol
                </Link>
            </div>

            <div className="space-y-4 mt-4">
                {filteredStyles.map(renderStyleCard)}
            </div>
        </div>
    );
};

export default UnicodeNameConverter;