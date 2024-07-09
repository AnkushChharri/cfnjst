import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

// Simple in-memory cache (note: this will not persist across requests in a serverless environment)
const cache = new Map();

// Rate limiting (note: this will not work effectively in a serverless environment)
const RATE_LIMIT = 30; // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
const rateLimitStore = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  const requestTimestamps = rateLimitStore.get(ip) || [];
  const requestsInWindow = requestTimestamps.filter(timestamp => timestamp > windowStart);
  if (requestsInWindow.length >= RATE_LIMIT) {
    return false;
  }
  requestTimestamps.push(now);
  rateLimitStore.set(ip, requestTimestamps);
  return true;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get('text');

  // Input validation
  if (!searchText || typeof searchText !== 'string' || searchText.length > 100) {
    console.error('Invalid search text:', searchText);
    return NextResponse.json({ error: 'Invalid search text' }, { status: 400 });
  }

  // Get Cloudflare context
  const ctx = getRequestContext();
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';

  // Rate limiting (note: this is not effective in a serverless environment)
  if (!rateLimit(ip)) {
    console.error('Rate limit exceeded for IP:', ip);
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  // Check cache
  const cacheKey = `search:${searchText}`;
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) {
    console.log('Returning cached result for:', searchText);
    return NextResponse.json(cachedResult);
  }

  const apiUrl = `https://hello-python.viramachhari.workers.dev/?text=${encodeURIComponent(searchText)}`;

  try {
    const response = await fetch(apiUrl, {
      cf: {
        cacheTtl: 3600,
        cacheEverything: true,
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Cache the result (note: this will not persist across requests in a serverless environment)
    cache.set(cacheKey, data);

    console.log('Fetched and cached result for:', searchText);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}
