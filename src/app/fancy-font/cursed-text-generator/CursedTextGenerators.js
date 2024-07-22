"use client"

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

const styles = [
    { name: 'Cursed Strikethrough', convert: (text) => text.split('').map(char => char + '\u0336').join('') },
    { name: 'Cursed Underline', convert: (text) => text.split('').map(char => char + '\u0332').join('') },
    { name: 'Cursed Combining', convert: (text) => text.split('').map(char => char + '\u0359\u035A').join('') },
    { name: 'Cursed Glitch', convert: (text) => text.split('').map(char => char + (Math.random() > 0.5 ? '\u0315' : '\u0358')).join('') },
    { name: 'Cursed Bubble', convert: (text) => text.split('').map(char => char + '\u0325\u0355').join('') },
    { name: 'Cursed Spooky', convert: (text) => text.split('').map(char => char + '\u0328\u0347').join('') },
    { name: 'Cursed Chaos', convert: (text) => text.split('').map(char => char + '\u033F\u034D\u0353').join('') },
    { name: 'Cursed Melting', convert: (text) => text.split('').map(char => char + '\u0360\u0361').join('') },
    { name: 'Cursed Distorted', convert: (text) => text.split('').map(char => char + '\u0334\u0335').join('') },
    { name: 'Cursed Vibrating', convert: (text) => text.split('').map(char => char + '\u034B\u034C').join('') },
    { name: 'Cursed Shadow', convert: (text) => text.split('').map(char => char + '\u0305\u0333').join('') },
    { name: 'Cursed Heartbeat', convert: (text) => text.split('').map((char, i) => char + (i % 2 === 0 ? '\u0310' : '\u0312')).join('') },
    { name: 'Cursed Earthquake', convert: (text) => text.split('').map(char => char + '\u0321\u0322').join('') },
    { name: 'Cursed Radioactive', convert: (text) => text.split('').map(char => char + '\u0326\u032E\u0349').join('') },
    { name: 'Cursed Alien', convert: (text) => text.split('').map(char => char + '\u0324\u0325\u0326').join('') },
    { name: 'Cursed Vortex', convert: (text) => text.split('').map(char => char + '\u0311\u031A\u0351').join('') },
    { name: 'Cursed Barcode', convert: (text) => text.split('').map(char => char + '\u030A\u0304\u033F').join('') },
    { name: 'Cursed Dripping', convert: (text) => text.split('').map(char => char + '\u0322\u0323\u0326').join('') },
    { name: 'Cursed Gradient', convert: (text) => text.split('').map((char, i) => char + String.fromCharCode(0x0300 + i % 15)).join('') },
    { name: 'Cursed Neon', convert: (text) => text.split('').map(char => char + '\u034E\u035B').join('') },
    { name: 'Cursed Gloom', convert: (text) => text.split('').map(char => char + '\u0316\u0317\u0318').join('') },
    { name: 'Cursed Circuit', convert: (text) => text.split('').map(char => char + '\u0325\u0328\u0329').join('') },
    { name: 'Cursed Fuzzy', convert: (text) => text.split('').map(char => char + '\u0333\u0334\u0335').join('') },
    { name: 'Cursed Pixelated', convert: (text) => text.split('').map(char => char + '\u0337\u0338').join('') },
    { name: 'Cursed Haunted', convert: (text) => text.split('').map(char => char + '\u0340\u0341\u0342').join('') },
    { name: 'Cursed Frozen', convert: (text) => text.split('').map(char => char + '\u0351\u0357\u035A').join('') },
    { name: 'Cursed Burning', convert: (text) => text.split('').map(char => char + '\u0306\u0307\u0308').join('') },
    { name: 'Cursed Void', convert: (text) => text.split('').map(char => char + '\u0354\u0355\u0356').join('') },
    { name: 'Cursed Quantum', convert: (text) => text.split('').map(char => char + '\u035C\u035D\u035E').join('') },
    { name: 'Cursed Encrypted', convert: (text) => text.split('').map(char => char + '\u0346\u0347\u0348').join('') },
    { name: 'Cursed Fractal', convert: (text) => text.split('').map((char, i) => char + String.fromCharCode(0x0300 + (i * 7) % 112)).join('') },
    { name: 'Cursed Nightmare', convert: (text) => text.split('').map(char => char + '\u0338\u0339\u033A').join('') },
    { name: 'Cursed Abyss', convert: (text) => text.split('').map(char => char + '\u0360\u0361\u0362').join('') },
    { name: 'Cursed Eldritch', convert: (text) => text.split('').map(char => char + '\u0363\u036F\u0489').join('') },
    { name: 'Cursed Interdimensional', convert: (text) => text.split('').map((char, i) => char + String.fromCharCode(0x0300 + (i * 13) % 112)).join('') }

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

                <Link href="/fancy-font/cool-text" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Cool Text
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
                <h1 className="pt-2 font-semibold text-xl">Cursed Text: Unleashing Digital Chaos with Eerie Typography</h1>
                <p className="pt-1">In the vast landscape of digital communication, where emojis and GIFs reign supreme, there&apos;s a darker, more mysterious form of expression lurking in the shadows: cursed text. This peculiar typographic style has gained popularity among internet users looking to add an unsettling edge to their messages or create an air of digital mystique. In this comprehensive guide, we&apos;ll delve into the world of cursed text, exploring its origins, applications, and the tools you can use to create your eerie messages.</p>

                <h2 className="pt-2 font-semibold text-lg">1. Cursed Text: The Art of Digital Distortion</h2>
                <p className="pt-1">Cursed text, also known as glitch text or logo text, is a form of stylized text that appears distorted, glitchy, or &quot;cursed.&quot; It&apos;s created by adding multiple combining Unicode characters to regular text, resulting in a visually chaotic and often unsettling appearance.</p>
                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Normal text: Hello World</li>
                    <li>Cursed text: H̸̢̪̯̱̰̎̇̽̂̊ę̷̛̠̟̰̄̆̈́͝l̶̰͚̱̈́̒͒̕͝l̷̨̮̭̙̣̅̀̊͘o̶̢͚̞̞̿̈́̎͜͝ ̶̡̣̼̟̈́̎̍̕͜W̷̺͕̣̗̎̇̊̕͜o̵̺͚̼̝͆̓̈́̕͜r̵̡̻̺̻̄̓̈́̕͜l̵͚̻̺̻̆̐̽̕͜d̵̡͓̺̻̆̐̽̕͜</li>
                </ul>

                <p className="pt-2">Uses of cursed text include:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Creating an unsettling atmosphere in digital art</li>
                    <li>Adding a touch of horror to social media posts</li>
                    <li>Designing unique and attention-grabbing usernames</li>
                    <li>Crafting eerie memes and internet jokes</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">2. Cursed Text Generator: Crafting Digital Nightmares</h2>
                <p className="pt-1">A cursed text generator is an online tool that allows users to easily create cursed text by inputting normal text and applying various levels of &quot;cursedness&quot; or distortion.</p>

                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Input: Beware the curse</li>
                    <li>Output options:</li>
                    <li>B̵̖̽e̷̲͐w̶̹̔a̶͚̓r̶͎̈́e̶̟͝ ̶̱̒t̵͖̆h̷͉̆e̷͉̎ ̵͖́c̷̯̈́u̷͚͝r̶̖̂s̷̩͑e̷̗͝ (Mildly cursed)</li>
                </ul>

                <p className="pt-2">Popular uses for cursed text generators:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Creating spooky social media posts for Halloween</li>
                    <li>Designing creepy aesthetics for digital art projects</li>
                    <li>Adding an element of mystery to online game usernames</li>
                    <li>Crafting unsettling messages for horror-themed content</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">3. Cursed Text Copy and Paste: Spreading the Digital Hex</h2>
                <p className="pt-1">Cursed text copy and paste refers to the practice of sharing pre-generated cursed text across various digital platforms. This method allows users to quickly and easily incorporate cursed text into their online communications without using a generator themselves.</p>

                <p className="pt-2">Examples:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Ẁ̷̡͔̟̦̤̩̪̼͎͔̰̹̠̻̈́̐̇̔̈́̈́̇̒̚͝h̷̨̦̖͍̮̟͙̣̻̭̓͑̅̋̃̿̃̾̅̕͘͜͠͝ͅa̵̯͍̙̠͐͒̒͗̑̃̇̈̒̈́̑̕t̶̢̟̻̲̼͓̦̟̹̳̰̣̏̈́̌̈́̌͜ ̶̡̻͉̤̗̜̜̹͕̤̘̺̬̑̓̂̄͋͊̈́̉̔̚h̵̡̨̛̥͔̞̗̰̘̟̝̦̮̙̐͒͑͗̒̒̌͐̕̕͠a̶̡̨̰̘̯̠̙̫̯̪̐̃̋̋̀̊̓̋̐̌̄̕͝v̷̙̗͍̣̙̤̱̣̝̥̣͚͆̀̆́́̈́̊̿̽̈́̚̚͜͝e̶̛͚̯̠̥̝̼̗̪̗͚̋̓̓̓̐̈́̊ ̶̱̩̤̰͔̟̬̖̊̽͜y̶̢̛̗̗͉̖̤̪̖̑̏̿̋͌̃̈́̔̎͂̚͠ͅo̶̡̖͖̬͚̻̻̓͗̏̓́̋͋̾̓̒̓̚͘͝ư̶̺̤̺̜̼̦̭̒̑̓̊̈́̀̂͂̿̇̂̆ ̷̯͎̫̰̭̤͚̜̞̬͖̅̄̆̈́̒̄̚͝d̶̢̛̥̺̰̣̠͍͖͗̎̽̇͒̈́̒̌͜͝ǫ̵̦͙̲̗̱͖͔̮̣̞̜̿́͗̿̑́̃̿̑̋͛̄͗ͅn̷̢̧̦̜͚͎̜̯̼̳̙̤̝̿̈́̈̀̀̏̐̚͝͝͠e̸̛̙͐̀̄̾̒̍̿̈́̈́̈́̕͝?̸̛̟̠͙̦̼̞̯̞̆̓̾̍̊̈́̈͂̕͝͠</li>
                </ul>

                <p className="pt-2">Benefits of copy-paste cursed text:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Quick access to pre-made cursed text</li>
                    <li>Consistency in style across multiple platforms</li>
                    <li>Ability to use cursed text on platforms that don&apos;t support text generators</li>
                    <li>Sharing specific cursed phrases or messages within communities</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">4. Cursed Text Gen: The Evolution of Eerie Typography</h2>
                <p className="pt-1">Cursed text gen, short for generation, refers to the broader concept of creating and using cursed text across various digital mediums. It encompasses not just the act of generating cursed text but also the culture and creativity surrounding its use.</p>

                <p className="pt-2">Examples:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Normal: The quick brown fox jumps over the lazy dog.</li>
                    <li>Cursed gen: T̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕h̸̨̧̛͕͚̣̦̫̰̎̅̈̑̈́̈́̕͜͝ę̷͕̲̟̱̫̥̘̋̑̈́̒̈́̕͝͝ͅ ̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕q̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕ư̷̡͕͚̣̦̫̰̎̅̈̑̈́̈́̕͜͝ī̷̛̮͎̖̦̗̳̱̯̙̩̊̈́̒̈́̕c̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕k̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕ ̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕b̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕r̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕ơ̷̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕w̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕n̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕ ̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕f̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕ơ̷̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕x̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕ ̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕j̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕ư̷̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕m̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕p̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕s̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕ ̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕ơ̷̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕v̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕ē̷̛̮͎̖̦̗̳̱̯̙̩̊̈́̒̈́̕r̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕ ̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕t̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕ḫ̷̛͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕ē̷̛̮͎̖̦̗̳̱̯̙̩̊̈́̒̈́̕ ̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕l̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕ā̷̛̮͎̖̦̗̳̱̯̙̩̊̈́̒̈́̕z̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕ȳ̷̛̮͎̖̦̗̳̱̯̙̩̊̈́̒̈́̕ ̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕d̷̛̮͎̖̦̗̳̱̯̙̩̄̊̈́̒̈́̕ơ̷̮͎̖̦̗̳̱̯̙̩̄̊</li>
                </ul>
            </div>
        </div>
    </>
    );
};

export default UnicodeNameConverter;