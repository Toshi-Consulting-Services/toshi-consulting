// Tiny window-event bus so the navbar "Get Quote" buttons can open the global
// Quote Bot widget without prop-drilling or a context provider. The widget
// (mounted once in app/layout.tsx) listens for this event. No floating launcher
// FAB — the navbar button is the only opener (Kanav's explicit call).
export const QUOTE_BOT_EVENT = 'toshi:open-quote-bot';

export function openQuoteBot() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(QUOTE_BOT_EVENT));
  }
}
