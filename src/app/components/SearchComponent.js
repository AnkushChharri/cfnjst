"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import Link from 'next/link';

const dummyData = {
    "original_text": "Stylish",
    "styled_texts": {
        "Parens": {
            "styles": {
                "Mix": "🄢⒯⒴⒧⒤⒮⒣",
                "Cap": "🄢🄣🄨🄛🄘🄢🄗",
                "SM": "⒮⒯⒴⒧⒤⒮⒣"
            }
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
            setResult(validData);
            cacheRef.current[text] = validData;
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

    const renderSkeletonLoader = () => (
        <div className="mx-4 space-y-5 *:flex *:flex-col *:items-center *:text-center *:gap-y-2 *:h-12">
            {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="animate-pulse">
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="mt-2 space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const CategorySkeleton = () => (
        <div className="*:w-full first:[&>*]:rounded-t-lg last:[&>*]:rounded-b-lg">
            {[...Array(1)].map((_, index) => (
                <div key={index} className="animate-pulse bg-slate-500">
                    <div className="h-40 bg-zinc-300 rounded"></div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="max-w-7xl m-auto p-1">
            <div className="m-4 sm:mx-6 lg:mx-10">
                <textarea
                    value={searchText}
                    onChange={handleInputChange}
                    placeholder="Enter text to style (e.g., Stylish)"
                    className="rounded-md p-4 w-full focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
                ></textarea>
                <p className="text-xs font-weight: 500; text-zinc-400">⬇️Click on Any Style to Copy⬇️</p>
            </div>

            <div className="text-center pb-1 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>
                <Link href="/discord-emoji" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Discord Emojis
                </Link>
            </div>

            <div className="text-center ring-cyan-300 pb-4 pt-3 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>
                <Link href="/fancy-font/arrow-text" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-xs text-center me-2 mb-2">
                    Arrow Text
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

                    <div className="max-h-fit max-w-7xl mx-auto my-auto mt-2 h-auto">
                        <div className="text-justify capitalize font-semibold subpixel-antialiased text-sm ml-2 mr-3">
                            <p>Are you looking to make your social media posts stand out? Want to add a touch of creativity to your online writing? Look no further! In this post, we&apos;ll explore various text styles that can help you express yourself uniquely online. From Fancy Font to Arrow Text, we&apos;ve got you covered.</p>
                            <h1 className="pt-2 text-xl">1. Fancy Font: Add Elegance to Your Words</h1>
                            <p className="pt-2">Fancy fonts can transform ordinary text into eye-catching masterpieces. Whether you&apos;re creating a logo or designing a social media graphic, fancy fonts can help convey a sense of sophistication and style.</p>
                            <h1 className="pt-2 pb-2 text-sm">Example: ✨N✨e✨w✨, N̶̷e̶̷w̶̷, Ḷ̠ạ̠ṭ̠ẹ̠ṣ̠ṭ̠, ✴C❈o❈o❈l✴</h1>
                            <h1 className="pt-2 text-xl">2. Bold Text: Make Your Message Stand Out</h1>
                            <p className="pt-2 font-extrabold">**Bold text** is perfect for emphasizing key points in your writing. It&apos;s particularly useful for headlines, subheadings, or important phrases you want readers to notice.</p>
                            <h1 className="pt-2 pb-2 text-sm">Example: 𝓝𝓔𝓦, 𝑳𝑨𝑻𝑬𝑺𝑻, 𝐂𝐎𝐎𝐋, 𝕮𝕺𝕺𝕷</h1>
                            <h1 className="pt-2 text-xl">3. Italic Text: For Subtle Emphasis</h1>
                            <p className="pt-2 italic">*Italic text* adds a touch of nuance to your writing. Use it for book titles, foreign words, or to convey a slight change in tone.</p>
                            <h1 className="pt-2 pb-2 text-sm">Example: 𝓝𝓔𝓦, 𝓃e𝓌, L𝒜𝒯e𝒮𝒯, L𝒶𝓉e𝓈𝓉</h1>
                            <h1 className="pt-2 text-xl">4. Fancy Text: Beyond Basic Formatting</h1>
                            <p className="pt-2">Fancy text goes beyond simple bold or italic styles. It can include decorative elements, unique character sets, or even animated text for digital platforms.</p>
                            <h1 className="pt-2 pb-2 text-sm">Example: N̨̥̬̩̪̬ę̥̬̩̪̬w̨̥̬̩̪̬, ⓃⒺⓌ, ♑€☠️, ✧L⋆a⋆t⋆e⋆s⋆t✧, L҉a҉t҉e҉s҉t҉</h1>
                            <h1 className="pt-2 text-xl">5. Zalgo Text: Adding a Touch of Chaos to Your Digital Content</h1>
                            <p className="pt-2">Have you ever come across text that looks like it&apos;s glitching or melting off the screen? Chances are, you&apos;ve encountered Zalgo text. In this post, we&apos;ll dive into the world of Zalgo text, exploring what it is, how to create it, and when to use it effectively.</p>
                            <h1 className="pt-2 text-sm">What is Zalgo Text?</h1>
                            <p className="pt-2">Zalgo text, named after an internet meme, is a style of text that combines a regular character with multiple combining characters to create a glitchy, chaotic appearance. It&apos;s often described as &quot;corrupted&quot; or &quot;cursed&quot; text due to its unsettling visual effect.</p>
                            <h1 className="pt-2 text-sm">Example: </h1>

                        </div>
                    </div>






                </div>

            )}



            {!isLoading && !result && searchText.trim() && (
                <p>No results found.</p>
            )}

        </div>




    );
};

export default SearchComponent;