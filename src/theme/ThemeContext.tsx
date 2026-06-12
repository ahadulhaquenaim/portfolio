import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { PALETTES, type Palette, type ThemeName } from "./palette";

const STORAGE_KEY = "portfolio-theme";
const DEFAULT_THEME: ThemeName = "solo";

type ThemeContextValue = {
  theme: ThemeName;
  palette: Palette;
  setTheme: (t: ThemeName) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): ThemeName {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "dbz" || stored === "solo" ? stored : DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(readStoredTheme);

  // Reflect the active theme on <html data-theme> so the CSS-variable blocks in
  // index.css swap every Tailwind token + .sl-*/.system-panel/.gate-card color.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage blocked (private mode) — non-fatal */
    }
  }, [theme]);

  const setTheme = useCallback((t: ThemeName) => setThemeState(t), []);
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === "solo" ? "dbz" : "solo")),
    []
  );

  return (
    <ThemeContext.Provider
      value={{ theme, palette: PALETTES[theme], setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
