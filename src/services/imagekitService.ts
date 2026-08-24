/**
 * ImageKit CDN Helper Service for TechTrainX
 * Domain: https://ik.imagekit.io/techtrainx
 */

const DEFAULT_IMAGEKIT_ENDPOINT = 'https://ik.imagekit.io/techtrainx';

export function getOptimizedImageUrl(
  originalUrl: string, 
  options: { width?: number; height?: number; quality?: number; format?: 'webp' | 'png' | 'jpg' } = {}
): string {
  // If it's already an ImageKit URL or custom URL, apply transforms if available
  const endpoint = (import.meta as any).env?.VITE_IMAGEKIT_URL_ENDPOINT || DEFAULT_IMAGEKIT_ENDPOINT;
  
  if (!originalUrl) return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';

  // If using ImageKit CDN endpoint pattern
  if (originalUrl.includes('ik.imagekit.io')) {
    const trParts: string[] = [];
    if (options.width) trParts.push(`w-${options.width}`);
    if (options.height) trParts.push(`h-${options.height}`);
    if (options.quality) trParts.push(`q-${options.quality}`);
    if (options.format) trParts.push(`f-${options.format}`);

    const transformQuery = trParts.length > 0 ? `?tr=${trParts.join(',')}` : '';
    return `${originalUrl}${transformQuery}`;
  }

  // Fallback to original URL for Unsplash or standard images
  return originalUrl;
}
