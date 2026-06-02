/**
 * Umami event tracking utility.
 * Wraps the global `umami.track()` with a safe fallback
 * so calls never throw if the script hasn't loaded yet.
 *
 * @see https://umami.is/docs/track-events
 */

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void;
    };
  }
}

/**
 * Fire-and-forget event tracking.
 *
 * @param name  – a short, snake_case event name shown in the Umami dashboard
 * @param data  – optional key-value properties attached to the event
 */
export function trackEvent(
  name: string,
  data?: Record<string, string | number | boolean>,
): void {
  try {
    window.umami?.track(name, data);
  } catch {
    // Silently ignore – analytics should never break the app
  }
}
