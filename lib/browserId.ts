const KEY = 'stanza-creativa-browser-id';
const VOTED_KEY = 'stanza-creativa-voted-ideas';

export function getBrowserId(): string {
  if (typeof window === 'undefined') return '';
  let id = window.localStorage.getItem(KEY);
  if (!id) {
    id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(KEY, id);
  }
  return id;
}

export function getVotedIdeaIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(VOTED_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function markIdeaAsVoted(ideaId: string) {
  if (typeof window === 'undefined') return;
  const current = getVotedIdeaIds();
  if (!current.includes(ideaId)) {
    window.localStorage.setItem(VOTED_KEY, JSON.stringify([...current, ideaId]));
  }
}
