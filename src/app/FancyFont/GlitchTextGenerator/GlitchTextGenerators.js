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

    return (
        <div className="max-w-7xl mx-auto p-4">
            <textarea
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-4 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                rows="3"
            />
            <p className="text-sm text-gray-600 mb-4">⬆️ Enter your name above, then click on any style to copy ⬇️</p>

            <div className="text-center pb-1 overflow-x-auto style={{ width: '100%', whiteSpace: 'nowrap' }}">
                <Link href="/BulletPointSymbol" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Bullet Point Symbol
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredStyles.map(renderStyleCard)}
            </div>
        </div>
    );
};

export default UnicodeNameConverter;