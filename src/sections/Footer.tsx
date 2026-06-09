import { socials, identity } from "../data/content";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-mana/20 bg-void/60 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center">
        <span className="font-display text-lg text-glow">✦ {identity.name}</span>
        <div className="flex gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="text-slate-400 transition hover:text-mana-bright"
            >
              <s.icon size={18} />
            </a>
          ))}
        </div>
        <p className="text-xs tracking-widest text-slate-500">
          © {identity.fullName} · Forged in the shadows with React + GSAP
        </p>
      </div>
    </footer>
  );
}
