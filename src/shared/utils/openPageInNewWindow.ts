const FADE_MS = 320;

/** Fades out the current page, then opens the URL in a new tab. */
export function openPageInNewWindow(url: string) {
  const root = document.documentElement;
  root.classList.add('page-fade-out');

  window.setTimeout(() => {
    window.open(url, '_blank');
    root.classList.remove('page-fade-out');
  }, FADE_MS);
}
