"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, CheckCircle2, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { site, socials } from "@/data/site";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Contact form. If EmailJS env vars are set, it sends via the EmailJS
 * REST API (no SDK needed). Otherwise it gracefully falls back to a
 * pre-filled mailto: link so the form always works.
 */
export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const emailjsReady = Boolean(serviceId && templateId && publicKey);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailjsReady) {
      // Fallback: open the user's mail client pre-filled.
      const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    try {
      setStatus("sending");
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
          },
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something great"
        subtitle="Have a project, role, or research idea in mind? My inbox is always open."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Info + socials + map placeholder */}
        <div className="flex flex-col gap-6">
          <SpotlightCard>
            <h3 className="text-lg font-semibold text-foreground">Get in touch</h3>
            <p className="mt-2 text-sm text-muted">
              I&apos;m open to internships, freelance work, research
              collaborations, and thesis-related discussions.
            </p>
            <div className="mt-5 space-y-3 text-sm">
              <a
                href={`mailto:${site.email}`}
                data-cursor="pointer"
                className="flex items-center gap-3 text-muted transition-colors hover:text-accent-glow"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg glass">
                  <Mail className="h-4 w-4" />
                </span>
                {site.email}
              </a>
              <div className="flex items-center gap-3 text-muted">
                <span className="grid h-9 w-9 place-items-center rounded-lg glass">
                  <MapPin className="h-4 w-4" />
                </span>
                {site.location}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-cursor="pointer"
                  className="grid h-10 w-10 place-items-center rounded-full glass text-muted transition-all hover:-translate-y-1 hover:text-accent-glow hover:shadow-glow"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </SpotlightCard>

          {/* Map placeholder — swap the iframe src for your real location */}
          <SpotlightCard className="overflow-hidden p-0">
            <div className="relative h-48 w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-surface to-background" />
              <div className="bg-grid absolute inset-0 opacity-40" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="flex flex-col items-center gap-2 text-muted">
                  <MapPin className="h-6 w-6 text-accent-glow" />
                  <span className="text-xs">Map placeholder — embed Google Maps here</span>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Form */}
        <SpotlightCard>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                required
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                required
              />
            </div>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-muted">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell me about your project or idea…"
                className="resize-none rounded-xl glass px-4 py-3 text-foreground outline-none transition-shadow placeholder:text-muted focus:shadow-glow"
              />
            </label>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                data-cursor="pointer"
                disabled={status === "sending"}
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-glow transition-colors duration-300 hover:bg-accent-glow disabled:opacity-70"
              >
                {status === "sending" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                )}
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>

              {status === "sent" && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-sm text-emerald-400"
                >
                  <CheckCircle2 className="h-4 w-4" /> Message sent!
                </motion.span>
              )}
              {status === "error" && (
                <span className="text-sm text-rose-400">
                  Something went wrong — try again.
                </span>
              )}
            </div>

            {!emailjsReady && (
              <p className="text-[11px] text-muted">
                Tip: add EmailJS keys in <code>.env.local</code> to send directly.
                Until then, this opens your mail app.
              </p>
            )}
          </form>
        </SpotlightCard>
      </div>
    </section>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-muted">{label}</span>
      <input
        {...props}
        className="rounded-xl glass px-4 py-3 text-foreground outline-none transition-shadow placeholder:text-muted focus:shadow-glow"
      />
    </label>
  );
}
