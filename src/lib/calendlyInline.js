/**
 * Loads Calendly inline widget after the script is available (non-blocking).
 * Retries until window.Calendly exists or timeout — single init via initRef.
 *
 * @returns {function} cleanup — run on unmount
 */
export function scheduleCalendlyInlineInit({
  containerRef,
  url,
  initRef,
  onGiveUp,
  retryMs = 120,
  maxWaitMs = 15000,
}) {
  let intervalId = null;
  let timeoutId = null;

  const tryInit = () => {
    if (initRef.current) return true;
    if (typeof window === 'undefined') return false;
    const el = containerRef.current;
    if (!el || !window.Calendly) return false;
    try {
      window.Calendly.initInlineWidget({
        url,
        parentElement: el,
      });
      initRef.current = true;
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
      intervalId = null;
      timeoutId = null;
      return true;
    } catch {
      return false;
    }
  };

  intervalId = setInterval(tryInit, retryMs);

  timeoutId = setTimeout(() => {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
    if (!initRef.current && typeof onGiveUp === 'function') {
      onGiveUp();
    }
  }, maxWaitMs);

  tryInit();

  return function cleanup() {
    if (intervalId) clearInterval(intervalId);
    if (timeoutId) clearTimeout(timeoutId);
    initRef.current = false;
    const el = containerRef.current;
    if (el) {
      try {
        el.innerHTML = '';
      } catch {
        /* ignore */
      }
    }
  };
}
