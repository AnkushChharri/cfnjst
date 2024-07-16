"use client"

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import Link from 'next/link';

const SearchComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copiedStyles, setCopiedStyles] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async (text) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    try {
      const response = await fetch(`/api/arrowStyles?text=${encodeURIComponent(text)}`, {
        signal: abortControllerRef.current.signal
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResult(data);
      setError(null);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
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
        setResult(null);
        setError(null);
      }
    }, 300),
    [fetchData]
  );

  const handleInputChange = useCallback((e) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);
    debouncedFetchData(newSearchText);
  }, [debouncedFetchData]);

  const handleCopyStyle = useCallback((styleKey, styleValue) => {
    navigator.clipboard.writeText(styleValue)
      .then(() => {
        setCopiedStyles(prev => ({ ...prev, [styleKey]: true }));
        setTimeout(() => {
          setCopiedStyles(prev => ({ ...prev, [styleKey]: false }));
        }, 2000);
      })
      .catch(err => console.error('Failed to copy text: ', err));
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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
        <Link href="/ArrowText" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          Arrow Text
        </Link>
      </div>

      {error && <p className="error-message text-red-500">{error}</p>}

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div tabIndex={-1} className="mx-4 space-y-5 *:flex *:flex-col *:items-center *:text-center *:gap-y-2 pt-3">
          {result && Object.entries(result.styled_texts || {}).map(([key, value]) => (
            <div key={key} className="*:w-full  first:[&>*]:rounded-t-lg last:[&>*]:rounded-b-lg *:cursor-pointer">
              {Object.entries(value?.styles || {}).map(([styleKey, styleValue]) => {
                const uniqueKey = `${key}-${styleKey}`;
                return (
                  <div
                    key={uniqueKey}
                    className={`style-item shadow-sm py-3 hover:bg-stone-50 bg-white ${copiedStyles[uniqueKey] ? 'copied' : ''}`}
                    onClick={() => handleCopyStyle(uniqueKey, styleValue)}
                  >
                    <span className="style-value">{styleValue}</span>
                    {copiedStyles[uniqueKey] && <span className="copy-alert text-emerald-400">Copied!</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {!isLoading && (!result || Object.keys(result.styled_texts || {}).length === 0) && searchText.trim() && (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchComponent;