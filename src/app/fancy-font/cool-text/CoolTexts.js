"use client"

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

const styles = [
    { name: 'Vaporwave', convert: (text) => text.split('').join(' ').toUpperCase() },
    { name: 'Glitch', convert: (text) => text.split('').map(char => char + (Math.random() > 0.5 ? '̸' : '̷')).join('') },
    { name: 'Sparkles', convert: (text) => '✨' + text.split('').join('✨') + '✨' },
    { name: 'Retro Game', convert: (text) => text.toUpperCase().split('').map(char => String.fromCodePoint(char.charCodeAt(0) + 127344)).join('') },
    { name: 'Wavy', convert: (text) => text.split('').map((char, i) => char + (i % 2 === 0 ? '᷼' : '᷽')).join('') },
    { name: 'Neon', convert: (text) => '【' + text.split('').join('】【') + '】' },
    { name: 'Cyberpunk', convert: (text) => text.split('').map(char => char + '̾').join('') },
    {
        name: 'Medieval', convert: (text) => text.split('').map(char => {
            const code = char.toLowerCase().charCodeAt(0);
            return (code >= 97 && code <= 122) ? String.fromCodePoint(code + 119977) : char;
        }).join('')
    },
    { name: 'Matrix', convert: (text) => text.split('').map(char => char + '̣̠').join('') },
    { name: 'Cosmic', convert: (text) => '✧' + text.split('').join('⋆') + '✧' },
    { name: 'Graffiti', convert: (text) => text.split('').map(char => char + '͏').join('') },
    { name: 'Pixel', convert: (text) => text.split('').map(char => char + '̗̀').join('') },
    { name: 'Cursed', convert: (text) => text.split('').map(char => char + '̶̷').join('') },
    { name: 'Steampunk', convert: (text) => text.split('').map(char => char + '҉').join('') },
    { name: 'Synthwave', convert: (text) => text.toUpperCase().split('').join('═') },
    { name: 'Bubble', convert: (text) => text.split('').map(char => char + '̊').join('') },
    { name: 'Circuit', convert: (text) => text.split('').map(char => char + '̤').join('') },
    { name: 'Magical', convert: (text) => '✦' + text.split('').join('°') + '✦' },
    { name: 'Radioactive', convert: (text) => text.split('').map(char => char + '☢️').join('') },
    { name: 'Starry', convert: (text) => text.split('').map(char => char + '✰').join('') },
    { name: 'Retro Wave', convert: (text) => text.toUpperCase().split('').join('▀▄') },
    { name: 'Holographic', convert: (text) => text.split('').map(char => char + '⃝').join('') },
    { name: 'Glowing', convert: (text) => text.split('').map(char => char + '҈').join('') },
    { name: 'Futuristic', convert: (text) => text.split('').map(char => char + '⃠').join('') },
    { name: 'Enchanted', convert: (text) => '✴' + text.split('').join('❈') + '✴' },
    // New styles added below
    { name: 'Neon Glow', convert: (text) => text.split('').map(char => char + '̐').join('') },
    { name: 'Underwater', convert: (text) => text.split('').map(char => char + '͜').join('') },
    { name: 'Alien Language', convert: (text) => text.split('').map(char => char + '҇').join('') },
    { name: 'Constellation', convert: (text) => '⋆' + text.split('').join('⋆') + '⋆' },
    { name: 'Quantum', convert: (text) => text.split('').map(char => char + '̬').join('') },
    { name: 'Corrupted Data', convert: (text) => text.split('').map(char => char + '̺̺̠̺').join('') },
    { name: 'Plasma', convert: (text) => text.split('').map(char => char + '҉̨').join('') },
    { name: 'Echoed', convert: (text) => text.split('').map(char => char + char.toLowerCase()).join('') },
    { name: 'Crystalline', convert: (text) => '❄' + text.split('').join('❅') + '❄' },
    { name: 'Runic', convert: (text) => text.split('').map(char => char + '᛫').join('') },
    { name: 'Psychedelic', convert: (text) => text.split('').map(char => char + '҆').join('') },
    { name: 'Gravity Distortion', convert: (text) => text.split('').map(char => char + '҃').join('') },
    { name: 'Nanotech', convert: (text) => text.split('').map(char => char + '̂').join('') },
    { name: 'Mystic Runes', convert: (text) => text.split('').map(char => char + '҄').join('') },
    { name: 'Electromagnetic', convert: (text) => text.split('').map(char => char + '҅').join('') },
    { name: 'Binary Code', convert: (text) => text.split('').map(char => char.charCodeAt(0).toString(2)).join(' ') },
    {
        name: 'Morse Code', convert: (text) => text.split('').map(char => {
            const morse = {
                'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
                'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
                'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
                'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
                'Y': '-.--', 'Z': '--..', ' ': '/'
            };
            return morse[char.toUpperCase()] || char;
        }).join(' ')
    },
    {
        name: 'Hieroglyphics', convert: (text) => text.split('').map(char => {
            const hieroglyphs = '𓀀𓀁𓀂𓀃𓀄𓀅𓀆𓀇𓀈𓀉𓀊𓀋𓀌𓀍𓀎𓀏𓀐𓀑𓀒𓀓𓀔𓀕𓀖𓀗𓀘𓀙𓀚𓀛𓀜𓀝';
            return hieroglyphs[char.charCodeAt(0) % hieroglyphs.length];
        }).join('')
    },
    {
        name: 'Wingdings', convert: (text) => text.split('').map(char => {
            const wingdings = '♠♣♥♦♤♧♡♢☎☏✆✇♿⚽⚾♀♂';
            return wingdings[char.charCodeAt(0) % wingdings.length];
        }).join('')
    },
    { name: 'Matrix Rain', convert: (text) => text.split('').map(char => char + '̴̵̶̷̸̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼͇͈͉͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̽̾̿̀́͂̓̈́͆͊͋͌̕̚͘͜͟͢͝͞͠͡').join('') }
];

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

