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
            },
            "count": 3
        },
        "Square": {
            "styles": {
                "SQ": "🅂🅃🅈🄻🄸🅂🄷",
                "Neg": "🆂🆃🆈🅻🅸🆂🅷"
            },
            "count": 2
        },
        "Circle": {
            "styles": {
                "Mix": "Ⓢⓣⓨⓛⓘⓢⓗ",
                "Cap": "ⓈⓉⓎⓁⒾⓈⒽ",
                "SM": "ⓢⓣⓨⓛⓘⓢⓗ",
                "Neg": "🅢🅣🅨🅛🅘🅢🅗"
            },
            "count": 4
        },
        "Fullwidth": {
            "styles": {
                "Mix": "Ｓｔｙｌｉｓｈ",
                "Cap": "ＳＴＹＬＩＳＨ",
                "SM": "ｓｔｙｌｉｓｈ"
            },
            "count": 3
        },
        "Mathematical": {
            "styles": {
                "Scr-Mix": "𝒮𝓉𝓎𝓁𝒾𝓈𝒽",
                "Scr-cap": "𝒮𝒯𝒴li𝒮h",
                "Scr-sm": "𝓈𝓉𝓎𝓁𝒾𝓈𝒽",
                "BScr-Mix": "𝓢𝓽𝔂𝓵𝓲𝓼𝓱",
                "BScr-cap": "𝓢𝓣𝓨𝓛𝓘𝓢𝓗",
                "BScr-sm": "𝓼𝓽𝔂𝓵𝓲𝓼𝓱",
                "Ital-Mix": "𝑆𝑡𝑦𝑙𝑖𝑠h",
                "Ital-cap": "𝑆𝑇𝑌𝐿𝐼𝑆𝐻",
                "Ital-sm": "𝑠𝑡𝑦𝑙𝑖𝑠h",
                "B-Mix": "𝐒𝐭𝐲𝐥𝐢𝐬𝐡",
                "B-cap": "𝐒𝐓𝐘𝐋𝐈𝐒𝐇",
                "B-sm": "𝐬𝐭𝐲𝐥𝐢𝐬𝐡",
                "BI-Mix": "𝑺𝒕𝒚𝒍𝒊𝒔𝒉",
                "BI-cap": "𝑺𝑻𝒀𝑳𝑰𝑺𝑯",
                "BI-sm": "𝒔𝒕𝒚𝒍𝒊𝒔𝒉",
                "Frak-Mix": "𝔖𝔱𝔶𝔩𝔦𝔰𝔥",
                "Frak-cap": "𝔖𝔗𝔜𝔏i𝔖h",
                "Frak-sm": "𝔰𝔱𝔶𝔩𝔦𝔰𝔥",
                "BF-Mix": "𝕾𝖙𝖞𝖑𝖎𝖘𝖍",
                "BF-cap": "𝕾𝕿𝖄𝕷𝕴𝕾𝕳",
                "BF-sm": "𝖘𝖙𝖞𝖑𝖎𝖘𝖍",
                "DS-Mix": "𝕊𝕥𝕪𝕝𝕚𝕤𝕙",
                "DS-cap": "𝕊𝕋𝕐𝕃𝕀𝕊h",
                "DS-sm": "𝕤𝕥𝕪𝕝𝕚𝕤𝕙",
                "SS-Mix": "𝖲𝗍𝗒𝗅𝗂𝗌𝗁",
                "SS-cap": "𝖲𝖳𝖸𝖫𝖨𝖲𝖧",
                "SS-sm": "𝗌𝗍𝗒𝗅𝗂𝗌𝗁",
                "SSB-Mix": "𝗦𝘁𝘆𝗹𝗶𝘀𝗵",
                "SSB-cap": "𝗦𝗧𝗬𝗟𝗜𝗦𝗛",
                "SSB-sm": "𝘀𝘁𝘆𝗹𝗶𝘀𝗵",
                "SSI-Mix": "𝘚𝘵𝘺𝘭𝘪𝘴𝘩",
                "SSI-cap": "𝘚𝘛𝘠𝘓𝘐𝘚𝘏",
                "SSI-sm": "𝘴𝘵𝘺𝘭𝘪𝘴𝘩",
                "SSBI-Mix": "𝙎𝙩𝙮𝙡𝙞𝙨𝙝",
                "SSBI-cap": "𝙎𝙏𝙔𝙇𝙄𝙎𝙃",
                "SSBI-sm": "𝙨𝙩𝙮𝙡𝙞𝙨𝙝",
                "MS-Mix": "𝚂𝚝𝚢𝚕𝚒𝚜𝚑",
                "MS-cap": "𝚂𝚃𝚈𝙻𝙸𝚂𝙷",
                "MS-sm": "𝚜𝚝𝚢𝚕𝚒𝚜𝚑"
            },
            "count": 39
        },
        "Quirky": {
            "styles": {
                "Bopomofo": "ㄙㄊyㄌㄧㄙㄏ",
                "Lydian": "𐤳𐤯𐤧𐤩𐤦𐤳h",
                "Lycian": "𐊖𐊗y𐊍𐊆𐊖𐊛",
                "Carian": "𐊰𐊭y𐊣𐊹𐊰h",
                "Duployan-ios": "𛰜𛰃y𛰆𛱆𛰜𛰀"
            },
            "count": 5
        },
        "Latin": {
            "styles": {
                "Str.Mix": "Sŧɏłɨsħ",
                "Str.cap": "SŦɎŁƗsĦ",
                "Str-sm": "Sŧɏłɨsħ",
                "D.Abv-Mix": "Ṡṫẏliṡḣ",
                "D.Abv-cap": "ṠṪẎlİṠḢ",
                "D.Abv-sm": "ṡṫẏliṡḣ",
                "D.Blw-Mix": "Ṣṭỵḷịṣḥ",
                "D.Blw-cap": "ṢṬỴḶỊṢḤ",
                "D.Blw-sm": "ṣṭỵḷịṣḥ",
                "Hk-Mix": "Ʂƭƴliʂɦ",
                "Hk-cap": "ꟅƬƳliꟅꞪ",
                "Hk-sm": "ʂƭƴliʂɦ"
            },
            "count": 12
        },
        "Group": {
            "styles": {
                "Sm-cap": "ꜱᴛʏʟɪꜱʜ",
                "Subscr": "ₛₜyₗᵢₛₕ",
                "Regnl": "🇸🇹🇾🇱🇮🇸🇭",
                "Mofi-Mix": "Sᵗʸˡiˢʰ",
                "Mofi-cap": "Sᵀyᴸᴵsᴴ",
                "Mofi-sm": "ˢᵗʸˡiˢʰ"
            },
            "count": 6
        },

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