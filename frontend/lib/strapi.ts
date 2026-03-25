const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path to the API route
 * @param {Object} urlParamsObject URL parameters object
 * @param {Object} options Fetch options
 * @returns Parsed API call response
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
    next: { revalidate: 60 }, // Revalidate every 60 seconds (or adjust to your cache settings)
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

export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null;
  }

  // Return full URL if it's external
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // Otherwise, prefix it with the Strapi URL
  return `${STRAPI_URL}${url}`;
}
