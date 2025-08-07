// Image optimization utilities
export const optimizeImageUrl = (url, width = 400, height = 400, quality = 80) => {
  if (!url) return '';
  
  // For Unsplash images, add optimization parameters
  if (url.includes('unsplash.com')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=${width}&h=${height}&fit=crop&crop=center&q=${quality}`;
  }
  
  // For other images, return as is
  return url;
};

export const generatePlaceholder = (width = 400, height = 400) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#99aaaa" text-anchor="middle" dy=".3em">Loading...</text>
    </svg>
  `)}`;
};

export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const batchPreloadImages = async (imageUrls) => {
  const promises = imageUrls.map(url => preloadImage(url).catch(() => null));
  return Promise.all(promises);
};
