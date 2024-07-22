"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import Link from 'next/link';


const dummyData = {
    "original_text": "Stylish",
    "styled_texts": {
        "Mathematical": {
            "styles": {
                "Scr-Mix": "𝒮𝓉𝓎𝓁𝒾𝓈𝒽",
                "Scr-cap": "𝒮𝒯𝒴li𝒮h",
                "Scr-sm": "𝓈𝓉𝓎𝓁𝒾𝓈𝒽",
                "BScr-Mix": "𝓢𝓽𝔂𝓵𝓲𝓼𝓱",
                "BScr-cap": "𝓢𝓣𝓨𝓛𝓘𝓢𝓗",
                "BScr-sm": "𝓼𝓽𝔂𝓵𝓲𝓼𝓱",
                "BI-Mix": "𝑺𝒕𝒚𝒍𝒊𝒔𝒉",
                "BI-cap": "𝑺𝑻𝒀𝑳𝑰𝑺𝑯",
                "BI-sm": "𝒔𝒕𝒚𝒍𝒊𝒔𝒉",
                "SSI-Mix": "𝘚𝘵𝘺𝘭𝘪𝘴𝘩",
                "SSI-cap": "𝘚𝘛𝘠𝘓𝘐𝘚𝘏",
                "SSI-sm": "𝘴𝘵𝘺𝘭𝘪𝘴𝘩",
                "SSBI-Mix": "𝙎𝙩𝙮𝙡𝙞𝙨𝙝",
                "SSBI-cap": "𝙎𝙏𝙔𝙇𝙄𝙎𝙃",
                "SSBI-sm": "𝙨𝙩𝙮𝙡𝙞𝙨𝙝"
            },
            "count": 15
        }
    }
};

