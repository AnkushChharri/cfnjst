"use client"

import React, { useState, useCallback } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';



const symbols = [
    // Heart emojis - including latest additions
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '❤️‍🔥', '❤️‍🩹', '💔', '❣️', '💕',
    '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥️', '😍', '🥰', '😘', '😻', '🫀',
    '💑', '👩‍❤️‍👩', '👨‍❤️‍👨', '💏', '👩‍❤️‍💋‍👩', '👨‍❤️‍💋‍👨', '🫶',
    // New variations and lesser-known heart emojis
    '💌', '💐', '🌹', '🥀', '😚', '😙', '🤟', '🤟🏻', '🤟🏼', '🤟🏽', '🤟🏾', '🤟🏿',
    '🧑‍❤️‍🧑',
];

const SymbolSelector = () => {
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

    return (<>
        <div className="max-w-4xl m-auto p-4">
            <div className="mb-4">
                <div className="relative p-4 rounded-md">
                    <textarea
                        value={selectedSymbols}
                        onChange={(e) => setSelectedSymbols(e.target.value)}
                        className="rounded-md p-4 w-full h-24 focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
                        placeholder="Click symbols to add or type here"
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



                <Link href="/emoji/moon-emoji" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Moon Emoji
                </Link>

                <Link href="/emoji/fire-emoji" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Fire Emoji
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



            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Heart Emojis</h3>
                <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-2">
                    {symbols.map((symbol, index) => (
                        <div
                            key={index}
                            className="relative flex items-center justify-center bg-white p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                            onClick={() => handleSymbolClick(symbol)}
                        >
                            <span className="text-2xl">{symbol}</span>
                            {copiedSymbol === symbol && (
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded">
                                    Copied!
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl xl:mx-auto text-left mx-4">
                <h1 className="pt-2 font-semibold text-xl">Heart Emoji: Expressing Love and Affection in the Digital Age</h1>
                <p className="pt-4">In the colorful world of digital communication, heart emojis stand out as powerful symbols of love, affection, and emotion. These little icons have revolutionized the way we express our feelings online, adding depth and nuance to our text-based conversations. This comprehensive guide will explore various aspects of heart emojis, from their meanings and usage to practical applications in different contexts.</p>

                <h2 className="pt-4 font-semibold text-xl">Heart Emoji: A Symbol for Every Emotion</h2>
                <p className="pt-4">The classic heart emoji ❤️ is just the beginning. There&apos;s a rainbow of heart emojis to express different shades of emotion:</p>

                <p className="pt-4">1. Red Heart ❤️: The quintessential symbol of love and affection.</p>
                <p className="pt-2">Example: &quot;Missing you already ❤️&quot; </p>

                <p className="pt-4">2. Orange Heart 🧡: Often used for friendship or warm affection.</p>
                <p className="pt-2">Example: &quot;Thanks for always being there for me 🧡&quot;</p>

                <p className="pt-4">3. Yellow Heart 💛: Represents happiness, positivity, or platonic love.</p>
                <p className="pt-2">Example: &quot;Congrats on your new job! So happy for you 💛&quot;</p>

                <p className="pt-4">4. Green Heart 💚: Associated with nature, growth, or sometimes jealousy.</p>
                <p className="pt-2">Example: &quot;Let&apos;s save the planet together 💚&quot;</p>

                <p className="pt-4">5. Blue Heart 💙: Can signify trust, harmony, or sometimes sadness.</p>
                <p className="pt-2">Example: &quot;Feeling a bit down today 💙&quot;</p>

                <p className="pt-4">6. Purple Heart 💜: Often used for passion, royalty, or spirituality.</p>
                <p className="pt-2">Example: &quot;Your support means the world to me 💜&quot;</p>

                <p className="pt-4">7. Black Heart 🖤: Can represent dark humor, sorrow, or sophistication.</p>
                <p className="pt-2">Example: &quot;Gothic fashion is my passion 🖤&quot;</p>

                <p className="pt-4">By choosing the right heart color, you can add layers of meaning to your digital expressions, making your messages more nuanced and emotionally rich.</p>

                <h2 className="pt-2 font-semibold text-xl">Heart Eyes Emoji: Love at First Sight</h2>
                <p className="pt-4">The heart eyes emoji 😍 is a playful way to express strong admiration, love, or excitement. It&apos;s like your eyes have literally turned into hearts!</p>

                <p className="pt-4">1. Expressing Adoration: Use it to show you&apos;re head over heels for someone or something.</p>
                <p className="pt-2">Example: &quot;Just saw the cutest puppy in the park 😍&quot;</p>

                <p className="pt-4">2. Showing Appreciation: Perfect for when you&apos;re really impressed or grateful.</p>
                <p className="pt-2">Example: &quot;You cooked dinner? You&apos;re the best 😍&quot;</p>

                <p className="pt-4">3. Excitement About Objects: Great for expressing love for inanimate things too.</p>
                <p className="pt-2">Example: &quot;Finally got my hands on the new iPhone 😍&quot;</p>

                <h3 className="pt-4">4. Reacting to Good News: Use it to show you&apos;re thrilled about someone&apos;s accomplishments.</h3>
                <p className="pt-4">Example: &quot;You got the job? That&apos;s amazing 😍&quot;</p>

                <h3 className="pt-4">5. Flirting: A subtle way to show romantic interest.</h3>
                <p className="pt-4">Example: &quot;Looking forward to our date tonight 😍&quot;</p>

                <p className="pt-4">The heart eyes emoji adds a touch of enthusiasm and warmth to your messages, making it perfect for those moments when words alone just aren&apos;t enough.</p>

                <h2 className="pt-2 font-semibold text-xl">Heart Emoji Copy and Paste: Spreading the Love</h2>
                <p className="pt-4">For easy access to heart emojis, you can copy and paste them directly into your messages. Here are some popular variations:</p>

                <p className="pt-4">1. Classic Red Heart: ❤️</p>
                <p className="pt-2">Example: &quot;Love you, mom ❤️&quot;</p>

                <p className="pt-4">2. Heart Suit: ♥️</p>
                <p className="pt-2">Example: &quot;Card game night! Who&apos;s in? ♥️&quot;</p>

                <p className="pt-4">3. Two Hearts: 💕</p>
                <p className="pt-2">Example: &quot;Best friends forever 💕&quot;</p>

                <p className="pt-4">4. Sparkling Heart: 💖</p>
                <p className="pt-2">Example: &quot;Your kindness brightens my day 💖&quot;</p>

                <p className="pt-4">5. Growing Heart: 💗</p>
                <p className="pt-2">Example: &quot;My love for you grows stronger every day 💗&quot;</p>

                <p className="pt-4">6. Beating Heart: 💓</p>
                <p className="pt-2">Example: &quot;My heart races when I think of you 💓&quot;</p>

                <p className="pt-4">7. Broken Heart: 💔</p>
                <p className="pt-2">Example: &quot;Need some comfort food after that breakup 💔&quot;</p>

                <h3 className="pt-4">To use these in your messages, simply copy the emoji and paste it into your text field. Most modern devices and platforms support emoji display, ensuring your heartfelt expressions come across as intended.</h3>

                <h3 className="pt-4">Pro Tip: Create a note on your device with frequently used heart emojis for quick access. This can be a real time-saver when you want to add some love to your messages on the go!</h3>

                <h2 className="pt-2 font-semibold text-xl">Pink Heart Emoji: Soft and Sweet Expressions</h2>
                <p className="pt-4">The pink heart emoji 💗 (or 🩷 on some platforms) is a softer, more playful variation of the classic red heart. It&apos;s perfect for expressing gentle affection, sweetness, or a touch of romance.</p>

                <p className="pt-4">1. Gentle Affection: Use it for softer expressions of love or care.</p>
                <p className="pt-2">Example: &quot;Thinking of you today 💗&quot;</p>

                <p className="pt-4">2. Friendship Love: Great for showing platonic love to friends.</p>
                <p className="pt-2">Example: &quot;Girls&apos; night out was a blast! Love you all 💗&quot;</p>

                <p className="pt-4">3. Cute and Playful: Perfect for lighthearted, fun messages.</p>
                <p className="pt-2">Example: &quot;You&apos;re my favorite person to be silly with 💗&quot;</p>

                <p className="pt-4">4. Self-Love: Use it when talking about self-care or personal growth.</p>
                <p className="pt-2">Example: &quot;Taking a mental health day. Self-care is important 💗&quot;</p>

                <p className="pt-4">5. Brand Aesthetics: Popular in branding for products targeting a younger or predominantly female audience.</p>
                <p className="pt-2">Example: &quot;New pink collection dropping soon 💗 Stay tuned!&quot;</p>

                <p className="pt-4">The pink heart emoji adds a touch of softness and charm to your messages, making it ideal for those moments when you want to express affection without the intensity of a red heart.</p>

                <h2 className="pt-2 font-semibold text-xl">Optimizing Your Heart Emoji Usage for Maximum Impact</h2>
                <p className="pt-4">To make the most of heart emojis in your digital communication:</p>

                <p className="pt-4">1. Context is Key: Choose the right heart emoji based on the tone and content of your message.</p>
                <p className="pt-2">Example: Use 💙 for a calm, reassuring message, and ❤️‍🔥 for passionate declarations.</p>

                <p className="pt-4">2. Combine with Other Emojis: Create nuanced expressions by pairing heart emojis with complementary symbols.</p>
                <p className="pt-2">Example: &quot;Can&apos;t wait for our beach vacation 🏖️💗&quot; combines the beach with a gentle pink heart.</p>

                <p className="pt-4">3. Don&apos;t Overuse: While heart emojis are expressive, too many can dilute their effect. Use them strategically for emphasis.</p>
                <p className="pt-2">Example: Instead of &quot;I love you ❤️❤️❤️❤️❤️&quot;, try &quot;I love you ❤️&quot; for a more sincere feel.</p>

                <p className="pt-4">4. Consider Your Audience: Different age groups and cultures may interpret heart emojis differently. Be mindful of your audience when using them.</p>
                <p className="pt-2">Example: A red heart might be too intense for a work email, but perfect for a message to a loved one.</p>

                <p className="pt-4">5. Stay Updated: Emoji designs can vary slightly between platforms. Stay aware of how your heart emojis appear across different devices and applications.</p>

                <p className="pt-4">By thoughtfully integrating heart emojis into your digital communication, you can add warmth, affection, and emotional depth to your messages. Whether you&apos;re expressing love, showing appreciation, or simply adding some charm to your conversations, these heartfelt symbols offer a dynamic way to connect with others in the digital realm.</p>

                <p className="pt-4">Remember, like love itself, the art of using heart emojis requires sincerity and care. Use your heart emojis wisely, and watch your digital conversations bloom with emotion and connection! 💖✨</p>
            </div>
        </div>
    </>
    );
};

export default SymbolSelector;