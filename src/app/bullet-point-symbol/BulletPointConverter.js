"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';

const bulletCategories = [
    {
        name: "Basic Shapes",
        symbols: ['•', '▪', '▫', '■', '□', '▢', '▣', '▤', '▥', '▦', '▧', '▨', '▩',
            '▬', '▭', '▮', '▯', '▰', '▱', '▲', '△', '▴', '▵', '▶', '▷', '▸', '▹', '►', '▻', '▼', '▽', '▾', '▿',
            '◀', '◁', '◂', '◃', '◄', '◅', '◆', '◇', '◈', '◉', '◊', '○', '◌', '◍', '◎', '●', '◐', '◑', '◒', '◓',
            '◔', '◕', '◖', '◗', '◘', '◙', '◚', '◛', '◜', '◝', '◞', '◟', '◠', '◡']
    },
    {
        name: "Arrows",
        symbols: ['←', '↑', '→', '↓', '↔', '↕', '↖', '↗', '↘', '↙', '↚', '↛', '↜', '↝', '↞', '↟',
            '↠', '↡', '↢', '↣', '↤', '↥', '↦', '↧', '↨', '↩', '↪', '↫', '↬', '↭', '↮', '↯',
            '↰', '↱', '↲', '↳', '↴', '↵', '↶', '↷', '↸', '↹', '↺', '↻', '↼', '↽', '↾', '↿',
            '⇀', '⇁', '⇂', '⇃', '⇄', '⇅', '⇆', '⇇', '⇈', '⇉', '⇊', '⇋', '⇌', '⇍', '⇎', '⇏',
            '⇐', '⇑', '⇒', '⇓', '⇔', '⇕', '⇖', '⇗', '⇘', '⇙', '⇚', '⇛', '⇜', '⇝', '⇞', '⇟',
            '⇠', '⇡', '⇢', '⇣', '⇤', '⇥', '⇦', '⇧', '⇨', '⇩', '⇪']
    },
    {
        name: "Math Symbols",
        symbols: ['∀', '∁', '∂', '∃', '∄', '∅', '∆', '∇', '∈', '∉', '∊', '∋', '∌', '∍', '∎', '∏',
            '∐', '∑', '−', '∓', '∔', '∕', '∖', '∗', '∘', '∙', '√', '∛', '∜', '∝', '∞', '∟',
            '∠', '∡', '∢', '∣', '∤', '∥', '∦', '∧', '∨', '∩', '∪', '∫', '∬', '∭', '∮', '∯',
            '∰', '∱', '∲', '∳', '∴', '∵', '∶', '∷', '∸', '∹', '∺', '∻', '∼', '∽', '∾', '∿']
    },
    {
        name: "Miscellaneous Symbols",
        symbols: ['☀', '☁', '☂', '☃', '☄', '★', '☆', '☇', '☈', '☉', '☊', '☋', '☌', '☍', '☎', '☏',
            '☐', '☑', '☒', '☓', '☔', '☕', '☖', '☗', '☘', '☙', '☚', '☛', '☜', '☝', '☞', '☟',
            '☠', '☡', '☢', '☣', '☤', '☥', '☦', '☧', '☨', '☩', '☪', '☫', '☬', '☭', '☮', '☯',
            '☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷', '☸', '☹', '☺', '☻', '☼', '☽', '☾', '☿',
            '♀', '♁', '♂', '♃', '♄', '♅', '♆', '♇', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏',
            '♐', '♑', '♒', '♓', '♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛', '♜', '♝', '♞', '♟',
            '♠', '♡', '♢', '♣', '♤', '♥', '♦', '♧', '♨', '♩', '♪', '♫', '♬', '♭', '♮', '♯']
    },
    {
        name: "Dingbats",
        symbols: ['✁', '✂', '✃', '✄', '✅', '✆', '✇', '✈', '✉', '✊', '✋', '✌', '✍', '✎', '✏',
            '✐', '✑', '✒', '✓', '✔', '✕', '✖', '✗', '✘', '✙', '✚', '✛', '✜', '✝', '✞', '✟',
            '✠', '✡', '✢', '✣', '✤', '✥', '✦', '✧', '✨', '✩', '✪', '✫', '✬', '✭', '✮', '✯',
            '✰', '✱', '✲', '✳', '✴', '✵', '✶', '✷', '✸', '✹', '✺', '✻', '✼', '✽', '✾', '✿',
            '❀', '❁', '❂', '❃', '❄', '❅', '❆', '❇', '❈', '❉', '❊', '❋', '❌', '❍', '❎', '❏',
            '❐', '❑', '❒', '❓', '❔', '❕', '❖', '❗', '❘', '❙', '❚', '❛', '❜', '❝', '❞', '❟',
            '❠', '❡', '❢', '❣', '❤', '❥', '❦', '❧', '➔', '➕', '➖', '➗', '➘', '➙', '➚', '➛',
            '➜', '➝', '➞', '➟', '➠', '➡', '➢', '➣', '➤', '➥', '➦', '➧', '➨', '➩', '➪', '➫',
            '➬', '➭', '➮', '➯', '➰', '➱', '➲', '➳', '➴', '➵', '➶', '➷', '➸', '➹', '➺', '➻',
            '➼', '➽', '➾']
    },
    {
        name: "Hashtags",
        symbols: ['#']
    }
];

