import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Shield, Swords, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { sports } from "../data/content";

type SportCategory = (typeof sports)[number];
type Achievement = SportCategory["achievements"][number];

// Dungeon configs per sport category
const dungeonConfig = {
  Badminton: {
    icon: "🏸",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.55)",
    borderGlow: "rgba(56,189,248,0.35)",
    gradientFrom: "rgba(12,74,110,0.55)",
    gradientTo: "rgba(4,10,28,0.97)",
    rank: "A",
    label: "SWIFT DUNGEON",
    rune: "ᚦᚢ",
    runeAlt: "ᛁᛊ",
    hpColor: "#38bdf8",
  },
  Football: {
    icon: "⚽",
    color: "#34d399",
    glow: "rgba(52,211,153,0.55)",
    borderGlow: "rgba(52,211,153,0.35)",
    gradientFrom: "rgba(6,78,59,0.55)",
    gradientTo: "rgba(4,10,20,0.97)",
    rank: "S",
    label: "IRON DUNGEON",
    rune: "ᚠᛖ",
    runeAlt: "ᚢᛏ",
    hpColor: "#34d399",
  },
  Cricket: {
    icon: "🏏",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.55)",
    borderGlow: "rgba(251,191,36,0.35)",
    gradientFrom: "rgba(120,53,15,0.55)",
    gradientTo: "rgba(10,7,4,0.97)",
    rank: "S",
    label: "FLAME DUNGEON",
    rune: "ᚷᚹ",
    runeAlt: "ᚱᛉ",
    hpColor: "#fbbf24",
  },
} as const;

type DungeonKey = keyof typeof dungeonConfig;

const CARDS_PER_PAGE = 3;

