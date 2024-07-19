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

    return (
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

                <Link href="/BulletPointSymbol" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Bullet Point Symbol
                </Link>

                <Link href="/" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Stylish Text
                </Link>

                <Link href="/BoldTextStyles" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Bold Text
                </Link>

                <Link href="/FancyTextGenerator" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Fancy Text
                </Link>
                <Link href="/ZalgoText" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Zalgo Text
                </Link>

                <Link href="/ArrowTextStyles" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Arrow Text
                </Link>

                <Link href="/FacebookBoldText" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Facebook Bold Text
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
        </div>
    );
};

export default SearchComponent;