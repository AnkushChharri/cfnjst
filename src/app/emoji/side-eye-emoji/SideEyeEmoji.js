"use client"

import React, { useState, useCallback } from 'react';
import { Copy, X } from 'lucide-react';

const symbols = [
    '🙄', '😒', '😏', '😶', '😑', '😐',
    '🥱', '😮‍💨', '🙃', '😕', '🤨', '🧐', '🤔'
];

const platforms = [
    { name: 'Default', className: '' },
    { name: 'Facebook', className: 'font-[system-ui]' },
    { name: 'Twitter', className: 'font-[TwitterChirp]' },
    { name: 'WhatsApp', className: 'font-[Segoe UI Emoji]' },
];

const EmojiComparison = () => {
    const [selectedSymbols, setSelectedSymbols] = useState('');
    const [copiedSymbol, setCopiedSymbol] = useState(null);

    const handleSymbolClick = useCallback((symbol) => {
        setSelectedSymbols(prev => prev + symbol);
        navigator.clipboard.writeText(symbol)
            .then(() => {
                setCopiedSymbol(symbol);
                setTimeout(() => setCopiedSymbol(null), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    }, []);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(selectedSymbols)
            .then(() => {
                setCopiedSymbol('all');
                setTimeout(() => setCopiedSymbol(null), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    }, [selectedSymbols]);

    const handleClear = useCallback(() => {
        setSelectedSymbols('');
    }, []);

    return (
        <div className="max-w-4xl m-auto p-4">
            <div className="mb-4">
                <div className="relative p-4 rounded-md">
                    <textarea
                        value={selectedSymbols}
                        onChange={(e) => setSelectedSymbols(e.target.value)}
                        className="rounded-md p-4 w-full h-24 focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
                        placeholder="Click emojis to add or type here"
                    />
                    <div className="absolute top-5 right-5 flex gap-2">
                        <button onClick={handleCopy} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                            <Copy size={16} />
                        </button>
                        <button onClick={handleClear} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                            <X size={16} />
                        </button>
                    </div>
                    {copiedSymbol === 'all' && (
                        <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded z-20">
                            Copied all symbols!
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Side Eye and Related Emojis</h3>
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                    {symbols.map((symbol, index) => (
                        <div
                            key={index}
                            className="relative flex items-center justify-center bg-white p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                            onClick={() => handleSymbolClick(symbol)}
                        >
                            <span className="text-3xl">{symbol}</span>
                            {copiedSymbol === symbol && (
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded">
                                    Copied!
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Side Eye and Related Emoji Comparison Across Platforms</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border p-2">Emoji</th>
                                {platforms.map((platform) => (
                                    <th key={platform.name} className="border p-2">{platform.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {symbols.map((symbol, index) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">{symbol}</td>
                                    {platforms.map((platform) => (
                                        <td key={platform.name} className={`border p-2 text-center text-3xl ${platform.className}`}>
                                            {symbol}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmojiComparison;