/** Generated initial-based logo placeholder — no real brand assets required. */
export function LogoTile({
  name,
  color,
  size = 48,
  className = "",
}: {
  name: string;
  color: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-xl font-bold text-white ${className}`}
      style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.38 }}
      aria-hidden="true"
    >
      {initials || "?"}
    </div>
  );
}
