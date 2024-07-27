"use client"
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Check, Search, Star, Menu as MenuIcon, Link as LucideLink } from 'lucide-react';
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
    const [menuOpen, setMenuOpen] = useState(false);
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
        <div className="cosmic-background min-h-screen text-white overflow-hidden flex flex-col">
            <div className="star-field"></div>
            <nav className="cosmic-nav">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <a href="/" className="flex-shrink-0">
                                <Star className="h-8 w-8 text-purple-400" />
                            </a>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="#" className="cosmic-nav-link">Home</a>
                                <a href="#" className="cosmic-nav-link">About</a>
                                <a href="#" className="cosmic-nav-link">Contact</a>
                            </div>
                        </div>
                        <div className="md:hidden">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-purple-400 hover:text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            >
                                <MenuIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
                {menuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a href="#" className="cosmic-nav-link block">Home</a>
                            <a href="#" className="cosmic-nav-link block">About</a>
                            <a href="#" className="cosmic-nav-link block">Contact</a>
                        </div>
                    </div>
                )}
            </nav>
            <main className="flex-grow">
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
            </main>
            <footer className="cosmic-footer mt-12" style={{ position: 'relative', zIndex: 50 }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-2xl font-bold cosmic-footer-title">Cosmic Name Converter</h2>
                            <p className="mt-2 text-purple-300">Transform your name into cosmic wonders</p>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-end space-x-4">

                            <Link href="/fancy-font/heart-text-symbol" passHref>
                                <span className="cosmic-footer-link">Cool Text</span>
                            </Link>

                            <Link href="/fancy-font/small-text-generator" passHref>
                                <span className="cosmic-footer-link">Contact</span>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-purple-800 pt-8 text-center text-sm text-purple-400">
                        © {new Date().getFullYear()} Cosmic Name Converter. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UnicodeNameConverter;