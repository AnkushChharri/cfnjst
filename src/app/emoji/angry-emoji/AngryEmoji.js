"use client"
import React, { useState, useCallback, useEffect } from 'react';
import { Copy, X, Smile, Zap, CheckCircle, AlertCircle, Info } from 'lucide-react';

const symbols = [
    '😠', '😡', '🤬', '😤', '😾', '💢', '👿', '😈', '🗯️', '💀', '☠️', '👺', '👹', '😣', '😖', '😫', '😩'
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

    return (
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

            {/* Angry Emojis */}
            <div className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 p-1 rounded-3xl shadow-lg">
                <div className="bg-white p-6 sm:p-8 rounded-3xl">
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500">Angry Emojis</h3>
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

            {/* Emoji Comparison */}
            <div className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 p-1 rounded-3xl shadow-lg">
                <div className="bg-white p-6 sm:p-8 rounded-3xl">
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500">Angry Emoji Comparison</h3>
                    <div className="mb-6 flex justify-center">
                        <button
                            className={`px-4 sm:px-8 py-2 sm:py-3 rounded-l-full text-sm sm:text-lg font-medium ${activeTab === 'table' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white' : 'bg-gray-200 text-gray-700'} transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-400`}
                            onClick={() => setActiveTab('table')}
                        >
                            Table View
                        </button>
                        <button
                            className={`px-4 sm:px-8 py-2 sm:py-3 rounded-r-full text-sm sm:text-lg font-medium ${activeTab === 'grid' ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white' : 'bg-gray-200 text-gray-700'} transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400`}
                            onClick={() => setActiveTab('grid')}
                        >
                            Grid View
                        </button>
                    </div>
                    {activeTab === 'table' ? (
                        <div className="overflow-x-auto rounded-2xl shadow-md">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gradient-to-r from-violet-200 to-fuchsia-200">
                                        <th className="border border-violet-300 p-2 sm:p-4 text-left font-semibold">Emoji</th>
                                        {platforms.map((platform) => (
                                            <th key={platform.name} className="border border-violet-300 p-2 sm:p-4 text-left font-semibold">{platform.name}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {symbols.map((symbol, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                            <td className="border border-violet-200 p-2 sm:p-4 text-center text-2xl sm:text-3xl">{symbol}</td>
                                            {platforms.map((platform) => (
                                                <td key={platform.name} className={`border border-violet-200 p-2 sm:p-4 text-center text-2xl sm:text-3xl ${platform.className}`}>
                                                    {symbol}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {symbols.map((symbol, index) => (
                                <div key={index} className="border-2 border-violet-200 rounded-2xl p-4 sm:p-6 hover:border-fuchsia-400 transition-all duration-300 transform hover:scale-105 shadow-md">
                                    <h4 className="text-xl sm:text-2xl font-semibold text-center mb-3 sm:mb-4">{symbol}</h4>
                                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                        {platforms.map((platform) => (
                                            <div key={platform.name} className="text-center">
                                                <div className={`text-3xl sm:text-4xl ${platform.className}`}>{symbol}</div>
                                                <div className="text-xs mt-1 sm:mt-2 font-medium">{platform.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmojiComparison;