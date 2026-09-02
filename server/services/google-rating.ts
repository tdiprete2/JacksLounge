const GOOGLE_PLACES_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

export interface GoogleRating {
  rating: number;
  googleMapsUrl: string;
}

interface GooglePlaceSearchResponse {
  places?: Array<{
    displayName?: { text?: string };
    formattedAddress?: string;
    rating?: number;
    googleMapsUri?: string;
  }>;
}

let cachedRating: { value: GoogleRating; expiresAt: number } | undefined;

export function parseGoogleRating(payload: GooglePlaceSearchResponse): GoogleRating | undefined {
  const place = payload.places?.find((candidate) => {
    const name = candidate.displayName?.text?.toLowerCase() ?? "";
    const address = candidate.formattedAddress?.toLowerCase() ?? "";
    return name.includes("jack") && address.includes("hyannis");
  });

  if (
    !place ||
    typeof place.rating !== "number" ||
    place.rating < 1 ||
    place.rating > 5 ||
    !place.googleMapsUri
  ) {
    return undefined;
  }

  return {
    rating: Math.round(place.rating * 10) / 10,
    googleMapsUrl: place.googleMapsUri,
  };
}

export async function getGoogleRating(): Promise<GoogleRating> {
  const now = Date.now();
  if (cachedRating && cachedRating.expiresAt > now) {
    return cachedRating.value;
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("Google rating is not configured");
  }

  const response = await fetch(GOOGLE_PLACES_SEARCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "places.displayName,places.formattedAddress,places.rating,places.googleMapsUri",
    },
    body: JSON.stringify({
      textQuery: "Jack's Lounge, 373 West Main Street, Hyannis, MA 02601",
      languageCode: "en",
    }),
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`Google Places request failed with status ${response.status}`);
  }

  const rating = parseGoogleRating((await response.json()) as GooglePlaceSearchResponse);
  if (!rating) {
    throw new Error("Google Places returned no matching rating");
  }

  cachedRating = {
    value: rating,
    expiresAt: now + CACHE_TTL_MS,
  };
  return rating;
}