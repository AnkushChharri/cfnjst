import React, { useState, useCallback } from 'react';
import { Check, RefreshCw } from 'lucide-react';

const zalgoCharSets = {
    up: ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350', '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b'],
    middle: ['\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327', '\u0328', '\u0334', '\u0335', '\u0336', '\u034f', '\u035c', '\u035d', '\u035e', '\u035f', '\u0360', '\u0362', '\u0338', '\u0337', '\u0361', '\u0489'],
    down: ['\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339', '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348', '\u0349', '\u034d', '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323']
};

const createZalgoStyle = (name, upIntensity, middleIntensity, downIntensity) => ({
    name,
    convert: (text, seed) => {
        const random = (seed) => {
            let x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        };
        return text.split('').map((char, index) => {
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
    const [text, setText] = useState('Enter your text here');
    const [copiedStyle, setCopiedStyle] = useState('');
    const [seed, setSeed] = useState(Math.random() * 10000);

    const handleCopy = useCallback((convertedText, styleName) => {
        navigator.clipboard.writeText(convertedText);
        setCopiedStyle(styleName);
        setTimeout(() => setCopiedStyle(''), 2000);
    }, []);

    const handleGenerate = useCallback(() => {
        setSeed(Math.random() * 10000);
    }, []);

    return (

        <div className="max-w-7xl m-auto p-4">
            <div className="flex mb-4">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your text"
                    className="rounded-l-md p-4 flex-grow focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
                />



            </div>

            <div className="mb-4 ">
                <button
                    onClick={handleGenerate}
                    className="transition ease-in-out delay-150 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-md flex items-center"
                >
                    <RefreshCw size={20} className="mr-2" />
                    Generate
                </button>

                <p className="text-xs font-weight: 500; text-zinc-400 mt-2">⬆️Click on Generate Button for Different Style⬆️</p>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {zalgoStyles.map((style) => {
                    const convertedText = style.convert(text, seed);
                    return (
                        <div
                            key={style.name}
                            className="flex flex-col items-center bg-gray-100 p-4 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200 relative"
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
            {copiedStyle && (
                <div className="mt-4 text-green-600 text-center">Copied: {copiedStyle} style</div>
            )}
        </div>
    );
};

export default ZalgoTextConverter;