const SearchComponent = () => {
    const [searchText, setSearchText] = useState('');
    const [result, setResult] = useState(dummyData);
    const [error, setError] = useState(null);
    const [copiedStyles, setCopiedStyles] = useState({});
    const [showMixStyles, setShowMixStyles] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const abortControllerRef = useRef(null);
    const cacheRef = useRef({ '': dummyData });

    const fetchData = useCallback(async (text) => {
        if (cacheRef.current[text]) {
            setResult(cacheRef.current[text]);
            return;
        }

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        setIsLoading(true);
        try {
            const response = await fetch(`/api/search/${encodeURIComponent(text)}`, {
                signal: abortControllerRef.current.signal
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const validData = data && data.styled_texts ? data : dummyData;

            // Filter the received data to include only the specified Unicode styles
            const filteredData = {
                ...validData,
                styled_texts: {
                    Mathematical: {
                        styles: Object.fromEntries(
                            Object.entries(validData.styled_texts.Mathematical.styles)
                                .filter(([key]) => ['Scr', 'BScr', 'BI', 'SSI', 'SSBI'].some(style => key.startsWith(style)))
                        ),
                        count: Object.keys(validData.styled_texts.Mathematical.styles).filter(
                            key => ['Scr', 'BScr', 'BI', 'SSI', 'SSBI'].some(style => key.startsWith(style))
                        ).length
                    }
                }
            };

            setResult(filteredData);
            cacheRef.current[text] = filteredData;
            setError(null);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request was aborted');
            } else {
                console.error('Error fetching data:', error);
                setResult(dummyData);
                setError('An error occurred while fetching data. Using fallback data.');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const debouncedFetchData = useCallback(
        debounce((text) => {
            if (text.trim()) {
                fetchData(text);
            } else {
                setResult(dummyData);
                setError(null);
            }
        }, 300),
        [fetchData]
    );

    const handleInputChange = useCallback((e) => {
        const newSearchText = e.target.value;
        setSearchText(newSearchText);

        const isMixedCase = newSearchText.length >= 2 &&
            newSearchText.split('').some(char => char === char.toUpperCase()) &&
            newSearchText.split('').some(char => char === char.toLowerCase());

        setShowMixStyles(isMixedCase);

        debouncedFetchData(newSearchText);
    }, [debouncedFetchData]);

    const handleCopyStyle = useCallback((styleKey, styleValue) => {
        const cleanedValue = Array.isArray(styleValue) ? styleValue[0] : styleValue;
        navigator.clipboard.writeText(cleanedValue)
            .then(() => {
                setCopiedStyles(prev => ({ ...prev, [styleKey]: true }));
                setTimeout(() => {
                    setCopiedStyles(prev => ({ ...prev, [styleKey]: false }));
                }, 2000);
            })
            .catch(err => console.error('Failed to copy text: ', err));
    }, []);

    const filterStyles = useCallback((styles) => {
        if (!styles) return {};
        if (showMixStyles) {
            return styles;
        } else {
            return Object.fromEntries(
                Object.entries(styles).filter(([key]) => !key.toLowerCase().includes('mix'))
            );
        }
    }, [showMixStyles]);

    const getStyleValue = useCallback((styleValue) => {
        return Array.isArray(styleValue) ? styleValue[0] : styleValue;
    }, []);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const CategorySkeleton = () => (
        <div className="*:w-full first:[&>*]:rounded-t-lg last:[&>*]:rounded-b-lg">
            {[...Array(1)].map((_, index) => (
                <div key={index} className="animate-pulse bg-slate-500">
                    <div className="h-40 bg-zinc-300 rounded"></div>
                </div>
            ))}
        </div>
    );

    return (<>
        <div className="max-w-7xl m-auto p-1 min-h-screen">
            <div className="m-4 sm:mx-6 lg:mx-10">
                <textarea
                    value={searchText}
                    onChange={handleInputChange}
                    placeholder="Enter text to style (e.g., Stylish)"
                    className="rounded-md p-4 w-full focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
                ></textarea>
                <p className="text-xs font-weight: 500; text-zinc-400">⬇️Click on Any Style & Copy⬇️</p>
            </div>

            <div className=" text-center pb-5 pt-3 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>

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



                <Link href="/fancy-font/small-text-generator" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Small Text
                </Link>


                <Link href="/fancy-font/bold-text-styles" className="text-white bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-violet-300 dark:focus:ring-violet-800 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2">
                    Bold Text
                </Link>




            </div>

            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div tabIndex={-1} className="mx-4 space-y-5 *:flex *:flex-col *:items-center *:text-center *:gap-y-2 pt-3">
                    {Object.entries(result.styled_texts || {}).map(([key, value]) => (
                        <div key={key} className="*:w-full  first:[&>*]:rounded-t-lg last:[&>*]:rounded-b-lg *:cursor-pointer">
                            {isLoading ? (
                                <CategorySkeleton />
                            ) : (
                                Object.entries(filterStyles(value?.styles || {})).map(([styleKey, styleValue]) => {
                                    const uniqueKey = `${key}-${styleKey}`;
                                    return (
                                        <div
                                            key={uniqueKey}
                                            className={`style-item shadow-sm py-3 hover:bg-stone-50 bg-white ${copiedStyles[uniqueKey] ? 'copied' : ''}`}
                                            onClick={() => handleCopyStyle(uniqueKey, styleValue)}
                                        >
                                            <span className="style-value">{getStyleValue(styleValue)}</span>
                                            {copiedStyles[uniqueKey] && <span className="copy-alert text-emerald-400">Copied!</span>}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && !result && searchText.trim() && (
                <p>No results found.</p>
            )}

            <div className="max-w-7xl xl:mx-auto text-left mx-4">
                <p className="pt-1">Are you looking to add a touch of elegance to your text? The italic text might be just what you need. In this guide, we&apos;ll explore everything you need to know about italic text, from its origins to practical applications. We&apos;ll also introduce you to some handy tools like italic text generators and show you how to use italic text in various contexts, including LaTeX documents and social media platforms.</p>

                <h1 className="pt-2 font-semibold text-xl">What is Italic Text?</h1>
                <p className="pt-1">Italic text is a stylized font that slants slightly to the right. It&apos;s often used to emphasize words or phrases, set apart titles of works, or indicate foreign words within a text.</p>
                <p className="pt-2">Example:</p>

                <ol className="list-disc list-inside pl-4">
                    <li>Regular text: The cat sat on the mat.</li>
                    <li>Italic text: <i>The cat sat on the mat.</i></li>
                </ol>

                <h2 className="pt-2 font-semibold text-lg">The History of Italic Text</h2>
                <p className="pt-2">Italic type was first developed in Italy (hence the name) during the Renaissance. It was originally designed to mimic handwriting and save space in printed books.</p>
                <p className="pt-2">Example:</p>

                <ol className="list-disc list-inside pl-4">
                    <li>Early italic typeface: <i>The Art of War</i> by Niccolò Machiavelli (1532)</li>
                </ol>

                <h2 className="pt-2 font-semibold text-lg">How to Use Italic Text Effectively</h2>
                <p className="pt-1"><strong>Emphasis:</strong> Use italic text to stress important words or phrases.</p>
                <p className="pt-1">Example: I <i>really</i> need you to listen to this.</p>
                <p className="pt-2"><strong>Titles:</strong> Italicize titles of longer works like books, movies, or albums.</p>
                <p className="pt-2">Example: Have you read <i>To Kill a Mockingbird</i>?</p>
                <p className="pt-1"><strong>Foreign words:</strong> Use italics for non-English words in English text.</p>
                <p className="pt-2">Example: She had a certain <i>je ne sais quoi</i>.</p>
                <p className="pt-1"><strong>Thoughts:</strong> Represent internal monologue or thoughts in italics.</p>
                <p className="pt-2">Example: <i>I wonder what&apos;s for dinner</i>, he thought.</p>

                <h2 className="pt-2 font-semibold text-lg">Italic Text Generator: Simplifying Text Styling</h2>
                <p className="pt-1">An italic text generator is a tool that converts regular text into italic format. These generators are particularly useful for platforms that don&apos;t support native text formatting.</p>
                <p className="pt-1">Example:</p>

                <ol className="list-disc list-inside pl-4">
                    <li>Input: Hello, World!</li>
                    <li>Output: <i>Hello, World!</i></li>
                </ol>

                <p className="pt-1">To use an italic text generator:</p>

                <ol className="list-decimal list-inside pl-4">
                    <li>Find a reliable online italic text generator.</li>
                    <li>Type or paste your text into the input field.</li>
                    <li>Click the &quot;Generate&quot; or &quot;Convert&quot; button.</li>
                    <li>Copy the resulting italic text and paste it where needed.</li>
                </ol>

                <h2 className="pt-2 font-semibold text-lg">Glitch Text Copy and Paste: Adding a Unique Flair</h2>
                <p className="pt-2">While not strictly related to italic text, glitch text is another way to stylize your writing. Glitch text generators create text with a distorted, &quot;glitchy&quot; appearance.</p>
                <p className="pt-2">Example:</p>

                <ol className="list-disc list-inside pl-4">
                    <li>Regular text: Hello, World!</li>
                    <li>Glitch text: H̷̪̋ȅ̶̩l̶̰̓l̷͇̐o̷̦͋,̶̱̒ ̶͉̒W̷̺̔ỏ̷͜r̶̖̎l̷̞̓d̷͕̋!̶̣̒</li>
                </ol>

                <p className="pt-2">To use glitch text:</p>

                <ol className="list-decimal list-inside pl-4">
                    <li>Go to FontsCopy.com and find the glitch text generator.</li>
                    <li>Enter your text.</li>
                    <li>Generate the glitched version.</li>
                    <li>Copy and paste the result where desired.</li>
                </ol>

                <h2 className="pt-2 font-semibold text-lg">Conclusion: The Versatility of Italic Text</h2>

                <p className="pt-2">Italic text is a powerful tool in typography, offering ways to emphasize, differentiate, and add style to your writing. Whether you&apos;re using an italic text generator for social media, implementing LaTeX italic text in academic papers, or simply adding emphasis to an important point, mastering the use of italic text can significantly enhance your written communication.</p>
                <p className="pt-2">Remember, the key to the effective use of italic text is moderation. Overuse can diminish its impact and make your text harder to read. Use it thoughtfully to draw attention where it&apos;s most needed, and your writing will benefit from this classic typographic technique.</p>
                <p className="pt-2">By incorporating these tips and tools into your writing repertoire, you&apos;ll be well-equipped to use italic text effectively across various platforms and contexts. Happy writing!</p>
            </div>
        </div>
    </>
    );
};

export default SearchComponent;