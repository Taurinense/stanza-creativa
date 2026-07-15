'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { supabase, type Idea } from '@/lib/supabase';
import { getBrowserId, getVotedIdeaIds, markIdeaAsVoted } from '@/lib/browserId';
import IdeaCard from '@/components/IdeaCard';

type SortMode = 'votes' | 'recent';

export default function IdeePage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortMode, setSortMode] = useState<SortMode>('votes');
  const [votedIds, setVotedIds] = useState<string[]>([]);

  useEffect(() => {
    setVotedIds(getVotedIdeaIds());
    fetchIdeas();
  }, []);

  async function fetchIdeas() {
    setLoading(true);
    const { data, error } = await supabase
      .from('ideas_with_votes')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setIdeas(data as Idea[]);
    setLoading(false);
  }

  async function handleVote(ideaId: string) {
    const browserId = getBrowserId();
    const { error } = await supabase.from('votes').insert({
      idea_id: ideaId,
      browser_id: browserId,
    });
    // Errore 23505 = violazione unique constraint: hai già votato questa idea
    if (error && (error as { code?: string }).code !== '23505') {
      console.error(error);
      return;
    }
    markIdeaAsVoted(ideaId);
    setVotedIds((prev) => [...prev, ideaId]);
    setIdeas((prev) =>
      prev.map((i) => (i.id === ideaId ? { ...i, votes_count: i.votes_count + 1 } : i))
    );
  }

  const sorted = useMemo(() => {
    const copy = [...ideas];
    if (sortMode === 'votes') {
      copy.sort((a, b) => b.votes_count - a.votes_count);
    } else {
      copy.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return copy;
  }, [ideas, sortMode]);

  const top3 = useMemo(
    () => [...ideas].sort((a, b) => b.votes_count - a.votes_count).slice(0, 3),
    [ideas]
  );

  const rankMap = useMemo(() => {
    const map = new Map<string, number>();
    top3.forEach((idea, i) => map.set(idea.id, i + 1));
    return map;
  }, [top3]);

  return (
    <main className="mx-auto min-h-screen max-w-md px-6 pb-16 pt-10 sm:max-w-2xl">
      <div className="flex items-center justify-between">
        <Link href="/" className="focus-ring text-sm text-ink/50 hover:text-ink">
          ← Home
        </Link>
        <Link
          href="/proponi"
          className="focus-ring rounded-full bg-paprika px-4 py-2 text-sm font-semibold text-cream hover:bg-paprika-dark"
        >
          + Proponi idea
        </Link>
      </div>

      <h1 className="mt-5 font-display text-3xl text-ink">Bacheca delle idee</h1>
      <p className="mt-1 text-[15px] text-ink/60">Vota le proposte del team, una sola volta a testa.</p>

      {top3.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg text-ink/80">Classifica — Top 3</h2>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {top3.map((idea, i) => (
              <div
                key={idea.id}
                className="flex flex-col items-center rounded-xl2 border border-line bg-paper p-3 text-center"
              >
                <span className="text-2xl">{['🥇', '🥈', '🥉'][i]}</span>
                <p className="mt-1 line-clamp-2 font-display text-sm text-ink">{idea.title}</p>
                <p className="mt-1 text-xs text-ink/50">{idea.votes_count} voti</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8 flex items-center gap-2 rounded-full border border-line bg-paper p-1 text-sm">
        <button
          onClick={() => setSortMode('votes')}
          className={`focus-ring flex-1 rounded-full px-4 py-2 font-medium transition-colors ${
            sortMode === 'votes' ? 'bg-ink text-cream' : 'text-ink/60'
          }`}
        >
          Più votate
        </button>
        <button
          onClick={() => setSortMode('recent')}
          className={`focus-ring flex-1 rounded-full px-4 py-2 font-medium transition-colors ${
            sortMode === 'recent' ? 'bg-ink text-cream' : 'text-ink/60'
          }`}
        >
          Più recenti
        </button>
      </div>

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {loading && <p className="col-span-full py-10 text-center text-ink/40">Caricamento idee…</p>}

        {!loading && sorted.length === 0 && (
          <div className="col-span-full rounded-xl2 border border-dashed border-line py-14 text-center">
            <p className="text-ink/50">Nessuna idea ancora. Sii il primo a proporne una.</p>
            <Link href="/proponi" className="focus-ring mt-3 inline-block font-semibold text-paprika">
              Proponi un&apos;idea →
            </Link>
          </div>
        )}

        {sorted.map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            rank={sortMode === 'votes' ? rankMap.get(idea.id) : undefined}
            hasVoted={votedIds.includes(idea.id)}
            onVote={handleVote}
          />
        ))}
      </section>
    </main>
  );
}
