import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { countries, internationalCountry, type Country } from "@/data/mock";

interface CountryContextValue {
  country: Country;
  setCountry: (code: string) => void;
  detected: boolean;
  bannerDismissed: boolean;
  dismissBanner: () => void;
}

const CountryContext = createContext<CountryContextValue | null>(null);

const STORAGE_KEY = "wgih_country";

function findCountry(code: string): Country {
  return countries.find((c) => c.code === code) ?? internationalCountry;
}

function fallbackDetect(): string {
  const lang = navigator.language ?? "";
  if (lang.startsWith("zh")) return "CN";
  const region = lang.split("-")[1]?.toUpperCase();
  if (region && countries.some((c) => c.code === region)) return region;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  if (tz.includes("Nairobi")) return "KE";
  if (tz.includes("Lagos")) return "NG";
  if (tz.includes("Dubai")) return "AE";
  if (tz.includes("London")) return "GB";
  if (tz.includes("Sydney")) return "AU";
  if (tz.includes("Shanghai") || tz.includes("Chongqing")) return "CN";
  if (tz.startsWith("America/")) return "US";
  return "INT";
}

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<Country>(internationalCountry);
  const [detected, setDetected] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCountryState(findCountry(saved));
      return;
    }
    setBannerDismissed(false);
    // IP geolocation with graceful fallbacks
    fetch("https://ipapi.co/json/")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        const code = d?.country_code as string | undefined;
        if (code && countries.some((c) => c.code === code)) {
          setCountryState(findCountry(code));
        } else {
          setCountryState(findCountry(fallbackDetect()));
        }
        setDetected(true);
      })
      .catch(() => {
        setCountryState(findCountry(fallbackDetect()));
        setDetected(true);
      });
  }, []);

  const setCountry = (code: string) => {
    localStorage.setItem(STORAGE_KEY, code);
    setCountryState(findCountry(code));
    setBannerDismissed(true);
  };

  return (
    <CountryContext.Provider
      value={{
        country,
        setCountry,
        detected,
        bannerDismissed,
        dismissBanner: () => setBannerDismissed(true),
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used inside CountryProvider");
  return ctx;
}
