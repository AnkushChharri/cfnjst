"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { debounce } from 'lodash';
import { Copy } from 'lucide-react';

const ZalgoPage = () => {
    const [inputText, setInputText] = useState('Hello, World!');
    const [outputText, setOutputText] = useState('');
    const [outputStyle, setOutputStyle] = useState({ fontSize: '1.5em' });
    const [isLoading, setIsLoading] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [crazinessLevel, setCrazinessLevel] = useState(50);
    const [outputBoxHeight, setOutputBoxHeight] = useState(200);
    const [textSize, setTextSize] = useState(2); // New state for text size

    const zalgo_up = ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350', '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b', '\u0346', '\u031a'];
    const zalgo_down = ['\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339', '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348', '\u0349', '\u034d', '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323'];
    const zalgo_mid = ['\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327', '\u0328', '\u0334', '\u0335', '\u0336', '\u034f', '\u035c', '\u035d', '\u035e', '\u035f', '\u0360', '\u0361', '\u0362', '\u0338', '\u0337', '\u036f', '\u033e', '\u035b', '\u0346', '\u031a'];

    const randZalgo = (array) => array[Math.floor(Math.random() * array.length)];

    const zalgo = (text, level) => {
        const intensity = Math.floor((level / 100) * 15) + 1; // Increased range for more variation
        return text.split('').map(char => {
            if (char === ' ') return char;
            let result = char;
            for (let i = 0; i < Math.floor(Math.random() * intensity); i++) result += randZalgo(zalgo_up);
            for (let i = 0; i < Math.floor(Math.random() * Math.max(1, intensity / 2)); i++) result += randZalgo(zalgo_mid);
            for (let i = 0; i < Math.floor(Math.random() * intensity); i++) result += randZalgo(zalgo_down);
            return result;
        }).join('');
    };

    const generateZalgo = useCallback(
        debounce(() => {
            setIsLoading(true);
            setTimeout(() => {
                const zalgoText = zalgo(inputText, crazinessLevel);
                setOutputText(zalgoText);
                setIsLoading(false);
            }, 500);
        }, 300),
        [inputText, crazinessLevel]
    );

    const handleInputChange = (e) => {
        setInputText(e.target.value);
        generateZalgo();
    };

    const handleCrazinessChange = (e) => {
        setCrazinessLevel(Number(e.target.value));
        generateZalgo();
    };

    const handleOutputBoxHeightChange = (e) => {
        setOutputBoxHeight(Number(e.target.value));
    };

    const handleTextSizeChange = (e) => {
        const size = Number(e.target.value);
        setTextSize(size);
        setOutputStyle(prevStyle => ({ ...prevStyle, fontSize: `${size}em` }));
    };

    const handleGenerate = () => {
        generateZalgo();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(outputText).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    useEffect(() => {
        generateZalgo();
    }, []);

    return (
        <div className="container mx-auto p-4 min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
            <h1 className="text-5xl font-bold mb-8 text-center text-purple-600 shadow-text">Villain Zalgo Text Generator</h1>
            <div className="bg-white shadow-2xl rounded-lg p-8">
                <textarea
                    value={inputText}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-4 border border-purple-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-purple-600 text-lg"
                    placeholder="Enter your villainous text here..."
                ></textarea>
                <div className="mb-6">
                    <label htmlFor="craziness" className="block text-sm font-medium text-gray-700 mb-2">
                        Craziness Level: {crazinessLevel}%
                    </label>
                    <input
                        type="range"
                        id="craziness"
                        name="craziness"
                        min="0"
                        max="100"
                        value={crazinessLevel}
                        onChange={handleCrazinessChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>Small</span>
                        <span>Medium</span>
                        <span>Large</span>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="textSize" className="block text-sm font-medium text-gray-700 mb-2">
                        Text Size: {textSize}em
                    </label>
                    <input
                        type="range"
                        id="textSize"
                        name="textSize"
                        min="0.5"
                        max="4"
                        step="0.1"
                        value={textSize}
                        onChange={handleTextSizeChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="outputBoxHeight" className="block text-sm font-medium text-gray-700 mb-2">
                        Output Box Height: {outputBoxHeight}px
                    </label>
                    <input
                        type="range"
                        id="outputBoxHeight"
                        name="outputBoxHeight"
                        min="100"
                        max="500"
                        value={outputBoxHeight}
                        onChange={handleOutputBoxHeightChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <div className="mb-6 flex flex-wrap gap-3">
                    <button
                        onClick={handleGenerate}
                        className="btn bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Generate
                    </button>
                </div>
                {isLoading ? (
                    <div className="flex justify-center my-8">
                        <BeatLoader color="#8B5CF6" loading={isLoading} size={20} />
                    </div>
                ) : (
                    <div className="relative border-4 border-purple-300 p-6 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 shadow-inner">
                        <h2 className="text-2xl font-bold mb-4 text-purple-600">Generated Zalgo Text:</h2>
                        <div
                            id="output"
                            style={{
                                ...outputStyle,
                                height: `${outputBoxHeight}px`,
                                overflow: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center'
                            }}
                            className="break-words mb-4 p-4 bg-white bg-opacity-50 rounded-lg shadow-inner"
                        >
                            {outputText}
                        </div>
                        <button
                            onClick={handleCopy}
                            className="absolute top-4 right-4 bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full transition duration-300 ease-in-out transform hover:scale-110"
                            title="Copy to clipboard"
                        >
                            <Copy size={24} />
                        </button>
                        {copySuccess && (
                            <div className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                                Copied!
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ZalgoPage;