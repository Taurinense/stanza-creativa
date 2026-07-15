import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-6 pb-28 pt-10 sm:max-w-lg">
<header className="flex items-center justify-between">
  <img
    src="https://www.taurinensedesign.com/wp-content/uploads/2021/03/Logo-Taurinense.png"
    alt="Taurinense"
    className="h-6 w-auto opacity-80"
  />
  <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-medium text-ink/60">
    Contest interno
  </span>
</header>

      {/* Signature: la pianta della stanza vuota che aspetta un'idea */}
      <div className="mx-auto mt-8 w-full max-w-xs animate-fadeUp">
        <svg viewBox="0 0 240 180" className="w-full">
          <rect x="14" y="14" width="212" height="152" rx="6" className="room-plan" />
          <line x1="14" y1="60" x2="70" y2="60" className="room-plan" />
          <line x1="14" y1="60" x2="14" y2="14" className="room-plan" strokeDasharray="4 5" />
          <path d="M70 60 A46 46 0 0 1 70 14" className="room-plan" strokeDasharray="3 5" />
          <circle cx="120" cy="90" r="3" fill="#D94F2A" />
          <text
            x="120"
            y="112"
            textAnchor="middle"
            className="font-display italic"
            style={{ fontSize: '13px', fill: '#D94F2A' }}
          >
            ?
          </text>
        </svg>
      </div>

      <section className="mt-6 text-center animate-fadeUp" style={{ animationDelay: '80ms' }}>
        <h1 className="font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
          La Stanza <br /> delle Idee
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-[17px] leading-relaxed text-ink/70">
          Abbiamo uno spazio libero nel nuovo studio.
          <br />
          Ora tocca a voi immaginare come potrebbe diventare qualcosa di utile per tutti.
        </p>
      </section>

      <section className="mt-8 animate-fadeUp" style={{ animationDelay: '160ms' }}>
        <div className="space-y-3 rounded-xl2 border border-line bg-paper p-5 text-[15px] leading-relaxed text-ink/80">
          <p>
            <strong className="text-ink">Ogni persona</strong> può proporre una o più idee.
          </p>
          <p>
            <strong className="text-ink">Tutte le idee</strong> saranno visibili al team e
            potranno essere votate.
          </p>
          <p>
            Al termine della raccolta, l&apos;idea più apprezzata sarà{' '}
            <strong className="text-ink">valutata concretamente</strong> per fattibilità, costi e
            utilità.
          </p>
        </div>
        <p className="mt-4 text-center text-sm italic text-ink/50">
          Non è una gara a chi propone l&apos;idea più folle, ma un&apos;opportunità per
          migliorare il nostro studio con una proposta concreta e realizzabile.
        </p>
      </section>

      <div className="mt-10 flex flex-col gap-3 animate-fadeUp" style={{ animationDelay: '240ms' }}>
        <Link
          href="/proponi"
          className="focus-ring inline-flex items-center justify-center rounded-full bg-paprika px-6 py-4 text-base font-semibold text-cream shadow-md transition-all hover:bg-paprika-dark active:scale-[0.98]"
        >
          Proponi un&apos;idea
        </Link>
        <Link
          href="/idee"
          className="focus-ring inline-flex items-center justify-center rounded-full border border-line bg-paper px-6 py-4 text-base font-semibold text-ink transition-all hover:border-ink/30 active:scale-[0.98]"
        >
          Guarda le idee e vota
        </Link>
      </div>

      <footer className="mt-auto pt-16 text-center">
        <p className="mx-auto max-w-xs text-sm italic leading-relaxed text-ink/50">
          Le idee migliori non sono necessariamente le più costose, ma quelle che rendono il
          nostro studio un posto migliore in cui lavorare.
        </p>
<img
    src="https://www.taurinensedesign.com/wp-content/uploads/2021/03/Logo-Taurinense.png"
    alt="Taurinense Design"
    className="mx-auto mt-5 h-9 w-auto opacity-70"
  />      </footer>
    </main>
  );
}
