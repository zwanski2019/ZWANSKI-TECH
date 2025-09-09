
// Enhanced YouTube API service with better error handling and caching
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Direct channel ID instead of searching by handle to reduce API calls
const CHANNEL_ID = 'UC8S4rDRZn6Z_StJ-hh84YJg'; // Direct channel ID for @zwanski.m

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  duration: string;
  views: string;
  videoId: string;
  url: string;
}

interface YouTubeSearchItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string };
      high?: { url: string };
    };
  };
}

interface YouTubeSearchResponse {
  items: YouTubeSearchItem[];
}

interface YouTubeVideoDetailsResponse {
  items: Array<{
    contentDetails: {
      duration: string;
    };
    statistics: {
      viewCount: string;
    };
  }>;
}

interface CachedData {
  videos: YouTubeVideo[];
  timestamp: number;
  expiry: number;
}

// Cache management
const CACHE_KEY = 'youtube_videos_cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

function getCachedVideos(): YouTubeVideo[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const data: CachedData = JSON.parse(cached);
    if (Date.now() > data.expiry) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    
    return data.videos;
  } catch (error) {
    console.error('Error reading cached videos:', error);
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
}

function setCachedVideos(videos: YouTubeVideo[]): void {
  try {
    const data: CachedData = {
      videos,
      timestamp: Date.now(),
      expiry: Date.now() + CACHE_DURATION
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error caching videos:', error);
  }
}

// Utility functions
function formatViewCount(viewCount: string): string {
  const views = parseInt(viewCount);
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';
  
  const hours = parseInt(match[1]?.replace('H', '') || '0');
  const minutes = parseInt(match[2]?.replace('M', '') || '0');
  const seconds = parseInt(match[3]?.replace('S', '') || '0');
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatDate(publishedAt: string): string {
  const date = new Date(publishedAt);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Rate limiting
let lastApiCall = 0;
const MIN_API_INTERVAL = 1000; // 1 second between API calls

async function rateLimitedFetch(url: string): Promise<Response> {
  const now = Date.now();
  const timeSinceLastCall = now - lastApiCall;
  
  if (timeSinceLastCall < MIN_API_INTERVAL) {
    await new Promise(resolve => setTimeout(resolve, MIN_API_INTERVAL - timeSinceLastCall));
  }
  
  lastApiCall = Date.now();
  return fetch(url);
}

// Retry logic with exponential backoff
async function fetchWithRetry(url: string, maxRetries = 3): Promise<any> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await rateLimitedFetch(url);
      
      if (!response.ok) {
        if (response.status === 403) {
          console.warn('YouTube API quota exceeded, using fallback data');
          throw new Error('API_QUOTA_EXCEEDED');
        }
        if (response.status === 401) {
          console.warn('Invalid YouTube API key, using fallback data');
          throw new Error('INVALID_API_KEY');
        }
        throw new Error(`HTTP_${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.warn(`YouTube API attempt ${attempt} failed:`, error);
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

export async function fetchYouTubeVideos(forceRefresh = false): Promise<YouTubeVideo[]> {
  // Always use cached data first to improve performance
  if (!forceRefresh) {
    const cachedVideos = getCachedVideos();
    if (cachedVideos) {
      return cachedVideos;
    }
  }

  // Use fallback data immediately to prevent loading delays
  const { fallbackVideos } = await import('@/data/fallbackVideos');
  
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API key not configured, using fallback data');
    return fallbackVideos;
  }
  
  try {
    // Attempt to fetch fresh data in background, but don't block UI
    const videosData: YouTubeSearchResponse = await fetchWithRetry(
      `${YOUTUBE_API_BASE_URL}/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=6&key=${YOUTUBE_API_KEY}`,
      1 // Only 1 retry to avoid long delays
    );
    
    if (!videosData.items || videosData.items.length === 0) {
      return fallbackVideos;
    }

    // Get video IDs for additional details
    const videoIds = videosData.items.map((item: YouTubeSearchItem) => item.id.videoId).join(",");
    
    // Fetch video statistics with minimal retries
    const detailsData: YouTubeVideoDetailsResponse = await fetchWithRetry(
      `${YOUTUBE_API_BASE_URL}/videos?part=statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
      1 // Only 1 retry
    );
    
    // Combine data and format for our component
    const videos: YouTubeVideo[] = videosData.items.map((video: YouTubeSearchItem, index: number) => {
      const details = detailsData.items?.[index];
      const videoId = video.id.videoId;
      
      return {
        id: videoId,
        videoId: videoId,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url,
        date: formatDate(video.snippet.publishedAt),
        duration: details ? formatDuration(details.contentDetails.duration) : '0:00',
        views: details ? formatViewCount(details.statistics.viewCount) : '0',
        url: `https://www.youtube.com/watch?v=${videoId}`
      };
    });

    // Cache successful response
    setCachedVideos(videos);
    return videos;
    
  } catch (error) {
    // Always return fallback data on error
    return fallbackVideos;
  }
}

export function clearVideoCache(): void {
  localStorage.removeItem(CACHE_KEY);
  console.log('YouTube videos cache cleared');
}

export const youtubeService = {
  getVideos: async (): Promise<YouTubeVideo[]> => {
    return await fetchYouTubeVideos();
  },
  
  getLastFetchTime: (): number | undefined => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return undefined;
      const data: CachedData = JSON.parse(cached);
      return data.timestamp;
    } catch (error) {
      return undefined;
    }
  },
  
  clearCache: (): void => {
    clearVideoCache();
  }
};
