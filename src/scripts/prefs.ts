/**
 * Sitenin tek istemci betiği: favoriler ve dil tercihi tarayıcıda saklanır.
 * Depolama kapalıysa (gizli sekme vb.) sessizce çalışmaya devam eder.
 */
import { site } from '@/config/site';

const PREFIX = site.storagePrefix;
const FAVORITES_KEY = `${PREFIX}:favorites`;
const LOCALE_KEY = `${PREFIX}:locale`;

function readFavorites(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]'));
  } catch {
    return new Set();
  }
}

function writeFavorites(ids: Set<string>): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...ids]));
  } catch {
    /* saklanamadıysa yalnızca bu sayfada geçerli olur */
  }
}

const favorites = readFavorites();

function paintFavorites(): void {
  document.querySelectorAll<HTMLElement>('[data-fav]').forEach((button) => {
    button.setAttribute('aria-pressed', String(favorites.has(button.dataset.fav!)));
  });
}

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;

  const favButton = target.closest<HTMLElement>('[data-fav]');
  if (favButton) {
    event.preventDefault();
    const id = favButton.dataset.fav!;
    if (favorites.has(id)) favorites.delete(id);
    else favorites.add(id);
    writeFavorites(favorites);
    paintFavorites();
    return;
  }

  const localeLink = target.closest<HTMLElement>('[data-set-locale]');
  if (localeLink) {
    try {
      localStorage.setItem(LOCALE_KEY, localeLink.dataset.setLocale!);
    } catch {
      /* tercih saklanamadı; bağlantı yine de çalışır */
    }
  }
});

paintFavorites();
