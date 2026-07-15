'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Idea } from '@/lib/supabase';

export default function IdeaCard({
  idea,
  rank,
  hasVoted,
  onVote,
}: {
  idea: Idea;
  rank?: number;
  hasVoted: boolean;
  onVote: (ideaId: string) => Promise<void>;
}) {
  const [voting, setVoting] = useState(false);
  const [justVoted, setJustVoted] = useState(false);

  const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null;

  async function handleVote() {
    if (hasVoted || voting) return;
    setVoting(true);
    try {
      await onVote(idea.id);
      setJustVoted(true);
    } finally {
      setVoting(false);
    }
  }

  const voted = hasVoted || justVoted;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl2 border border-line bg-paper shadow-[0_1px_0_rgba(28,26,22,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-lg">
      {medal && (
        <span className="absolute left-4 top-4 z-10 text-2xl drop-shadow-sm" aria-hidden>
          {medal}
        </span>
      )}
      {idea.image_url && (
        <div className="relative h-44 w-full overflow-hidden bg-cream">
          <Image
            src={idea.image_url}
            alt={idea.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-xl leading-tight text-ink">{idea.title}</h3>
        <p className="text-sm text-ink/60">di {idea.author}</p>
        <p className="mt-1 flex-1 text-[15px] leading-relaxed text-ink/80">
          {idea.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="text-sm font-medium text-ink/70">
            {idea.votes_count} {idea.votes_count === 1 ? 'voto' : 'voti'}
          </span>
          <button
            onClick={handleVote}
            disabled={voted || voting}
            className={`focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              voted
                ? 'cursor-default bg-paprika-light text-paprika-dark'
                : 'bg-paprika text-cream hover:bg-paprika-dark active:scale-95'
            }`}
          >
            <span className={justVoted ? 'animate-pop' : ''}>❤️</span>
            {voted ? 'Votato' : voting ? 'Un attimo…' : 'Vota questa idea'}
          </button>
        </div>
      </div>
    </article>
  );
}
