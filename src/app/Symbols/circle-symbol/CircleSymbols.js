"use client"

import React, { useState, useCallback } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';


const starSymbols = [
    // New circle symbols
    '⚪', '⚬', '◦', '•', '●', '◉', '◎', '☉', '¤',
    '⊙', '⊚', '⊛', '⊜', '⊝', '◍', '◐', '◑',
    '◖', '◗', '◌', '◊', '◘', '◙', '◚', '◛', '◜', '◝', '◟',
    '◠', '◡', '◣', '◤', '◥', '◨', '◩', '◫', '◬', '◭', '◮',
    '⚇', '⚈', '⚉', '❍', '⦿', '⊗', '⊖', '⊕', '⊘', '⍟', '⎔', '⎕',
    '▢', '▣', '▤', '▥', '▦', '▧', '▨', '▩', '▪', '▫', '▬', '▭', '▮', '▯', '▰', '▱',
    '▲', '△', '▴', '▵', '▶', '▷', '▸', '▹', '►', '▻', '▼', '▽', '▾', '▿', '◀', '◁',
    '◂', '◃', '◄', '◅', '◆', '◇', '◈', '○',
    '◒', '◓', '◔', '◕', '◞',
    '◢', '◧', '◪', '◯', '◰', '◱',
    '◲', '◳', '◴', '◵', '◶', '◷', '◸', '◹', '◺', '◻', '◼', '◽', '◾', '◿'
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

    return (<>
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

            <div className="text-center pt-4 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>

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

                <Link href="/Symbols/aesthetic-symbols" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Aesthetic Symbols
                </Link>



                <Link href="/bullet-point-symbol" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Bullet Point Symbol
                </Link>





                <Link href="/Symbols/cross-symbol" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Cross Symbol
                </Link>

                <Link href="/Symbols/dot-symbol" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Dot Symbol
                </Link>

                <Link href="/Symbols/heart-symbol" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Heart Symbol
                </Link>

                <Link href="/Symbols/star-symbol" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Star Symbol
                </Link>

                <Link href="/Symbols/straight-lines-symbol" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Straight Line Symbol
                </Link>

                <Link href="/Symbols/text-symbol" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Text Symbol
                </Link>








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
            <div className="max-w-7xl xl:mx-auto text-left mx-4">
                <h1 className="pt-2 font-semibold text-xl">The Circle Symbol: Unraveling the Perfect Shape&apos;s Meaning and Significance</h1>
                <p className="pt-4">The circle symbol, also known as the r circle symbol, has captivated human imagination for millennia. This post explores the depth and breadth of symbolic circles, their meanings across cultures, and their applications in modern life. Whether you&apos;re a designer, spiritual seeker, or simply curious about symbology, this comprehensive guide will illuminate the power and beauty of the circle.</p>

                <h2 className="pt-4 font-semibold text-xl">The Universal Appeal of the Circle Symbol</h2>
                <p className="pt-4">The circle is arguably the most universally recognized shape across cultures and periods. Its perfect symmetry and endless form have made it a powerful symbol in art, religion, science, and everyday life.</p>
                <p className="pt-2">Example: The Olympic rings, a series of five interlocking circles, represent the union of five continents and the meeting of athletes from around the world. This symbol&apos;s simplicity and power have made it instantly recognizable globally.</p>

                <h2 className="pt-4 font-semibold text-xl">Historical Significance of Symbolic Circles</h2>
                <p className="pt-4">Throughout history, circles have held deep meaning in various civilizations. From ancient sun worship to modern corporate logos, the circle has maintained its significance.</p>
                <p className="pt-2">Example: In ancient Egypt, the circle hieroglyph represented the sun god Ra, symbolizing eternal life and the cyclical nature of existence. This concept influenced many aspects of Egyptian culture and art.</p>

                <h2 className="pt-4 font-semibold text-xl">Mathematical Perfection: The R Circle Symbol</h2>
                <p className="pt-4">In mathematics, the circle is represented by the equation r² = x² + y², where r is the radius. This elegant formula encapsulates the circle&apos;s perfect symmetry and has far-reaching applications in science and engineering.</p>
                <p className="pt-2">Example: The concept of pi (π), derived from the circle&apos;s circumference divided by its diameter, is a fundamental mathematical constant used in countless calculations, from architecture to space exploration.</p>

                <h2 className="pt-4 font-semibold text-xl">Spiritual and Philosophical Interpretations</h2>
                <p className="pt-4">Many spiritual traditions use the circle as a symbol of wholeness, unity, and the divine. Its endless nature often represents eternity and the cycle of life.</p>
                <p className="pt-2">Example: In Buddhism, the Ensō is a hand-drawn circle that symbolizes enlightenment, strength, and the universe. The act of drawing the Ensō is often considered a moment of spiritual reflection.</p>

                <h2 className="pt-4 font-semibold text-xl">Circles in Nature and Science</h2>
                <p className="pt-4">Nature abounds with circular forms, from celestial bodies to microscopic organisms. These natural circles have long inspired scientists and artists alike.</p>
                <p className="pt-2">Example: The cross-section of a tree trunk reveals concentric circles (annual rings) that not only tell the tree&apos;s age but also provide information about climatic conditions throughout its life.</p>

                <h2 className="pt-4 font-semibold text-xl">The Psychology of the Circle Symbol</h2>
                <p className="pt-4">Psychologists have studied the impact of circular shapes on human perception and behavior. Circles are often associated with comfort, protection, and inclusivity.</p>
                <p className="pt-2">Example: A study published in the journal &quot;Psychological Science&quot; found that people sitting in circular arrangements were more likely to share information and cooperate compared to those in angular seating arrangements.</p>

                <h2 className="pt-4 font-semibold text-xl">Circles in Art and Design</h2>
                <p className="pt-4">Artists and designers frequently use circles to create balance, harmony, and focus in their work. The circle&apos;s versatility makes it a staple in visual communication.</p>
                <p className="pt-2">Example: Wassily Kandinsky, a pioneer of abstract art, extensively used circles in his paintings. His work &quot;Several Circles&quot; (1926) showcases the emotional and spiritual power he attributed to this shape.</p>

                <h2 className="pt-4 font-semibold text-xl">The Circle in Modern Branding and Logos</h2>
                <p className="pt-4">Many companies incorporate circles into their logos to convey unity, completeness, or global reach. The simplicity of the circle makes it highly adaptable for various branding needs.</p>
                <p className="pt-2">Example: The Target Corporation&apos;s logo, a simple red circle with a smaller concentric circle inside, is instantly recognizable and effectively communicates the idea of &quot;hitting the mark&quot; or precision.</p>

                <h2 className="pt-4 font-semibold text-xl">Technological Applications of Circular Design</h2>
                <p className="pt-4">In the digital age, circular design elements play a crucial role in user interfaces and product design. From app icons to smartwatch faces, circles continue to shape our technological landscape.</p>
                <p className="pt-2">Example: The circular design of the Apple Watch face not only references traditional watch design but also maximizes screen space and enhances usability in a compact form factor.</p>

                <h2 className="pt-4 font-semibold text-xl">The Future of the Circle Symbol</h2>
                <p className="pt-4">As we move forward, the circle symbol continues to evolve while maintaining its timeless appeal. From virtual reality interfaces to sustainable design principles, the circle&apos;s influence shows no signs of waning.</p>
                <p className="pt-2">Example: In urban planning, the concept of the &quot;circular economy&quot; is gaining traction. This model, represented by a circular diagram, emphasizes recycling, reuse, and regeneration to minimize waste and maximize resource efficiency.</p>

                <h2 className="pt-4 font-semibold text-xl">Conclusion: The Enduring Power of the Circle</h2>
                <p className="pt-4">The circle symbol, in all its forms, remains a potent and versatile element in human culture. Its perfect form continues to inspire, guide, and communicate across disciplines and boundaries. As we&apos;ve explored, from the r circle symbol in mathematics to symbolic circles in art and spirituality, this shape&apos;s influence is truly all-encompassing.</p>
                <p className="pt-4">By understanding and appreciating the depth of meaning behind the circle, we can better recognize its impact on our lives and the world around us. Whether you&apos;re designing a logo, studying geometry, or contemplating the nature of existence, the circle offers a wealth of insights and applications.</p>
                <p className="pt-4">As we move forward, let&apos;s keep our eyes open to the circles that surround us, appreciating their beauty, functionality, and the profound messages they convey. In a world that often seems fragmented, the circle reminds us of our interconnectedness and the cyclical nature of life itself.</p>
            </div>

        </div>
    </>
    );
};

export default StarSymbolSelector;