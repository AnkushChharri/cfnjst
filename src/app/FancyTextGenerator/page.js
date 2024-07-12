"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { BeatLoader } from 'react-spinners';
import { debounce } from 'lodash';

const dummyData = {
    "original_text": "Stylish",
    "styled_texts": {
        "Mathematical": {
            "styles": {
                "BScr-Mix": "𝓢𝓽𝔂𝓵𝓲𝓼𝓱",
                "BScr-cap": "𝓢𝓣𝓨𝓛𝓘𝓢𝓗",
                "BScr-sm": "𝓼𝓽𝔂𝓵𝓲𝓼𝓱",
                "B-Mix": "𝐒𝐭𝐲𝐥𝐢𝐬𝐡",
                "B-cap": "𝐒𝐓𝐘𝐋𝐈𝐒𝐇",
                "B-sm": "𝐬𝐭𝐲𝐥𝐢𝐬𝐡",
                "BI-Mix": "𝑺𝒕𝒚𝒍𝒊𝒔𝒉",
                "BI-cap": "𝑺𝑻𝒀𝑳𝑰𝑺𝑯",
                "BI-sm": "𝒔𝒕𝒚𝒍𝒊𝒔𝒉",
                "Bold-Fraktur": "𝕾𝖙𝖞𝖑𝖎𝖘𝖍",
                "Bold-Serif": "𝗦𝘁𝘆𝗹𝗶𝘀𝗵",
                "Bold-Sans": "𝗦𝘁𝘆𝗹𝗶𝘀𝗵"

            },
            "count": 12
        },
        "Unicode": {
            "styles": {
                "Bold": "𝐒𝐭𝐲𝐥𝐢𝐬𝐡",
                "Bold-Italic": "𝑺𝒕𝒚𝒍𝒊𝒔𝒉",
                "Bold-Script": "𝓢𝓽𝔂𝓵𝓲𝓼𝓱"
            },
            "count": 3
        },
        "ASCII": {
            "styles": {
                "Bold": "**Stylish**",
                "B-Parentheses": "(B)Stylish(B)",
                "B-Brackets": "[B]Stylish[/B]"

            },
            "count": 3
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

    const filterBoldStyles = useCallback((styles) => {
        if (!styles) return {};
        return Object.fromEntries(
            Object.entries(styles).filter(([key]) =>
                key.toLowerCase().includes('b') ||
                key.toLowerCase().includes('bold') ||
                key.toLowerCase().includes('bscr')
            )
        );
    }, []);

    const filterStyles = useCallback((styles) => {
        if (!styles) return {};
        const boldStyles = filterBoldStyles(styles);
        if (showMixStyles) {
            return boldStyles;
        } else {
            return Object.fromEntries(
                Object.entries(boldStyles).filter(([key]) => !key.toLowerCase().includes('mix'))
            );
        }
    }, [showMixStyles, filterBoldStyles]);

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
        <div className="max-w-7xl m-auto p-1">
            <div className="m-4 sm:mx-6 lg:mx-10">
                <textarea
                    value={searchText}
                    onChange={handleInputChange}
                    placeholder="Enter text to style (e.g., Stylish)"
                    className="rounded-md p-4 w-full focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
                ></textarea>
                <p className="text-xs font-weight: 500; text-zinc-400">Click on Any Style to Copy</p>
            </div>

            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div tabIndex={-1} className="mx-4 space-y-5 *:flex *:flex-col *:items-center *:text-center *:gap-y-2">
                    {Object.entries(result.styled_texts || {}).map(([key, value]) => {
                        const boldStyles = filterStyles(value?.styles || {});
                        if (Object.keys(boldStyles).length === 0) return null; // Skip categories with no bold styles

                        return (
                            <div key={key} className="*:w-full first:[&>*]:rounded-t-lg last:[&>*]:rounded-b-lg *:cursor-pointer">
                                {isLoading ? (
                                    <CategorySkeleton />
                                ) : (
                                    Object.entries(boldStyles).map(([styleKey, styleValue]) => {
                                        const uniqueKey = `${key}-${styleKey}`;
                                        return (
                                            <div
                                                key={uniqueKey}
                                                className={`style-item shadow-sm py-3 hover:bg-stone-50 bg-zinc-200/50 ${copiedStyles[uniqueKey] ? 'copied' : ''}`}
                                                onClick={() => handleCopyStyle(uniqueKey, styleValue)}
                                            >
                                                <span className="style-value">{getStyleValue(styleValue)}</span>
                                                {copiedStyles[uniqueKey] && <span className="copy-alert text-emerald-400">Copied!</span>}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {!isLoading && !result && searchText.trim() && (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchComponent;