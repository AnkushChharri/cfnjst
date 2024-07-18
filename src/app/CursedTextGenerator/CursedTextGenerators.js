"use client"

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

const styles = [
    { name: 'Cursed Strikethrough', convert: (text) => text.split('').map(char => char + '\u0336').join('') },
    { name: 'Cursed Underline', convert: (text) => text.split('').map(char => char + '\u0332').join('') },
    { name: 'Cursed Combining', convert: (text) => text.split('').map(char => char + '\u0359\u035A').join('') },
    { name: 'Cursed Glitch', convert: (text) => text.split('').map(char => char + (Math.random() > 0.5 ? '\u0315' : '\u0358')).join('') },
    { name: 'Cursed Bubble', convert: (text) => text.split('').map(char => char + '\u0325\u0355').join('') },
    { name: 'Cursed Spooky', convert: (text) => text.split('').map(char => char + '\u0328\u0347').join('') },
    { name: 'Cursed Chaos', convert: (text) => text.split('').map(char => char + '\u033F\u034D\u0353').join('') },
    { name: 'Cursed Melting', convert: (text) => text.split('').map(char => char + '\u0360\u0361').join('') },
    { name: 'Cursed Distorted', convert: (text) => text.split('').map(char => char + '\u0334\u0335').join('') },
    { name: 'Cursed Vibrating', convert: (text) => text.split('').map(char => char + '\u034B\u034C').join('') },
    { name: 'Cursed Shadow', convert: (text) => text.split('').map(char => char + '\u0305\u0333').join('') },
    { name: 'Cursed Heartbeat', convert: (text) => text.split('').map((char, i) => char + (i % 2 === 0 ? '\u0310' : '\u0312')).join('') },
    { name: 'Cursed Earthquake', convert: (text) => text.split('').map(char => char + '\u0321\u0322').join('') },
    { name: 'Cursed Radioactive', convert: (text) => text.split('').map(char => char + '\u0326\u032E\u0349').join('') },
    { name: 'Cursed Alien', convert: (text) => text.split('').map(char => char + '\u0324\u0325\u0326').join('') },
    { name: 'Cursed Vortex', convert: (text) => text.split('').map(char => char + '\u0311\u031A\u0351').join('') },
    { name: 'Cursed Barcode', convert: (text) => text.split('').map(char => char + '\u030A\u0304\u033F').join('') },
    { name: 'Cursed Dripping', convert: (text) => text.split('').map(char => char + '\u0322\u0323\u0326').join('') },
    { name: 'Cursed Gradient', convert: (text) => text.split('').map((char, i) => char + String.fromCharCode(0x0300 + i % 15)).join('') },
    { name: 'Cursed Neon', convert: (text) => text.split('').map(char => char + '\u034E\u035B').join('') },
    { name: 'Cursed Gloom', convert: (text) => text.split('').map(char => char + '\u0316\u0317\u0318').join('') },
    { name: 'Cursed Circuit', convert: (text) => text.split('').map(char => char + '\u0325\u0328\u0329').join('') },
    { name: 'Cursed Fuzzy', convert: (text) => text.split('').map(char => char + '\u0333\u0334\u0335').join('') },
    { name: 'Cursed Pixelated', convert: (text) => text.split('').map(char => char + '\u0337\u0338').join('') },
    { name: 'Cursed Haunted', convert: (text) => text.split('').map(char => char + '\u0340\u0341\u0342').join('') },
    { name: 'Cursed Frozen', convert: (text) => text.split('').map(char => char + '\u0351\u0357\u035A').join('') },
    { name: 'Cursed Burning', convert: (text) => text.split('').map(char => char + '\u0306\u0307\u0308').join('') },
    { name: 'Cursed Void', convert: (text) => text.split('').map(char => char + '\u0354\u0355\u0356').join('') },
    { name: 'Cursed Quantum', convert: (text) => text.split('').map(char => char + '\u035C\u035D\u035E').join('') },
    { name: 'Cursed Encrypted', convert: (text) => text.split('').map(char => char + '\u0346\u0347\u0348').join('') },
    { name: 'Cursed Fractal', convert: (text) => text.split('').map((char, i) => char + String.fromCharCode(0x0300 + (i * 7) % 112)).join('') },
    { name: 'Cursed Nightmare', convert: (text) => text.split('').map(char => char + '\u0338\u0339\u033A').join('') },
    { name: 'Cursed Abyss', convert: (text) => text.split('').map(char => char + '\u0360\u0361\u0362').join('') },
    { name: 'Cursed Eldritch', convert: (text) => text.split('').map(char => char + '\u0363\u036F\u0489').join('') },
    { name: 'Cursed Interdimensional', convert: (text) => text.split('').map((char, i) => char + String.fromCharCode(0x0300 + (i * 13) % 112)).join('') }

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