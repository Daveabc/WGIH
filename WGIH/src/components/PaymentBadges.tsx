import { Wallet } from "lucide-react";

/**
 * Visual-only Alipay / WeChat Pay badges for the information-access unlock
 * pattern. No real payment is processed anywhere in this frontend — this is
 * illustrative UI only, and is always paired with explicit copy saying so.
 */
export function PaymentBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "flex flex-col items-center gap-2" : "space-y-2"}>
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        <Wallet className="h-3.5 w-3.5" /> WGIH Information-Access Fee
      </p>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center rounded-md bg-[#1677FF] px-2.5 py-1 text-xs font-bold text-white">
          Alipay
        </span>
        <span className="inline-flex items-center rounded-md bg-[#07C160] px-2.5 py-1 text-xs font-bold text-white">
          WeChat Pay
        </span>
      </div>
      <p className="max-w-[240px] text-center text-[10px] leading-snug text-muted-foreground">
        Illustrative only — a visual preview of future payment options. No real payment is processed
        on this site.
      </p>
    </div>
  );
}
