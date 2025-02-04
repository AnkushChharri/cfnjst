"use client"

import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { Check, RefreshCw } from 'lucide-react';
import Link from 'next/link';

// LRU Cache implementation
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return undefined;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, value);
    }
}

const zalgoCharSets = {
    up: ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350', '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b'],
    middle: ['\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327', '\u0328', '\u0334', '\u0335', '\u0336', '\u034f', '\u035c', '\u035d', '\u035e', '\u035f', '\u0360', '\u0362', '\u0338', '\u0337', '\u0361', '\u0489'],
    down: ['\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339', '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348', '\u0349', '\u034d', '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323']
};

const createZalgoStyle = (name, upIntensity, middleIntensity, downIntensity) => ({
    name,
    convert: (text, seed, cache) => {
        const cacheKey = `${name}-${text}-${seed}`;
        const cachedResult = cache.get(cacheKey);
        if (cachedResult) return cachedResult;

        const random = (seed) => {
            let x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        };
        const result = text.split('').map((char, index) => {
            let zalgoChar = char;
            for (let i = 0; i < upIntensity; i++) {
                zalgoChar += zalgoCharSets.up[Math.floor(random(seed + index + i * 1000) * zalgoCharSets.up.length)];
            }
            for (let i = 0; i < middleIntensity; i++) {
                zalgoChar += zalgoCharSets.middle[Math.floor(random(seed + index + i * 2000) * zalgoCharSets.middle.length)];
            }
            for (let i = 0; i < downIntensity; i++) {
                zalgoChar += zalgoCharSets.down[Math.floor(random(seed + index + i * 3000) * zalgoCharSets.down.length)];
            }
            return zalgoChar;
        }).join('');

        cache.put(cacheKey, result);
        return result;
    }
});

const zalgoStyles = [
    createZalgoStyle("Mild Chaos", 1, 1, 1),
    createZalgoStyle("Balanced Madness", 2, 2, 2),
    createZalgoStyle("Upward Insanity", 4, 1, 1),
    createZalgoStyle("Downward Spiral", 1, 1, 4),
    createZalgoStyle("Middle Mayhem", 1, 4, 1),
    createZalgoStyle("Absolute Pandemonium", 3, 3, 3),
    createZalgoStyle("Whisper of Madness", 1, 0, 1),
    createZalgoStyle("Scream into the Void", 5, 2, 5),
    createZalgoStyle("Cosmic Disorder", 2, 4, 2),
    createZalgoStyle("Eldritch Horror", 4, 4, 4),
    createZalgoStyle("Digital Glitch", 0, 5, 0),
    createZalgoStyle("Lovecraftian Nightmare", 5, 5, 5)
];