const UnicodeNameConverter = () => {
    const [name, setName] = useState('Stylish');
    const [copiedStyle, setCopiedStyle] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const cacheRef = useRef(createCache());
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleCopy = useCallback((text, styleName) => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                setCopiedStyle(styleName);
                setTimeout(() => setCopiedStyle(''), 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
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
            const cacheKey = `${style.name}:${name}`;
            let convertedName = cacheRef.current.get(cacheKey);
            if (!convertedName) {
                convertedName = style.convert(name);
                cacheRef.current.set(cacheKey, convertedName);
            }
            acc[style.name] = convertedName;
            return acc;
        }, {});
    }, [name, filteredStyles, isClient]);

    const renderStyleCard = useCallback((style) => (
        <div
            key={style.name}
            className="flex flex-col items-center bg-white p-4 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200 relative"
            onClick={() => handleCopy(convertedNames[style.name], style.name)}
        >
            <span className="font-serif text-sm mb-2">{style.name}</span>
            {isClient && (
                <span className="text-xl">{convertedNames[style.name]}</span>
            )}
            <div
                className={`absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 transform transition-all duration-300 ${copiedStyle === style.name ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
            >
                <Check size={16} />
            </div>
        </div>
    ), [convertedNames, copiedStyle, handleCopy, isClient]);

    return (<>
        <div className="max-w-7xl m-auto p-1">
            <textarea
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="rounded-md p-4 w-full focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
            />
            <p className="text-xs font-weight: 500; text-zinc-400">⬆️Search Your Name and Click on Any Style & Copy⬇️</p>

            <div className="text-center pt-5 pb-3 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>

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

                <Link href="/fancy-font/small-text-generator" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Small Text
                </Link>


                <Link href="/fancy-font/bold-text-styles" className="text-white bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-violet-300 dark:focus:ring-violet-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Bold Text
                </Link>





            </div>


            <div className="space-y-4 mt-4">
                {filteredStyles.map(renderStyleCard)}
            </div>
            <div className="max-w-7xl xl:mx-auto text-left mx-4">
                <h1 className="pt-2 font-semibold text-xl">Cool Text: Elevate Your Digital Expression with Stylish Fonts and Symbols</h1>
                <p className="pt-1">In today&apos;s digital landscape, standing out is more important than ever. Whether you&apos;re crafting a social media post, designing a logo, or just wanting to add some flair to your online communication, cool text can be your secret weapon. This comprehensive guide will explore the world of cool text, from generators to fonts and symbols, helping you elevate your digital expression to new heights.</p>

                <h2 className="pt-2 font-semibold text-lg">1. Cool Text: The Art of Stylish Digital Writing</h2>
                <p className="pt-1">Cool text refers to visually appealing and unique ways of presenting text, often using special fonts, characters, or styling techniques. It&apos;s a powerful tool for catching attention and expressing personality in digital communication.</p>
                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Standard text: Hello World</li>
                    <li>Cool text: 𝓗𝓮𝓵𝓵𝓸 𝓦𝓸𝓻𝓵𝓭</li>
                </ul>

                <p className="pt-2">Benefits of using cool text include:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Grabbing attention in crowded digital spaces</li>
                    <li>Expressing creativity and personality</li>
                    <li>Enhancing brand recognition</li>
                    <li>Making messages more memorable</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">2. Cool Text Generator: Your Gateway to Stylish Text</h2>
                <p className="pt-1">A cool text generator is an online tool that transforms plain text into stylized versions using various fonts, symbols, or effects. These generators are user-friendly and require no design skills to create eye-catching text.</p>

                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Input: Cool Text</li>
                    <li>Output options:</li>
                    <li>𝒞𝑜𝑜𝓁 𝒯𝑒𝓍𝓉 (Script style)</li>
                    <li>𝕮𝖔𝖔𝖑 𝕿𝖊𝖝𝖙 (Gothic style)</li>
                    <li>Cᴏᴏʟ Tᴇxᴛ (Small caps style)</li>
                </ul>

                <p className="pt-2">Popular uses for cool text generators:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Creating unique social media bios</li>
                    <li>Designing eye-catching headers for blogs or websites</li>
                    <li>Crafting attention-grabbing titles for videos or presentations</li>
                    <li>Adding flair to digital signatures in emails</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">3. Cool Text Fonts: Typographic Marvels</h2>
                <p className="pt-1">Cool text fonts are specially designed typefaces that add visual interest and personality to your text. These can range from elegant scripts to bold, futuristic designs.</p>

                <p className="pt-2">Examples:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>𝔊𝔬𝔱𝔥𝔦𝔠 𝔉𝔬𝔫𝔱</li>
                    <li>𝓢𝓬𝓻𝓲𝓹𝓽 𝓕𝓸𝓷𝓽</li>
                    <li>𝕭𝖔𝖑𝖉 𝕱𝖔𝖓𝖙</li>
                </ul>

                <p className="pt-2">Cool text fonts can be used for:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Creating unique logos</li>
                    <li>Designing merchandise</li>
                    <li>Crafting eye-catching social media graphics</li>
                    <li>Adding personality to digital art projects</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">4. Cool Text Symbol: Beyond Letters and Numbers</h2>
                <p className="pt-1">Cool text symbols are special characters that can be used alongside or instead of regular text to create visual interest or convey meaning more efficiently.</p>

                <p className="pt-2">Examples:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>★ (Star symbol)</li>
                    <li>♪ (Musical note symbol)</li>
                    <li>☺ (Smiley face symbol)</li>
                </ul>

                <p className="pt-2">Creative uses for cool text symbols:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Adding flair to usernames or Gamertags</li>
                    <li>Creating unique bullet points in lists</li>
                    <li>Enhancing emotional expression in messages</li>
                    <li>Designing minimalist logos or icons</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">5. Cool Texting Symbols: Enhancing Mobile Communication</h2>
                <p className="pt-1">Cool texting symbols are combinations of characters used primarily in mobile and instant messaging to convey emotions, actions, or objects. They&apos;re the precursors to modern emojis and are still widely used for their simplicity and compatibility.</p>

                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>¯\_(ツ)_/¯ (Shrug)</li>
                    <li>(╯°□°）╯︵ ┻━┻ (Table flip)</li>
                    <li>&lt;3 (Heart)</li>
                </ul>

                <p className="pt-2">Cool texting symbols are great for:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Adding emotion to text messages</li>
                    <li>Creating a personal texting style</li>
                    <li>Conveying complex ideas quickly</li>
                    <li>Adding humor to digital conversations</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">Conclusion</h2>
                <p className="pt-2">Cool text is more than just a way to make your digital content look interesting – it&apos;s a powerful tool for expression, branding, and engagement. From cool text generators that transform your words with a click to unique fonts that give your brand a distinct voice to symbols that convey meaning at a glance, the world of cool text offers endless possibilities for creativity and communication.</p>
                <p className="pt-2">Remember, the key to effectively using cool text lies in balance and appropriateness. While it can greatly enhance your digital presence, overuse can lead to confusion or appear unprofessional in certain contexts. Consider your audience, platform, and message when deciding how and where to incorporate cool text.</p>
                <p className="pt-2">As you experiment with different cool text styles, fonts, and symbols, you&apos;ll develop a sense of what works best in various situations. This skill can set you apart in the digital landscape, helping your messages stand out and be remembered.</p>
                <p>Whether you&apos;re a social media enthusiast, a digital marketer, a blogger, or just someone who loves to express themselves creatively online, mastering the art of cool text can open up new avenues for connection and expression in the digital world. So go ahead, dive into the world of cool text, and watch as your digital communication transforms from ordinary to extraordinary!</p>
            </div>
        </div>
    </>
    );
};

export default UnicodeNameConverter;