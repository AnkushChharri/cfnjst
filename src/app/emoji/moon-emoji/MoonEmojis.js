"use client"
import React, { useState, useCallback, useEffect } from 'react';
import { Copy, X, Smile, Zap, CheckCircle, AlertCircle, Info } from 'lucide-react';
import Link from 'next/link';

const symbols = [
    // Moon emojis
    '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌙', '🌚', '🌛', '🌜', '🌝',
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
                    Discord Emojis
                </Link>

                <Link href="/emoji/arrow-emoji" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Arrow Emoji
                </Link>

                <Link href="/bullet-point-symbol" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Bullet Point Symbol
                </Link>

                <Link href="/zalgo-text" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Zalgo Text
                </Link>

            </div>


            <div className="text-center ring-cyan-300 pb-4 pt-3 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>

                <Link href="/emoji/arrow-emoji" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Arrow Emoji
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
            <div className="max-w-7xl xl:mx-auto text-left mx-4">
                <h1 className="pt-2 font-semibold text-xl">Moon Emoji: Lunar Phases, Full Moon, and Moon Face Emojis</h1>
                <p className="pt-4">In the vast universe of digital communication, emojis have become our celestial bodies, guiding us through conversations with their expressive charm. Among these stellar symbols, the moon emoji shines brightly, casting its gentle glow across our messages. This comprehensive guide will explore the various moon emojis, from the serene crescent to the enigmatic moon face, illuminating their meanings and optimal uses.</p>

                <h2 className="pt-4 font-semibold text-xl">Moon Phase Emojis: A Lunar Cycle in Your Messages</h2>
                <p className="pt-4">The moon phase emojis offer a unique way to express the passage of time, mood changes, or simply add a touch of nocturnal beauty to your digital conversations. Let&apos;s wax poetic about each phase:</p>

                <h3 className="pt-4 font-semibold">1. 🌑 New Moon: The journey begins with darkness, symbolizing new beginnings or the unknown.</h3>
                <p className="pt-2">Example: &quot;Starting my new diet today 🌑 Wish me luck!&quot;</p>

                <h3 className="pt-4 font-semibold">2. 🌒 Waxing Crescent Moon: A sliver of hope emerges, perfect for expressing growing optimism.</h3>
                <p className="pt-2">Example: &quot;My startup is slowly gaining traction 🌒 Things are looking up!&quot;</p>

                <h3 className="pt-4 font-semibold">3. 🌓 First Quarter Moon: Half-illuminated, this emoji represents balance or being at a crossroads.</h3>
                <p className="pt-2">Example: &quot;Halfway through the semester 🌓 Time to buckle down and study!&quot;</p>

                <h3 className="pt-4 font-semibold">4. 🌔 Waxing Gibbous Moon: Almost full, it&apos;s ideal for conveying anticipation or nearing a goal.</h3>
                <p className="pt-2">Example: &quot;Almost finished with my novel 🌔 Can&apos;t wait to share it with the world!&quot;</p>

                <h3 className="pt-4 font-semibold">5. 🌕 Full Moon: The pinnacle of lunar beauty, perfect for celebrating achievements or expressing completeness.</h3>
                <p className="pt-2">Example: &quot;Finally got my degree 🌕 Years of hard work have paid off!&quot;</p>

                <h3 className="pt-4 font-semibold">6. 🌖 Waning Gibbous Moon: Symbolizes reflection or the start of a decline.</h3>
                <p className="pt-2">Example: &quot;The party&apos;s winding down 🌖 But what a night it&apos;s been!&quot;</p>

                <h3 className="pt-4 font-semibold">7. 🌗 Last Quarter Moon: Another half-moon, but now decreasing, ideal for expressing mixed feelings.</h3>
                <p className="pt-2">Example: &quot;Bittersweet feelings as I pack for my move 🌗 Excited but gonna miss this place.&quot;</p>

                <h3 className="pt-4 font-semibold">8. 🌘 Waning Crescent Moon: The cycle nears its end, perfect for goodbyes or conclusions.</h3>
                <p className="pt-2">Example: &quot;Wrapping up this chapter of my life 🌘 Ready for what comes next.&quot;</p>

                <p className="pt-4">By incorporating these moon phase emojis into your messages, you can add depth and nuance to your digital communication, making your texts more engaging and expressive.</p>

                <h2 className="pt-4 font-semibold text-xl">Full Moon Emoji: When Your Message Needs to Shine Bright</h2>
                <p className="pt-4">The full moon emoji 🌕 deserves special attention for its versatility and visual impact. This radiant circle carries a wealth of meanings and can elevate your messages in various contexts:</p>

                <h3 className="pt-4 font-semibold">1. Completion and Achievement: Use it to highlight major accomplishments or milestones.</h3>
                <p className="pt-2">Example: &quot;After months of training, I finished my first marathon today! 🌕&quot;</p>

                <h3 className="pt-4 font-semibold">2. Beauty and Perfection: Emphasize the aesthetic appeal or flawlessness of something.</h3>
                <p className="pt-2">Example: &quot;Just saw the Taj Mahal by moonlight 🌕 Absolutely breathtaking!&quot;</p>

                <h3 className="pt-4 font-semibold">3. Clarity and Illumination: Indicate moments of realization or when things become clear.</h3>
                <p className="pt-2">Example: &quot;Finally understood that complex math problem 🌕 It all makes sense now!&quot;</p>

                <h3 className="pt-4 font-semibold">4. Emotional Intensity: Express strong feelings or heightened states of mind.</h3>
                <p className="pt-2">Example: &quot;Our first kiss under the full moon 🌕 Magical doesn&apos;t even begin to describe it.&quot;</p>

                <h3 className="pt-4 font-semibold">5. Natural Cycles and Timing: Reference lunar cycles or perfect timing.</h3>
                <p className="pt-2">Example: &quot;Planting my garden by the full moon 🌕 Here&apos;s to a bountiful harvest!&quot;</p>

                <p className="pt-4">The full moon emoji&apos;s bold, circular shape makes it stand out in text, drawing the reader&apos;s eye and adding emphasis to your message. Its association with nighttime and celestial beauty also makes it a popular choice for creating a romantic or mysterious atmosphere in your digital conversations.</p>

                <h2 className="pt-4 font-semibold text-xl">Moon Face Emoji: Adding Character to Your Lunar Expressions</h2>
                <p className="pt-4">While the standard moon emojis represent the celestial body itself, the moon face emojis infuse personality into your lunar references. These anthropomorphic moons can add humor, emotion, or whimsy to your messages:</p>

                <h3 className="pt-4 font-semibold">1. 🌚 New Moon Face: Often used playfully to suggest mischief or sly humor.</h3>
                <p className="pt-2">Example: &quot;I may have eaten the last cookie 🌚 Don&apos;t tell anyone!&quot;</p>

                <h3 className="pt-4 font-semibold">2. 🌝 Full Moon Face: Typically represents a cheerful or sometimes smugly content expression.</h3>
                <p className="pt-2">Example: &quot;Aced all my exams this semester 🌝 Feeling pretty good about myself!&quot;</p>

                <h3 className="pt-4 font-semibold">3. 🌛 First Quarter Moon Face: Can be used to express a dreamy or sleepy state.</h3>
                <p className="pt-2">Example: &quot;Staying up late to watch the meteor shower 🌛 So worth the lost sleep!&quot;</p>

                <h3 className="pt-4 font-semibold">4. 🌜 Last Quarter Moon Face: Often used to convey a sense of winding down or tiredness.</h3>
                <p className="pt-2">Example: &quot;It&apos;s been a long day, time to hit the hay 🌜 Goodnight, everyone!&quot;</p>

                <p className="pt-4">These moon face emojis allow you to personify the moon, making your messages more relatable and emotionally resonant. They&apos;re particularly useful in casual conversation, adding a touch of playfulness to your digital interactions.</p>

                <h2 className="pt-4 font-semibold text-xl">Optimizing Your Lunar Emoji Usage for Maximum Impact</h2>
                <p className="pt-4">To make the most of moon emojis in your digital communication:</p>

                <h3 className="pt-4 font-semibold">1. Context is Key: Choose the appropriate moon phase or face to match the tone and content of your message.</h3>
                <p className="pt-2">Example: Use 🌒 when talking about gradual progress, or 🌝 when sharing good news.</p>

                <h3 className="pt-4 font-semibold">2. Combine with Other Emojis: Create mini-stories or set scenes by pairing moon emojis with related symbols.</h3>
                <p className="pt-2">Example: &quot;Camping under the stars tonight ⛺🌕🏞️&quot; paints a vivid picture.</p>

                <h3 className="pt-4 font-semibold">3. Use in Sequences: Show progression or the passage of time with a series of moon phases.</h3>
                <p className="pt-2">Example: &quot;My fitness journey this year: 🌑➡️🌓➡️🌕 From couch potato to marathon runner!&quot;</p>

                <h3 className="pt-4 font-semibold">4. Enhance Text-Based Art: Incorporate moon emojis into ASCII art or emoji patterns for visual appeal.</h3>
                <p className="pt-2">Example: &quot;•*¨*•.¸¸🌕 Sweet dreams! ¸¸.•*¨*•&quot;</p>

                <h3 className="pt-4 font-semibold">5. Cultural Sensitivity: Be aware that moon symbolism varies across cultures. What&apos;s positive in one context might not be in another.</h3>

                <p className="pt-4">By thoughtfully integrating moon emojis into your digital communication, you can add layers of meaning, emotion, and visual interest to your messages. Whether you&apos;re expressing the cycles of life, the beauty of nature, or simply adding a touch of nighttime magic to your texts, these lunar symbols offer a universe of possibilities for creative and engaging online interactions.</p>
                <p className="pt-4">Remember, like the ever-changing moon itself, the world of emojis is constantly evolving. Stay curious, experiment with different combinations, and let your creativity shine as brightly as the full moon in a clear night sky. Happy messaging! 🌙✨</p>
            </div>
        </div>
    </>
    );
};

export default EmojiComparison;