const MultiBulletPointSelector = () => {
    const [selectedBullets, setSelectedBullets] = useState('');
    const [copiedBullet, setCopiedBullet] = useState(null);
    const [isProtected, setIsProtected] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const handleBulletClick = useCallback((bullet) => {
        if (isProtected) return;

        setIsProtected(true);
        setSelectedBullets(prev => prev + bullet);
        navigator.clipboard.writeText(bullet)
            .then(() => {
                setCopiedBullet(bullet);
                setTimeout(() => setCopiedBullet(null), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err))
            .finally(() => {
                setTimeout(() => setIsProtected(false), 100);
            });
    }, [isProtected]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(selectedBullets)
            .then(() => {
                setCopiedBullet('all');
                setTimeout(() => setCopiedBullet(null), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    }, [selectedBullets]);

    const handleClear = useCallback(() => {
        setSelectedBullets('');
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

    return (<>
        <div className="max-w-7xl m-auto p-4">
            <div id="sticky-box" className="mb-4 transition-all duration-300">
                <div className="relative p-4 rounded-md">
                    <textarea
                        value={selectedBullets}
                        onChange={(e) => setSelectedBullets(e.target.value)}
                        className="rounded-md p-4 w-full focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
                        placeholder="Click bullets to add or type here"
                    />

                    <div className="absolute top-5 right-5 flex gap-2">
                        <button onClick={handleCopy} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                            <Copy size={16} />
                        </button>
                        <button onClick={handleClear} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                            <X size={16} />
                        </button>
                    </div>
                    {copiedBullet === 'all' && (
                        <div className={`absolute ${isSticky ? 'bottom-[-2rem]' : 'top-[-2rem]'} left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded z-20`}>
                            Copied all bullets!
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



                <Link href="/zalgo-text" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Zalgo Text
                </Link>

            </div>

            <div className="text-center ring-cyan-300 pb-4 pt-3 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>



                <Link href="/Symbols/aesthetic-symbols" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    AestheticSymbols
                </Link>

                <Link href="/Symbols/circle-symbol" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Circle Symbol
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

            {bulletCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">{category.name}</h3>
                    <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-20 lg:grid-cols-25 gap-2">
                        {category.symbols.map((bullet, index) => (
                            <div
                                key={index}
                                className="relative flex items-center justify-center bg-white p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                                onClick={() => handleBulletClick(bullet)}
                            >
                                <span className="text-lg">{bullet}</span>
                                {copiedBullet === bullet && (
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded">
                                        Copied!
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="max-w-7xl xl:mx-auto text-left mx-4">
                <h1 className="pt-2 font-semibold text-xl">Bullet Point Symbols: Elevating Your Content with Visual Cues</h1>
                <p className="pt-1">In digital content creation, bullet point symbols are crucial in organizing information and enhancing readability. These small but mighty characters help break down complex ideas, highlight key points, and guide readers through your content. Let&apos;s explore the diverse array of bullet point symbols and how they can transform your writing.</p>

                <h2 className="pt-2 font-semibold text-lg">1. Basic Shapes: The Foundation of Bullet Points</h2>
                <p className="pt-1">Basic shape symbols form the cornerstone of bullet point lists. Their simplicity and versatility make them suitable for various content types.</p>
                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>• (Bullet): The classic round bullet, perfect for general lists.</li>
                    <li>■ (Black Square): Ideal for a more modern, geometric look.</li>
                    <li>▪ (Black Small Square): A compact option for nested lists.</li>
                    <li>◆ (Black Diamond): Adds a touch of elegance to your bullet points.</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">2. Arrows: Directing Attention and Indicating Flow</h2>
                <p className="pt-1">Arrow symbols serve a dual purpose as bullet points: they organize information while suggesting direction or progression.</p>
                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>➤ (Black Rightwards Arrowhead): Great for action items or next steps.</li>
                    <li>➢ (Three-D Top-Lighted Rightwards Arrowhead): Adds depth to your bullet points.</li>
                    <li>▶ (Black Right-Pointing Triangle): A sleek, modern alternative to traditional arrows.</li>
                    <li>» (Right-Pointing Double Angle Quotation Mark): Subtle yet effective for nested lists.</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">3. Math Symbols: Adding Precision to Your Lists</h2>
                <p className="pt-1">Mathematical symbols can serve as unique and meaningful bullet points, especially for technical or analytical content.</p>
                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>∙ (Bullet Operator): A subtle dot that doesn&apos;t overpower your text.</li>
                    <li>× (Multiplication Sign): Useful for lists of things to avoid or remove.</li>
                    <li>÷ (Division Sign): Can indicate distribution or separation of items.</li>
                    <li>± (Plus-Minus Sign): Perfect for lists with pros and cons or variations.</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">4. Miscellaneous Symbols: Injecting Personality into Your Content</h2>
                <p className="pt-1">Miscellaneous symbols offer many options to match your content&apos;s tone and theme.</p>
                <p className="pt-2">Examples:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>☆ (White Star): Ideal for highlighting favorite items or top picks.</li>
                    <li>♠ (Black Spade Suit): Adds a playful touch to gaming or card-related content.</li>
                    <li>☯ (Yin Yang): Perfect for lists about balance or opposing concepts.</li>
                    <li>☘ (Shamrock): Brings luck and charm to your bullet points.</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">5. Dingbats: Decorative Flair for Your Lists</h2>
                <p className="pt-1">Dingbats are ornamental characters that can serve as eye-catching and thematic bullet points.</p>
                <p className="pt-2">Examples:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>❧ (Rotated Floral Heart Bullet): Adds a decorative touch to nature-related lists.</li>
                    <li>☞ (White Right Pointing Index): Great for instructional content or emphasis.</li>
                    <li>❦ (Floral Heart): Brings your bullet points a romantic or vintage feel.</li>
                    <li>☛ (Black Right Pointing Index): A bolder version for strong emphasis.</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">Enhancing Your Content with Strategic Bullet Point Usage</h2>
                <p className="pt-1">Bullet point symbols are more than just visual elements; they&apos;re powerful tools for improving the structure and readability of your content. Here&apos;s how to make the most of them:</p>
                <p className="pt-2">1. Create Visual Hierarchy: Use different symbols for main points and sub-points to create a clear visual hierarchy.</p>
                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>• Main point</li>
                    <li>◦ Sub-point</li>
                    <li>▪ Further detail</li>
                </ul>

                <p className="pt-2">2. Match Your Content&apos;s Tone: Choose symbols that align with your content&apos;s style and subject matter.</p>
                <p className="pt-2">Example: Use ☮ for peace-related topics or ♻ for environmental content.</p>

                <p className="pt-2">3. Ensure Consistency: Stick to one style of bullet points throughout a single piece of content for a cohesive look.</p>
                <p className="pt-2">Example: If you start with ➤, continue using it for all main points.</p>

                <p className="pt-2">4. Consider Accessibility: Ensure your chosen symbols are easily distinguishable and readable across different devices and for users with visual impairments.</p>
                <p className="pt-2">Example: The classic • is universally recognized and compatible.</p>

                <p className="pt-2">5. Use Color Strategically: Consider using color to distinguish your bullet points further if your platform allows.</p>
                <p className="pt-2">Example: Red ✖ for things to avoid, green ✔ for recommended actions.</p>

                <p className="pt-1">SEO Benefits of Well-Structured Bullet Points</p>
                <p className="pt-2">Incorporating bullet points effectively can significantly boost your content&apos;s SEO performance:</p>
                <ol className="list-decimal list-inside pl-4">
                    <li>Improved Readability: Search engines favor content that&apos;s easy to read and scan.</li>
                    <li>Increased Dwell Time: Well-organized content keeps readers engaged longer.</li>
                    <li>Featured Snippet Potential: Concise, well-formatted lists are often selected for featured snippets.</li>
                    <li>Mobile Optimization: Bullet points make content more digestible on smaller screens.</li>
                    <li>Keyword Integration: Use bullet points to incorporate relevant keywords naturally.</li>
                </ol>

                <p className="pt-2">Conclusion: Elevate Your Content with the Right Bullet Points</p>
                <p className="pt-1">Bullet point symbols are small but powerful allies in your content creation toolkit. From basic shapes to arrows, math symbols to miscellaneous characters, and decorative dingbats, the right choice of bullet points can transform your content from a wall of text into an engaging, easily digestible piece of information.</p>
                <p className="pt-1">Remember, the key to effective bullet point usage lies in their appearance and how they structure and present your ideas. By thoughtfully selecting and consistently applying these symbols, you can guide your readers through your content, emphasize key points, and create a visually appealing layout that keeps them engaged from start to finish.</p>
                <p className="pt-1">Whether crafting a blog post, preparing a presentation, or designing a website, harness the power of bullet point symbols to elevate your content, improve readability, and boost your SEO performance. With these versatile tools at your disposal, you&apos;re well-equipped to create content that ranks well and resonates with your audience. Happy formatting!</p>
            </div>

        </div >
    </>

    );
};

export default MultiBulletPointSelector;