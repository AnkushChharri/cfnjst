"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import Link from 'next/link';

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


            </div>





            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div tabIndex={-1} className="mx-4 space-y-5 *:flex *:flex-col *:items-center *:text-center *:gap-y-2 overflow-x-auto pt-3">
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
                        );
                    })}
                </div>
            )}

            {!isLoading && !result && searchText.trim() && (
                <p>No results found.</p>
            )}

            <div className="max-w-7xl xl:mx-auto text-left mx-4">
                <h1 className="pt-2 font-semibold text-xl">Bold Text Generator: Transform Your Text with Style</h1>
                <p className="pt-1">Are you looking to make your text stand out online? A bold text generator is the perfect tool to add emphasis and flair to your digital content. In this comprehensive guide, we&apos;ll explore everything you need to know about bold text, from its uses to how to create and copy-paste it effortlessly.</p>

                <h2 className="pt-2 font-semibold text-lg">What is a Bold Text Generator?</h2>
                <p className="pt-1">A bold text generator is an online tool that converts regular text into bold characters. These generators use Unicode characters to create text that appears bold across various platforms, even where traditional formatting isn&apos;t supported.</p>
                <p className="pt-2">Example:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Regular text: Hello World</li>
                    <li>Bold text: 𝗛𝗲𝗹𝗹𝗼 𝗪𝗼𝗿𝗹𝗱</li>
                </ul>

                <p className="pt-2">Why Use Bold Text?</p>
                <ol className="list-decimal list-inside pl-4">
                    <li>Enhance Readability: Bold text helps key information stand out, making it easier for readers to scan and comprehend content quickly.</li>
                    <li>Increase Engagement: Eye-catching bold text can draw attention to important points, increasing user engagement with your content.</li>
                    <li>Improve Aesthetics: Bold text adds visual interest to plain text, making your content more appealing and professional-looking.</li>
                    <li>Cross-Platform Compatibility: Unicode bold text works across various social media platforms, messaging apps, and websites where traditional formatting may not be available.</li>
                </ol>

                <h2 className="pt-2 font-semibold text-lg">How to Use a Bold Text Generator</h2>
                <p className="pt-1">Using a bold text generator is simple. Follow these steps:</p>

                <p className="pt-2">Example:</p>
                <ol className="list-decimal list-inside pl-4">
                    <li>Find a reputable bold text generator online.</li>
                    <li>Type or paste your text into the input field.</li>
                    <li>Click the &quot;Generate&quot; or &quot;Convert&quot; button.</li>
                    <li>Copy the resulting bold text.</li>
                    <li>Paste the bold text wherever you need it.</li>
                </ol>

                <p className="pt-2">Example:</p>
                <ol className="list-decimal list-inside pl-4">
                    <li>Input: &quot;Bold text generator&quot;</li>
                    <li>Output: &quot;𝗕𝗼𝗹𝗱 𝘁𝗲𝘅𝘁 𝗴𝗲𝗻𝗲𝗿𝗮𝘁𝗼𝗿&quot;</li>
                </ol>

                <p className="pt-2">Bold Text Copy and Paste: Tips and Tricks</p>
                <ol className="list-decimal list-inside pl-4">
                    <li>Keyboard Shortcuts: Use Ctrl+C (or Cmd+C on Mac) to copy and Ctrl+V (or Cmd+V on Mac) to paste bold text quickly.</li>
                    <li>Test Before Using: Always test your bold text in the desired platform to ensure compatibility and readability.</li>
                    <li>Mix and Match: Combine bold text with regular text for maximum impact. Use bold sparingly to highlight key points.</li>
                    <li>Create Templates: Save commonly used bold text phrases for easy access and reuse.</li>
                </ol>

                <p className="pt-2">Example:</p>
                <p className="pt-1">Template: &quot;🔥 𝗛𝗼𝘁 𝗗𝗲𝗮𝗹: [Insert offer here] 🔥&quot;</p>
                <p className="pt-1">Best Practices for Using Bold Text</p>
                <ol className="list-decimal list-inside pl-4">
                    <li>Use Sparingly: Overusing bold text can be overwhelming and reduce its effectiveness. Stick to highlighting only the most important information.</li>
                    <li>Maintain Consistency: Use bold text consistently throughout your content for a cohesive look and feel.</li>
                    <li>Consider Accessibility: Ensure that using bold text doesn&apos;t negatively impact screen reader functionality or readability for visually impaired users.</li>
                    <li>Combine with Other Formatting: Pair bold text with italics, underlines, or different font sizes for added emphasis where appropriate.</li>
                </ol>

                <p className="pt-2">Example:</p>
                <p className="pt-1">&quot;Join our 𝗘𝘅𝗰𝗹𝘂𝘀𝗶𝘃𝗲 𝗠𝗲𝗺𝗯𝗲𝗿𝘀𝗵𝗶𝗽 for *unlimited access* to premium content!&quot;</p>
                <p className="pt-1">Popular Uses for Bold Text</p>
                <ol className="list-decimal list-inside pl-4">
                    <li>Social Media: Make your posts stand out in crowded feeds.</li>
                    <li>Messaging Apps: Emphasize important information in chats.</li>
                    <li>Email Marketing: Highlight key points in newsletters and promotional emails.</li>
                    <li>Blog Posts: Draw attention to headings, subheadings, and crucial details.</li>
                    <li>Online Profiles: Make your name or tagline more noticeable.</li>
                </ol>

                <p className="pt-2">Example:</p>
                <p className="pt-1">Twitter bio: &quot;𝗗𝗶𝗴𝗶𝘁𝗮𝗹 𝗠𝗮𝗿𝗸𝗲𝘁𝗶𝗻𝗴 𝗘𝘅𝗽𝗲𝗿𝘁 | Helping businesses grow online | 📈 𝗗𝗮𝘁𝗮-𝗱𝗿𝗶𝘃𝗲𝗻 𝘀𝘁𝗿𝗮𝘁𝗲𝗴𝗶𝗲𝘀&quot;</p>
                <p className="pt-1">Limitations of Bold Text Generators</p>
                <p className="pt-1">While bold text generators are versatile tools, it&apos;s important to be aware of their limitations:</p>
                <ol className="list-decimal list-inside pl-4">
                    <li>Platform Restrictions: Some platforms may not support or may strip Unicode bold text.</li>
                    <li>SEO Considerations: Search engines may not recognize Unicode bold text as emphasized content.</li>
                    <li>Accessibility Issues: Screen readers may have difficulty interpreting Unicode bold characters correctly.</li>
                    <li>Font Compatibility: Not all fonts support Unicode bold characters, potentially affecting display.</li>
                </ol>

                <p className="pt-2">Example:</p>
                <p className="pt-1">Unicode bold text: 𝗛𝗲𝗹𝗹𝗼 𝗪𝗼𝗿𝗹𝗱</p>
                <p className="pt-1">How a screen reader might interpret it: &quot;Mathematical Bold Capital H Mathematical Bold Small E Mathematical Bold Small L Mathematical Bold Small L Mathematical Bold Small O Mathematical Bold Capital W Mathematical Bold Small O Mathematical Bold Small R Mathematical Bold Small L Mathematical Bold Small D.&quot;</p>

                <p className="pt-2">Conclusion</p>
                <p className="pt-2">A bold text generator is a powerful tool for enhancing your digital communication. By understanding its benefits, best practices, and limitations, you can effectively use bold text to make your content more engaging and impactful. Whether you&apos;re crafting social media posts, sending important messages, or designing eye-catching marketing materials, incorporating bold text can help your words stand out in the digital landscape.</p>
                <p className="pt-2">Remember to use bold text judiciously and always consider your audience and platform when applying this stylistic enhancement. With these tips and tricks at your disposal, you&apos;re well-equipped to leverage the power of bold text in your online communications.</p>
                <p className="pt-2">Start experimenting with a bold text generator today and watch your content transform from ordinary to extraordinary!</p>
            </div>
        </div>
    </>
    );
};

export default SearchComponent;