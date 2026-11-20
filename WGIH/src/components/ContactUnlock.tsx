import { useState } from "react";
import { Lock, Mail, Phone, ShieldCheck } from "lucide-react";
import { PaymentBadges } from "@/components/PaymentBadges";

export interface UnlockContact {
  name: string;
  role: string;
  email: string;
  phone: string;
}

/**
 * Frosted "Unlock Contact Information" panel used for private manufacturer and
 * Academy-organizer contacts. Unlocking is a visual-only toggle — no real
 * payment or verification happens. Official WGIH country-office and
 * representative contacts are NEVER placed behind this component.
 *
 * When `programFee` is provided (Academy contexts) the panel clearly separates
 * the illustrative WGIH information-access fee from the real program
 * participation fee, which always stays visible on the page.
 */
export function ContactUnlock({
  contact,
  label = "Contact",
  note,
  programFee,
}: {
  contact: UnlockContact;
  label?: string;
  note?: string;
  programFee?: { amount: string; description?: string };
}) {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-5 py-3">
        <ShieldCheck className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-bold">{label} Information</h3>
      </div>

      <div className="relative p-5">
        {/* The contact card — blurred until unlocked */}
        <div
          className={`space-y-2 transition ${
            unlocked ? "" : "pointer-events-none select-none blur-sm"
          }`}
          aria-hidden={!unlocked}
        >
          <p className="font-semibold">{unlocked ? contact.name : "•••••• ••••••"}</p>
          <p className="text-sm text-muted-foreground">{contact.role}</p>
          <p className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-primary" />
            {unlocked ? (
              <a className="text-primary hover:underline" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            ) : (
              "••••••••@••••.•••"
            )}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-primary" />
            {unlocked ? (
              <a className="text-primary hover:underline" href={`tel:${contact.phone}`}>
                {contact.phone}
              </a>
            ) : (
              "+•• ••• ••• ••••"
            )}
          </p>
        </div>

        {/* Unlock overlay */}
        {!unlocked && (
          <div className="absolute inset-0 grid place-items-center bg-background/40 p-5 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-primary-light">
                <Lock className="h-5 w-5 text-primary" />
              </span>
              <p className="max-w-xs text-sm font-medium">
                {note ?? "Unlock the direct contact details for this listing."}
              </p>
              <PaymentBadges compact />
              <button
                onClick={() => setUnlocked(true)}
                className="mt-1 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
              >
                <Lock className="h-4 w-4" /> Unlock Contact Information
              </button>
              <p className="text-[10px] text-muted-foreground">
                Demo only — this reveals illustrative contact details instantly, with no real
                payment.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fee distinction — only shown in Academy contexts where a program fee exists */}
      {programFee && (
        <div className="border-t border-border bg-muted/40 px-5 py-4 text-sm">
          <p className="font-semibold">Program Participation Fee</p>
          <p className="mt-0.5 text-primary">
            <span className="font-heading text-xl font-bold">{programFee.amount}</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {programFee.description ?? "Paid directly to WGIH / the organizer upon enrollment."}{" "}
            This is separate from, and unrelated to, the illustrative WGIH information-access fee
            shown above for revealing contact details.
          </p>
        </div>
      )}
    </div>
  );
}
