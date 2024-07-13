import React, { useState } from 'react';
import { Check } from 'lucide-react';

const styles = [
    { name: 'Basic', convert: (text) => text },
    {
        name: 'Bold', convert: (text) => text.split('').map(char => {
            const code = char.charCodeAt(0);
            return (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
                ? String.fromCodePoint(char.codePointAt(0) + 120205)
                : char;
        }).join('')
    },
    {
        name: 'Italic', convert: (text) => text.split('').map(char => {
            const code = char.charCodeAt(0);
            return (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
                ? String.fromCodePoint(char.codePointAt(0) + 120263)
                : char;
        }).join('')
    },
    {
        name: 'Script', convert: (text) => text.split('').map(char => {
            const code = char.charCodeAt(0);
            return (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
                ? String.fromCodePoint(char.codePointAt(0) + 119951)
                : char;
        }).join('')
    },
    {
        name: 'Double-struck', convert: (text) => text.split('').map(char => {
            const code = char.charCodeAt(0);
            return (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
                ? String.fromCodePoint(char.codePointAt(0) + 120055)
                : char;
        }).join('')
    },
    {
        name: 'Circled',
        convert: (text) => text.split('').map(char => {
            const code = char.toLowerCase().charCodeAt(0);
            if (code >= 97 && code <= 122) {
                return String.fromCodePoint(code - 97 + 9398);
            } else if (code >= 48 && code <= 57) {
                return String.fromCodePoint(code - 48 + 9312);
            }
            return char;
        }).join('')
    },
    {
        name: 'Square',
        convert: (text) => text.split('').map(char => {
            const code = char.toLowerCase().charCodeAt(0);
            if (code >= 97 && code <= 122) {
                return String.fromCodePoint(code - 97 + 127280);
            }
            return char;
        }).join('')
    },
    {
        name: 'Emoji', convert: (text) => {
            const emojiMap = {
                'a': '🅰️', 'b': '🅱️', 'c': '©️', 'd': '🇩', 'e': '3️⃣', 'f': '🎏', 'g': '🇬', 'h': '♓️', 'i': 'ℹ️',
                'j': '🗾', 'k': '🎋', 'l': '👢', 'm': 'Ⓜ️', 'n': '🇳', 'o': '🅾️', 'p': '🅿️', 'q': '🍳', 'r': '®️',
                's': '💲', 't': '✝️', 'u': '⛎', 'v': '♈️', 'w': '〰️', 'x': '❌', 'y': '💴', 'z': '💤',
                '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣', '4': '4️⃣', '5': '5️⃣', '6': '6️⃣', '7': '7️⃣', '8': '8️⃣', '9': '9️⃣',
                '!': '❗', '?': '❓', '+': '➕', '-': '➖', '*': '✳️', '/': '➗', '$': '💲', '%': '💯'
            };
            return text.toLowerCase().split('').map(char => emojiMap[char] || char).join('');
        }
    },
    {
        name: 'Symbols', convert: (text) => {
            const symbolMap = {
                'a': '♠️', 'b': '♭', 'c': '☾', 'd': '◇', 'e': '€', 'f': '♭', 'g': '♌', 'h': '♓', 'i': '♾️',
                'j': '♃', 'k': '☭', 'l': '£', 'm': '♏', 'n': '♑', 'o': '☮️', 'p': '☧', 'q': '♕', 'r': '☈',
                's': '§', 't': '☦️', 'u': '☋', 'v': '♈', 'w': '☠️', 'x': '☓', 'y': '☯️', 'z': '☬',
                '0': '⓿', '1': '➀', '2': '➁', '3': '➂', '4': '➃', '5': '➄', '6': '➅', '7': '➆', '8': '➇', '9': '➈',
                '!': '‼️', '?': '⁉️', '+': '➕', '-': '➖', '*': '✱', '/': '∕', '$': '💲', '%': '⚆'
            };
            return text.toLowerCase().split('').map(char => symbolMap[char] || char).join('');
        }
    },
    {
        name: 'Bubble', convert: (text) => {
            const bubbleMap = {
                'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ',
                'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ',
                's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
                '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨',
                '!': '❗', '?': '❓', '+': '⊕', '-': '⊖', '*': '⊛', '/': '∕', '$': '💲', '%': '℅'
            };
            return text.toLowerCase().split('').map(char => bubbleMap[char] || char).join('');
        }
    },
    {
        name: 'Inverted', convert: (text) => {
            const inverted = 'ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz';
            return text.toLowerCase().split('').map(char => {
                const index = 'abcdefghijklmnopqrstuvwxyz'.indexOf(char);
                return index !== -1 ? inverted[index] : char;
            }).reverse().join('');
        }
    },
    {
        name: 'Fullwidth', convert: (text) => {
            return text.split('').map(char => {
                const code = char.charCodeAt(0);
                if ((code >= 33 && code <= 126) || (code >= 65281 && code <= 65374)) {
                    return String.fromCharCode(code + 65248);
                }
                return char;
            }).join('');
        }
    },
    {
        name: 'Smallcaps', convert: (text) => {
            const smallcaps = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ';
            return text.toLowerCase().split('').map(char => {
                const index = 'abcdefghijklmnopqrstuvwxyz'.indexOf(char);
                return index !== -1 ? smallcaps[index] : char;
            }).join('');
        }
    },
    {
        name: 'Superscript', convert: (text) => {
            const superscript = '⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ';
            const normal = '0123456789abcdefghijklmnopqrstuvwxyz';
            return text.toLowerCase().split('').map(char => {
                const index = normal.indexOf(char);
                return index !== -1 ? superscript[index] : char;
            }).join('');
        }
    },
    {
        name: 'Subscript', convert: (text) => {
            const subscript = '₀₁₂₃₄₅₆₇₈₉ₐbcdₑfgₕᵢⱼₖₗₘₙₒₚqᵣₛₜᵤᵥwₓyz';
            const normal = '0123456789abcdefghijklmnopqrstuvwxyz';
            return text.toLowerCase().split('').map(char => {
                const index = normal.indexOf(char);
                return index !== -1 ? subscript[index] : char;
            }).join('');
        }
    },
];

const dummyStyle = {
    name: 'Dummy',
    convert: (text) => {
        return text.split('').map(char => char + '̨̥̬̩̪̬').join('');
    }
};

const UnicodeNameConverter = () => {
    const [name, setName] = useState('John Doe');
    const [copiedStyle, setCopiedStyle] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleCopy = (text, styleName) => {
        navigator.clipboard.writeText(text);
        setCopiedStyle(styleName);
        setTimeout(() => setCopiedStyle(''), 2000);
    };

    const filteredStyles = styles.filter(style =>
        style.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderStyleCard = (style) => (
        <div
            key={style.name}
            className="flex flex-col items-center bg-gray-100 p-4 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200 relative"
            onClick={() => handleCopy(style.convert(name), style.name)}
        >
            <span className="font-serif  text-sm mb-2">{style.name}</span>
            <span className="text-xl">{style.convert(name)}</span>
            {copiedStyle === style.name && (
                <div className="absolute top-2 right-2 text-green-600">
                    <Check size={20} />
                </div>
            )}
        </div>
    );

    return (
        <div className="max-w-7xl m-auto p-1">
            <textarea
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="rounded-md p-4 w-full focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"

            />
            <p className="text-xs font-weight: 500; text-zinc-400">⬆️Search Your Name and Click on Any Style & Copy⬇️</p>

            <div className="space-y-4 mt-8">
                {renderStyleCard(dummyStyle)}
                {filteredStyles.map(renderStyleCard)}
            </div>
            {copiedStyle && (
                <div className="mt-4 text-green-600 text-center">Copied: {copiedStyle} style</div>
            )}
        </div>
    );
};

export default UnicodeNameConverter;