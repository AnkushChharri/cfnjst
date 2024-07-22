"use client"

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

const glitchChars = ['̶', '̴', '̷', '̸', '̌', '̐', '̧', '̢', '̻', '̱', '̟', '̞', '̙', '̭', '̪', '̯', '̰', '̹', '̺', '̼'];
const zalgoUp = ['\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307', '\u0308', '\u0309', '\u030A', '\u030B', '\u030C', '\u030D', '\u030E', '\u030F'];
const zalgoDown = ['\u0316', '\u0317', '\u0318', '\u0319', '\u031A', '\u031B', '\u031C', '\u031D', '\u031E', '\u031F', '\u0320', '\u0321', '\u0322', '\u0323', '\u0324', '\u0325', '\u0326', '\u0327', '\u0328', '\u0329', '\u032A', '\u032B', '\u032C', '\u032D', '\u032E', '\u032F'];
const zalgoMid = ['\u0330', '\u0331', '\u0332', '\u0333', '\u0334', '\u0335', '\u0336', '\u0337', '\u0338', '\u0339', '\u033A', '\u033B', '\u033C', '\u033D', '\u033E', '\u033F'];

const styles = [
    {
        name: 'Cyber Glitch',
        convert: (text, seed) => {
            const rng = seedRandom(seed);
            return text.split('').map(char => {
                const glitch = glitchChars[Math.floor(rng() * glitchChars.length)];
                return char + (rng() > 0.5 ? glitch : '');
            }).join('');
        }
    },
    {
        name: 'Matrix Rain',
        convert: (text, seed) => {
            const rng = seedRandom(seed);
            return text.split('').map(char => {
                const numGlitches = Math.floor(rng() * 3);
                return char + Array(numGlitches).fill().map(() => zalgoDown[Math.floor(rng() * zalgoDown.length)]).join('');
            }).join('');
        }
    },
    {
        name: 'Corrupted Data',
        convert: (text, seed) => {
            const rng = seedRandom(seed);
            return text.split('').map(char => {
                if (rng() > 0.8) {
                    return String.fromCharCode(char.charCodeAt(0) + Math.floor(rng() * 5) - 2);
                }
                return char;
            }).join('');
        }
    },
    {
        name: 'Static Noise',
        convert: (text, seed) => {
            const rng = seedRandom(seed);
            return text.split('').map(char => {
                const noise = rng() > 0.7 ? String.fromCharCode(0x2588 + Math.floor(rng() * 5)) : '';
                return char + noise;
            }).join('');
        }
    },
    {
        name: 'Holographic',
        convert: (text, seed) => {
            const rng = seedRandom(seed);
            return text.split('').map(char => {
                const up = zalgoUp[Math.floor(rng() * zalgoUp.length)];
                const down = zalgoDown[Math.floor(rng() * zalgoDown.length)];
                return char + up + down;
            }).join('');
        }
    },
    {
        name: 'Quantum Shift',
        convert: (text, seed) => {
            const rng = seedRandom(seed);
            return text.split('').map(char => {
                if (rng() > 0.9) {
                    return String.fromCharCode(0x2800 + Math.floor(rng() * 255));
                }
                return char + (rng() > 0.7 ? zalgoMid[Math.floor(rng() * zalgoMid.length)] : '');
            }).join('');
        }
    },
    {
        name: 'Time Warp',
        convert: (text, seed) => {
            const rng = seedRandom(seed);
            return text.split('').map(char => {
                const timeShift = String.fromCharCode(0x24B6 + Math.floor(rng() * 26));
                return rng() > 0.7 ? timeShift : char;
            }).join('');
        }
    },
    {
        name: 'Ethereal Whisper',
        convert: (text, seed) => {
            const rng = seedRandom(seed);
            return text.split('').map(char => {
                const whisper = rng() > 0.5 ? String.fromCharCode(0x0366 + Math.floor(rng() * 5)) : '';
                return char + whisper;
            }).join('');
        }
    },
    {
        name: 'Dimensional Rift',
        convert: (text, seed) => {
            const rng = seedRandom(seed);
            return text.split('').map(char => {
                if (rng() > 0.8) {
                    return String.fromCharCode(0x16A0 + Math.floor(rng() * 76));
                }
                return char;
            }).join('');
        }
    },
    {
        name: 'Neon Flicker',
        convert: (text, seed) => {
            const rng = seedRandom(seed);
            return text.split('').map(char => {
                const flicker = rng() > 0.7 ? String.fromCharCode(0x2581 + Math.floor(rng() * 8)) : '';
                return char + flicker;
            }).join('');
        }
    }
];

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
            <p className="text-sm text-gray-600 mb-4">⬆️ Enter your name above, then click on any style to copy ⬇️</p>


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


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredStyles.map(renderStyleCard)}
            </div>
            <div className="max-w-7xl xl:mx-auto text-left mx-4">
                <h1 className="pt-2 font-semibold text-xl">Glitch Text: Adding Digital Distortion to Your Online Presence</h1>
                <p className="pt-1">In the ever-evolving world of digital communication, standing out from the crowd has become increasingly important. One unique way to catch attention and add a touch of digital flair to your online presence is by using glitch text. This article will explore what glitch text is, how to create it, and why it&apos;s becoming a popular trend in digital design and social media.</p>

                <h2 className="pt-2 font-semibold text-lg">What is Glitch Text?</h2>
                <p className="pt-1">Glitch text, also known as zalgo text or corrupted text, is a style of text that appears distorted or &quot;glitchy.&quot; It mimics the visual appearance of text affected by digital errors or corruption. This effect is achieved by adding multiple combined characters to each letter, creating a unique and eye-catching visual style.</p>

                <h3 className="pt-2 font-semibold">The Rise of Glitch Aesthetics</h3>
                <p className="pt-2">The glitch aesthetic has gained popularity in recent years, particularly in digital art, graphic design, and social media. It taps into a nostalgia for early digital technology while also representing the chaotic nature of our hyper-connected world. Glitch text is an extension of this trend, allowing users to bring this aesthetic into their written communication.</p>

                <h2 className="pt-2 font-semibold text-lg">Creating Glitch Text: Tools and Techniques</h2>
                <h3 className="pt-2 font-semibold">Glitch Text Generators</h3>
                <p className="pt-2">The easiest way to create glitch text is by using a glitch text generator. These online tools allow you to input your desired text and instantly transform it into glitchy, distorted versions. Many of these generators offer customization options, letting you control the intensity of the glitch effect.</p>

                <p className="pt-2">When searching for a glitch text generator, look for ones that offer:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Multiple glitch styles</li>
                    <li>Adjustable intensity levels</li>
                    <li>Easy copy-and-paste functionality</li>
                    <li>Preview options to see your text before finalizing</li>
                </ul>

                <h3 className="pt-2 font-semibold">Glitch Text Copy and Paste</h3>
                <p className="pt-1">Once you&apos;ve generated your glitch text, most tools allow you to copy and paste it into various platforms easily. This feature makes it simple to use glitch text in social media posts, messaging apps, or even in graphic design projects.</p>

                <h2 className="pt-2 font-semibold text-lg">Using Glitch Text Effectively</h2>
                <p className="pt-1">While glitch text can be visually striking, it&apos;s important to use it judiciously. Here are some tips for incorporating glitch text into your online presence:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Use it for emphasis: Apply glitch text to highlight important words or phrases in your content.</li>
                    <li>Create contrast: Combine glitch text with regular text to draw attention to specific elements.</li>
                    <li>Match your brand: Choose glitch styles that align with your personal or brand aesthetic.</li>
                    <li>Consider readability: Ensure that your glitch text remains legible, especially for important information.</li>
                    <li>Experiment with different platforms: Test how glitch text appears across various social media and messaging platforms to ensure compatibility.</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">The Impact of Glitch Text on Digital Communication</h2>
                <p className="pt-1">Glitch text offers a unique way to express yourself online. It can:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Grab attention: The unusual appearance of glitch text naturally draws the eye.</li>
                    <li>Convey mood: Different glitch styles can evoke various emotions, from playful to ominous.</li>
                    <li>Showcase creativity: Using glitch text demonstrates a willingness to experiment with digital trends.</li>
                    <li>Enhance brand identity: For businesses or personal brands, glitch text can become a signature element of visual identity.</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">Examples of Glitch Text in Action</h2>
                <p className="pt-1">To better understand the impact of glitch text, let&apos;s look at two examples:</p>

                <h3 className="pt-2 font-semibold">Example 1: Social Media Bio</h3>
                <p className="pt-1">Regular text: &quot;Digital artist exploring the intersection of technology and creativity.&quot;</p>
                <p className="pt-1">Glitch text: &quot;D̷̛̯͓̙͇̬̮̅͌̇͒͝ͅi̴̢͍̖̯͂͑̈́g̸̛̯̯̈́͂͒͘͝i̶̺̮͍̘̼͂̋̆̑͜t̴̨̛̟͈̣̗̭̆̃͛̕a̶̱͎̓̊͑̍͝l̶̨͎̠̥̈́̒̔̉͘ ̶̡̨̛̮̦̏̒̎͘a̶̼͇̬̲̿̈́͒͘r̶̡͓̼̭̈́̔͑̈́͜͝t̶͖̰̫̗̎̈́̈́͘͝į̶̝̱͇̝̒̔͑̕͝s̷̙͎̳̣̈́̒̓̕͜͝t̴̢͕̻̫̎̈́̓̕͜͝&quot;</p>
                <p className="pt-2">Glitch text: &quot;J̵̧̛̮͔̲̑̒̓ơ̶̧͓̼̦̇̔͛i̷̺͇̘̝͒̈́̓̕n̴̨͚̺̼͑̔̓͘ ̵̢͚͇̦̇̒̓͝ư̶͕̼͓̘̑̒̕s̶̡͚̺͇̈́̔̒͝ ̵̨͚͇̼̑̒̓͝f̵̧̺͇̘̑̒̓͝o̵̧͚͇̦̒̓̔͝ȓ̵̨͚͇̼̒̓͝ ̵̢͚͇̦̇̒̓͝a̵̧͚͇̦̒̓̔͝ ̵̨͚͇̼̑̒̓͝n̵̢͚͇̦̑̒̓͝i̵̧͚͇̦̒̓̔͝g̵̨͚͇̼̑̒̓͝ḣ̵̢͚͇̦̒̓͝ţ̵͚͇̦̒̓̔͝ ̵̨͚͇̼̑̒̓͝ȏ̵̢͚͇̦̒̓͝f̵̧͚͇̦̒̓̔͝ ̵̨͚͇̼̑̒̓͝ė̵̢͚͇̦̒̓͝ļ̵͚͇̦̒̓̔͝ę̵͚͇̼̑̒̓͝ċ̵̢͚͇̦̒̓͝ţ̵͚͇̦̒̓̔͝ȓ̵̨͚͇̼̒̓͝ȏ̵̢͚͇̦̒̓͝ņ̵͚͇̦̒̓̔͝į̵͚͇̼̑̒̓͝ċ̵̢͚͇̦̒̓͝ ̵̧͚͇̦̒̓̔͝m̵̨͚͇̼̑̒̓͝ȗ̵̢͚͇̦̒̓͝ş̵͚͇̦̒̓̔͝į̵͚͇̼̑̒̓͝ċ̵̢͚͇̦̒̓͝ ̵̧͚͇̦̒̓̔͝ą̵͚͇̼̑̒̓͝n̵̢͚͇̦̑̒̓͝ḑ̵͚͇̦̒̓̔͝ ̵̨͚͇̼̑̒̓͝ḋ̵̢͚͇̦̒̓͝i̵̧͚͇̦̒̓̔͝g̵̨͚͇̼̑̒̓͝ȋ̵̢͚͇̦̒̓͝ţ̵͚͇̦̒̓̔͝ą̵͚͇̼̑̒̓͝l̵̢͚͇̦̇̒̓͝ ̵̧͚͇̦̒̓̔͝ą̵͚͇̼̑̒̓͝ȓ̵̢͚͇̦̒̓͝ţ̵͚͇̦̒̓̔͝ ̵̨͚͇̼̑̒̓͝ȏ̵̢͚͇̦̒̓͝ņ̵͚͇̦̒̓̔͝ ̵̨͚͇̼̑̒̓͝J̵̢͚͇̦̇̒̓͝u̵̧͚͇̦̒̓̔͝n̵̨͚͇̼̑̒̓͝ȇ̵̢͚͇̦̒̓͝ ̵̧͚͇̦̒̓̔͝1̵̨͚͇̼̑̒̓͝5̵̢͚͇̦̑̒̓͝ţ̵͚͇̦̒̓̔͝h̵̨͚͇̼̑̒̓͝!̵̢͚͇̦̇̒̓͝&quot;</p>

                <p className="pt-1">In this example, the glitch text adds an air of digital intrigue to the bio, aligning with the artist&apos;s focus on technology and creativity.</p>

                <h3 className="pt-2 font-semibold">Example 2: Event Announcement</h3>
                <p className="pt-1">Regular text: &quot;Join us for a night of electronic music and digital art on June 15th!&quot;</p>

                <p className="pt-2">Here, the glitch text creates a sense of digital excitement, perfectly suited for an event focusing on electronic music and digital art.</p>

                <h2 className="pt-2 font-semibold text-lg">Conclusion: Embracing the Glitch</h2>
                <p className="pt-2">Glitch text offers a unique way to express yourself in the digital realm. Whether you&apos;re looking to stand out on social media, create eye-catching designs, or simply add a touch of digital chaos to your online presence, glitch text generators provide an easy way to achieve this effect. By understanding how to create and effectively use glitch text, you can add a new dimension to your digital communication.</p>
                <p className="pt-2">Remember, while glitch text can be a powerful tool for grabbing attention, it&apos;s important to use it thoughtfully and in moderation. When used effectively, glitch text can help you create a memorable and distinctive online presence that resonates with your audience and stands out in the crowded digital landscape.</p>
            </div>
        </div>
    </>
    );
};

export default UnicodeNameConverter;