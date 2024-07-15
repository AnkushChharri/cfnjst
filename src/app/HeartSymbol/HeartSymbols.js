import React, { useState, useCallback, useEffect } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';

const dotSymbols = [
    // Expanded heart symbols
    '♥', '♡', '❤', '❥', '❣', '❦', '❧', '🤎', '💔', '💞', '💟',
    '💌', '💑', '💒', '💏', '👩‍❤️‍👨', '👨‍❤️‍👨', '👩‍❤️‍👩',
    '❤️‍🔥', '❣️', '💖', '💗', '💓', '💕', '❤️‍🩹', '💙', '💚', '💛', '🧡', '💜', '🤎', '🖤', '🤍',
    '💘', '💝', '💋', '💯', '💢', '💥',

    '☎', '⌛', '⌚', '☄', '✈', '⚓', '⚡', '☘', '⚘', '⚔', '⚖', '⚰', '⚱', '⚽', '⚾', '⛄', '⛅', '⛈', '⛓',
    '⛔', '⛩', '⛪', '⛰', '⛱', '⛲', '⛳', '⛴', '⛵', '⛷', '⛸', '⛹', '⛺', '⛽', '✨', '⭐',
];

const DotSymbolSelector = () => {
    const [selectedDots, setSelectedDots] = useState('');
    const [copiedDot, setCopiedDot] = useState(null);
    const [isProtected, setIsProtected] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const handleDotClick = useCallback((dot) => {
        if (isProtected) return;

        setIsProtected(true);
        setSelectedDots(prev => prev + dot);
        navigator.clipboard.writeText(dot)
            .then(() => {
                setCopiedDot(dot);
                setTimeout(() => setCopiedDot(null), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err))
            .finally(() => {
                setTimeout(() => setIsProtected(false), 100);
            });
    }, [isProtected]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(selectedDots)
            .then(() => {
                setCopiedDot('all');
                setTimeout(() => setCopiedDot(null), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    }, [selectedDots]);

    const handleClear = useCallback(() => {
        setSelectedDots('');
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const stickyBox = document.getElementById('sticky-box');
            if (stickyBox) {
                if (window.pageYOffset > 100) {
                    stickyBox.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'z-10');
                    setIsSticky(true);
                } else {
                    stickyBox.classList.remove('fixed', 'top-0', 'left-0', 'right-0', 'z-10');
                    setIsSticky(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="max-w-7xl m-auto p-4">
            <div id="sticky-box" className="mb-4 transition-all duration-300">
                <div className="relative p-4 rounded-md">
                    <textarea
                        value={selectedDots}
                        onChange={(e) => setSelectedDots(e.target.value)}
                        className="rounded-md p-4 w-full focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
                        placeholder="Click dots to add or type here"
                    />
                    <div className="absolute top-5 right-5 flex gap-2">
                        <button onClick={handleCopy} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                            <Copy size={16} />
                        </button>
                        <button onClick={handleClear} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                            <X size={16} />
                        </button>
                    </div>
                    {copiedDot === 'all' && (
                        <div className={`absolute ${isSticky ? 'bottom-[-2rem]' : 'top-[-2rem]'} left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded z-20`}>
                            Copied all dots!
                        </div>
                    )}
                </div>
            </div>

            <div className="text-center pt-4 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>
                <Link href="/DotSymbol" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Dot Symbol
                </Link>

                <Link href="/BulletPointSymbol" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Bullet Point Symbol
                </Link>

            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Comprehensive Dot Symbols</h3>
                <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-20 lg:grid-cols-25 gap-2">
                    {dotSymbols.map((dot, index) => (
                        <div
                            key={index}
                            className="relative flex items-center justify-center bg-white p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                            onClick={() => handleDotClick(dot)}
                        >
                            <span className="text-lg">{dot}</span>
                            {copiedDot === dot && (
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded">
                                    Copied!
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DotSymbolSelector;