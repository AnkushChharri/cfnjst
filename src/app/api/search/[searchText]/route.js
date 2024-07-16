export const runtime = 'edge'; // 'nodejs' is the default
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { LRUCache } from 'lru-cache';

// Create an LRU cache
const cache = new LRUCache({
  max: 100, // Maximum number of items to store
  ttl: 1000 * 60 * 60, // Time to live: 1 hour
});

// Rate limiting
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

export async function GET(request, { params }) {
  const { searchText } = params;
  const headersList = headers();
  const ip = headersList.get('x-forwarded-for') || 'unknown';

  // Input validation
  if (!searchText || typeof searchText !== 'string' || searchText.length > 100) {
    return NextResponse.json({ error: 'Invalid search text' }, { status: 400 });
  }

  // Rate limiting
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  // Check cache
  const cacheKey = `search:${searchText}`;
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) {
    return NextResponse.json(cachedResult);
  }

  const apiUrl = `https://hello-python.viramachhari.workers.dev/?text=${encodeURIComponent(searchText)}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(apiUrl, {
      signal: controller.signal,
      next: { revalidate: 3600 } // Cache for 1 hour on the server side
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Cache the result
    cache.set(cacheKey, data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    if (error.name === 'AbortError') {
      return NextResponse.json({ error: 'Request timed out' }, { status: 504 });
    }
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}