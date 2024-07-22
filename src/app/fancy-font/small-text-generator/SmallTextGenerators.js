"use client"

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

// Seeded random number generator
function seedRandom(seed) {
    const mask = 0xffffffff;
    let m_w = (123456789 + seed) & mask;
    let m_z = (987654321 - seed) & mask;

    return function () {
        m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
        m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;
        let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
        result /= 4294967296;
        return result;
    }
}

// Custom cache implementation
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

const styles = [
    {
        name: "Small Caps",
        convert: (text) => {
            const smallCaps = 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ';
            return text.toLowerCase().split('').map(char => {
                const index = 'abcdefghijklmnopqrstuvwxyz'.indexOf(char);
                return index !== -1 ? smallCaps[index] : char;
            }).join('');
        }
    },

    {
        name: "Superscript",
        convert: (text) => {
            const superscript = 'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ';
            return text.toLowerCase().split('').map(char => {
                const index = 'abcdefghijklmnopqrstuvwxyz'.indexOf(char);
                return index !== -1 ? superscript[index] : char;
            }).join('');
        }
    },
    {
        name: "Subscript",
        convert: (text) => {
            const subscript = 'ₐbcdₑfgₕᵢⱼₖₗₘₙₒₚqᵣₛₜᵤᵥwₓyz';
            return text.toLowerCase().split('').map(char => {
                const index = 'abcdefghijklmnopqrstuvwxyz'.indexOf(char);
                return index !== -1 ? subscript[index] : char;
            }).join('');
        }
    },



    {
        name: "Fullwidth",
        convert: (text) => {
            const fullwidth = 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ';
            return text.toLowerCase().split('').map(char => {
                const index = 'abcdefghijklmnopqrstuvwxyz'.indexOf(char);
                return index !== -1 ? fullwidth[index] : char;
            }).join('');
        }
    },

];

