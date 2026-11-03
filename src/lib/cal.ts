/** Cal.com — https://cal.com/admin-garv-hjdp6y */
export const CAL_LINK = "admin-garv-hjdp6y";
export const CAL_URL = `https://cal.com/${CAL_LINK}`;
export const CAL_BOOK_PATH = "/book";

/** The two event types on the Cal.com profile (slugs must match Cal.com). */
export const CAL_EVENTS = [
  { slug: "30min", label: "30-minute call", note: "Walk through one workflow and leave with a scope." },
  { slug: "15min", label: "15-minute call", note: "A quick fit check before going deeper." },
] as const;

/**
 * Iframe URL for one event type. Embedding the event directly (not the
 * profile page) skips Cal's event-type list, and `column_view` shows a week of
 * slots at the page's full width. The avatar and name in Cal's left panel come
 * from the Cal.com profile itself — set the profile picture there; there is no
 * iframe parameter that hides it (`hideEventTypeDetails` only works via embed.js).
 */
export const calEmbedUrl = (slug: string) =>
  `${CAL_URL}/${slug}?embed=true&layout=column_view&theme=light`;
