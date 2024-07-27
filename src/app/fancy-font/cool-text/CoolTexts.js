"use client"
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Check, Search, Star } from 'lucide-react';


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
    { name: 'Neon Glow', convert: (text) => text.split('').map(char => char + '̐').join('') },
    { name: 'Underwater', convert: (text) => text.split('').map(char => char + '͜').join('') },
    { name: 'Alien Language', convert: (text) => text.split('').map(char => char + '҇').join('') },
    { name: 'Constellation', convert: (text) => '⋆' + text.split('').join('⋆') + '⋆' },
    { name: 'Quantum', convert: (text) => text.split('').map(char => char + '̬').join('') },
];

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
    const [name, setName] = useState('Cosmic');
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
            className="holographic-card"
            onClick={() => handleCopy(convertedNames[style.name], style.name)}
        >
            <div className="holographic-content">
                <h3 className="text-xl font-bold mb-3">{style.name}</h3>
                <p className="text-2xl font-extrabold text-center break-all">
                    {isClient && convertedNames[style.name]}
                </p>
            </div>
            <div
                className={`absolute top-2 right-2 bg-green-400 text-white rounded-full p-2 transform transition-all duration-300 ${copiedStyle === style.name ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
            >
                <Check size={20} />
            </div>
        </div>
    ), [convertedNames, copiedStyle, handleCopy, isClient]);

    return (
        <div className="cosmic-background min-h-screen text-white overflow-hidden">
            <div className="star-field"></div>
            <div className="max-w-7xl mx-auto p-6 space-y-8 relative z-10">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-center mb-10 cosmic-title">
                    Cosmic Name Converter
                </h1>
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="relative flex-grow w-full sm:w-auto">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full text-lg p-3 pr-20 border-2 border-purple-500 bg-black bg-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300"
                        />
                        <button
                            onClick={() => setName('Cosmic')}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 text-white px-4 py-1 rounded-full hover:bg-purple-600 transition-colors duration-300 text-sm font-bold"
                        >
                            Reset
                        </button>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                        <input
                            type="search"
                            placeholder="Search styles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 p-3 border-2 border-purple-500 bg-black bg-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredStyles.map(renderStyleCard)}
                </div>
            </div>
        </div>
    );
};

export default UnicodeNameConverter;