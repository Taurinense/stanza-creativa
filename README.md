# La Stanza delle Idee — Contest Taurinense

Mini web app (mobile-first) per raccogliere e votare idee sull'uso di una stanza libera del nuovo studio Taurinense.

Stack: **Next.js 14 (App Router) + React + Tailwind CSS + Supabase**.

## 1. Crea il progetto Supabase

1. Vai su [supabase.com](https://supabase.com) → New Project.
2. Apri **SQL Editor** e incolla il contenuto di `supabase/schema.sql`, poi esegui.
   Questo crea le tabelle `ideas` e `votes`, la vista `ideas_with_votes`, le policy di accesso pubblico (nessun login) e il bucket `idea-images` per le foto.
3. In **Project Settings → API** copia `Project URL` e `anon public key`.

## 2. Configura le variabili d'ambiente

Copia `.env.local.example` in `.env.local` e incolla i valori presi da Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 3. Avvio in locale

```bash
npm install
npm run dev
```

Apri http://localhost:3000

## 4. Deploy

Il modo più semplice è [Vercel](https://vercel.com):

1. Importa la repo (o carica la cartella con `vercel`).
2. Aggiungi le stesse due variabili d'ambiente nelle impostazioni del progetto Vercel.
3. Deploy: fatto, il sito è pronto per essere condiviso con il team (es. via link su Apple Mail o Notion).

## Come funziona il voto senza login

Ogni browser genera un `browser_id` casuale salvato in `localStorage`. Il voto viene registrato nella tabella `votes` con vincolo `unique (idea_id, browser_id)`: anche svuotando la cache lato UI, il database impedisce comunque doppi voti dallo stesso browser sulla stessa idea. Cancellando i dati del browser il conteggio "già votato" si perde — è una scelta di semplicità coerente col niente-login richiesto.

## Struttura

```
app/
  page.tsx          — Home: introduzione + CTA
  proponi/page.tsx  — Form di invio idea (con upload immagine opzionale)
  idee/page.tsx     — Bacheca: classifica top 3, ordinamento, voto
lib/
  supabase.ts       — client Supabase + tipi
  browserId.ts       — gestione voto anonimo via localStorage
components/
  IdeaCard.tsx       — card idea con pulsante voto
supabase/
  schema.sql         — tabelle, vista, policy RLS, storage bucket
```
