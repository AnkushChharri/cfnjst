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
                "Neg": "🆂🆃🆈🅻🅸🆂🅷"
            },
            "count": 1
        },
        "Mathematical": {
            "styles": {
                "Scr-Mix": "𝒮𝓉𝓎𝓁𝒾𝓈𝒽",
                "Scr-cap": "𝒮𝒯𝒴li𝒮h",
                "Scr-sm": "𝓈𝓉𝓎𝓁𝒾𝓈𝒽",
                "BScr-cap": "𝓢𝓣𝓨𝓛𝓘𝓢𝓗",
                "BScr-sm": "𝓼𝓽𝔂𝓵𝓲𝓼𝓱",
                "B-Mix": "𝐒𝐭𝐲𝐥𝐢𝐬𝐡",
                "B-cap": "𝐒𝐓𝐘𝐋𝐈𝐒𝐇",
                "B-sm": "𝐬𝐭𝐲𝐥𝐢𝐬𝐡",
                "BI-Mix": "𝑺𝒕𝒚𝒍𝒊𝒔𝒉",
                "BI-cap": "𝑺𝑻𝒀𝑳𝑰𝑺𝑯",
                "BI-sm": "𝒔𝒕𝒚𝒍𝒊𝒔𝒉"
            },
            "count": 11
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
        const allowedStyles = ['Str.Mix', 'Str.cap', 'Str-sm', 'D.Abv-Mix', 'D.Abv-cap', 'D.Abv-sm', 'D.Blw-Mix', 'D.Blw-cap', 'D.Blw-sm', 'Hk-Mix', 'Hk-cap', 'Hk-sm', 'Mix', 'Cap', 'SM', 'Neg', 'Scr-Mix', 'Scr-cap', 'Scr-sm', 'BScr-cap', 'BScr-sm', 'B-Mix', 'B-cap', 'B-sm', 'BI-Mix', 'BI-cap', 'BI-sm'];
        return Object.fromEntries(
            Object.entries(styles).filter(([key]) =>
                allowedStyles.some(style => key.includes(style)) || key.toLowerCase().includes('quirky') || key.toLowerCase().includes('latin')
            )
        );
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
                        <div key={key} className="*:w-full first:[&>*]:rounded-t-lg last:[&>*]:rounded-b-lg *:cursor-pointer">
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
                <h1 className="pt-2 font-semibold text-xl">Facebook Bold Text: Make Your Posts Stand Out</h1>
                <p className="pt-1">In the bustling world of social media, standing out is key. One simple yet effective way to catch your audience&apos;s eye on Facebook is by using bold text. Whether you&apos;re promoting your business, sharing important information, or just want to add emphasis to your posts, mastering the art of Facebook bold text can significantly boost your engagement. This comprehensive guide will walk you through everything you need to know about using bold text on Facebook, from manual methods to handy generators.</p>

                <h2 className="pt-2 font-semibold text-lg">1. Facebook Bold Text: Why It Matters</h2>
                <p className="pt-1">The Facebook bold text refers to text that appears in a heavier, more prominent font weight compared to regular text. While Facebook doesn&apos;t provide a built-in bold formatting option for regular posts, there are clever workarounds that can help you achieve this effect.</p>
                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Normal text: Welcome to my page!</li>
                    <li>Bold text: 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 𝗺𝘆 𝗽𝗮𝗴𝗲!</li>
                </ul>

                <p className="pt-2">Benefits of using bold text on Facebook:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Increases visibility of your posts in crowded news feeds</li>
                    <li>Emphasizes important information or key points</li>
                    <li>Enhances the overall visual appeal of your content</li>
                    <li>Improves readability, especially for longer posts</li>
                    <li>Helps in creating a clear hierarchy of information</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">2. Bold Text Generator for Facebook: Quick and Easy Formatting</h2>
                <p className="pt-1">A bold text generator for Facebook is an online tool that converts regular text into a bold font that can be easily copied and pasted into your Facebook posts, comments, or even your bio.</p>

                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Input: &quot;Don&apos;t miss our summer sale!&quot;</li>
                    <li>Output: &quot;𝗗𝗼𝗻&apos;𝘁 𝗺𝗶𝘀𝘀 𝗼𝘂𝗿 𝘀𝘂𝗺𝗺𝗲𝗿 𝘀𝗮𝗹𝗲!&quot;</li>
                </ul>

                <p className="pt-2">How to use a bold text generator:</p>
                <ol className="list-decimal list-inside pl-4">
                    <li>Search for a &quot;Facebook bold text generator&quot; online</li>
                    <li>Type or paste your text into the input field</li>
                    <li>Click the &quot;Generate&quot; or &quot;Convert&quot; button</li>
                    <li>Copy the resulting bold text</li>
                    <li>Paste it into your Facebook post, comment, or bio</li>
                </ol>

                <p className="pt-2">Popular uses for bold text generators:</p>
                <ol className="list-decimal list-inside pl-4">
                    <li>Creating eye-catching headlines for Facebook ads</li>
                    <li>Emphasizing key information in event announcements</li>
                    <li>Highlighting important updates in group posts</li>
                    <li>Making your comments stand out in busy discussion threads</li>
                </ol>

                <h2 className="pt-2 font-semibold text-lg">3. How to Bold Text in Facebook: Manual Methods</h2>
                <p className="pt-1">While Facebook doesn&apos;t offer a direct, bold formatting option, there are several manual methods you can use to create bold-looking text in your posts and comments.</p>

                <p className="pt-2">Method 1: Unicode Bold Text</p>
                <p className="pt-1">This method involves using a Unicode bold font that resembles regular text but appears bold.</p>

                <ul className="list-disc list-inside pl-4">
                    <li>Step 1: Go to a Unicode bold text converter website</li>
                    <li>Step 2: Type &quot;Important announcement!&quot;</li>
                    <li>Step 3: Get the result: &quot;𝗜𝗺𝗽𝗼𝗿𝘁𝗮𝗻𝘁 𝗮𝗻𝗻𝗼𝘂𝗻𝗰𝗲𝗺𝗲𝗻𝘁!&quot;</li>
                    <li>Step 4: Copy and paste into your Facebook post</li>
                </ul>

                <p className="pt-2">Considerations for tattoo cursive text:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Legibility: Ensure the text is readable, even in small sizes</li>
                    <li>Flow: Choose a font that complements the body&apos;s natural curves</li>
                    <li>Personalization: Select a style that reflects the wearer&apos;s personality</li>
                    <li>Longevity: Opt for designs that will age well over time</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">Conclusion</h2>
                <p className="pt-1">Mastering the use of bold text on Facebook can significantly enhance your social media presence. Whether you&apos;re using a convenient bold text generator or applying manual methods, this simple formatting technique can help your posts catch the eye and engage your audience more effectively.</p>
                <p className="pt-2 ">Remember, the key to successfully using bold text on Facebook lies in balance and purpose. While it&apos;s an excellent tool for emphasis, overuse can dilute its impact or even annoy your followers. Use bold text strategically to highlight truly important information, create visual interest, and guide your reader&apos;s attention to key points.</p>
                <p className="pt-2 ">As you experiment with different bold text techniques, pay attention to how your audience responds. Which posts get more engagement? What kind of bold text usage resonates best with your followers? By analyzing these factors, you can refine your approach and develop a style that&apos;s uniquely effective for your Facebook presence.</p>
                <p className="pt-2 ">Whether you&apos;re a social media marketer looking to boost engagement, a business owner trying to make your announcements stand out, or just someone who wants to add a little extra flair to their posts, bold text can be a valuable tool in your Facebook toolkit. So go ahead, start experimenting with bold text in your next Facebook post, and watch your engagement soar!</p>
            </div>
        </div>
    </>
    );
};

export default SearchComponent;