import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { socials, identity } from "../data/content";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    // No backend (static site). Open the user's mail client pre-filled.
    const subject = encodeURIComponent(`Portfolio message from ${f.get("name")}`);
    const body = encodeURIComponent(
      `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`
    );
    window.location.href = `mailto:${identity.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-3xl px-5 py-24">
      <SectionHeading kicker="GET IN TOUCH" title="CONQUER TOGETHER" />

      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="system-panel rounded-xl p-7"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="name" placeholder="Your name" />
          <Field name="email" type="email" placeholder="Your email" />
        </div>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Your message..."
          className="mt-4 w-full resize-none rounded-md border border-mana/30 bg-abyss/60 px-4 py-3 text-slate-100 outline-none transition focus:border-mana-bright focus:shadow-[0_0_14px_rgba(168,85,247,0.4)]"
        />
        <button
          type="submit"
          className="btn-mana mt-5 inline-flex items-center gap-2 rounded-md px-7 py-3 font-semibold tracking-wider text-white"
        >
          {sent ? "OPENING MAIL…" : "CONQUER TOGETHER"} <Send size={16} />
        </button>
      </motion.form>

      {/* Socials */}
      <div className="mt-10 flex justify-center gap-5">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="grid h-12 w-12 place-items-center rounded-lg border border-mana/30 text-slate-300 transition hover:border-mana-bright hover:text-mana-bright hover:shadow-[0_0_18px_rgba(168,85,247,0.5)]"
          >
            <s.icon size={20} />
          </a>
        ))}
      </div>
    </section>
  );
}

function Field({
  name,
  type = "text",
  placeholder,
}: {
  name: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <input
      name={name}
      type={type}
      required
      placeholder={placeholder}
      className="w-full rounded-md border border-mana/30 bg-abyss/60 px-4 py-3 text-slate-100 outline-none transition focus:border-mana-bright focus:shadow-[0_0_14px_rgba(168,85,247,0.4)]"
    />
  );
}
