import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Home,
  Globe2,
  Search,
  UserRound,
  ChevronDown,
  Satellite,
  Briefcase,
  GraduationCap,
  MapPin,
  Newspaper,
  Users,
  Info,
  Menu,
} from "lucide-react";
import logo from "@/assets/wgih-logo.png";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About WGIH", icon: Info },
  { to: "/solutions", label: "Space &\nGeospatial Solutions", icon: Satellite },
  { to: "/business", label: "Business &\nOpportunities", icon: Briefcase },
  { to: "/training", label: "Academy &\nTraining", icon: GraduationCap },
  { to: "/representatives", label: "Country Offices", icon: MapPin },
  { to: "/news", label: "News &\nEvents", icon: Newspaper },
  { to: "/partners", label: "Our Partners", icon: Users },
] as const;

export function Header({
  lang,
  setLang,
}: {
  lang: "en" | "zh";
  setLang: (l: "en" | "zh") => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="portal-header">
      <div className="portal-masthead">
        <Link to="/" className="portal-brand" aria-label="WGIH home">
          <img src={logo} alt="" />
          <span>
            <strong>WGIH</strong>
            <small>
              World Geospatial
              <br />
              Information Home
            </small>
          </span>
        </Link>
        <p className="portal-motto">Connect the World · Empower the Future</p>
        <div className="portal-tools">
          <div className="portal-account">
            <button onClick={() => setLang(lang === "en" ? "zh" : "en")}>
              <Globe2 /> {lang === "en" ? "English" : "中文"} <ChevronDown />
            </button>
            <Link to="/admin">
              <UserRound /> Login
            </Link>
            <span>|</span>
            <Link to="/contact">Register</Link>
          </div>
          <form className="portal-search" action="/news">
            <input name="q" aria-label="Search WGIH" placeholder="Search WGIH..." />
            <button aria-label="Search">
              <Search />
            </button>
          </form>
        </div>
        <button
          className="portal-menu"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <Menu />
        </button>
      </div>
      <nav className={`portal-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
        {nav.map(({ to, label, icon: Icon }, index) => (
          <Link
            key={label}
            to={to}
            onClick={() => setOpen(false)}
            className={index === 0 ? "portal-nav-home" : ""}
          >
            <Icon />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
