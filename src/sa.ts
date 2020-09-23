declare global {
  interface Window {
    saEvent: ((x?: string) => void) & { q?: any[][] };
  }
}

export const setup = () => {
  window.saEvent =
    window.saEvent ||
    ((...a) => {
      window.saEvent.q ? window.saEvent.q.push(a) : (window.saEvent.q = [a]);
    });
};