const ZalgoTextConverter = () => {
    const [text, setText] = useState('Stylish');
    const [copiedStyle, setCopiedStyle] = useState('');
    const [seed, setSeed] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const textareaRef = useRef(null);

    const cache = useMemo(() => new LRUCache(50), []); // Create an LRU cache with a capacity of 50

    useEffect(() => {
        setIsClient(true);
        setSeed(Math.random() * 10000);
    }, []);

    const handleCopy = useCallback((convertedText, styleName) => {
        navigator.clipboard.writeText(convertedText);
        setCopiedStyle(styleName);
        setTimeout(() => setCopiedStyle(''), 2000);
    }, []);

    const handleGenerate = useCallback(() => {
        setSeed(Math.random() * 10000);
    }, []);

    const handleTextChange = useCallback((e) => {
        setText(e.target.value);
    }, []);

    const focusTextarea = useCallback(() => {
        textareaRef.current?.focus();
    }, []);

    return (<>
        <div className="max-w-7xl m-auto p-1">
            <div className="flex mb-4">
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Stylish"
                    className="w-full h-full min-h-[100px] rounded-md p-4 focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600 resize-none"
                />
            </div>

            <div className="mb-4">
                <button
                    onClick={handleGenerate}
                    className="transition ease-in-out delay-150 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-md flex items-center"
                >
                    <RefreshCw size={20} className="mr-2" />
                    Generate
                </button>

                <p className="text-xs font-weight: 500; text-zinc-400 mt-2">⬆️Click on Generate Button for Different Style⬆️</p>
            </div>

            <div className="text-center pt-2 pb-3 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>

                <Link href="/" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Fancy Font
                </Link>

                <Link href="/DiscordEmoji" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Discord Emojis
                </Link>

                <Link href="/emoji/arrow-emoji" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Arrow Emoji
                </Link>

                <Link href="/bullet-point-symbol" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Bullet Point Symbol
                </Link>



            </div>




            <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isClient && zalgoStyles.map((style) => {
                        const convertedText = style.convert(text, seed, cache);
                        return (
                            <div
                                key={style.name}
                                className="flex flex-col items-center bg-white p-4 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200 relative"
                                onClick={() => handleCopy(convertedText, style.name)}
                            >
                                <span className="font-serif text-sm mb-2">{style.name}</span>
                                <span className="text-xl break-all">{convertedText}</span>
                                {copiedStyle === style.name && (
                                    <div className="absolute top-2 right-2 text-green-600">
                                        <Check size={20} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            {copiedStyle && (
                <div className="mt-4 text-green-600 text-center">Copied: {copiedStyle} style</div>
            )}
            <div className="max-w-7xl xl:mx-auto text-left mx-4">
                <h1 className="pt-2 font-semibold text-xl">Zalgo Text: Unleashing Digital Chaos in Typography</h1>
                <p className="pt-1">In the ever-evolving landscape of internet culture, Zalgo text stands out as a unique and intriguing phenomenon. This peculiar form of text manipulation has captured the imagination of online communities, sparking creativity and adding a touch of digital mystique to everyday communication. Let&apos;s dive into the world of Zalgo text and explore its origins, applications, and how you can create your own using a Zalgo text generator.</p>

                <h2 className="pt-2 font-semibold text-lg">What is Zalgo Text?</h2>
                <p className="pt-1">Zalgo text, also known as &quot;glitch text&quot; or &quot;cursed text,&quot; is a text that appears glitchy or corrupted. It&apos;s created by combining regular characters with multiple combining Unicode characters, resulting in text that seems to &quot;bleed&quot; upwards and downwards.</p>
                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Normal text: &quot;Hello World&quot;</li>
                    <li>Zalgo text: &quot;H̸̢̪̯̱̰̎̇̅̂ȅ̷̡̨̺͖͚̭̰̯̈́̎͆̈́͘͝l̴̰͇̦̣̲̹̅̊̃͑̆̕͝l̶̢͈͇̩̯̠̿̑̈́̈́̈́̕͠ǫ̷̡̥̮̮̰̩̓̊̿̈̕͝͝ ̶̨̯̩̘͚̰̓̆̈́̓̈̕͜W̷̧̛̖̣̟̼̰̆̇̅̈́̈́͜o̶̢̨͚̝̼̗̊̅̈́̈́̕͝͝r̵̨̧̺̖̭̭̋̊̅̈́̈́͘͝l̴̯̱̥̩̰̭̈́̊̅̈́̓̕͝d̷̨̧̮̱̗̈́̊̅̆̈́̕͜͝&quot;</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">The Origin of Zalgo Text</h2>
                <p className="pt-1">The term &quot;Zalgo&quot; originates from a creepypasta (internet horror story) about an entity that causes insanity, death, and destruction. The distorted text style was created to represent the corruption or &quot;invoking&quot; of Zalgo in text form.</p>
                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Normal: &quot;He comes&quot;</li>
                    <li>Zalgo: &quot;H̵̪̓̈́e̶͚͛̓ ̶͎̈́̓c̵̳̆̓o̵̩͐̓m̵̧̛̓e̸̮̽̓s̵̳̏̓&quot;</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">How Zalgo Text Works</h2>
                <p className="pt-1">Zalgo text is created by adding multiple combined characters to each letter of regular text. These combining characters are meant to add accents or diacritical marks to letters, but they create the characteristic Zalgo effect when overused.</p>
                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Regular letter: &quot;a&quot;</li>
                    <li>Zalgo letter: &quot;a̷̧̛̭̣̖̝̟̓̆̅̈́̈́̕&quot;</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">Using a Zalgo Text Generator</h2>
                <p className="pt-1">A Zalgo text generator is a tool that automatically applies the Zalgo effect to your input text. These generators typically allow you to control the intensity of the effect by adjusting the number of combined characters added.</p>
                <p className="pt-2">Examples:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Input: &quot;Create chaos&quot;</li>
                    <li>Intensity: Low, Medium, High</li>
                    <li>Direction: Up, Middle, Down, or All</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">Applications of Zalgo Text</h2>
                <p className="pt-2">While primarily used for fun and artistic expression, Zalgo text has found various applications:</p>
                <ol className="list-decimal list-inside pl-4">
                    <li>Meme Culture: Often used in image macros and memes for comedic effect.</li>
                    <li>Creative Writing: Employed in digital storytelling to convey supernatural or glitchy elements.</li>
                    <li>Online Personas: Some users incorporate Zalgo text into their usernames or bios for a unique aesthetic.</li>
                    <li>Artistic Typography: Used in digital art and graphic design for a surreal or horror-inspired look.</li>
                </ol>
                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Normal username: &quot;DarkLord99&quot;</li>
                    <li>Zalgo username: &quot;D̸̨̛̖̣̝͚̟̆̅̈́̈́͘a̷̧̛̭̣̖̝̟̓̆̅̈́̈́̕r̵̨̧̖̱̗̟̈́̆̅̈́̈́͘k̵̨̧̺̖̭̭̋̊̅̈́̈́͘L̴̢̧̥̮̮̟̓̆̅̈́̈́͘o̶̢̨͚̝̼̗̊̅̈́̈́̕͝r̵̨̧̺̖̭̭̋̊̅̈́̈́͘d̷̨̧̮̱̗̈́̊̅̆̈́̕9̷̨̧̮̱̗̈́̊̅̆̈́̕9̷̨̧̮̱̗̈́̊̅̆̈́̕&quot;</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">The Zalgo Font Myth</h2>
                <p className="pt-1">It&apos;s important to note that there isn&apos;t a &quot;Zalgo font&quot; in the traditional sense. The Zalgo effect is achieved through character manipulation, not a specific font file. However, some may refer to the overall appearance as a &quot;Zalgo font&quot; colloquially.</p>
                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Misconception: &quot;Download the Zalgo font&quot;</li>
                    <li>Reality: &quot;Use a Zalgo text generator to create the effect.&quot;</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">Creating Zalgo Text Responsibly</h2>
                <p className="pt-2">While Zalgo text can be fun and creative, it&apos;s important to use it responsibly:</p>
                <ol className="list-decimal list-inside pl-4">
                    <li>Accessibility: Zalgo text is not screen-reader friendly and can be difficult for some users to read.</li>
                    <li>Platform Compatibility: Some platforms may not display Zalgo text correctly.</li>
                    <li>Overuse: Too much Zalgo text can make your content unreadable or annoying.</li>
                </ol>
                <p className="pt-2">Example of responsible use:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Normal: &quot;Click here for a surprise!&quot;</li>
                    <li>Zalgo: &quot;C̭̊l̳̏i̜̓c̖̆k̙̇ ̧̆h̹̏ḙ̑r̝̂ḙ̑ ̟̌f̺̂ỗ̱r̰̍ ̖̌a̮͒ ̹̌s̯̃ű̱r̰̍p̟̌r̮͂ị̃s̯̃ḛ̑!̖̌&quot;</li>
                    <li>(Used sparingly for emphasis, not for the entire message)</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">The Future of Zalgo Text</h2>
                <p className="pt-1">As internet culture continues to evolve, so does the use of Zalgo text. From its origins in creepypasta to its current status as a tool for digital expression, Zalgo text represents the creative ways users manipulate language in the digital age.</p>
                <p className="pt-2">Example of potential future use:</p>
                <p className="pt-1">Augmented Reality (AR) applications incorporating Zalgo text for horror-themed experiences.</p>

                <h2 className="pt-2 font-semibold text-lg">Conclusion: Embracing the Chaos of Zalgo Text</h2>
                <p className="pt-1">Zalgo&apos;s text is a testament to internet culture&apos;s creativity and playfulness. Whether you want to add a touch of digital eldritch horror to your online presence or experiment with text manipulation, Zalgo text offers a unique way to express yourself digitally.</p>
                <p className="pt-1">Remember, moderation and context are key to effectively using Zalgo text. By understanding its origins, mechanics, and potential applications, you can harness the power of Zalgo text to enhance your digital communication and creative projects.</p>
                <p className="pt-1">So, the next time you want to add a bit of controlled chaos to your text, fire up a Zalgo text generator and let your imagination run wild. Remember, with great power comes great responsibility – use your newfound Zalgo wisdom wisely!</p>
            </div>


        </div>
    </>
    );
};

export default ZalgoTextConverter;