const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Helper to make GET requests to Strapi API endpoints
 */
export async function getStrapiURL(path = "") {
  return `${STRAPI_URL}${path}`;
}

export async function fetchAPI(path: string, urlParamsObject: Record<string, string | number | boolean> = {}, options: RequestInit = {}) {
  // Build request URL
  const params = new URLSearchParams();
  Object.entries(urlParamsObject).forEach(([key, value]) => {
    params.append(key, String(value));
  });
  const queryString = params.toString();
  const requestUrl = `${await getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

  // Trigger API call
  const response = await fetch(requestUrl, {
    next: { revalidate: 60 },
    ...options,
  });

  // Handle errors
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occurred please try again: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Step 3: Skládání plné URL
 */
export function getStrapiMedia(media: any) {
  if (!media) return null;

  // Handle both single object and array (for multiple: true fields)
  const mediaItem = Array.isArray(media) ? media[0] : media;
  const backendUrl = mediaItem?.url;

  if (!backendUrl) return null;

  // Opraveno pro produkci: použije se STRAPI_URL místo natvrdo napsaného localhostu
  return backendUrl.startsWith('/') ? `${STRAPI_URL}${backendUrl}` : backendUrl;
}
