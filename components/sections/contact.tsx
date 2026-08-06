"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { profile } from "@/lib/data";
import { contactServices } from "@/lib/contact-services";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SectionHeading } from "./section-heading";

type Status = "idle" | "sending" | "sent" | "error";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [service, setService] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;

    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error("EmailJS is not configured yet.");
      }
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      form.reset();
      setService("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Let's work together"
          description="Have a project in mind or an open role? Send the brief — I reply within a day."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-border bg-surface p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" name="first_name" placeholder="Jane" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" name="last_name" placeholder="Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" name="reply_to" type="email" placeholder="jane@company.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="Optional" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="service">Service</Label>
                <Select
                  value={service}
                  onValueChange={setService}
                  name="service"
                >
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {contactServices.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" name="service" value={service} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about the project, timeline, and budget."
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Button type="submit" size="lg" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending
                  </>
                ) : (
                  "Send message"
                )}
              </Button>

              {status === "sent" && (
                <span className="flex items-center gap-1.5 text-xs text-accent">
                  <CheckCircle2 className="h-4 w-4" /> Message sent — talk soon.
                </span>
              )}
              {status === "error" && (
                <span className="text-xs text-red-400">
                  Couldn&apos;t send. Email me directly at {profile.email}.
                </span>
              )}
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <ContactRow icon={Phone} label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s+/g, "")}`} />
            <ContactRow icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <ContactRow icon={MapPin} label="Location" value={profile.location} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}
