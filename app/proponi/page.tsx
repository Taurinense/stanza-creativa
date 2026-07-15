'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ProponiPage() {
  const router = useRouter();
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (author.trim().length < 2 || title.trim().length < 3 || description.trim().length < 10) {
      setError('Controlla i campi: nome, titolo e descrizione sono obbligatori.');
      return;
    }

    setSubmitting(true);
    try {
      let image_url: string | null = null;

      if (file) {
        const ext = file.name.split('.').pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('idea-images')
          .upload(path, file);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('idea-images').getPublicUrl(path);
        image_url = data.publicUrl;
      }

      const { error: insertError } = await supabase.from('ideas').insert({
        author: author.trim(),
        title: title.trim(),
        description: description.trim(),
        image_url,
      });
      if (insertError) throw insertError;

      setDone(true);
    } catch (err) {
      console.error(err);
      setError("Qualcosa è andato storto nell'invio. Riprova tra poco.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
        <span className="text-5xl">🎉</span>
        <h1 className="mt-4 font-display text-3xl text-ink">Idea inviata!</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
          Grazie {author.split(' ')[0] || ''}, la tua idea è ora visibile a tutto il team.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3">
          <Link
            href="/idee"
            className="focus-ring inline-flex items-center justify-center rounded-full bg-paprika px-6 py-4 text-base font-semibold text-cream transition-all hover:bg-paprika-dark active:scale-[0.98]"
          >
            Vai alla bacheca
          </Link>
          <button
            onClick={() => {
              setDone(false);
              setTitle('');
              setDescription('');
              setFile(null);
            }}
            className="focus-ring inline-flex items-center justify-center rounded-full border border-line px-6 py-4 text-base font-semibold text-ink hover:border-ink/30"
          >
            Proponi un&apos;altra idea
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-md px-6 pb-16 pt-10">
      <Link href="/" className="focus-ring text-sm text-ink/50 hover:text-ink">
        ← Torna alla home
      </Link>

      <h1 className="mt-4 font-display text-3xl text-ink">Proponi un&apos;idea</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-ink/70">
        Sii concreto: cosa diventerebbe la stanza, e perché sarebbe utile per lo studio?
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="author" className="mb-1.5 block text-sm font-medium text-ink/70">
            Nome
          </label>
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Il tuo nome"
            required
            className="focus-ring w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-ink/30"
          />
        </div>

        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-ink/70">
            Titolo dell&apos;idea
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Es. "Sala relax con angolo lettura"'
            required
            className="focus-ring w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-ink/30"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ink/70">
            Descrizione
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrivi la tua idea: cosa serve, come si userebbe, perché è utile per tutti."
            required
            rows={5}
            className="focus-ring w-full resize-none rounded-xl border border-line bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-ink/30"
          />
        </div>

        <div>
          <label htmlFor="image" className="mb-1.5 block text-sm font-medium text-ink/70">
            Immagine (facoltativa)
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="focus-ring w-full rounded-xl border border-dashed border-line bg-paper px-4 py-3 text-sm text-ink/60 file:mr-3 file:rounded-full file:border-0 file:bg-cream file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-ink"
          />
        </div>

        {error && (
          <p className="rounded-xl bg-paprika-light px-4 py-3 text-sm text-paprika-dark">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="focus-ring w-full rounded-full bg-paprika px-6 py-4 text-base font-semibold text-cream shadow-md transition-all hover:bg-paprika-dark active:scale-[0.98] disabled:opacity-60"
        >
          {submitting ? 'Invio in corso…' : 'Invia Idea'}
        </button>
      </form>
    </main>
  );
}
