"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Loader2,
  Send,
} from "lucide-react";
import { profile } from "@/lib/data";
import { contactServices } from "@/lib/contact-services";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/contact-schema";
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
import { cn } from "@/lib/utils";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_AUTOREPLY_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

function buildOwnerNotificationParams(values: ContactFormValues) {
  return {
    first_name: values.firstName,
    last_name: values.lastName,
    from_name: `${values.firstName} ${values.lastName}`,
    name: values.firstName,
    phone: values.phone?.trim() || "Not provided",
    service: values.service,
    message: values.message,
    // Notification goes to you; reply-to is the visitor so you can respond directly.
    to_email: profile.email,
    email: profile.email,
    reply_to: values.email,
  };
}

function buildAutoReplyParams(values: ContactFormValues) {
  return {
    first_name: values.firstName,
    last_name: values.lastName,
    from_name: profile.name,
    name: values.firstName,
    service: values.service,
    // Auto-reply goes to the person who submitted the form.
    to_email: values.email,
    email: values.email,
    reply_to: profile.email,
  };
}

const defaultValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  service: contactServices[0],
  message: "",
};

export function Contact() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onTouched",
  });

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }
  }, []);

  async function onSubmit(values: ContactFormValues) {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      toast.error("Couldn't send your message", {
        description: `Please try again or email me directly at ${profile.email}.`,
      });
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        buildOwnerNotificationParams(values)
      );

      if (EMAILJS_AUTOREPLY_TEMPLATE_ID) {
        try {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_AUTOREPLY_TEMPLATE_ID,
            buildAutoReplyParams(values)
          );
        } catch (autoReplyErr) {
          console.error("Auto-reply email failed:", autoReplyErr);
        }
      }

      reset(defaultValues);
      toast.success("Message sent successfully!", {
        description:
          "Thanks for reaching out. I'll get back to you within 24 hours.",
      });
    } catch (err) {
      console.error("EmailJS error:", err);

      toast.error("Couldn't send your message", {
        description: `Please try again or email me directly at ${profile.email}.`,
      });
    }
  }

  return (
    <section className="border-t border-white/5 py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Contact"
          title="Let's work"
          titleMuted="together."
          description="Have a project in mind or an open role? Send the brief — I reply within a day."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-white/[0.06] to-white/[0.015] p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-8"
            noValidate
          >
            {/* Accent hairline + soft glow along the top edge */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-accent/70 to-transparent"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="First name"
                htmlFor="firstName"
                error={errors.firstName?.message}
              >
                <Input
                  id="firstName"
                  placeholder="Jane"
                  aria-invalid={Boolean(errors.firstName)}
                  className={fieldClassName(Boolean(errors.firstName))}
                  {...register("firstName")}
                />
              </Field>

              <Field
                label="Last name"
                htmlFor="lastName"
                error={errors.lastName?.message}
              >
                <Input
                  id="lastName"
                  placeholder="Doe"
                  aria-invalid={Boolean(errors.lastName)}
                  className={fieldClassName(Boolean(errors.lastName))}
                  {...register("lastName")}
                />
              </Field>

              <Field
                label="Email address"
                htmlFor="email"
                error={errors.email?.message}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@company.com"
                  aria-invalid={Boolean(errors.email)}
                  className={fieldClassName(Boolean(errors.email))}
                  {...register("email")}
                />
              </Field>

              <Field
                label="Phone number"
                htmlFor="phone"
                error={errors.phone?.message}
                hint="Optional"
              >
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  aria-invalid={Boolean(errors.phone)}
                  className={fieldClassName(Boolean(errors.phone))}
                  {...register("phone")}
                />
              </Field>

              <Field
                label="Service"
                htmlFor="service"
                error={errors.service?.message}
                className="sm:col-span-2"
              >
                <Controller
                  name="service"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="service"
                        aria-invalid={Boolean(errors.service)}
                        className={fieldClassName(Boolean(errors.service))}
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {contactServices.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field
                label="Message"
                htmlFor="message"
                error={errors.message?.message}
                className="sm:col-span-2"
              >
                <Textarea
                  id="message"
                  placeholder="Tell me about the project, timeline, and budget."
                  aria-invalid={Boolean(errors.message)}
                  className={cn(
                    fieldClassName(Boolean(errors.message)),
                    "min-h-32 resize-y"
                  )}
                  {...register("message")}
                />
              </Field>
            </div>

            <motion.div
              className="mt-6"
              whileTap={isSubmitting ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
            >
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="min-w-[160px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send message
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {profile.availableForWork && (
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-accent/[0.12] via-white/[0.03] to-transparent p-6 backdrop-blur-xl">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-emerald-300/90">
                    Available for work
                  </p>
                </div>
                <p className="mt-4 text-lg font-semibold leading-snug tracking-tight text-white">
                  Open to full-time roles and freelance projects.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  Typical reply time: under 24 hours.
                </p>
              </div>
            )}
            <ContactRow
              icon={Phone}
              label="Phone"
              value={profile.phone}
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
            />
            <ContactRow
              icon={Mail}
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            <ContactRow icon={MapPin} label="Location" value={profile.location} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function fieldClassName(hasError: boolean) {
  return hasError ? "border-red-500/70 focus-visible:border-red-400" : undefined;
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={cn("space-y-2", className)}
      initial={false}
      animate={error ? { x: [0, -4, 4, -4, 0] } : { x: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={htmlFor}>{label}</Label>
        {hint && !error && (
          <span className="text-[11px] text-muted">{hint}</span>
        )}
      </div>
      {children}
      {error && (
        <p className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </motion.div>
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
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 group-hover/link:-translate-y-0.5 group-hover/link:border-accent/50 group-hover/link:bg-white/[0.05] group-hover/link:shadow-[0_20px_60px_-25px_rgba(255,45,85,0.5)]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-linear-to-b from-white/10 to-white/[0.02] text-accent">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-medium text-white">
          {value}
        </p>
      </div>
      {href && (
        <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition-all duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-accent" />
      )}
    </div>
  );
  return href ? (
    <a href={href} className="group/link block">
      {content}
    </a>
  ) : (
    content
  );
}
