"use client";

import React, { useState, useCallback, useEffect } from 'react';

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
        "total_styles_count": 74
    }
};

const SearchComponent = () => {
    const [searchText, setSearchText] = useState('');
    const [result, setResult] = useState(dummyData);
    const [error, setError] = useState(null);
    const [typingTimeout, setTypingTimeout] = useState(0);
    const [copiedStyles, setCopiedStyles] = useState({});
    const [showMixStyles, setShowMixStyles] = useState(false);

    const handleSearch = async (searchText) => {
        try {
            const response = await fetch(`https://hello-python.viramachhari.workers.dev/?text=${searchText}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResult(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Instead of setting error, we'll keep the dummy data
            setResult(dummyData);
        }
    };

    const handleInputChange = (e) => {
        const newSearchText = e.target.value;
        setSearchText(newSearchText);
        clearTimeout(typingTimeout);
        setTypingTimeout(setTimeout(() => {
            handleSearch(newSearchText);
        }, 500));

        const isMixedCase = newSearchText.length >= 2 &&
            ((newSearchText[0] === newSearchText[0].toUpperCase() && newSearchText[0] !== newSearchText[0].toLowerCase()) ||
                (newSearchText[1] === newSearchText[1].toUpperCase() && newSearchText[1] !== newSearchText[1].toLowerCase()));
        setShowMixStyles(isMixedCase);
    };

    const handleCopyStyle = useCallback((styleKey, styleValue) => {
        const cleanedValue = Array.isArray(styleValue) ? styleValue[0] : styleValue;
        navigator.clipboard.writeText(cleanedValue);
        setCopiedStyles(prev => ({ ...prev, [styleKey]: true }));
        setTimeout(() => {
            setCopiedStyles(prev => ({ ...prev, [styleKey]: false }));
        }, 2000);
    }, []);

    const filterStyles = (styles) => {
        if (showMixStyles) {
            return styles;
        } else {
            return Object.fromEntries(
                Object.entries(styles).filter(([key]) => !key.toLowerCase().includes('mix'))
            );
        }
    };

    const getStyleValue = (styleValue) => {
        return Array.isArray(styleValue) ? styleValue[0] : styleValue;
    };

    return (
        <div className="search-wrapper">
            <div className="search-container">
                <input
                    type="text"
                    value={searchText}
                    onChange={handleInputChange}
                    placeholder="Enter text to style (e.g., Stylish)"
                    className="search-input"
                />
            </div>
            {result && (
                <div className="result-container">
                    {Object.keys(result.styled_texts).map((key, index) => (
                        <div key={index} className="styled-text-box">
                            <h3 className="name-title">{key}</h3>
                            {Object.entries(filterStyles(result.styled_texts[key]?.styles || {})).map(([styleKey, styleValue], idx) => {
                                const uniqueKey = `${key}-${styleKey}`;
                                return (
                                    <div
                                        key={idx}
                                        className={`style-item ${copiedStyles[uniqueKey] ? 'copied' : ''}`}
                                        onClick={() => handleCopyStyle(uniqueKey, styleValue)}
                                    >
                                        <span className="style-value">{getStyleValue(styleValue)}</span>
                                        {copiedStyles[uniqueKey] && <span className="copy-alert">Copied!</span>}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;