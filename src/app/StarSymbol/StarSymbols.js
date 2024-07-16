"use client"

import React, { useState, useCallback } from 'react';
import { Copy, X } from 'lucide-react';


const starSymbols = [
    // Basic stars
    '⭐',
    // Outlined and filled stars
    '⁂', '⁎', '⁑',
    // Religious and cultural stars
    '☪', '✴', '✵', '✡', '᯾',
    // Decorative and special stars
    '❋', '❊', '❉', '❈', '❇', '❆', '❅', '❄',
    // Geometric stars
    '✻', '✼', '✽', '✾', '✿', '❀', '❁',
    // Star-related emojis
    '🌟', '💫', '🔯', '🌠', '🌃', '🌌', '🚀',
    // Sparkles and star-like symbols
    '✨', '🎇', '🎆',
    // Additional unicode stars
    '🟊', '🟋', '⯪', '⯫', '⯬', '⯭', '⛤', '⛥', '⛦', '⛧',
    // Circled stars
    '✪', '✫', '✬', '✭', '✮', '✯', '✰',
    // Black stars
    '★', '✶', '✷', '✸', '✹', '✺',
    // White stars
    '☆', '✧', '✦', '✥', '✤', '✣', '✢',
    // Rotated stars
    '⋉', '⋊', '⋋', '⋌', '⍟', '⎈',
    // Mathematical stars
    '⋆', '∗'
];

const StarSymbolSelector = () => {
    const [selectedStars, setSelectedStars] = useState('');
    const [copiedStar, setCopiedStar] = useState(null);

    const handleStarClick = useCallback((star) => {
        setSelectedStars(prev => prev + star);
        navigator.clipboard.writeText(star)
            .then(() => {
                setCopiedStar(star);
                setTimeout(() => setCopiedStar(null), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    }, []);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(selectedStars)
            .then(() => {
                setCopiedStar('all');
                setTimeout(() => setCopiedStar(null), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    }, [selectedStars]);

    const handleClear = useCallback(() => {
        setSelectedStars('');
    }, []);

    return (
        <div className="max-w-4xl m-auto p-4">
            <div className="mb-4">
                <div className="relative p-4 rounded-md">
                    <textarea
                        value={selectedStars}
                        onChange={(e) => setSelectedStars(e.target.value)}
                        className="rounded-md p-4 w-full h-24 focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
                        placeholder="Click stars to add or type here"
                    />
                    <div className="absolute top-5 right-5 flex gap-2">
                        <button onClick={handleCopy} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                            <Copy size={16} />
                        </button>
                        <button onClick={handleClear} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                            <X size={16} />
                        </button>
                    </div>
                    {copiedStar === 'all' && (
                        <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded z-20">
                            Copied all stars!
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Comprehensive Star Symbols</h3>
                <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-2">
                    {starSymbols.map((star, index) => (
                        <div
                            key={index}
                            className="relative flex items-center justify-center bg-white p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                            onClick={() => handleStarClick(star)}
                        >
                            <span className="text-2xl">{star}</span>
                            {copiedStar === star && (
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

export default StarSymbolSelector;