const UnicodeNameConverter = () => {
    const [name, setName] = useState('Stylish');
    const [copiedStyle, setCopiedStyle] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const cacheRef = useRef(createCache());
    const [seed, setSeed] = useState(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setSeed(Date.now());
        setIsClient(true);
    }, []);

    const handleCopy = useCallback((text, styleName) => {
        navigator.clipboard.writeText(text);
        setCopiedStyle(styleName);
        setTimeout(() => setCopiedStyle(''), 1500);
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
            const cacheKey = `${style.name}:${name}:${seed}`;
            let convertedName = cacheRef.current.get(cacheKey);
            if (!convertedName) {
                convertedName = style.convert(name, seed);
                cacheRef.current.set(cacheKey, convertedName);
            }
            acc[style.name] = convertedName;
            return acc;
        }, {});
    }, [name, filteredStyles, seed, isClient]);

    const renderStyleCard = useCallback((style) => (
        <div
            key={style.name}
            className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => handleCopy(convertedNames[style.name], style.name)}
        >
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{style.name}</h3>
                {isClient && (
                    <p className="text-xl break-all">
                        {convertedNames[style.name]}
                    </p>
                )}
            </div>
            <div
                className={`absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 transform transition-all duration-300 ${copiedStyle === style.name ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
            >
                <Check size={16} />
            </div>
        </div>
    ), [convertedNames, copiedStyle, handleCopy, isClient]);

    return (<>
        <div className="max-w-7xl mx-auto p-4">
            <textarea
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-4 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                rows="3"
            />

            <p className="text-sm text-gray-600 mb-6">⬆️ Enter your name above, then click on any style to copy ⬇️</p>

            <div className="text-center pb-6 pt-2 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>

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

            <div className="text-center ring-cyan-300 pb-5 pt-3 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>


                <Link href="/fancy-font/arrow-text" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Arrow Text
                </Link>

                <Link href="/fancy-font/cool-text" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Cool Text
                </Link>

                <Link href="/fancy-font/cursed-text-generator" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Cursed Text
                </Link>

                <Link href="/fancy-font/cursive-text-generator" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Cursive Text
                </Link>

                <Link href="/fancy-font/facebook-bold-text" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Facebook Bold Text
                </Link>

                <Link href="/fancy-font/fancy-text-generator" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Fancy Text
                </Link>

                <Link href="/fancy-font/glitch-text-generator" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Glitch Text
                </Link>

                <Link href="/fancy-font/heart-text-symbol" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Heart Text Symbol
                </Link>

                <Link href="/fancy-font/italic-text-styles" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Italic Text
                </Link>




                <Link href="/fancy-font/bold-text-styles" className="text-white bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-violet-300 dark:focus:ring-violet-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Bold Text
                </Link>




            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredStyles.map(renderStyleCard)}
            </div>

            <div className="max-w-7xl xl:mx-auto text-left mx-4">
                <h1 className="pt-3 font-semibold text-xl">Small Text: The Ultimate Guide to Small Text Generator and Copy-Paste Tools</h1>
                <p className="pt-1">Are you looking to add a unique flair to your online communication? The small text might be just what you need. In this comprehensive guide, we&apos;ll explore everything you need to know about small text, including how to generate it and use it effectively across various platforms.</p>

                <h1 className="pt-2 font-semibold text-xl">What is a Small Text?</h1>
                <p className="pt-1">Small text, also known as tiny text or superscript text, is a stylized form of writing that uses smaller characters than standard text. It&apos;s created using Unicode characters and can be used on most digital platforms, including social media, messaging apps, and websites.</p>
                <p className="pt-2">Example: ᴛʜɪs ɪs ᴀɴ ᴇxᴀᴍᴘʟᴇ ᴏғ sᴍᴀʟʟ ᴛᴇxᴛ</p>

                <h1 className="pt-2 font-semibold text-xl">Small Text Generator: How It Works</h1>
                <p className="pt-1">Small text generators are online tools that convert regular text into small Unicode characters. These generators use a mapping of standard letters to their corresponding small Unicode equivalents.</p>
                <p className="pt-1">How to use a small text generator:</p>

                <ol className="list-decimal list-inside pl-4">
                    <li>Visit a small text generator website</li>
                    <li>Type or paste your text into the input field</li>
                    <li>Click the &quot;Generate&quot; or &quot;Convert&quot; button</li>
                    <li>Copy the resulting small text</li>
                </ol>

                <p className="pt-2">Example: </p>
                <p className="pt-1">Input: &quot;Hello World&quot;</p>
                <p className="pt-1">Output: ʜᴇʟʟᴏ ᴡᴏʀʟᴅ</p>

                <h2 className="pt-2 font-semibold text-lg">Benefits of Using Small Text</h2>
                <ul className="list-disc list-inside pl-4">
                    <li>Attention-grabbing: Small text stands out in a sea of regular-sized text, making your messages more noticeable.</li>
                    <li>Space-saving: In platforms with character limits, small text can help you fit more content.</li>
                    <li>Aesthetic appeal: It can add a unique visual element to your online presence.</li>
                    <li>Emphasis: Use small text to highlight certain parts of your message without resorting to all caps.</li>
                </ul>
                <p className="pt-1">Example: &quot;Don&apos;t forget to ᴄʜᴇᴄᴋ ᴏᴜᴛ ᴏᴜʀ ɴᴇᴡ ᴘʀᴏᴅᴜᴄᴛ ʟɪɴᴇ!&quot; </p>

                <h2 className="pt-2 font-semibold text-lg">Small Text Copy and Paste: Tips and Tricks</h2>
                <p className="pt-1">Copying and pasting small text is straightforward, but here are some tips to ensure smooth usage: </p>
                <ul className="list-disc list-inside pl-4">
                    <li>Use keyboard shortcuts (Ctrl+C to copy, Ctrl+V to paste) for efficiency.</li>
                    <li>Test the pasted text to ensure it displays correctly on your platform.</li>
                    <li>Be aware that some platforms may not support all Unicode characters.</li>
                </ul>
                <p className="pt-1">Example: Copy this small text → ʏᴏᴜʀ ᴛᴇxᴛ ʜᴇʀᴇ ← and paste it where you need it. </p>

                <h2 className="pt-2 font-semibold text-lg">Popular Uses for Small Text</h2>
                <ul className="list-disc list-inside pl-4">
                    <li>Social media bios: Make your profile stand out with a unique small text description.</li>
                    <li>Messaging apps: Add flair to your conversations with friends.</li>
                    <li>Email signatures: Create a memorable sign-off for your professional emails.</li>
                    <li>Website headings: Use small text for subheadings or emphasis in web content.</li>
                </ul>
                <p className="pt-2">Example social media bio:</p>
                <p className="pt-1">ᴘʜᴏᴛᴏɢʀᴀᴘʜᴇʀ 📸 | ᴛʀᴀᴠᴇʟ ᴇɴᴛʜᴜsɪᴀsᴛ ✈️ | ᴄᴏғғᴇᴇ ʟᴏᴠᴇʀ ☕</p>

                <h2 className="pt-2 font-semibold text-lg">Limitations and Considerations</h2>
                <p className="pt-1">While small text can be fun and useful, it&apos;s important to consider:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Accessibility: Small text may be difficult for some users to read.</li>
                    <li>Platform compatibility: Not all platforms support Unicode characters equally.</li>
                    <li>Overuse: Too much small text can be overwhelming and hard to read.</li>
                </ul>
                <p className="pt-2">Example of overuse (avoid this):</p>
                <p className="pt-2">ᴛʜɪs ᴇɴᴛɪʀᴇ ᴘᴀʀᴀɢʀᴀᴘʜ ɪs ɪɴ sᴍᴀʟʟ ᴛᴇxᴛ, ᴍᴀᴋɪɴɢ ɪᴛ ᴅɪғғɪᴄᴜʟᴛ ᴛᴏ ʀᴇᴀᴅ ᴀɴᴅ ᴘᴏᴛᴇɴᴛɪᴀʟʟʏ ᴀɴɴᴏʏɪɴɢ ғᴏʀ sᴏᴍᴇ ʀᴇᴀᴅᴇʀs.</p>

                <h2 className="pt-2 font-semibold text-lg">Best Practices for Using Small Text</h2>
                <p className="pt-1">To make the most of small text while ensuring readability and effectiveness:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Use it sparingly for emphasis or aesthetic purposes.</li>
                    <li>Combine small text with regular text for contrast.</li>
                    <li>Ensure the content is still legible when converted to small text.</li>
                    <li>Consider your audience and platform when deciding to use small text.</li>
                </ul>
                <p className="pt-2">Example of good usage:</p>
                <p className="pt-2">&quot;Join us for our HUGE summer sale! ˢᵃᵛᵉ ᵘᵖ ᵗᵒ ⁵⁰% on selected items!&quot;</p>

                <h2 className="pt-2 font-semibold text-lg">Conclusion</h2>
                <p className="pt-1">Small text can be a powerful tool for adding uniqueness to your online communication. By understanding how to generate and use it effectively, you can enhance your digital presence across various platforms. Remember to use it judiciously and always prioritize readability and accessibility in your content.</p>
                <p className="pt-2">Whether you&apos;re looking to stand out on social media, add flair to your website, or simply have fun with your friends in messaging apps, the small text offers a world of creative possibilities. Start experimenting with small text generators and copy-paste techniques today to discover how this tiny text can make a big impact on your online interactions.</p>
            </div>


        </div>
    </>
    );
};

export default UnicodeNameConverter;