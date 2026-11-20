import {
  Ruler,
  AlertTriangle,
  Wheat,
  Mountain,
  Building2,
  Trees,
  Droplets,
  Truck,
  Zap,
  HardHat,
  Waves,
  ScrollText,
  Signal,
  Leaf,
  Satellite,
  type LucideIcon,
} from "lucide-react";

/** Resolves a Solution's string icon name to a lucide component. */
export const solutionIcons: Record<string, LucideIcon> = {
  Ruler,
  AlertTriangle,
  Wheat,
  Mountain,
  Building2,
  Trees,
  Droplets,
  Truck,
  Zap,
  HardHat,
  Waves,
  ScrollText,
  Signal,
  Leaf,
};

export function solutionIcon(name: string): LucideIcon {
  return solutionIcons[name] ?? Satellite;
}
