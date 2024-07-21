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



    return (<>
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


        <div className="max-w-7xl xl:!mx-auto *:!text-left !mx-4">
            <p className="pt-1">In today&apos;s digital age, communication has evolved beyond simple text. We now have many options to express ourselves online, from emojis to unique text styles. This post will explore FontsCopy, a versatile tool that offers various text-related features, including Discord emojis, arrow emojis, bullet point symbols, and Zalgo text. Whether you&apos;re a social media enthusiast, a content creator, or someone who loves adding flair to their messages, FontsCopy has something for everyone.</p>

            <h1 className="pt-2 font-semibold text-xl">Discord Emojis: Adding Flavor to Your Conversations</h1>
            <p className="pt-1">Discord, the popular communication platform, has revolutionized how we interact online. One of its standout features is its extensive collection of emojis. These small, expressive icons can convey emotions, reactions, and ideas in a single glance. FontsCopy provides access to a wide array of Discord emojis, allowing you to use them outside the Discord platform.</p>

            <h1 className="pt-2 font-semibold text-xl">Why Use Discord Emojis?</h1>
            <p className="pt-1">1. Enhanced Expression: Emojis add nuance and emotion to text-based communication.</p>
            <p className="pt-1">2. Visual Appeal: They make your messages more engaging and fun to read.</p>
            <p className="pt-1">3. Universal Language: Emojis can often transcend language barriers.</p>

            <h1 className="pt-2 font-semibold text-xl">Example of Discord Emojis</h1>
            <p className="pt-1">Here are some popular Discord emojis you can find on FontsCopy:</p>
            <p className="pt-1">😀 Grinning Face</p>
            <p className="pt-1">🎉 Party Popper</p>
            <p className="pt-1">🔥 Fire</p>
            <p className="pt-1">🤔 Thinking Face</p>
            <p className="pt-1">💯 Hundred Points</p>
            <p className="pt-1">To use these in your messages, copy and paste them from FontsCopy into your desired platform.</p>

            <h1 className="pt-2 font-semibold text-xl">Arrow Emoji: Pointing the Way</h1>
            <p className="pt-1">Arrow emojis are incredibly versatile symbols that can be used in various contexts. Whether creating a tutorial, highlighting important information, or adding direction to your text, arrow emojis can be invaluable.</p>
            <p className="pt-1">Uses for Arrow Emojis</p>
            <p className="pt-1">1. Directional Guidance: Use them to point to important information.</p>
            <p className="pt-1">2. Step-by-Step Instructions: Arrows can indicate the flow of a process.</p>
            <p className="pt-1">3. Emphasis: Draw attention to specific parts of your text.</p>

            <h1 className="pt-2 font-semibold text-xl">Example of Arrow Emojis</h1>
            <p className="pt-1">FontsCopy offers a variety of arrow emojis, including:</p>
            <p className="pt-1">➡️ Right Arrow</p>
            <p className="pt-1">⬅️ Left Arrow</p>
            <p className="pt-1">⬆️ Up Arrow</p>
            <p className="pt-1">⬇️ Down Arrow</p>
            <p className="pt-1">↗️ North East Arrow</p>
            <p className="pt-1">These can be easily incorporated into your text to add visual clarity and direction.</p>

            <h1 className="pt-2 font-semibold text-xl">Bullet Point Symbol: Organizing Information</h1>
            <p className="pt-1">Bullet points are essential for creating clear, concise, and well-organized content. They help break down information into digestible chunks, making it easier for readers to understand and remember key points.</p>

            <p className="pt-1">Benefits of Using Bullet Points</p>
            <p className="pt-1">1. Improved Readability: They create visual breaks in text.</p>
            <p className="pt-1">2. Easy Scanning: Readers can quickly find important information.</p>
            <p className="pt-1">3. Emphasis on Key Points: Bullet points naturally draw attention.</p>

            <h1 className="pt-2 font-semibold text-xl">Example of Bullet Point Symbols</h1>
            <p className="pt-1">FontsCopy provides various bullet point symbols to suit different styles:</p>
            <p className="pt-1">• Standard bullet point</p>
            <p className="pt-1">◦ Hollow bullet point</p>
            <p className="pt-1">▪ Square bullet point</p>
            <p className="pt-1">▹ Triangle bullet point</p>
            <p className="pt-1">✓ Checkmark bullet point</p>
            <p className="pt-1">These can create visually appealing and well-structured lists in your documents or social media posts.</p>

            <h1 className="pt-2 font-semibold text-xl">Zalgo Text: Adding a Touch of Chaos</h1>
            <p className="pt-1">Zalgo text, also known as &quot;glitch text&quot; or &quot;creepy text,&quot; is a unique way to transform regular text into a distorted, chaotic version. It&apos;s created by adding multiple combining characters to the original text, resulting in a glitchy, otherworldly appearance.</p>
            <p className="pt-1">When to Use Zalgo Text</p>
            <p className="pt-1">1. Creative Writing: Add an eerie or supernatural element to your stories.</p>
            <p className="pt-1">2. Social Media Posts: Create attention-grabbing, unique text.</p>
            <p className="pt-1">3. Gaming Communities: Fit in with horror or glitch-themed games.</p>

            <h1 className="pt-2 font-semibold text-xl">Example of Zalgo Text</h1>
            <p className="pt-1">Here&apos;s an example of how regular text can be transformed into Zalgo text using FontsCopy:</p>
            <p className="pt-1">Regular text: &quot;Hello, World!&quot;</p>
            <p className="pt-1">Zalgo text: &quot;H̸̢̪̘̹̯̅͂͑͑͜ę̷̛̮̙̜̳̿̋̊͝l̶̨͕̱̟̆̆̈́̈́̕ļ̶̱̼̮̏̓̓̈́͜͝o̶̢̨͚̞̞̽̓̈́̈́͝,̶̡̛̮̙̜̳̿̋̊͝ W̸̢̪̘̹̯̅͂͑͑͜ǫ̷̛̮̙̜̳̿̋̊͝r̶̨͕̱̟̆̆̈́̈́̕ļ̶̱̼̮̏̓̓̈́͜͝d̶̢̨͚̞̞̽̓̈́̈́͝!̶̡̛̮̙̜̳̿̋̊͝&quot;</p>
            <p className="pt-1">As you can see, the Zalgo version adds a dramatic, glitchy effect to the original text.</p>

            <h1 className="pt-2 font-semibold text-xl">How FontsCopy Enhances Your Digital Communication</h1>
            <p className="pt-1">FontsCopy is a comprehensive tool for anyone looking to elevate their digital communication. Providing easy access to Discord emojis, arrow emojis, bullet point symbols, and Zalgo text empowers users to create more expressive, organized, and visually appealing content.</p>
            <p className="pt-1">Key Features of FontsCopy</p>
            <p className="pt-1">1. User-Friendly Interface: Easy to navigate and use.</p>
            <p className="pt-1">2. Wide Selection: Offers many symbols and text styles.</p>
            <p className="pt-1">3. Copy-Paste Functionality: Quickly add special characters to your text.</p>
            <p className="pt-1">4. Cross-Platform Compatibility: Works across various digital platforms.</p>
            <p className="pt-2">Integrating FontsCopy into Your Workflow</p>
            <p className="pt-1">To make the most of FontsCopy, consider the following tips:</p>
            <p className="pt-1">1. Bookmark the FontsCopy website for quick access.</p>
            <p className="pt-1">2. Familiarize yourself with the different categories of symbols and text styles.</p>
            <p className="pt-1">3. Practice using different elements to see what works best for your communication style.</p>
            <p className="pt-1">4. Experiment with combining different features for unique effects.</p>
            <p className="pt-2">Conclusion: Elevate Your Digital Communication with FontsCopy</p>
            <p className="pt-1">In an increasingly digital world, communicating online matters more than ever. FontsCopy provides valuable tools to enhance your digital presence, whether you&apos;re chatting with friends on Discord, creating content for social media, or drafting professional documents.</p>
            <p className="pt-1">By incorporating Discord emojis, you can add emotional depth to your messages. Arrow emojis help guide your readers&apos; attention and clarify instructions. Bullet point symbols improve the structure and readability of your content. And when you want to add a touch of the extraordinary, Zalgo text offers a unique way to transform your words.</p>
            <p className="pt-1">Remember, effective communication is about more than words— presentation, clarity, and engagement. With FontsCopy at your fingertips, you can make digital communication more effective, expressive, and memorable.</p>
            <p className="pt-1">So why settle for plain text when you can elevate your online presence? Give FontsCopy a try and discover the difference it can make in your digital communication today!</p>

            <h1 className="pt-2 font-semibold text-xl">Conclusion: Emojis as a Community-Building Tool</h1>
            <p className="pt-1">Discord emojis, particularly custom ones, are more than just fun additions to your server. They&apos;re powerful tools for building community, expressing identity, and fostering engagement. By thoughtfully implementing and managing your server&apos;s emoji selection, you can create a more vibrant, expressive, and connected community.</p>
            <p className="pt-1">Whether you&apos;re running a gaming server, a brand community, or a social group, mastering the art of Discord emojis can take your server to the next level. So start creating, sharing, and enjoying the wonderful world of Discord emojis today!</p>
        </div>
    </>

    );
};

export default SearchComponent;