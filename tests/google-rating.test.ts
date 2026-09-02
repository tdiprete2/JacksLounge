import assert from "node:assert/strict";
import test from "node:test";
import { parseGoogleRating } from "../server/services/google-rating";

test("Google Places responses expose only the verified rating and Maps URL", () => {
  const parsed = parseGoogleRating({
    places: [
      {
        displayName: { text: "Jack's Lounge" },
        formattedAddress: "373 W Main St, Hyannis, MA 02601",
        rating: 4.4,
        googleMapsUri: "https://maps.google.com/example",
      },
    ],
  });

  assert.deepEqual(parsed, {
    rating: 4.4,
    googleMapsUrl: "https://maps.google.com/example",
  });
  assert.equal("reviews" in (parsed ?? {}), false);
});

test("Google Places responses for a different business are rejected", () => {
  assert.equal(
    parseGoogleRating({
      places: [
        {
          displayName: { text: "Different Restaurant" },
          formattedAddress: "Boston, MA",
          rating: 5,
          googleMapsUri: "https://maps.google.com/example",
        },
      ],
    }),
    undefined,
  );
});