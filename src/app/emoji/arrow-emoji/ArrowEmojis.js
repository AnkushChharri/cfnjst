"use client"
import React, { useState, useCallback, useEffect } from 'react';
import { Copy, X, Smile, Zap, CheckCircle, AlertCircle, Info, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const symbols = [
    '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️', '↔️', '↩️', '↪️',
    '⤴️', '⤵️', '🔄', '🔃', '🔂', '🔁', '🔀', '🔼', '🔽', '⏫', '⏬', '⏩', '⏪',
    '🔚', '🔙', '🔛', '🔝', '🔜', '☑️', '✅', '✔️', '❇️', '✳️', '➿', '➰', '〽️',
    '✴️', '❎', '✖️', '➕', '➖', '➗', '❌', '💠', '🔘', '🔳', '🔲', '◻️', '◼️',
    '◽', '◾', '▫️', '▪️'
];

const platforms = [
    { name: 'Default', className: 'font-sans' },
    { name: 'Facebook', className: 'font-[Helvetica,Arial,sans-serif]' },
    { name: 'Twitter', className: 'font-[Chirp,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif]' },
    { name: 'WhatsApp', className: 'font-[Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif]' },
];



const EmojiComparison = () => {
    const [selectedSymbols, setSelectedSymbols] = useState('');
    const [copiedSymbol, setCopiedSymbol] = useState(null);
    const [activeTab, setActiveTab] = useState('table');
    const [alert, setAlert] = useState({ show: false, message: '', emoji: '', type: '' });

    const showAlert = useCallback((message, emoji = '', type = 'success') => {
        setAlert({ show: true, message, emoji, type });
        setTimeout(() => setAlert({ show: false, message: '', emoji: '', type: '' }), 3000);
    }, []);

    const countEmojis = (str) => {
        const emojiRegex = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;
        return (str.match(emojiRegex) || []).length;
    };

    const handleSymbolClick = useCallback((symbol) => {
        setSelectedSymbols(prev => prev + symbol);
        navigator.clipboard.writeText(symbol)
            .then(() => {
                setCopiedSymbol(symbol);
                showAlert(`Copied: ${symbol}`, symbol, 'success');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                showAlert('Failed to copy emoji', '', 'error');
            });
    }, [showAlert]);

    const handleCopy = useCallback(() => {
        if (selectedSymbols) {
            navigator.clipboard.writeText(selectedSymbols)
                .then(() => {
                    setCopiedSymbol('all');
                    const emojiCount = countEmojis(selectedSymbols);
                    showAlert(`Copied ${emojiCount} emoji${emojiCount !== 1 ? 's' : ''}!`, '📋', 'success');
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                    showAlert('Failed to copy emojis', '', 'error');
                });
        }
    }, [selectedSymbols, showAlert]);

    const handleClear = useCallback(() => {
        setSelectedSymbols('');
        showAlert('Cleared all emojis!', '🧹', 'info');
    }, [showAlert]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCopiedSymbol(null);
        }, 2000);
        return () => clearTimeout(timer);
    }, [copiedSymbol]);



    return (<>
        <div className="max-w-7xl mx-auto p-4 space-y-8">
            {/* Improved Alert Component */}
            <div
                className={`fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 transition-all duration-300 ease-in-out ${alert.show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    } max-w-md w-full z-50`}
            >
                <div className={`bg-white rounded-xl shadow-2xl overflow-hidden`}>
                    <div className={`h-2 ${alert.type === 'success' ? 'bg-green-500' :
                        alert.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                        }`}></div>
                    <div className="p-4 flex items-center">
                        <div className={`mr-4 rounded-full p-2 ${alert.type === 'success' ? 'bg-green-100 text-green-500' :
                            alert.type === 'error' ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'
                            }`}>
                            {alert.type === 'success' ? <CheckCircle size={24} /> :
                                alert.type === 'error' ? <AlertCircle size={24} /> :
                                    <Info size={24} />}
                        </div>
                        <div className="flex-grow">
                            <p className="font-medium text-gray-800">{alert.message}</p>
                        </div>
                        {alert.emoji && (
                            <div className="ml-4 text-4xl animate-bounce">
                                {alert.emoji}
                            </div>
                        )}
                    </div>
                </div>
            </div>



            {/* Emoji Playground */}
            <div className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 p-1 rounded-3xl shadow-lg">
                <div className="bg-white p-6 sm:p-8 rounded-3xl">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold flex flex-wrap items-center gap-3 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500">
                        <Smile className="text-yellow-500" size={36} />
                        Emoji Playground
                        <Zap className="text-yellow-500 animate-pulse" size={24} />
                    </h2>
                    <div className="relative mb-4 group">
                        <textarea
                            value={selectedSymbols}
                            onChange={(e) => setSelectedSymbols(e.target.value)}
                            className="rounded-2xl p-4 w-full h-28 sm:h-32 focus:ring-2 outline-none focus:ring-fuchsia-400 border-2 border-violet-200 focus:border-fuchsia-400 bg-gray-50 shadow-inner resize-none transition-all duration-300 text-lg sm:text-xl"
                            placeholder="Click emojis to add or type here"
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                            <button
                                onClick={handleCopy}
                                disabled={!selectedSymbols}
                                className={`p-2 text-white rounded-xl transition-all duration-300 shadow-md transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-400 ${selectedSymbols
                                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600'
                                    : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                                title={selectedSymbols ? "Copy emojis" : "No emojis to copy"}
                            >
                                <Copy size={20} />
                            </button>
                            <button
                                onClick={handleClear}
                                disabled={!selectedSymbols}
                                className={`p-2 text-white rounded-xl transition-all duration-300 shadow-md transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 ${selectedSymbols
                                    ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
                                    : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                                title={selectedSymbols ? "Clear emojis" : "No emojis to clear"}
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="text-center pb-1 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>
                <Link href="/" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Fancy Font
                </Link>
                <Link href="/discord-emoji" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Discord Emoji
                </Link>
                <Link href="/bullet-point-symbol" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Bullet Point Symbol
                </Link>
                <Link href="/zalgo-text" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Zalgo Text
                </Link>
            </div>

            <div className="text-center ring-cyan-300 pb-4 pt-3 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>
                <Link href="/emoji/moon-emoji" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Moon Emoji
                </Link>
                <Link href="/emoji/fire-emoji" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Fire Emoji
                </Link>
                <Link href="/emoji/heart-emoji" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Heart Emoji
                </Link>
                <Link href="/emoji/home-emoji" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Home Emoji
                </Link>
                <Link href="/emoji/Kaomoji" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Kaomoji
                </Link>
                <Link href="/emoji/mewing-emoji" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Mewing Emoji
                </Link>
                <Link href="/emoji/skull-emoji" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Skull Emoji
                </Link>
                <Link href="/emoji/dot-emoji" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Dot Emoji
                </Link>
            </div>

            {/* Arrow Emojis */}
            <div className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 p-1 rounded-3xl shadow-lg">
                <div className="bg-white p-6 sm:p-8 rounded-3xl">
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500">Arrow Emojis</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-2 sm:gap-4">
                        {symbols.map((symbol, index) => (
                            <button
                                key={index}
                                className="relative h-16 sm:h-20 text-2xl sm:text-4xl border-2 border-violet-200 rounded-2xl hover:border-fuchsia-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 shadow-md"
                                onClick={() => handleSymbolClick(symbol)}
                            >
                                {symbol}
                                {copiedSymbol === symbol && (
                                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                                        ✓
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default EmojiComparison;