export default function Sports() {
  const [activeDungeon, setActiveDungeon] = useState<DungeonKey | null>(null);
  const [activeAchievement, setActiveAchievement] = useState<Achievement | null>(null);
  const [carouselPage, setCarouselPage] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);

  function openDungeon(key: DungeonKey) {
    setActiveDungeon(key);
    setActiveAchievement(null);
    setCarouselPage(0);
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
  }

  function closeDungeon() {
    setActiveDungeon(null);
    setActiveAchievement(null);
  }

  const activeSport = sports.find((s) => s.category === activeDungeon);
  const cfg = activeDungeon ? dungeonConfig[activeDungeon] : null;

  return (
    <section id="sports" className="relative z-10 w-full px-0 py-24 overflow-hidden">
      {/* Dungeon video background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.9, filter: "saturate(1) brightness(0.80) contrast(1.1)" }}
        >
          <source src="https://res.cloudinary.com/dumsdgz85/video/upload/v1781154392/dungeon_xbtdta.mp4" type="video/mp4" />
        </video>
        {/* Dark scrim so cards remain readable */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(4,2,18,0.45)" }}
        />
        {/* Edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 30%, rgba(4,2,18,0.5) 70%, rgba(4,2,18,0.88) 100%)",
          }}
        />
        {/* Top/bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(4,2,18,0.85) 0%, transparent 15%, transparent 85%, rgba(4,2,18,0.85) 100%)",
          }}
        />
      </div>


      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <SectionHeading kicker="CHAMPION'S RECORD" title="CONQUERED DUNGEONS" />

        {/* Intro flavour text */}
        <div className="mb-12 text-center">
          <p
            className="mx-auto max-w-xl text-sm tracking-widest font-mono"
            style={{ color: "rgba(196,181,253,0.6)" }}
          >
            ✦ THREE DUNGEONS AWAIT — EACH HOLDS THE TROPHIES OF BATTLE ✦
          </p>
        </div>

        {/* Three dungeon gate cards */}
        <div className="grid gap-8 sm:grid-cols-3">
          {(Object.keys(dungeonConfig) as DungeonKey[]).map((key, i) => {
            const dc = dungeonConfig[key];
            const sportData = sports.find((s) => s.category === key);
            const count = sportData?.achievements.length ?? 0;
            const isOpen = activeDungeon === key;

            return (
              <motion.button
                key={key}
                onClick={() => (isOpen ? closeDungeon() : openDungeon(key))}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative flex flex-col items-center rounded-2xl p-8 text-center overflow-hidden"
                style={{
                  background: `linear-gradient(160deg, ${dc.gradientFrom}, ${dc.gradientTo})`,
                  border: `1px solid ${isOpen ? dc.color : dc.borderGlow}`,
                  boxShadow: isOpen
                    ? `0 0 0 1px ${dc.borderGlow}, 0 0 40px ${dc.glow}, 0 0 80px ${dc.glow.replace("0.55", "0.2")}, inset 0 0 40px ${dc.gradientFrom}`
                    : `0 0 0 1px ${dc.borderGlow.replace("0.35", "0.15")}, inset 0 0 30px ${dc.gradientFrom.replace("0.55", "0.2")}`,
                  transform: isOpen ? "translateY(-8px)" : undefined,
                  transition: "all 0.4s ease",
                }}
              >
                {/* Shimmer sweep */}
                <div
                  className="pointer-events-none absolute inset-0 z-0"
                  style={{
                    background: `linear-gradient(115deg, transparent 30%, ${dc.color.replace(")", ",0.06)")} 50%, transparent 70%)`,
                    backgroundSize: "200% 100%",
                    animation: "shimmer-sweep 4s linear infinite",
                  }}
                />

                {/* Dungeon rank badge + count row */}
                <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between">
                  <div
                    className="text-[11px] font-bold font-mono tracking-[0.35em] px-3 py-1 rounded"
                    style={{
                      color: dc.color,
                      border: `1px solid ${dc.borderGlow}`,
                      background: `${dc.gradientFrom}`,
                      textShadow: `0 0 10px ${dc.glow}, 0 0 20px ${dc.glow}, 0 0 35px ${dc.glow}`,
                      boxShadow: `0 0 8px ${dc.borderGlow}, 0 0 16px ${dc.glow}`,
                    }}
                  >
                    S-RANK
                  </div>
                  <span
                    className="text-[18px] font-bold font-mono"
                    style={{
                      color: dc.color,
                      textShadow: `0 0 10px ${dc.glow}, 0 0 20px ${dc.glow}`,
                    }}
                  >
                    {count}
                  </span>
                </div>

                {/* Sport icon */}
                <div
                  className="relative z-10 mt-4 mb-4 text-6xl select-none"
                  style={{
                    filter: `drop-shadow(0 0 18px ${dc.glow}) drop-shadow(0 0 40px ${dc.glow.replace("0.55", "0.25")})`,
                    animation: isOpen ? "float 4s ease-in-out infinite" : "none",
                    fontSize: "4rem",
                  }}
                >
                  {dc.icon}
                </div>

                {/* Category name */}
                <h3
                  className="relative z-10 font-display text-2xl font-bold tracking-widest mb-1"
                  style={{
                    color: dc.color,
                    textShadow: `0 0 14px ${dc.glow}, 0 0 30px ${dc.glow.replace("0.55", "0.3")}`,
                  }}
                >
                  {key.toUpperCase()}
                </h3>

                {/* Dungeon label */}
                <p
                  className="relative z-10 text-[10px] tracking-[0.4em] font-mono mb-4"
                  style={{ color: dc.color, opacity: 0.65 }}
                >
                  {dc.label}
                </p>

                {/* Trophy count bar */}
                <div className="relative z-10 w-full mb-4">
                  <div className="flex items-center mb-1">
                    <span className="text-[10px] font-mono tracking-widest" style={{ color: dc.color, opacity: 0.6 }}>
                      PRIZES CONQUERED
                    </span>
                  </div>
                  <div
                    className="h-1 w-full rounded-full"
                    style={{ background: `${dc.borderGlow}` }}
                  >
                    <motion.div
                      className="h-1 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(count * 20, 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.2 + 0.5 }}
                      style={{ background: dc.color, boxShadow: `0 0 8px ${dc.glow}` }}
                    />
                  </div>
                </div>

                {/* Enter / Close CTA */}
                <div
                  className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-mono tracking-widest"
                  style={{
                    border: `1px solid ${dc.color}`,
                    color: dc.color,
                    background: `${dc.gradientFrom}`,
                    boxShadow: isOpen ? `0 0 14px ${dc.glow}` : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isOpen ? (
                    <>
                      <Shield size={12} />
                      CLOSE DUNGEON
                    </>
                  ) : (
                    <>
                      <Swords size={12} />
                      ENTER DUNGEON
                    </>
                  )}
                </div>

                {/* Active indicator */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2"
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderTop: `8px solid ${dc.color}`,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Dungeon interior — achievement grid */}
        <AnimatePresence>
          {activeDungeon && activeSport && cfg && (
            <motion.div
              ref={detailRef}
              key={activeDungeon}
              initial={{ opacity: 0, y: 30, scaleY: 0.92 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: 20, scaleY: 0.95 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 rounded-2xl overflow-hidden"
              style={{
                border: `1px solid ${cfg.color}`,
                boxShadow: `0 0 0 1px ${cfg.borderGlow}, 0 0 50px ${cfg.glow.replace("0.55", "0.25")}, inset 0 0 60px ${cfg.gradientFrom}`,
                background: `linear-gradient(180deg, ${cfg.gradientFrom}, ${cfg.gradientTo})`,
              }}
            >
              {/* Dungeon header bar */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{
                  borderBottom: `1px solid ${cfg.borderGlow}`,
                  background: `linear-gradient(90deg, ${cfg.gradientFrom}, transparent)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{dungeonConfig[activeDungeon].icon}</span>
                  <div>
                    <div
                      className="font-display text-lg tracking-widest font-bold"
                      style={{ color: cfg.color, textShadow: `0 0 12px ${cfg.glow}` }}
                    >
                      {activeDungeon.toUpperCase()} DUNGEON
                    </div>
                    <div
                      className="text-[9px] font-mono tracking-[0.4em]"
                      style={{ color: cfg.color, opacity: 0.55 }}
                    >
                      {cfg.label} · {activeSport.achievements.length} CONQUESTS
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeDungeon}
                  className="rounded-lg p-2 transition-all"
                  style={{ color: cfg.color, border: `1px solid ${cfg.borderGlow}` }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Achievement carousel */}
              <div className="p-6">
                {(() => {
                  const achievements = activeSport.achievements;
                  const total = achievements.length;
                  const hasCarousel = total > CARDS_PER_PAGE;
                  const totalPages = Math.ceil(total / CARDS_PER_PAGE);
                  const visibleAchs = achievements.slice(
                    carouselPage * CARDS_PER_PAGE,
                    carouselPage * CARDS_PER_PAGE + CARDS_PER_PAGE
                  );

                  return (
                    <>
                      <div className="relative">
                        {/* Left arrow */}
                        {hasCarousel && (
                          <button
                            onClick={() => setCarouselPage((p) => Math.max(0, p - 1))}
                            disabled={carouselPage === 0}
                            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-all"
                            style={{
                              background: carouselPage === 0 ? "rgba(0,0,0,0.3)" : cfg.gradientFrom,
                              border: `1px solid ${carouselPage === 0 ? "rgba(255,255,255,0.1)" : cfg.color}`,
                              color: carouselPage === 0 ? "rgba(255,255,255,0.2)" : cfg.color,
                              boxShadow: carouselPage === 0 ? "none" : `0 0 12px ${cfg.glow}`,
                            }}
                          >
                            <ChevronLeft size={18} />
                          </button>
                        )}

                        {/* Cards */}
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={carouselPage}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                          >
                            {visibleAchs.map((ach, i) => (
                              <motion.button
                                key={carouselPage * CARDS_PER_PAGE + i}
                                onClick={() => setActiveAchievement(ach === activeAchievement ? null : ach)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: i * 0.07 }}
                                className="group relative rounded-xl overflow-hidden text-left"
                                style={{
                                  border: `1px solid ${ach === activeAchievement ? cfg.color : cfg.borderGlow.replace("0.35", "0.25")}`,
                                  boxShadow:
                                    ach === activeAchievement
                                      ? `0 0 22px ${cfg.glow}, 0 0 50px ${cfg.glow.replace("0.55", "0.15")}`
                                      : `0 2px 16px rgba(0,0,0,0.4)`,
                                  background:
                                    ach === activeAchievement
                                      ? `linear-gradient(160deg, ${cfg.gradientFrom}, ${cfg.gradientTo})`
                                      : `linear-gradient(160deg, rgba(19,12,38,0.9), rgba(10,7,22,0.95))`,
                                  transition: "all 0.35s ease",
                                }}
                              >
                                {/* Achievement image */}
                                <div className="relative overflow-hidden" style={{ height: "380px" }}>
                                  {ach.image ? (
                                    <img
                                      src={ach.image}
                                      alt={ach.title}
                                      className="absolute inset-0 w-full h-full"
                                      style={{ objectFit: ("imageFit" in ach ? ach.imageFit as "cover" | "contain" : "cover"), objectPosition: ("imagePosition" in ach ? ach.imagePosition : undefined) ?? "center center" }}
                                    />
                                  ) : (
                                    <div
                                      className="w-full h-full flex items-center justify-center"
                                      style={{ background: `linear-gradient(135deg, ${cfg.gradientFrom}, ${cfg.gradientTo})` }}
                                    >
                                      <span className="text-5xl opacity-40">{dungeonConfig[activeDungeon].icon}</span>
                                    </div>
                                  )}

                                  {/* Overlay gradient */}
                                  <div
                                    className="absolute inset-0"
                                    style={{
                                      background: `linear-gradient(to top, ${cfg.gradientTo} 0%, transparent 40%)`,
                                      opacity: 0.45,
                                    }}
                                  />

                                  {/* Trophy badge */}
                                  <div
                                    className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest"
                                    style={{
                                      background: `rgba(0,0,0,0.75)`,
                                      border: `1px solid ${cfg.color}`,
                                      color: cfg.color,
                                      backdropFilter: "blur(8px)",
                                      boxShadow: `0 0 10px ${cfg.glow}`,
                                    }}
                                  >
                                    <Trophy size={10} />
                                    {ach.prize}
                                  </div>

                                  {/* Expand hint */}
                                  <div
                                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{ color: cfg.color }}
                                  >
                                    <ChevronDown size={14} />
                                  </div>
                                </div>

                                {/* Card body */}
                                <div className="p-4">
                                  <div
                                    className="font-display text-sm font-bold tracking-wide leading-tight mb-1"
                                    style={{ color: cfg.color, textShadow: `0 0 10px ${cfg.glow}` }}
                                  >
                                    {ach.title}
                                  </div>
                                  <div
                                    className="text-[10px] font-mono tracking-widest mb-2"
                                    style={{ color: cfg.color, opacity: 0.55 }}
                                  >
                                    {ach.date}
                                  </div>

                                  <AnimatePresence>
                                    {ach === activeAchievement && (
                                      <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-[11px] leading-relaxed overflow-hidden"
                                        style={{ color: "rgba(225,215,255,0.75)" }}
                                      >
                                        {ach.description}
                                      </motion.p>
                                    )}
                                  </AnimatePresence>

                                  {ach !== activeAchievement && (
                                    <p
                                      className="text-[11px] leading-relaxed line-clamp-2"
                                      style={{ color: "rgba(225,215,255,0.55)" }}
                                    >
                                      {ach.description}
                                    </p>
                                  )}
                                </div>
                              </motion.button>
                            ))}
                          </motion.div>
                        </AnimatePresence>

                        {/* Right arrow */}
                        {hasCarousel && (
                          <button
                            onClick={() => setCarouselPage((p) => Math.min(totalPages - 1, p + 1))}
                            disabled={carouselPage === totalPages - 1}
                            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-all"
                            style={{
                              background: carouselPage === totalPages - 1 ? "rgba(0,0,0,0.3)" : cfg.gradientFrom,
                              border: `1px solid ${carouselPage === totalPages - 1 ? "rgba(255,255,255,0.1)" : cfg.color}`,
                              color: carouselPage === totalPages - 1 ? "rgba(255,255,255,0.2)" : cfg.color,
                              boxShadow: carouselPage === totalPages - 1 ? "none" : `0 0 12px ${cfg.glow}`,
                            }}
                          >
                            <ChevronRight size={18} />
                          </button>
                        )}
                      </div>

                      {/* Dot indicators */}
                      {hasCarousel && (
                        <div className="flex justify-center gap-2 mt-6">
                          {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCarouselPage(idx)}
                              className="rounded-full transition-all"
                              style={{
                                width: carouselPage === idx ? 20 : 8,
                                height: 8,
                                background: carouselPage === idx ? cfg.color : cfg.borderGlow,
                                boxShadow: carouselPage === idx ? `0 0 8px ${cfg.glow}` : "none",
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
